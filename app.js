'use strict';

require('dotenv').config();
//const messengere = require('./fonction/messenger')
//const bodyParser = require('body-parser');
const express = require('express')

const
  request = require('request'),

  { urlencoded, json } = require('body-parser'),
  app = express();

app.use(urlencoded({ extended: true }));

app.use(json());

app.get('/', function (_req, res) {
  res.send('Hello World');
});

app.get('/webhook', (req, res) => {

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

function handleMessage(senderPsid, receivedMessage) {
  let response;

  if (receivedMessage.text) {
    response = {
      'text': `You sent the message: '${receivedMessage.text}'. Now send me an attachment!`
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
      console.log('Message envoyer!');
    } else {
      console.error('Unable to send message:' + err);
    }
  });
}

var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

// const bodyParser = require('body-parser');
// const express = require('express');
// const webhook = require('./fuction/webhook');
// require('dotenv').config();



// const app = express().use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

// app.get('/', function (_req, res) {
//    res.send('<h1> voicie mon bot messengere pour faire du recherche sur internet <h1>');
// });

// app.get('/webhook', (req, res) => {

//    let VERIFY_TOKEN = procesS.env.VERIFY_TOKEN
     
//    let mode = req.query['hub.mode'];
//    let token = req.query['hub.verify_token'];
//    let challenge = req.query['hub.challenge'];
     
//    if (mode && token) {
   
//      if (mode === 'subscribe' && token === VERIFY_TOKEN) {
       
//        console.log('OMG MY WEBHOOK IS VERIFIED');
//        res.status(200).send(challenge);
//      } else {
//        res.sendStatus(403);      
//      }
//    }
//  });


// app.post("/webhook" ,(req ,res)=>{

//    let body = req.body;
//    let sender_psid;

//    if(body.object === "page"){
//       body.entry.forEach(function(entry) {
//          let webhook_event = entry.messaging[0];
//          let sender_psid = webhook_event.sender.id;
//          console.log(sender_psid);
//       });
   
//       if(webhook_event.message){
//          webhook.handleMessage(sender_psid ,webhook_event.message);
//       }
//       else if(webhook_event.postback){
//          webhook.handlePostback(sender_psid , webhook_event.postback);
//       }
//       res.status(200).send('EVENT_RECEIVED'); 
//       console.log(webhook_event);   
//    }
// })

// var listener = app.listen(5000, function() {
//    console.log('le bot est en ecoute sur le port ' + listener.address().port);
//  });