
const utils = require('../fonction/utils');
const downloader = require('../fonction/downloader')
const { GOOGLE_IMG_SCRAP, GOOGLE_QUERY } = require('google-img-scrap');
module.exports.messageRouters = (senderPsid, webhookEvent)=>{

    if (webhookEvent.message){
        handleMessage(senderPsid, webhookEvent.message)
    }
    if (webhookEvent.postback) {
        messagePostBack(senderPsid, webhookEvent.postback);
    }

}

async function handleMessage(senderPsid, receivedMessage) {
    let response;
    let elements = []

    if (receivedMessage.text) {
        response = {
            'text': '...'
        }
        utils.callSendAPI(senderPsid, response);
            let googleResult = await GOOGLE_IMG_SCRAP({
                search: receivedMessage.text,
                query: {
                    SIZE: GOOGLE_QUERY.SIZE.LARGE,
                },
                excludeDomains: ["istockphoto.com", "alamy.com"]
           });
        if (googleResult){
            for (let i=0;i<10 ; i++){
                elements = [...elements, {
                    'title': 'Is this the right picture?',
                            'image_url': googleResult.result[i].url,
                            'buttons': [
                                {
                                    'type': 'postback',
                                    'title': 'voir l\'image',
                                    'payload':googleResult.result[i].url,
                                    
                                }
                            ]
                        }]
            }
            response = {
                'attachment': {
                    'type': 'template',
                    'payload': {
                        'template_type': 'generic',
                        'elements': elements
                    }
                }
            };
        } else{
            response = {
                'text': receivedMessage.text
            }
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
const messagePostBack= (senderPsid, receivedPostback) =>{
    let response;
    let payload = receivedPostback.payload;

    //let urlImage = downloader.downloader(payload)
    response =  {"attachment":{
        "type":"image", 
        "payload":{
          "url":`https://dream-bot.onrender.com/image/`,
          "is_reusable": true
        }
      }}


    if (payload === 'yes') {
        response = { 'text': 'Thanks!' };
    } else if (payload === 'no') {
        response = { 'text': 'Oops, try sending another image.' };
    }
    utils.callSendAPI(senderPsid, response);
}