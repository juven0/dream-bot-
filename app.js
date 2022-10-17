


'use strict';

// Use dotenv to read .env vars into Node
require('dotenv').config();
const { GOOGLE_IMG_SCRAP, GOOGLE_QUERY } = require('google-img-scrap');
const utils = require('./fonction/utils')
const message = require('./routs/message')

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

      message.messageRouters(senderPsid, webhookEvent)
      // if (webhookEvent.message) {
      //   message.messageRouters(senderPsid, webhookEvent)
      //   //handleMessage(senderPsid, webhookEvent.message);
      // } else if (webhookEvent.postback) {
      //   handlePostback(senderPsid, webhookEvent.postback);
      // }
    });

    res.status(200).send('EVENT_RECEIVED');
  } else {

    res.sendStatus(404);
  }
});

// Handles messages events
function handleMessage(senderPsid, receivedMessage) {
  let response;
  let ur;

  if (receivedMessage.text) {
    
   (async function () {
     await GOOGLE_IMG_SCRAP({
        search: "e-girl goth",
        query: {
            SIZE: GOOGLE_QUERY.SIZE.LARGE,
        },
       
        // excludeDomains: ["istockphoto.com", "alamy.com"]
    });

      // for (const key in test.result) {
      //     console.log(test.result[key].url)
      // }
      // for(let i = 0; i<20; i++){
      //     console.log(test.result[1].url)
      // }

  
       
    });

   
   
    response = {
      'text': 'mankasitra 🥺 '
    }
   
    
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

 utils.callSendAPI(senderPsid, response);
}

function handlePostback(senderPsid, receivedPostback) {
  let response;


  let payload = receivedPostback.payload;

  
  if (payload === 'yes') {
    response = { 'text': 'Thanks!' };
  } else if (payload === 'no') {
    response = { 'text': 'Oops, try sending another image.' };
  }
 
 utils.callSendAPI(senderPsid, response);
}


var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});


const imagedata = async () => {
  let test = await GOOGLE_IMG_SCRAP({
    search: 'nipple piercing',
    query: {
      SIZE: GOOGLE_QUERY.SIZE.LARGE,
    },
  });

  return test
}
