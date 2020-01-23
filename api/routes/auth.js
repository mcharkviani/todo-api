const express = require('express');
const router = express.Router();

const { register, registeredUsers, login, getMe, logout } = require('../controllers/auth');
const { protect } = require('../middlewares/auth');

router.route('/register')
    .post(register)
    .get(registeredUsers);

router.post('/login', login)
router.get('/me', protect, getMe)
router.get('/logout', logout)

module.exports = router;