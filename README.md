# Sonaura

The website is accessible at [sonaura.fr](https://sonaura.fr).

It is showing new and pre-owned products for a Bang & Olufsen retailer in France.

## TL;DR
- Using Next.js App Router with React Server Components and server actions
- Currently operating a transition to Cloudflare (Workers, R2) and Neon DB, and dropping Supabase and Vercel.
- Dropping Material UI to use shadcn/ui and Tailwind.

## `/apps`
- authentication (`@openauthjs`): self-hosted authentication
  - hosted on Cloudflare Workers
- website (`Next.js`): main website using
  - using `tailwindcss`
  - hosted on Vercel (migrating to Cloudflare Workers)
- dashboard (`Next.js`): to update website information like shops, categories, products and variants
  - using `@mui` and migrating to `tailwindcss` 
  - hosted on Vercel (migrating to Cloudflare Workers)

## `/packages`
- auth (`@openauthjs`): authentication helper to share between apps
- database: 
  - currently Supabase + `@supabase/supabase-js`
  - migrating to `drizzle` + `@neondatabase`
- eslint-config: base config to be shared across all apps and packages
- transactional: using `react-email` to create and preview emails
- typescript-config: base config to be shared across all apps and packages
- ui: Design System primitives based on `shadcn/ui` components and using `tailwindcss`