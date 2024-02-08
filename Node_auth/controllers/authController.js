const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Handle error
const handleError = (err) => {
    console.log(err.message, err.code);
    let errors = {email: '', password: ''};

    // Incorrect email
    if (err.message === 'Incorrect email') {
        errors.email = 'This email is not registered';
        return errors;
    };

    // Incorrect password
    if (err.message === 'Incorrect password') {
        errors.password = 'This password is incorrect';
    }

    // duplicate error
    if( err.code === 11000) {
        errors.email = 'That email is already registered';
    }

    // Validation error
    if( err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
          errors[properties.path] = properties.message;
        });
    }

    return errors;

};

// JWT function 
const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
    return jwt.sign( { id }, 'abu er best', {
        expiresIn: maxAge
    });
};

// signup functions
module.exports.signup_get = (req, res) => {
    res.render('signup');
};

// sender informasjon til databasen
module.exports.signup_post = async (req, res) => {
    const {email, password} = req.body;

   try {
    const user = await User.create({email, password});
    const token = createToken(user._id);
    res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
    res.status(201).json( {user: user._id });
   } catch (err) {
    const errors = handleError(err);
    res.status(400).json({ errors });
   }
};

// login functions
module.exports.login_get = (req, res) => {
    res.render('login');
};

module.exports.login_post = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
        res.status(200).json({ user: user._id });
    } catch (err) {
        const errors = handleError(err);
        res.status(400).json({ errors });
    }
};

module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', {maxAge: 1});
    res.redirect('/login');
}