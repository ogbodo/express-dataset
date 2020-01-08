const { insert, find, findOne, eraseAll } = require('../helpers/promisified_neDB')

var getAllEvents = async () => {
	try {
		const allEvents = await find();
		//Sort events in ascending order
		const sortedInAscendingOrder = allEvents.sort((firstEvent, secondEvent) => firstEvent.id - secondEvent.id);
		return { status: true, data: sortedInAscendingOrder };
	} catch (error) {
		console.log(error);
	}
};

var addEvent = async (requestBody) => {
	try {
		//check if this actor exists
		const foundActor = await findOne({ id: requestBody.id });
		if (foundActor) {
			return { status: false };
		}
		await insert(requestBody);
		return { status: true };

	} catch (error) {
		console.log(error);
	}
};


var getByActor = async (actorID) => {
	try {
		//check if this actor exists
		const foundActor = await find({ "actor.id": actorID });
		if (!foundActor) {
			return { status: false };
		}

		const allEventsByActor = await find({ "actor.id": actorID });

		//Sort actor's  events in ascending order by the event ID
		const sortedInAscendingOrder = allEventsByActor
			.filter(event => event.actor.id == actorID)
			.sort((firstEvent, secondEvent) => firstEvent.id - secondEvent.id);
		return { data: sortedInAscendingOrder };
	} catch (error) {
		console.log(error);
	}
};


var eraseEvents = async () => {
	const deletedStatus = await eraseAll()
	return deletedStatus;
};

module.exports = {
	getAllEvents: getAllEvents,
	addEvent: addEvent,
	getByActor: getByActor,
	eraseEvents: eraseEvents
};

















