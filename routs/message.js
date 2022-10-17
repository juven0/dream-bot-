
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
                            'subtitle': 'Tap a button to answer.',
                            'image_url': test.result[0].url,
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
                        },
                        {
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
                        },
                        {
                            'title': 'Is this the right picture?',
                            'subtitle': 'Tap a button to answer.',
                            'image_url': test.result[2].url,
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
                        },
                        {
                            'title': 'Is this the right picture?',
                            'subtitle': 'Tap a button to answer.',
                            'image_url': test.result[3].url,
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
                        },
                            {
                                'title': 'Is this the right picture?',
                                'subtitle': 'Tap a button to answer.',
                                'image_url': test.result[4].url,
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
                            },
                            {
                                'title': 'Is this the right picture?',
                                'subtitle': 'Tap a button to answer.',
                                'image_url': test.result[5].url,
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
                            },
                            {
                                'title': 'Is this the right picture?',
                                'subtitle': 'Tap a button to answer.',
                                'image_url': test.result[6].url,
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
                            },
                            {
                                'title': 'Is this the right picture?',
                                'subtitle': 'Tap a button to answer.',
                                'image_url': test.result[7].url,
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
                            },
                            {
                                'title': 'Is this the right picture?',
                                'subtitle': 'Tap a button to answer.',
                                'image_url': test.result[8].url,
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
                            },
                        {
                            'title': 'Is this the right picture?',
                            'subtitle': 'Tap a button to answer.',
                            'image_url': test.result[9].url,
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