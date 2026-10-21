# Classic Hotel — Next.js app

Migration target for the hotel frontend. Static Webflow/HTML baseline stays in repo root (`elbergo.webflow.io/`) and is tagged `baseline/static-v1`.

## Stack

- Next.js (App Router)
- React
- CSS Modules + design tokens (`src/styles/tokens.css`)
- `next/font` — Instrument Sans / Instrument Serif

## Commands

```bash
cd web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Rules

1. Do not edit `baseline/static-v1` content for “quick fixes”.
2. Match visual DNA via tokens before inventing new styles.
3. Migrate page-by-page (Home One parity is the next gate).
