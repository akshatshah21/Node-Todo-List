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
        required: true,
        index:true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    password: {
        type:String, 
        required: true
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

const Todo = require('./todo'); // This is placed here as Todo schema requires User schema to be registered first

module.exports.getUserTodos = (user, callback) => {
    Todo.find({author: user._id}, (err, data) => {
        if(err) {
            console.log(err);
            callback(err);
        }
        else {
            callback(null, data);
        }
    })
};
