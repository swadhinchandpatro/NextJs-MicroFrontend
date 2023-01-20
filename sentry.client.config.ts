import * as Sentry from "@sentry/nextjs";
import config from "./config";

Sentry.init({
    dsn: config.SENTRY_DSN,
  
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
