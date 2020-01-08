var Datastore = require('nedb-promise');
const { FOUND_DUPLICATE } = require('../utils/constants');
var eventsDB = new Datastore();

var getAllEvents = () => {

};

var addEvent = async (requestBody) => {
	try {
		//check if this event exists before now
		const foundEvent = await eventsDB.findOne({ id: requestBody.id });
		if (foundEvent) {
			return { status: false, message: FOUND_DUPLICATE }
		}
		//Add the new event object
		await eventsDB.insert(requestBody);
		return { status: true };

	} catch (error) {
		console.log(error);
		return { status: false, code: 500, message: error };

	}
};


var getByActor = () => {

};


var eraseEvents = () => {

};

module.exports = {
	getAllEvents: getAllEvents,
	addEvent: addEvent,
	getByActor: getByActor,
	eraseEvents: eraseEvents
};

















