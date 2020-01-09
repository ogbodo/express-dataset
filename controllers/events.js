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
		await insert({ ...requestBody });
		return { status: true };

	} catch (error) {
		console.log(error);
	}
};


var getByActor = async (id) => {
	const actorId = Number.parseInt(id);
	try {
		//check if this actor exists
		const foundActor = await findOne({ 'actor.id': actorId });
		if (!foundActor) {
			return { status: false };
		}

		const allEventsByActor = await find({ "actor.id": actorId });

		//Sort actor's  events in ascending order by the event ID
		const sortedInAscendingOrder = allEventsByActor
			.sort((firstEvent, secondEvent) => firstEvent.id - secondEvent.id);

		return { data: sortedInAscendingOrder, status: true };
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

















