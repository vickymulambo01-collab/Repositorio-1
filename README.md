# RIM Trading & Indústria — Corporate Website

A corporate/B2B website for RIM Trading & Indústria, Lda, a company supplying paper and
hygiene products (napkins, tissue, toilet paper, kitchen towels, take-away and office
paper) to hospitality, food service, corporate and industrial clients.

Products show unit prices and let a visitor build an order (cart); "Make Order" opens
WhatsApp with the order pre-filled as a message. There is a separate general-enquiry
contact form (emailed via SMTP) for anything that isn't a product order. There is still
no online payment/checkout — orders are placed by sending the WhatsApp message.

This README is written so another developer can pick up and deploy the project without
any prior context or access to the original Claude Code session that built it.

## Stack

- **Frontend:** React 19 + TypeScript + Vite 8, Tailwind CSS v4, React Router 7,
  react-helmet-async for per-page SEO tags.
- **Backend:** A small Express 5 API (`/server`), run with `tsx` (no separate compile
  step for the server). In production it also serves the built frontend, so the whole
  site is one process.
- **Data / "database":** There is no external database. Products and categories are
  structured JSON files (`src/data/products.json`, `src/data/categories.json`), read by
  both the frontend and the API — nothing is hardcoded into components. Contact-form
  enquiries are appended to `server/data/enquiries.json` (a plain JSON file on disk,
  gitignored — see "Data persistence" below).

Product data was extracted directly from `Catalogue RIM - No Price.pdf` and
`Pricelist.xlsx` (ply, sheet counts, dimensions, packaging, barcodes and unit prices
cross-referenced between the two documents), with product photography taken from the
catalogue itself.

## Requirements

- Node.js 22.x (the Dockerfile pins `node:22-slim`; anything ≥ 20 should also work)
- npm (ships with Node)

## Installation

```bash
npm install
```

## Environment variables

