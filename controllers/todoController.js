let uuid = require('uuid');

let todoList = [
    { id: 1, text: 'Complete NodeJS', timestamp: 'Jan 4, 2020', completed: false },
    { id: 2, text: 'Complete React', timestamp: 'Jan 4, 2020', completed: false }
]

module.exports = (app) => {

    // Get todos
    app.get('/todo', (req, res) => {
        res.render('todoList', { userName: 'Akshat', todoList: todoList });
    });

    // Add todos
    app.post('/todo', (req, res) => {
        console.log(req.body);
        if (req.body.type == 'add') {
            let newTodo = req.body.todo;
            newTodo.id = uuid.v4();
            todoList.push(newTodo);
        }
        else if (req.body.type == 'del')
            todoList = todoList.filter((todo) => todo.id != req.body.id);
        else if (req.body.type == 'toggle') {
            todoList = todoList.map((todo) => {
                if (todo.id == req.body.id) todo.completed = !todo.completed;
                return todo;
            });
        }
        console.log(todoList)
        res.status(200);
        res.json(JSON.stringify(todoList));
    });
    // Delete todos
    app.delete('/todo', (req, res) => {

    });
};