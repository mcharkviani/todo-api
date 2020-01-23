const express = require('express');
const router = express.Router();

const { createUser, getUsers } = require('../controllers/user');

router.route('/')
    .get(getUsers)
    .post(createUser)

module.exports = router;