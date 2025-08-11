require('dotenv').config();

const {
  DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, DEPLOY_REF = 'origin/master', JWT_SECRET,
} = process.env;

module.exports = {
  apps: [{
    name: 'nodejs-pm2-deploy-backend',
    script: './dist/app.js',
  }],
  env_production: {
    NODE_ENV: 'production',
    JWT_SECRET,
  },
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: 'https://github.com/AnastasiiaRyabchikova/nodejs-pm2-deploy',
      path: DEPLOY_PATH,
      'post-deploy': 'node -v',
      ssh_options: [
        'StrictHostKeyChecking=no',
      ],
    },
  },
};
