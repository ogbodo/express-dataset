var express = require('express');
var router = express.Router();
const contentType = require('../middlewares/validations');
const eventControllers = require('../controllers/events');

// Routes related to event

//To add new event
router.post('/', contentType, async (req, res) => {
    try {
        const response = await eventControllers.addEvent(req.body);
        const { status } = response;
        if (status) {
            res.json({ "status_code": 201, "body": {}, "headers": {} });
        } else {
            res.json({ "status_code": 400, "body": {}, "headers": {} });
        }
    } catch (error) {
        console.log(error);

    }
});

//To get all events
router.get('/', contentType, async (req, res) => {
    try {
        const response = await eventControllers.getAllEvents();
        const { data } = response;
        res.json({ "status_code": 200, "body": data, "headers": {} });
    } catch (error) {
        console.log(error);

    }
});

module.exports = router;