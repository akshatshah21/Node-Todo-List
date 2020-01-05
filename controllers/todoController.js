let uuid = require('uuid');
let mongoose = require('mongoose');
let mongodbURI = require('./mongodbURI');
console.log(`URI: ${mongodbURI()}`);
/*
Example todo object:
	{ id: 1, text: 'Complete NodeJS', timestamp: 'Jan 4, 2020', completed: false }
*/

// Connect to database: (Replace the URI string with your own MongoDB URI)
mongoose.connect(mongodbURI());

let todoSchema = new mongoose.Schema({
	id: String,
	text: String,
	timestamp: String,
	completed: Boolean
});
let Todo = new mongoose.model('Todo', todoSchema);


module.exports = (app) => {

	// Get todos
	app.get('/todo', (req, res) => {
		Todo.find({}, (err, data) => {
			if(err)	console.log(err);
			else {
				res.render('todoList', {userName: 'Akshat', todoList: data});
				// Todo: Add user reg system
			}
		} )
	});

	// Add, delete todos, mark complete/incomplete
	app.post('/todo', (req, res) => {
		console.log('POST request:', req.body);
		if (req.body.type == 'add') {	// ADD TODO
			let newTodo = req.body.todo;
			newTodo.id = uuid.v4();
			let todoToPush = Todo(newTodo).save((err, data) => {
				if(err)	console.log(err);
				else {
					console.log('Added new todo:', newTodo);
					res.json(data)
				}
			});

		}
		else if (req.body.type == 'del') {	// DELETE TODO
			Todo.find({id:req.body.id}).remove((err, data) => {
				if(err)	console.log(err);
				else{
					console.log(`Todo id ${req.body.id} deleted successfully`);
					res.json(data);
				}

			})
		}
		else if (req.body.type == 'toggle') {	// TOGGLE COMPLETED OF TODO
			Todo.findOne({id: req.body.id}, (err, data) => {	// Todo.find() returns a list, findOne() returns one object, the first match, according to _id (mongodb obj id)
				if(err)	console.log(err);
				else {
					console.log('Found:', data);
					data.completed = !data.completed;
					data.save((err, data) => {
						if(err)	console.log(err);
						else {
							res.json(data);
						}
					})
				}
			})
		}
	});
};
