const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async(req, res, next) => {
    const { firstname, lastname, username, email, password } = req.body;;
    await User.create({firstname, lastname, username, email, password})
    .then(result => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(result.password, salt, (err, hash) => {
                if (err) throw err;
                result.password = hash;
                result.save()
            })
        })
        this.sendTokenResponse(result, 200, res);
    })
    .catch(err => {
        res.status(500).json({success: false, error: err.message})
    })
}

exports.registeredUsers = async(req, res, next) => {
    try {
        let users = await User.find();
        return res.status(200).json(users)
    } catch (error) {
        return res.status(404).json(error.message)
    }
}

exports.login = async(req, res, next) => {
    const {username, password} = req.body;

    User.findOne({username}).select('+password')
    .then((result) => {
        if (!result) return res.status(400).json({ message: "User doesn't exist" });
        bcrypt.compare(password, result.password, (err, isMatch) => {
        console.log(password)
        console.log(result)
        console.log(result.password)
        if (err) throw err

        if (isMatch) {
            this.sendTokenResponse(result, 200, res);
        } else {
            return res.status(401).json({ message: "Invalid credentials" })
        }

    })

    }).catch((err) => {
        res.json({success: false, error: err})
    });
}

exports.getMe = async(req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({success: true, data: user})
}

exports.getSignedJwtToken = (id) => {
    return jwt.sign({_id: id}, process.env.JWT_SECRET_KEY);
}

exports.sendTokenResponse = (user, statusCode, res)  => {
    const token = this.getSignedJwtToken(user._id);

    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE),
        httpOnly: true
    };

    res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
        success: true,
        token
    })
}

exports.logout = async (req, res, next) => {
    res.cookie('token', 'none', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true
    });
  
    res.status(200).json({
      success: true,
      data: {}
    });
}