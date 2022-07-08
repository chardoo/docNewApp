module.exports = {
  apps: [
    {
      name: 'api',
      script: './dist/index.js',
      autorestart: true,
      instances: 'max',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'worker',
      script: './dist/workers.js',
      autorestart: true,
      instances: '2',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
