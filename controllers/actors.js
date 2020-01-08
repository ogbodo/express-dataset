const { update, findOne } = require('../helpers/promisified_neDB')

var getAllActors = () => {

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

















