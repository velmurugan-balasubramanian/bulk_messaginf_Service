// Import cards
const sendInvitationCard = require('../cards/sendInvitation');
const { createConversation } = require('../utils/createConversation')
const { sendCard } = require('../utils/sendCard')

const invitationHandler = async (token, event_type, event, bot_id) => {

    let invitationCard = await sendInvitationCard(bot_id, event_type, event)

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
        await sendCard(token, invitationCard, conversation.id)
    });
}



module.exports = {
    invitationHandler: invitationHandler
}