Copy `.env.example` to `.env` and fill in real values (or set the same variables in your
hosting provider's dashboard). Nothing in `.env.example` contains a real secret.

| Variable | Required for | Notes |
| --- | --- | --- |
| `PORT` | — | Defaults to 4000 |
| `ADMIN_KEY` | `GET /api/enquiries` | Leave unset to keep that route closed |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | Email notifications on new enquiries | All four must be set or sending is skipped (enquiries are still saved to disk) |
| `NOTIFY_EMAIL` | Email notifications on new enquiries | Optional — defaults to `info@overseasit.net` |
| `SMTP_FROM` | — | Optional, defaults to `SMTP_USER` |

## Running locally

```bash
npm run dev:all   # runs the Vite dev server (5173) and the API (4000) together
```

Or run them separately:

```bash
npm run dev         # frontend only
npm run dev:server  # API only
```

The Vite dev server proxies `/api/*` to `http://localhost:4000`, so the contact form
works out of the box in development.

## Build

```bash
npm run build   # type-checks (tsc -b) then builds the frontend into dist/
```

## Deploying

The Express server can serve both the API and the built frontend as a single process —
no separate static host or reverse proxy is required:

```bash
npm install
npm run build   # builds the frontend into dist/
npm start       # serves dist/ + the API from one process, on $PORT (default 4000)
```

Point your host's "run/start command" at `npm start`, and its "build command" at
`npm run build`. This works as-is on Railway, Render, Fly.io, a plain VPS with a process
manager (pm2, systemd), or the included `Dockerfile`.

Whatever host you pick, set the environment variables from the table above in its
dashboard before the first deploy (at minimum you'll want the `SMTP_*` ones, so contact
enquiries actually email `NOTIFY_EMAIL`).

### Docker

```bash
docker build -t rim-website .
docker run -p 4000:4000 --env-file .env rim-website
```

(This Dockerfile was written and reviewed, but could not be build-tested in the
environment that authored it — no Docker daemon was available there. Build/run it once
yourself before depending on it in production.)

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run dev:server` | Start the Express API with hot reload |
| `npm run dev:all` | Run both concurrently |
| `npm run build` | Type-check and build the frontend for production |
| `npm run typecheck:server` | Type-check the Express API (`server/`) — not run automatically by `npm run build`, which only covers the frontend |
| `npm start` | Run the production server (API + built frontend) |
| `npm run preview` | Preview the production build (frontend only, no API) |
| `npm run lint` | Run oxlint |

## API

| Route | Description |
| --- | --- |
| `GET /api/products` | All products, or `?category=<id>` to filter |
| `GET /api/products/:id` | A single product |
| `GET /api/categories` | All categories |
| `GET /api/categories/:id` | A single category |
| `POST /api/contact` | Submit a contact enquiry (validated, stored to `server/data/enquiries.json`, emailed to `NOTIFY_EMAIL` if SMTP is configured) |
| `GET /api/enquiries` | List stored enquiries — disabled unless `ADMIN_KEY` is set, and only with header `x-admin-key: <ADMIN_KEY>`. This is a placeholder until a real admin/CMS exists. |

## Data persistence

There is no database server to provision. Two kinds of data live on disk:

- **Product/category catalogue** (`src/data/products.json`, `src/data/categories.json`) —
  committed to git, edited by hand or via a script, deployed with the code.
- **Contact enquiries** (`server/data/enquiries.json`) — written at runtime by
  `POST /api/contact`, gitignored on purpose (it can contain real customer data). On most
  hosts (Railway, Render, a container) the filesystem is **ephemeral** — this file is
  wiped on every redeploy/restart. That's acceptable as long as `SMTP_*` is configured
  (the real record of an enquiry becomes the email), but if you need enquiries to survive
  restarts reliably, swap `server/data/enquiries.ts` for a real database.

## WhatsApp order flow

Order messages are sent to a WhatsApp number hardcoded in
`src/components/CartDrawer.tsx` (`ORDER_WHATSAPP_NUMBER`), currently RIM's primary
number. Update that constant if the receiving number ever changes.

## Project structure

```
src/
  components/       Reusable UI: Navbar, Footer, Hero, ProductCard, ProductGrid,
                     CategoryCard, CTASection, ContactForm, SectionHeader, ProductModal,
                     CartDrawer, Seo
  context/          CartContext.tsx (provider), cart-store.ts (context/types/storage),
                     useCart.ts (hook) — order/cart state, persisted to localStorage
  lib/              format.ts (formatPrice — MT currency formatting)
  data/             products.ts (typed accessors) + products.json / categories.json
  pages/            Home, About, Products, Solutions, Contact, NotFound
  types/            Shared Product / Category / ContactEnquiry types
server/
  routes/           products, categories, contact, enquiries
  data/             store.ts (reads the shared JSON data), enquiries.ts (file-backed store)
  lib/              mailer.ts (SMTP enquiry notifications)
public/
  assets/products/  Product photography sourced from the catalogue
  robots.txt, sitemap.xml, og-image.jpg, logo-rim.png
```

## GitHub

- Repository: `vickymulambo01-collab/Repositorio-1`
- Branch: `claude/rim-trading-corporate-site-509ooj` (this is the branch with the current,
  complete, working project — merge it into your default branch, or point your host's
  deploy at it directly)

## Notes for whoever continues this project

- `src/components/Seo.tsx` hardcodes a placeholder domain (`https://www.rimtrading.com`)
  for canonical/OG URLs, and `public/robots.txt` / `public/sitemap.xml` reference the same
  placeholder — update all three once the real production domain is chosen.
- Prices (`src/data/products.json`, `price` field, in MT) come from the client's
  pricelist. One product (`papel-higienico-so-soft`) has no listed price and intentionally
  has no `price` field — it shows "Price on request" instead of an order button. Don't
  invent a price for it; add the real one if/when it's provided.
- The `/api/enquiries` endpoint is intentionally minimal (shared-secret gated, no user
  accounts); replace it with real authentication before exposing an admin area publicly.
- Email notifications use plain SMTP via `nodemailer`. They degrade gracefully (enquiries
  are still saved even if SMTP isn't configured or fails) but have not been verified
  against a real mailbox — test with real `SMTP_*` credentials before relying on them.
- No automated tests exist yet.
