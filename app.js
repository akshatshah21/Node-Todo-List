let express = require('express');
let ejs = require('ejs');
let bodyParser = require('body-parser');
let todoController = require('./controllers/todoController')

let app = express()
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Fire controllers
todoController(app);

app.listen(5000, () => {
    console.log(`Listening on port 5000`);
});
