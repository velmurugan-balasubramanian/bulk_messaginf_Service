require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express();
const PORT = process.env.PORT || 3000
var bp = require('body-parser')

// Routes
const reminderRoute = require('./routes/reminder');


app.use(morgan('dev'))
app.use(bp.json());
app.use(bp.urlencoded({
    extended: true
}));

app.get('/', async (req, res) => {
    res.json({ 'message': 'Succes' }).status(200)

})

app.use('/incoming', reminderRoute);




app.post('/test', async (req, res) => {
    console.log('REQ', req);
    res.json({ 'message': 'Succes' }).status(200)
})

// app.use('/reminder', reminderRoute);

app.listen(PORT, () => {
    console.log(`SERVER LISTENING ON ${PORT}`);
})



