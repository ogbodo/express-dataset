var express = require('express');
var router = express.Router();
const actorControllers = require('../controllers/actors');

// Routes related to actor.

//Updating the avatar URL of the actor
router.put('/', async (req, res) => {
    const { id, avatar_url } = req.body;
    if (!avatar_url) {
        res.status(400).json({});
        return;
    }
    const response = await actorControllers.updateActor(id, avatar_url);
    const { data, status } = response;
    if (!status) {
        res.status(404).json({});
        return;
    }
    res.status(200).json(data);
});

//Returning the actor records ordered by the total number of events
router.get('/', async (req, res) => {

    const response = await actorControllers.getAllActors();
    const { data } = response;
    res.json({ "status_code": 200, "body": data });
});

//Returning the actor records ordered by the maximum streak
router.get('/streak', async (req, res) => {

    const response = await actorControllers.getStreak();
    const { data } = response;
    res.status(200).json(data);
});

module.exports = router;