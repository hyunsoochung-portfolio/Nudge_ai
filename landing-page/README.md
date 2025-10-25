# Nudge AI — Landing Page

> _An AI care companion that calls your child so you don't have to — turning location, homework, and screen-time worries into a single phone call._

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

## Overview

This is the marketing landing page for **Nudge AI**, a service that places gentle AI phone calls to children on a parent's behalf — checking in on location, homework, and screen-time agreements. The page is a self-contained, single-file experience: the entire layout, styling, and interaction logic live inside one `index.html` with no build step, no frameworks, and no external dependencies. It pairs a dark, gradient-driven visual design with a complete pre-registration funnel that posts directly to a Google Apps Script endpoint.

## Technical Highlights

- **Single-file, zero-dependency delivery** — markup, an embedded `<style>` block, and a vanilla `<script>` ship together in one `index.html`, so the page loads with no bundler, package manager, or runtime framework.
- **Semantic section structure** — content is organized into clearly delineated `<section>` regions (Hero, Features, CTA) wrapping a `<form>`-driven signup, keeping the document outline meaningful and accessible.
- **Native smooth scrolling + floating CTA** — `html { scroll-behavior: smooth }` powers anchored navigation, and a `position: fixed` floating call-to-action button anchored to `#signupForm` follows the viewport to keep the conversion path one tap away.
- **Responsive, grid-based layout** — the features section uses `grid-template-columns: repeat(auto-fit, minmax(350px, 1fr))` for fluid reflow, with `@media` breakpoints at 1024px and 768px collapsing multi-column rows, contact/plan option groups, and input rows into single-column stacks for mobile.
- **Gradient and depth styling in pure CSS** — gradient text via `-webkit-background-clip: text`, a radial-glow hero overlay, and translucent feature cards with hover transforms (`translateY` lift plus an animated top border driven by `scaleX`) build visual depth without any images or libraries.
- **Stateful contact selection** — radio inputs toggle either an email or phone input section (`.input-section.show`), tracking a `contactConfirmed` flag and switching the confirm button into an inline edit/lock mode that disables the field once a value is validated.
- **Client-side validation with inline feedback** — email is validated through the input's native `checkValidity()`, with contextual warning and confirmation banners (`.input-warning`, `.contact-confirmed`) shown or hidden by toggling CSS classes.
- **Plan selection + guarded submission** — free/premium plan cards toggle a `.selected` state on click; the submit handler blocks unconfirmed contacts or unselected plans before serializing the chosen contact method, value, plan, and a Seoul-timezone timestamp.
- **Resilient form delivery** — the signup `fetch` posts JSON to a Google Apps Script Web App using `mode: 'no-cors'`, disables the button during flight, surfaces a temporary error banner on failure, and fully resets every field and toggle state on success.

## Tech Stack

- **HTML5** — semantic markup and native form controls (`type="email"`, `type="tel"`, radio inputs)
- **CSS3** — embedded styles, CSS grid, flexbox, gradients, transitions, media queries, native smooth scroll
- **Vanilla JavaScript** — DOM event handling, native form validation, `fetch`-based submission
- **Google Apps Script** — serverless endpoint that collects pre-registration submissions

## Getting Started

No build step or dependencies are required — this is a single static HTML file.

Open it directly in a browser:

```bash
open index.html
```
