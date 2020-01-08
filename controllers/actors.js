const { update, findOne, find } = require('../helpers/promisified_neDB');
const moment = require('moment');


var getAllActors = async () => {
	try {
		//Retrieve all events first of all
		const events = await find();

		//get statistics of number of events each actor has
		const actorsNumberOfEventStat = {}
		events.forEach(event => {
			if (!actorsNumberOfEventStat[event.actor.id]) {
				actorsNumberOfEventStat[event.actor.id] = { counter: 1, createdAt: event.created_at, login: event.actor.login, avatarUrl: event.actor.avatar_url };
			} else {
				++actorsNumberOfEventStat[event.actor.id].counter;

				//Update the created_at date to the latest date.
				const dateIsAfter = moment(actorsNumberOfEventStat[event.actor.id].createdAt).isAfter(moment(event.created_at));

				actorsNumberOfEventStat[event.actor.id].createdAt = dateIsAfter ? actorsNumberOfEventStat[event.actor.id].createdAt : event.created_at;
			}
		});

		//next will be to try and order them in descending order
		const objectKeys = Object.keys(actorsNumberOfEventStat);

		const sortedArrayOfObjects = objectKeys.map(key => {
			return { key, ...actorsNumberOfEventStat[key] }
		}).sort((first, second) => {
			if (second.counter - first.counter >= 0) {
				if (second.counter - first.counter > 0) {
					//sort in descending order
					return 1;
				} else {
					// they must be equal
					/**then order them by the timestamp of the latest event in the descending order */
					const firstDate = new Date(first.createdAt);
					const secondDate = new Date(second.createdAt);
					if (secondDate.getTime() >= firstDate.getTime()) {
						if (secondDate.getTime() > firstDate.getTime()) {
							//sort in descending order
							return 1;
						}
						else {
							// they must be equal
							/** order them by the alphabetical order of login. */
							var firstLogin = first.login.toUpperCase(); // ignore upper and lowercase
							var secondLogin = second.login.toUpperCase(); // ignore upper and lowercase
							if (secondLogin > firstLogin) {
								return 1;
							}
							if (secondLogin < firstLogin) {
								return -1;
							}
							return 0;//they must be equal.

						}

					}
				}

			}
		});
		console.log("sortedArrayOfObjects", sortedArrayOfObjects);

		return { status: true, data: sortedArrayOfObjects.map(data => { return { id: data.key, login: data.login, avatar_url: data.avatarUrl } }) };
	} catch (error) {
		console.log(error);
	}

};

var updateActor = async (id, avatar_url) => {
	try {
		//check if this actor exists
		const foundActor = await findOne({ 'actor.id': id });
		if (!foundActor) {
			return { status: false };
		}
		//Update the actor's avatar url now
		foundActor.actor.avatar_url = avatar_url;
		const updatedStatus = await update({ 'actor.id': id }, foundActor);
		return { status: updatedStatus };
	} catch (error) {
		console.log(error);

	}
};

var getStreak = () => {

};


module.exports = {
	updateActor: updateActor,
	getAllActors: getAllActors,
	getStreak: getStreak
};

















