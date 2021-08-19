const express = require('express');
const router = express.Router();

const {
  signupValidator,
  loginValidator,
  validatorResult,
} = require('../middleware/validator');

const {checkemail,signupController, loginController} = require('../controllers/guestAuth')
const {
  ownerSignupController,
  ownerLoginController,
} = require('../controllers/ownerAuth');

router.post(
  '/ownersignup',
  signupValidator,
  validatorResult,
  ownerSignupController,
);
router.post('/emailverify', checkemail);
router.post('/guestsignup', signupValidator, validatorResult, signupController);

router.post(
  '/ownerlogin',
  loginValidator,
  validatorResult,
  ownerLoginController,
);
router.post(
  '/guestlogin',
  loginValidator,
  validatorResult,
  loginController,
);

module.exports = router;
