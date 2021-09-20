const axios = require('axios');
const http = require('http');
require('dotenv').config();
const { google } = require('googleapis');
const destroyer = require('server-destroy');
const open = require('open');
const url = require('url');
const { OAuth2Client } = require('google-auth-library');
const classroom = google.classroom({
  version: 'v1',
  auth: process.env.GOOGLE_KEY,
});

const scopes = [
  'https://www.googleapis.com/auth/classroom.rosters.readonly',
  'https://www.googleapis.com/auth/classroom.courses.readonly',
  'https://www.googleapis.com/auth/classroom.coursework.me',
  'https://www.googleapis.com/auth/userinfo.profile',
  ];

const keys = require('./keys.json');

async function authentication(email){
  const oAuth2Client = await getAuthenticatedClient()
  const url = `https://classroom.googleapis.com/v1/courses?studentId=${email}&courseStates=ACTIVE`
  const res = await oAuth2Client.request({url});
  console.log(res.data);
  const tokenInfo = await oAuth2Client.getTokenInfo(
    oAuth2Client.credentials.access_token
  );
}

function getAuthenticatedClient(){
  return new Promise((resolve, reject) => {
    const oAuth2Client = new google.auth.OAuth2(
      keys.web.client_id,
      keys.web.client_secret,
      keys.web.redirect_uris[2]
    );
    const authURL = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
    });
    const server = http
      .createServer(async (req, res) => {
        try{
          const qs = new url.URL(req.url, 'http://localhost:3002').searchParams;
          const code = qs.get('code');
          console.log(`Code is ${code}`);
          res.end('End.');
          server.destroy();
          const r = await oAuth2Client.getToken(code);
          oAuth2Client.setCredentials(r.tokens);
          //console.info('Tokens acquired.');
          resolve(oAuth2Client);
        } catch (err) {
          reject(err);
        }
      })
      .listen(3002, () => {
        open(authURL);
      });
    destroyer(server);
  });
};

function authenticate(response){
  return({
    data:{
      type: 4,
      data: {
        content: response,
      }
    }
  });
}

module.exports = {
  authenticate,
  authentication,
};