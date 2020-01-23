const express = require('express');
const router = express.Router();

const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/task');
const { protect } = require('../middlewares/auth');

router.route('/')
    .get(protect, getTasks)
    .post(protect, createTask)

router.route('/:id')
    .patch(protect, updateTask)
    .delete(protect, deleteTask)

router.get('/completed', getTasks)

module.exports = router;