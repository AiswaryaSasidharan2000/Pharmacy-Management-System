const express = require('express');
const {verifyToken} = require('../middleware/auth.middleware');

const router = express.Router();

const { userController, userValidation} = require('../modules/user/index');
const {validate} =require('../middleware/validation.middleware');

router.post('/register',validate(userValidation.getFieldsToValidate('/register')),userController.userRegister);
router.post('/login',validate(userValidation.getFieldsToValidate('/login')), userController.userLogin);
router.post('/verify',validate(userValidation.getFieldsToValidate('/verify')), userController.verifyLoginOtp)
router.get('/logout',verifyToken,userController.userLogout);

module.exports =router;

