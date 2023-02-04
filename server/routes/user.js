const router = require('express').Router();
const { signin, signup, signUpGoogle} = require('../controller/user.js');


router.post('/signup', signup);
router.post('/signin', signin);
router.post('/signupgoogle', signUpGoogle);
module.exports = router;