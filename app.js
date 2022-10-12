


'use strict';

// Use dotenv to read .env vars into Node
require('dotenv').config();

// Imports dependencies and set up http server
const
  request = require('request'),
  express = require('express'),
  { urlencoded, json } = require('body-parser'),
  app = express();
app.use(urlencoded({ extended: true }));
app.use(json());

app.get('/', function (_req, res) {
  res.send('bot messenger by juveno');
  console.log('ao izi ')
});

app.get('/webhook', (req, res) => {
  console.log('ao izi ')
  const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];

  if (mode && token) {

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);

    } else {
      res.sendStatus(403);
    }
  }
});

app.post('/webhook', (req, res) => {
  let body = req.body;

  if (body.object === 'page') {

    body.entry.forEach(function(entry) {

      let webhookEvent = entry.messaging[0];
      console.log(webhookEvent);

      let senderPsid = webhookEvent.sender.id;
      console.log('Sender PSID: ' + senderPsid);

      if (webhookEvent.message) {
        handleMessage(senderPsid, webhookEvent.message);
      } else if (webhookEvent.postback) {
        handlePostback(senderPsid, webhookEvent.postback);
      }
    });

    res.status(200).send('EVENT_RECEIVED');
  } else {

    res.sendStatus(404);
  }
});

// Handles messages events
function handleMessage(senderPsid, receivedMessage) {
  let response;

  if (receivedMessage.text) {
   
    response = {
      'text': `by juveno bot : '${receivedMessage.text}'. Now send me an attachment!`
    };
  } else if (receivedMessage.attachments) {

    let attachmentUrl = receivedMessage.attachments[0].payload.url;
    response = {
      'attachment': {
        'type': 'template',
        'payload': {
          'template_type': 'generic',
          'elements': [{
            'title': 'Is this the right picture?',
            'subtitle': 'Tap a button to answer.',
            'image_url': attachmentUrl,
            'buttons': [
              {
                'type': 'postback',
                'title': 'Yes!',
                'payload': 'yes',
              },
              {
                'type': 'postback',
                'title': 'No!',
                'payload': 'no',
              }
            ],
          }]
        }
      }
    };
  }

  callSendAPI(senderPsid, response);
}

function handlePostback(senderPsid, receivedPostback) {
  let response;


  let payload = receivedPostback.payload;

  
  if (payload === 'yes') {
    response = { 'text': 'Thanks!' };
  } else if (payload === 'no') {
    response = { 'text': 'Oops, try sending another image.' };
  }
 
  callSendAPI(senderPsid, response);
}

function callSendAPI(senderPsid, response) {

  const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

  let requestBody = {
    'recipient': {
      'id': senderPsid
    },
    'message': response
  };

  request({
    'uri': 'https://graph.facebook.com/v2.6/me/messages',
    'qs': { 'access_token': PAGE_ACCESS_TOKEN },
    'method': 'POST',
    'json': requestBody
  }, (err, _res, _body) => {
    if (!err) {
      console.log('Message sent!');
    } else {
      console.error('Unable to send message:' + err);
    }
  });
}


var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
