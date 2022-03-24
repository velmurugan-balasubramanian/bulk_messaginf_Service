

const { sendMessage } = require('../utils/sendMessage');
const { createConversation } = require('../utils/createConversation')

const fomoHandler = async (token, event, bot_id) => {
    console.log(event);
    let attending =  ['1234', '34567'];
    let not_attending = ['307480004', '310643004'];

    if (not_attending) {
        not_attending.forEach(async (member) => {
            let conversation = await createConversation(token,
                {
                    members: [
                        {
                            id: member
                        },
                        {
                            id: bot_id
                        }
                    ]
                }
            )
            await sendMessage(token, `Hey, ${attending.length || 0} people from your team are attending the ${event.event_name} RSVP soon to let the organiser know you are in :beer:`, conversation.id)
        });
    }
}


module.exports = {
    fomoHandler: fomoHandler
}