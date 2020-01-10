const mongoose = require('mongoose');
const mongodbURI = require('../config/mongodbURI');
const Schema = mongoose.Schema;
// const User = require('./user');
const UserSchema = mongoose.model('User').schema;

 // Connect to database: (Add your URI string to ../config/mongodbURI.js)
mongoose.connect(mongodbURI, {useNewUrlParser:true, useUnifiedTopology: true})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log(err));

let todoSchema = new mongoose.Schema({
	text: {
        type: String
    },
	timestamp: {
        type: String
    },
	completed: {
        type: Boolean
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,

    }
});
let Todo = new mongoose.model('Todo', todoSchema);

module.exports = Todo