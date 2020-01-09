var express = require('express');
var router = express.Router();
const eventControllers = require('../controllers/events');

// Routes related to event

//To add new event
router.post('/', async (req, res) => {
    try {
        const response = await eventControllers.addEvent(req.body);
        const { status } = response;
        return status ? res.status(201).json({}) : res.status(400).json({});
    } catch (error) {
        console.log(error);
        res.status(400).json({})
    }
});

//Returning the event records filtered by the actor ID
router.get('/actors/:actorID', async (req, res) => {
    try {
        const { actorID } = req.params;
        const response = await eventControllers.getByActor(actorID);
        const { data, status } = response;
        const actorEvents = data.map(eventData => {
            const { _id, ...event } = eventData;
            return event;
        });

        return status ? res.status(200).json(actorEvents) : res.status(404).json({});
    } catch (error) {
        console.log(error);
        res.status(400).json({})
    }
});

//To get all events
router.get('/', async (req, res) => {
    try {
        const response = await eventControllers.getAllEvents();
        const { data } = response;
        const events = data.map(eventData => {
            const { _id, ...event } = eventData;
            return event;
        });
        res.status(200).json(events)
    } catch (error) {
        console.log(error);
        res.status(400).json({})


    }
});

module.exports = router;