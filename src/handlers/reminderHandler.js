
const { sendMessage } = require('../utils/sendMessage');
const { createConversation } = require('../utils/createConversation')

const reminderHandler = async (token, attendees, bot_id) => {
    attendees.forEach(async (member) => {
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
        await sendMessage(token, "Bulk message here", conversation.id)
    });
}


module.exports = {
    reminderHandler: reminderHandler
}