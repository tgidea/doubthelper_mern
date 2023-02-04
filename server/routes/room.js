const router = require('express').Router();
const {generateSpace } = require('../controller/Room.js');
const auth = require("../middleware/auth.js");

router.get('/create',auth,  generateSpace);

module.exports = router;