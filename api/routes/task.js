const express = require('express');
const router = express.Router();

const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/task');

router.route('/')
    .get(getTasks)
    .post(createTask)

router.route('/:id')
    .patch(updateTask)
    .delete(deleteTask)

router.get('/completed', getTasks)

module.exports = router;