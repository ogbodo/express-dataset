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
			if (second.counter - first.counter === 0) {
				return doFurtherSorting(first, second)
			} else {
				return second.counter - first.counter > 0;
			}
		});
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

var getStreak = async () => {
	try {
		//Retrieve all events first of all
		const events = await find();
		//get statistics of number of events each actor has done in consecutive days. 
		const actorsTotalConsecutiveDaysStat = {}
		events.forEach(event => {
			if (!actorsTotalConsecutiveDaysStat[event.actor.id]) {
				actorsTotalConsecutiveDaysStat[event.actor.id] = { pushedDates: [event.created_at], actorData: { ...event.actor } };
			} else {
				actorsTotalConsecutiveDaysStat[event.actor.id].pushedDates.push(event.created_at);
			}
		});
		//next will be to try and order the dates in descending order
		const objectKeys = Object.keys(actorsTotalConsecutiveDaysStat);
		const arrayOfActorObjects = objectKeys.map(key => {
			const actorObject = { key, ...actorsTotalConsecutiveDaysStat[key] };
			const sortedDates = actorObject.pushedDates.sort((a, b) => moment(a).diff(moment(b)) > 0);
			//Determine the consecutive days actors pushed events from the sorted dates above.
			actorObject.totalConsecutiveDays = calculateConsecutiveDays(sortedDates);
			return actorObject
		});
		//sort actors by total number of consecutive days pushed events
		const actorByConsecutiveDays = arrayOfActorObjects.sort((actor1, actor2) => {
			if (actor2.totalConsecutiveDays - actor1.totalConsecutiveDays === 0) {
				// they must be equal
				return doFurtherSorting(actor1, actor2);
			} else {
				return actor2.totalConsecutiveDays - actor1.totalConsecutiveDays > 0;
			}
		});

		return { status: true, data: actorByConsecutiveDays.map(data => { return { id: data.key, login: data.actorData.login, avatar_url: data.actorData.avatar_url } }) };
	} catch (error) {
		console.log(error);
	}
};

function doFurtherSorting(first, second) {
	/**then order them by the timestamp of the latest event in the descending order */
	const firstDate = new Date(first.createdAt);
	const secondDate = new Date(second.createdAt);
	if (secondDate.getTime() === firstDate.getTime()) {
		/** order them by the alphabetical order of login. */
		var firstLogin = first.login.toUpperCase(); // ignore upper and lowercase
		var secondLogin = second.login.toUpperCase(); // ignore upper and lowercase
		return firstLogin > secondLogin === true;
	} else {
		return secondDate.getTime() > firstDate.getTime() > 0
	}
}


function calculateConsecutiveDays(sortedDates) {
	let counter = 1;
	const mappedDaysCount = []
	//get consecutive days
	for (let index = 0; index < sortedDates.length; index++) {
		if (sortedDates[index + 1]) {
			const first = moment(sortedDates[index]);
			const second = moment(sortedDates[index + 1]);
			const duration = moment.duration(second.diff(first));
			const days = Math.round(duration.asDays());
			if (days === 1) {
				++counter;
			}
			else {
				mappedDaysCount.push(counter > 1 ? counter : 0);
				counter = 1;
			}

		}

	}
	mappedDaysCount.push(counter > 1 ? counter : 0);
	//sum the total consecutive days for this actor
	return mappedDaysCount.reduce((runningTotal, currentValue) => {
		return runningTotal += currentValue;
	}, 0);

}
module.exports = {
	updateActor: updateActor,
	getAllActors: getAllActors,
	getStreak: getStreak
};

















