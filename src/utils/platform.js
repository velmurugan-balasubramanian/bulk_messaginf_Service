const rc = require('ringcentral');
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const RINGCENTRAL_ENV = process.env.RINGCENTRAL_ENV;



rcsdk = new rc({
    server: RINGCENTRAL_ENV,
    appKey: CLIENT_ID,
    appSecret: CLIENT_SECRET
});

platform =  rcsdk.platform();

module.exports = platform;