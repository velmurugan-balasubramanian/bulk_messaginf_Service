
const { sendMessage } = require('../utils/sendMessage');
const { createConversation } = require('../utils/createConversation')

const reminderHandler = async (token, event_name, attending, bot_id) => {
    attending.forEach(async (member) => {
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
        await sendMessage(token, `The ${event_name} is starting Soon`, conversation.id)
    });
}


module.exports = {
    reminderHandler: reminderHandler
}