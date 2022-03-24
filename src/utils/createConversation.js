const platform = require('../utils/platform')

const createConversation = async (token, members) => {
    console.log('token', token);
    try {
        await platform.auth().setData(token);
        let response = await platform.post(`/restapi/v1.0/glip/conversations`, members)
        return response.json()

    } catch (error) {

        console.error(`Unable to create a conversation`);
        console.error(error);

    }

}



module.exports = {
    createConversation:createConversation
}