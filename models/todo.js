const mongoose = require('mongoose');
const mongodbURI = require('../config/mongodbURI');

    // Connect to database: (Add your URI string to ../config/mongodbURI.js)
mongoose.connect(mongodbURI);

let todoSchema = new mongoose.Schema({
	id: {
        type: String
    },
	text: {
        type: String
    },
	timestamp: {
        type: String
    },
	completed: {
        type: Boolean
    }
});
let Todo = new mongoose.model('Todo', todoSchema);

module.exports = Todo