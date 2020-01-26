const User = require('../models/User');

exports.getUsers = async(req, res, next) => {
    try {
        let users = await User.find();
        return res.status(200).json(users)
    } catch (error) {
        return res.status(404).json(error.message)
    }
}