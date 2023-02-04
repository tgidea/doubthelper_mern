const router = require('express').Router();
const {getUserDetails} = require('../api/user');
const auth = require("../middleware/auth.js");

router.get('/user/:id',auth,  getUserDetails);
module.exports = router;