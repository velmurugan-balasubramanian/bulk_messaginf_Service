const router = require('express').Router()

const { getEvent, findTokenFromDB } = require('../utils/db')

// Import Handlers
const { invitationHandler } = require('../handlers/invitationHandler');
const { fomoHandler } = require('../handlers/fomoReminderHandler');
const { reminderHandler } = require('../handlers/reminderHandler');
const { checkinHandler } = require('../handlers/checkinHandler');

/**
 * Authorize
 */
router.get('/schedule', async (req, res) => {

    try {
        let event = await getEvent(req.query.event_id)
        let event_type = req.query.event_type
        let result = await findTokenFromDB(req.query.bot_id)
        let token = result.rows[0]
        let bot_id = req.query.bot_id

        if (req.query.schedule_type === 'invitation') {
            console.info(`Handling invitation schedule`);
            await invitationHandler(token, event_type, event, bot_id)
        }
        if (req.query.schedule_type === 'fomo_reminder') {
            console.info(`Handling fomo_reminder schedule`);
            await fomoHandler(token, event, bot_id)
        }
        if (req.query.schedule_type === 'reminder') {
            console.info(`Handling reminder schedule`);
            await reminderHandler(token, event.event_name, event.attending, bot_id)
        }

        if (req.query.schedule_type === 'checkin') {
            console.info(`Handling Checkin schedule`);
            await checkinHandler(token, event_type, event, bot_id)
        }
        res.json({ 'message': 'Succes' }).status(200)
    } catch (error) {
        console.error('Unable to handle Scheduler');
        console.error(error);
        res.json({ 'message': 'Succes' }).status(500)

    }
})


module.exports = router;