/* =============================================================
   Nordlight Physiotherapy — main.js
   Demo/portfolio project · Design & build: Nuvejo

   1. Header & navigation
   2. Scroll reveals & active navigation
   3. Small touches (year, today's opening hours, next appointment)
   ============================================================= */

(function () {
  'use strict';

  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  /* Closing hour per weekday (0 = Sunday). null = closed. */
  const CLOSING = { 0: null, 1: 19, 2: 19, 3: 15, 4: 19, 5: 14, 6: 12 };

  /* ---------- 1. Header & navigation ---------- */
  const header = $('#siteHeader');
  const nav = $('#primaryNav');
  const navToggle = $('#navToggle');

  const setStuck = () => header.classList.toggle('is-stuck', window.scrollY > 8);
  setStuck();
  window.addEventListener('scroll', setStuck, { passive: true });

  const closeNav = () => {
    nav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    $('.visually-hidden', navToggle).textContent = 'Open menu';
  };

  navToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(open));
    $('.visually-hidden', navToggle).textContent = open ? 'Close menu' : 'Open menu';
  });

  $$('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', () => {
      if (nav.classList.contains('is-open')) closeNav();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      closeNav();
      navToggle.focus();
    }
  });

  /* ---------- 2. Scroll reveals & active navigation ---------- */
  const revealables = $$('.reveal');
  revealables.forEach((el) => {
    if (el.dataset.delay) el.style.setProperty('--reveal-delay', el.dataset.delay);
  });

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealables.forEach((el) => el.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });

    revealables.forEach((el) => revealObserver.observe(el));
  }

  const navLinks = $$('.nav__link');
  const sections = navLinks
    .map((link) => $(link.getAttribute('href')))
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          link.classList.toggle('is-active', link.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach((section) => navObserver.observe(section));
  }

  /* ---------- 3. Small touches ---------- */
  const now = new Date();
  $('#year').textContent = String(now.getFullYear());

  const todayRow = $(`.hours tr[data-day="${now.getDay()}"]`);
  if (todayRow) todayRow.classList.add('is-today');

  /* Next free appointment in the hero card – skips weekends. */
  const availValue = $('.avail-card__value');
  if (availValue) {
    const next = new Date(now);
    next.setDate(next.getDate() + 1);
    while (CLOSING[next.getDay()] === null || next.getDay() === 6) {
      next.setDate(next.getDate() + 1);
    }
    const isTomorrow = (next.getDate() - now.getDate() === 1) && next.getMonth() === now.getMonth();
    availValue.textContent = `${isTomorrow ? 'Tomorrow' : WEEKDAYS[next.getDay()]}, 9:30am`;
  }

})();
