var express = require('express');
var router = express.Router();
const contentType = require('../middlewares/validations')
const actorControllers = require('../controllers/actors');

// Routes related to actor.

//Updating the avatar URL of the actor
router.put('/', contentType, async (req, res) => {
    const { id, avatar_url } = req.body;
    if (!avatar_url) {
        res.json({ "status_code": 400, "body": {}, "headers": {} });
        return;
    }
    const response = await actorControllers.updateActor(id, avatar_url);
    const { data, status } = response;
    if (!status) {
        res.json({ "status_code": 404, "body": {}, "headers": {} });
        return;
    }
    res.json({ "status_code": 200, "body": data, "headers": {} });
});


module.exports = router;