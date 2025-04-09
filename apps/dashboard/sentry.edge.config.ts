// This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://fa21580ca2e9fc5dac4c70eb571f69f4@o4506540560613376.ingest.us.sentry.io/4509123143532544",

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
