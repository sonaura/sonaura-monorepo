// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';
import { env } from '@/env';

Sentry.init({
  dsn: 'https://fa21580ca2e9fc5dac4c70eb571f69f4@o4506540560613376.ingest.us.sentry.io/4509123143532544',

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
  enabled: !env.isDev,
});
