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
  staticURL: 'https://api-vitrade.pavoexpo.vn/api/',
  API_URL: 'http://localhost:3000/api/',
  PORT: Number(env.APP_PORT || 3001),
  UploadImageURL: env.UploadImageURL || 'https://img.danangtrade.com.vn',
};

module.exports = config;
