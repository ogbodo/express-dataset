var express = require('express');
var router = express.Router();
const contentType = require('../middlewares/validations')
const eraseEventControllers = require('../controllers/events');

// Route related to delete events
//To delete all events
router.delete('/', contentType, async (req, res) => {
    try {
        const response = await eraseEventControllers.eraseEvents();
        if (!response.status) {
            throw response;
        }
        res.json({ "status_code": 200, "body": {}, "headers": {} });
    } catch (error) {
        console.log(error);

    }
});

module.exports = router;