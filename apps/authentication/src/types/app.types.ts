import type { Database } from '@/db';

type Variables = {
  db: Database;
};

export type AppType = {
  Bindings: CloudflareBindings;
  Variables: Variables;
};
