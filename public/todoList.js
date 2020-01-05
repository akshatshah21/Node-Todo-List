document.addEventListener('DOMContentLoaded', () => {
	document.getElementById('add-btn').addEventListener('click', () => {
		let todo = document.getElementById('new-todo').nodeValue;
		let timestamp = (new Date()).toDateString();
		newTodo = {
			todo:todo,
			timestamp:timestamp
		};
		console.log(newTodo);
	})
});