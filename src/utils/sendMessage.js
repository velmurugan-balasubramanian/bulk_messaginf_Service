
const platform = require('./platform')

const sendMessage = async (token, msg, group) => {

    try {
        await platform.auth().setData(token);
        await platform.post('/restapi/v1.0/glip/chats/' + group + '/posts', {
            "text": msg
        })

    } catch (error) {
        console.error('Unable to Send message to the group');
        console.log(error)
    }
}

module.exports = {
    sendMessage:sendMessage
}