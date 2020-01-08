const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const mongodbURI = require('../config/mongodbURI');

// Connect to database: (Add your URI string to ../config/mongodbURI.js)
mongoose.connect(mongodbURI, {useNewUrlParser:true, useUnifiedTopology: true})
    .then(console.log('Connected to MongoDB'))
    .catch((err) => console.log(err));

let userSchema = new mongoose.Schema({
    email: {
        type:String,
        index:true
    },
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    password: {
        type:String
    }
});

let User = mongoose.model('User', userSchema);
module.exports = User;

module.exports.hashPassword = (newUser, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) console.log(err);
            else{
                newUser.password = hash;
                callback(newUser);
            }
        })
    })
};

module.exports.getUserById = (id, callback) => {
	User.findById(id, callback);
};

module.exports.getUserByEmail = (email, callback) => {
    User.findOne({email:email}, callback);
};

module.exports.comparePassword = (password, hash, callback) => {
    bcrypt.compare(password, hash, (err, res) => {
        if(err) console.log(err);
        else callback(null, res);
    });
};