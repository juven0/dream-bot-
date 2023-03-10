
const utils = require('../fonction/utils');
const { GOOGLE_IMG_SCRAP, GOOGLE_QUERY } = require('google-img-scrap');
module.exports.messageRouters = (senderPsid, webhookEvent)=>{

    if (webhookEvent.message){
        handleMessage(senderPsid, webhookEvent.message)
    }
}

async function handleMessage(senderPsid, receivedMessage) {
    let response;
    let ur;

    if (receivedMessage.text) {
        response = {
            'text': 'attente de resultat ...'
        }
        utils.callSendAPI(senderPsid, response);
            let test = await GOOGLE_IMG_SCRAP({
                search: receivedMessage.text,
                query: {
                    SIZE: GOOGLE_QUERY.SIZE.LARGE,
                },

                excludeDomains: ["istockphoto.com", "alamy.com"]
           });

        if (test){
            response = {
                'attachment': {
                    'type': 'template',
                    'payload': {
                        'template_type': 'generic',
                        'elements': [{
                            'title': 'Is this the right picture?',
                            'image_url': test.result[0].url,
                            'buttons': [
                                {
                                    'type': 'postback',
                                    'title': 'voir l\'image',
                                    'payload': test.result[0].url,
                                    
                                }
                            ],
                        },
                        {
                            'title': 'Is this the right picture?',
                            'image_url': test.result[2].url,
                            'buttons': [
                                {
                                    'type': 'postback',
                                    'title': 'voir l\'image',
                                    'payload':test.result[3].url
                                   
                                },
                            ],
                        },
                        {
                            'title': 'Is this the right picture?',
                            'image_url': test.result[4].url,
                            'buttons': [
                                {
                                    'type': 'postback',
                                    'title': 'voir l\'image',
                                    'payload': test.result[4].url
                                },
                                
                            ],
                        },
                        {
                            'title': 'Is this the right picture?',
                            'image_url': test.result[6].url,
                            'buttons': [
                                {
                                    'type': 'postback',
                                    'title': 'voir l\'image ?',
                                    'payload':  test.result[6].url
                                },
                               
                            ],
                        },
                            {
                                'title': 'Is this the right picture?',
                                'image_url': test.result[8].url,
                                'buttons': [
                                    {
                                        'type': 'postback',
                                        'title': 'voir l\'image',
                                        'payload':test.result[8].url
                                    },
                                 
                                ],
                            },
                            {
                                'title': 'Is this the right picture?',
                                'image_url': test.result[10].url,
                                'buttons': [
                                    {
                                        'type': 'postback',
                                        'title': 'voir l\'image',
                                        'payload': test.result[10].url
                                    },
                                    
                                ],
                            },
                            {
                                'title': 'Is this the right picture?',
                                'image_url': test.result[10].url,
                                'buttons': [
                                    {
                                        'type': 'postback',
                                        'title': 'voir l\'image',
                                        'payload': test.result[4].url
                                    },
                                    
                                ],
                            },
                            {
                                'title': 'Is this the right picture?',
                                'image_url': test.result[12].url,
                                'buttons': [
                                    {
                                        'type': 'postback',
                                        'title': 'voir l\'image',
                                        'payload':test.result[12].url
                                    },
                                   
                                ],
                            },
                            {
                                'title': 'Is this the right picture?',
                                'image_url': test.result[14].url,
                                'buttons': [
                                    {
                                        'type': 'postback',
                                        'title': 'voir l\'image',
                                        'payload':test.result[14].url
                                    },
                                   
                                ],
                            },
                        {
                            'title': 'Is this the right picture?',
                            'image_url': test.result[16].url,
                            'buttons': [
                                {
                                    'type': 'postback',
                                    'title': 'voir l\'image',
                                    'payload':  test.result[16].url
                                },
                              
                            ],
                        }
                    ]
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
                        'image_url': test.result[1].url,
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