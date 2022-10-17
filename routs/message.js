
const utils = require('../fonction/utils')
module.exports.messageRouters = (senderPsid, webhookEvent)=>{

    if (webhookEvent.message){
        handleMessage(senderPsid, webhookEvent.message)
    }
}

function handleMessage(senderPsid, receivedMessage) {
    let response;
    let ur;

    if (receivedMessage.text) {

        // (async function () {
        //     await GOOGLE_IMG_SCRAP({
        //         search: "e-girl goth",
        //         query: {
        //             SIZE: GOOGLE_QUERY.SIZE.LARGE,
        //         },

                // excludeDomains: ["istockphoto.com", "alamy.com"]
          //  });

            // for (const key in test.result) {
            //     console.log(test.result[key].url)
            // }
            // for(let i = 0; i<20; i++){
            //     console.log(test.result[1].url)
            // }



        //});



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