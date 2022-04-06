const express = require('express');
const router = express.Router()

const controller = require('./controller');

router.post("/sign-up", controller.signup);

router.post("/sign-in", controller.signin);

router.post("/user-info", controller.userInfo);

module.exports = router;