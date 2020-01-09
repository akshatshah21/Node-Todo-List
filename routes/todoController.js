const express = require('express');
const uuid = require('uuid');
const User = require('../models/user');
let router = express.Router();


const Todo = require('../models/todo');
/*
Example todo object:
	{ id: 1, text: 'Complete NodeJS', timestamp: 'Jan 4, 2020', completed: false }
*/

// Get todos
router.get('/', (req, res) => {
	Todo.find({}, (err, data) => {
		if(err)	console.log(err);
		else {
            if(req.user) {
                /* User.getUserData(req.user, (todoList) => {
                    res.render('todoList', {user: req.user, todoList: todoList}); // todoList: getUserData(user)
                }); */
                res.render('todoList', {user: req.user, todoList: data});
            }
            else {
                res.redirect('/users/login');
            }
			req.flash('success_msg', 'Success!');
			
		}
	} )
});

// Add, delete todos, mark complete/incomplete
router.post('/', (req, res) => {
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

module.exports = router;
