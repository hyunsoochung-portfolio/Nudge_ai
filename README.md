# Nudge AI

> An AI that phones a child on the parent's behalf to coach financial sense and daily habits.

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=black)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)

**[▶ Live demo](https://childinterface.vercel.app)** — child app and parent dashboard.

## Overview

When a child is about to make a payment, Nudge AI places a short phone call that walks them through the decision against the rules the family has set, then reports back to the parent.

Two surfaces: a **child app** for spending, missions, and savings, and a **parent dashboard** for approvals, teaching the AI new rules, and reading call transcripts.

## What it does

### For children
- **AI calls at the moment of spending.** When the child tries to pay, Nudge AI places a real-time call that walks them through the purchase — is it within the rules, is it a want or a need, is now the right time?
- **Missions & savings.** Kids complete missions to earn allowance and grow savings, with a playful, game-like experience (levels, points, progress) that makes good habits rewarding.
- **Guided payments.** Paying — by QR or online — always routes through the AI check, so the lesson happens exactly when the decision is being made.

### For parents
- **Approvals at a glance.** Pending purchases arrive as cards with the AI's recommendation and reasoning, so a parent can approve or decline in one tap.
- **Teach the AI your rules — in plain language.** Parents describe a rule the way they'd say it out loud ("no game purchases on weekdays"), and Nudge AI asks a few clarifying questions before adopting it. No settings menus, just a conversation.
- **Full call logs.** Every AI call — whether about a payment or a daily-habit nudge — is saved as a readable transcript, alongside spending and savings summaries.

## Design

Each side of the product is its own focused experience. The **child app** is light, rounded, and gamified to feel encouraging; the **parent dashboard** is calm and information-dense for quick decisions. A single entry point routes each user into the right world.

## Tech Stack

- **React** + **React Router** — single-page app with separate child and parent experiences
- **Tailwind CSS** — utility-first styling, distinct theming per side
- **lucide-react** — iconography across both apps

## Repository Layout

- **Root** — the React product app (child app + parent dashboard + the AI-call experience).
- **[`landing-page/`](./landing-page)** — the marketing landing page for Nudge AI.

## Getting Started

```bash
npm install
npm start
```

The marketing landing page in [`landing-page/`](./landing-page) is a single static file — open `landing-page/index.html` in a browser.
