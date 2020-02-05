const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/users');
const checkAuth = require('../middleware/check-auth');

router.post('/signup', UsersController.users_signup)

router.post('/login',UsersController.users_login)

router.get('/:userId',UsersController.get_user)

router.delete('/:userId',checkAuth ,UsersController.users_delete_user)

router.patch('/:userId',UsersController.update)

router.post('/token',UsersController.check)

router.post('/message',UsersController.message)

module.exports = router;