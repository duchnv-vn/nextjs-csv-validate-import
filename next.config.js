/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    APP_BASE_URL: process.env.APP_BASE_URL,
  },
  distDir: 'build',
};

module.exports = nextConfig;
