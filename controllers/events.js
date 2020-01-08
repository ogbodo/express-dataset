var Datastore = require('nedb-promise');
const { FOUND_DUPLICATE } = require('../utils/constants');
var eventsDB = new Datastore();

var getAllEvents = async () => {
	try {
		const allEvents = await eventsDB.find({});
		//Sort events in ascending order
		const sortedInAscendingOrder = allEvents.sort((firstEvent, secondEvent) => firstEvent.id - secondEvent.id);

		return { status: true, data: sortedInAscendingOrder }
	} catch (error) {
		console.log(error);
		return { status: false, code: 500, message: error };
	}
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

















