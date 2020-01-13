var express = require('express');
var router = express.Router();
const eraseEventControllers = require('../controllers/events');

// Route related to delete events
//To delete all events
router.delete('/', async (req, res) => {
    try {
        const response = await eraseEventControllers.eraseEvents();
        if (!response.status) {
            throw response;
        }
        res.status(200).json({});

    } catch (error) {
        console.log(error);

    }
});

module.exports = router;