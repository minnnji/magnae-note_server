const express = require('express');
const { IamTokenManager } = require('ibm-watson/auth');
const sppechToText = express.Router();

if (!process.env.SPEECH_TO_TEXT_APIKEY) {
  console.error('Need ibm-watson API key');
  process.exit(1);
}

const sttAuthenticator = new IamTokenManager({
  apikey: process.env.SPEECH_TO_TEXT_APIKEY
});

sppechToText.get('/token', function(req, res) {
  return sttAuthenticator
    .requestToken()
    .then(({ result }) => {
      res.json({ accessToken: result.access_token, url: process.env.SPEECH_TO_TEXT_URL });
    })
    .catch(console.error);
});

module.exports = sppechToText;
