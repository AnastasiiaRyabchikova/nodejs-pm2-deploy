require('dotenv').config();

const {
  DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, DEPLOY_REF = 'origin/master',
} = process.env;

module.exports = {
  apps: [{
    name: 'nodejs-pm2-deploy-backend',
    script: './dist/app.js',
  }],
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: 'https://github.com/AnastasiiaRyabchikova/nodejs-pm2-deploy',
      path: `${DEPLOY_PATH}/backend`,
      'pre-deploy-local': `scp ./.env ${process.env.DEPLOY_USER}@${process.env.DEPLOY_HOST}:${process.env.DEPLOY_PATH}/backend/shared/.env`,
      'post-deploy': 'npm i && npm run build',
      ssh_options: [
        'StrictHostKeyChecking=no',
      ],
    },
  },
};
