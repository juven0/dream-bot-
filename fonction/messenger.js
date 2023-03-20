require('dotenv').config();

module.exports.callSendAPI = (senderPsid, response) => {

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

module.exports.messageText = (message)=>{
    return response = {
        'text': `${message}`
      };
}

module.exports.messageAttachments = (titel, attachmentUrl)=>{
    response = {
        'attachment': {
          'type': 'template',
          'payload': {
            'template_type': 'generic',
            'elements': [{
              'title': titel,
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

module.exports.responseRouter = (senderPsid, receivedMessage)=>{
    let response;

    if (receivedMessage.text){

    }else if (receivedMessage.attachment){

    }else if (receivedMessage.payload){

    }

    this.callSendAPI(senderPsid, response);
}