require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express();
const PORT = process.env.PORT || 3000
var bp = require('body-parser')
const { getEvent, findTokenFromDB } = require('./utils/db')

// Import Handlers
const { invitationHandler } = require('./handlers/invitationHandler');
const { fomoHandler } = require('./handlers/fomoReminderHandler');
const { reminderHandler } = require('./handlers/reminderHandler');
const { checkinHandler } = require('./handlers/checkinHandler');

// Routes
// const reminderRoute = require('./routes/reminder');


app.use(morgan('dev'))
app.use(bp.json());
app.use(bp.urlencoded({
    extended: true
}));

app.get('/', async (req, res) => {
    res.json({ 'message': 'Succes' }).status(200)

})

app.get('/test', async (req, res) => {
    let event = await getEvent(req.query.event_id)
    console.log('event', event);
    let event_type = req.query.event_type
    let result = await findTokenFromDB(req.query.bot_id)
    console.log('REslt', result);
    let token = result.rows[0]
    let bot_id = req.query.bot_id

    if (req.query.schedule_type === 'invitation') {

        await invitationHandler(token, event_type, event, bot_id)
    }
    if (req.query.schedule_type === 'fomo_reminder') {
        await fomoHandler(token, event, bot_id)
    }
    if (req.query.schedule_type === 'reminder') {
        await reminderHandler(token, event.attendees, bot_id)
    }

    if (req.query.schedule_type === 'checkin') {
        console.log('Checkin');
        await checkinHandler(token, event_type, event, bot_id)
    }

    res.json({ 'message': 'Succes' }).status(200)
})

app.post('/test', async (req, res) => {
    console.log('REQ', req);
    res.json({ 'message': 'Succes' }).status(200)
})

// app.use('/reminder', reminderRoute);

app.listen(PORT, () => {
    console.log(`SERVER LISTENING ON ${PORT}`);
})



