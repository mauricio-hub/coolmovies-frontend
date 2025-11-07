/** @type {import('next').NextConfig} */
module.exports = {
  compiler: {
    emotion: true,
  },
  async rewrites() {
    return [
      {
        source: '/graphql',
        destination: process.env.CODEGEN_SCHEMA_PATH || 'http://localhost:5001/graphql',
      },
    ];
  },
  reactStrictMode: true,
};
