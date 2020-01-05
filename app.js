let express = require('express');
let ejs = require('ejs');
let bodyParser = require('body-parser');
let todoController = require('./controllers/todoController')

let app = express()
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Fire controllers
todoController(app);

/*
app.get('/', (req, res) => {  
    res.render('index', {userName:'Akshat', todoList:[
        {id:1, text:'Complete NodeJS', timestamp:'Jan 4, 2020'},
        {id: 2, text:'Complete React', timestamp:'Jan 4, 2020'}]});
})
*/
app.listen(5000, () => {
    console.log(`Listening on port 5000`);
});