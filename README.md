# Nordlight Physiotherapy — Peregian Beach

Fictional one-page website for a family-run physiotherapy clinic (the Brandt family, since 2005).
Demo and portfolio piece for **Nuvejo**. The clinic, team, address and contact details are entirely made up.

English (Australian) version of the German `nordlight-physio-mock` site.

## Opening it

Just double-click `index.html` — there's no build step.
The Google Maps embed and the Cal.com booking calendar need an internet connection.

Optionally serve it locally (e.g. `npx serve .`) if the file protocol causes trouble.

## Structure

```
index.html
assets/
  css/styles.css   – design tokens, layout, components
  js/main.js       – navigation, scroll reveals, small touches (year, today's hours)
  img/             – logo (header & footer), photos, favicon
```

## Tech

- Vanilla HTML/CSS/JS, no frameworks, no build tools
- Online booking via a Cal.com inline embed
- Scroll reveals via `IntersectionObserver`, disabled under `prefers-reduced-motion`
- Semantic HTML, visible focus states, skip link
- Google Maps embed without an API key (`output=embed`)

## Fonts

Fraunces (headings) and Source Sans 3 (body text), loaded from Google Fonts.
