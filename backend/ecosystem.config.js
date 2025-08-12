require('dotenv').config({ path: '.env.deploy' });

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
      path: DEPLOY_PATH,
      'pre-deploy-local': `bash ./scripts/deployEnv.sh ${process.env.DEPLOY_USER}@${process.env.DEPLOY_HOST} ${process.env.DEPLOY_PATH}`,
      'post-deploy': 'cd backend && npm ci && npm run build && pm2 startOnRestart ecosystem.config.js --env production',
    },
  },
};
