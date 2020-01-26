const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    isCompleted: {
        type: Boolean,
        require: true,
        default: false
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'Users',
        require: false
    }
});

module.exports = mongoose.model('Tasks', TaskSchema);