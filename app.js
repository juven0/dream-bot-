'use strict';

// Use dotenv to read .env vars into Node
require('dotenv').config();
const { GOOGLE_IMG_SCRAP, GOOGLE_QUERY } = require('google-img-scrap');
const utils = require('./fonction/utils')
const message = require('./routs/message')
const path  = require('path')



//connection with data base
//const db = require('./db')
// Imports dependencies and set up http server
const
    request = require('request'),
    express = require('express'),
    { urlencoded, json } = require('body-parser'),

    app = express();
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(express.static('fonction'));


// connection with data base
const mongoose = require('mongoose')

// mongoose
//    .connect(process.env.DB_URL)
//   .then(() => {
//     console.log('connected to mongodb 😎')
//   })
//   .catch(() => {
//     console.log("can't connect to data base  ")
//   })

app.get('/', function(_req, res) {
    res.send('bot messenger by juveno');

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
            let senderPsid = webhookEvent.sender.id;
            console.log('Sender PSID: ' + senderPsid);
            message.messageRouters(senderPsid, webhookEvent)
        });
        res.status(200).send('EVENT_RECEIVED');
    } else {
        res.sendStatus(404);
    }
});



app.get('/image/:name', function(req, res) {
    const imageName = req.params.name
    res.sendFile(__dirname + `/public/images/${imageName}`);
});

var listener = app.listen(process.env.PORT, function() {
    console.log('Your app is listening on port ' + listener.address().port);
});