const { createConversation } = require('../utils/createConversation')
const { sendCard } = require('../utils/sendCard')
const checkinCard = require('../cards/checkinCard')

const checkinHandler = async (token, event_type, event, bot_id) => {

    let card = await checkinCard(bot_id, event_type, event)
    event.attendees.forEach(async (member) => {
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
        await sendCard(token, card, conversation.id)
    });

}


module.exports = {
    checkinHandler: checkinHandler
}