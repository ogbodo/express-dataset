const { update } = require('../helpers/promisified_neDB')

var getAllActors = () => {

};

var updateActor = async () => {
	//check if this actor exists
	const foundActor = await findOne({ 'actor.id': requestBody.id });
	if (foundActor) {
		return { status: false };
	}
};

var getStreak = () => {

};


module.exports = {
	updateActor: updateActor,
	getAllActors: getAllActors,
	getStreak: getStreak
};

















