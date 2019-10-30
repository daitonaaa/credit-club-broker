export const sentryConfig = {
  release: process.env.APP_VERSION,
  environment: process.env.BUILD_MODE,
  debug: process.env.BUILD_MODE === 'development',
  dsn: "https://0acfbd3a316841c3b08631802de9f996@sentry.io/1519979",

  beforeSend(event) {
    if (event.environment === 'localhost') {
      return null;
    }

    return event;
  }
};
