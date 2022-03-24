
const platform = require('../utils/platform')

const sendCard = async (token, card, group) => {
    try {
        console.log("Posting card to group: " + group);
        await platform.auth().setData(token);
        let data = await platform.post('/restapi/v1.0/glip/chats/' + group + '/adaptive-cards', card);
        return data
    } catch (error) {
        console.error('Unbale to send card');
        console.error(error);
        return error
    }

}

module.exports = {
    sendCard:sendCard
}