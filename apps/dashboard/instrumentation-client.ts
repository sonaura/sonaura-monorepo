// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';
import { env } from '@/env';

Sentry.init({
  dsn: 'https://fa21580ca2e9fc5dac4c70eb571f69f4@o4506540560613376.ingest.us.sentry.io/4509123143532544',

  // Add optional integrations for additional features
  integrations: [Sentry.replayIntegration()],

  // Define how likely Replay events are sampled.
  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 0.1,

  // Define how likely Replay events are sampled when an error occurs.
  replaysOnErrorSampleRate: 1.0,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
  enabled: !env.isDev,
});
