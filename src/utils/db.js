const db = require('../db')



/**
 * 
 * @param {*} event_id 
 * @returns 
 */
const getEvent = async (event_id) => {
    try {
        const dbQuery = "SELECT * from events where event_id = $1"
        const dbValubes = [event_id]
        const dbResults = await db.query(dbQuery, dbValubes);
        return dbResults.rows[0];
    } catch (error) {
        console.error('Unable to Get Event');
        console.error(error);
    }

}

/**
 * 
 * @param {*} event 
 * @returns 
 */
const updateEvent = async (event) => {

    // console.log('Update event', event);
    try {
        const dbQuery = "UPDATE events SET event_name = $1, event_date = $2, event_start_time = $3, event_end_time = $4 where event_id = $5 returning *"
        const dbValubes = [event.event_name, event.event_date, event.event_start_time, event.event_end_time, event.event_id]
        const dbResults = await db.query(dbQuery, dbValubes);
        return dbResults;
    } catch (error) {
        console.error(error);
    }

}

const findTokenFromDB = async (bot_id) => {
    try {
        const dbQuery = "SELECT * FROM tokens where bot_id = $1"
        const dbValues = [bot_id];
        const dbResults = await db.query(dbQuery, dbValues);
        return dbResults
    } catch (error) {
        console.error('unable to find token');
        console.error(error);
    }
}

module.exports = {
    getEvent: getEvent,
    updateEvent: updateEvent,
    findTokenFromDB:findTokenFromDB
}


