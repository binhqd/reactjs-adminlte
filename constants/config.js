const env = process.env || {}; // eslint-disable-line no-process-env

[
  'NODE_ENV',
  'APP_PORT',
  'API_URL'
].forEach((name) => {
  if (!env[name]) {
    console.log(`Environment variable ${name} is missing, use default instead.`);
  }
});

const config = {
  ENV: env.NODE_ENV || 'development',
  staticURL: env.STATIC_URL || 'http://localhost:3000',
  API_URL: env.API_URL || 'http://localhost:3000/api/',
  PORT: Number(env.APP_PORT || 9002)
};

module.exports = config;
