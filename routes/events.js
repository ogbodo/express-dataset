var express = require('express');
var router = express.Router();
const contentType = require('../middlewares/validations');
const eventControllers = require('../controllers/events')
// Routes related to event
router.post('/', contentType, async (req, res) => {

    const response = await eventControllers.addEvent(req.body);
    const { status } = response;
    if (status) {
        res.json({ "status_code": 201, "body": {}, "headers": {} });
    } else {
        res.json({ "status_code": 400, "body": {}, "headers": {} });
    }

});
module.exports = router;