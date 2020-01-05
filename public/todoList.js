document.addEventListener('DOMContentLoaded', () => {

	document.getElementById('new-todo').focus();

	sendRequest = (json) => {
		let xhr = new XMLHttpRequest();
		xhr.open('POST', '/todo', true);
		console.log(`Ready state: ${xhr.readyState}`);
		xhr.setRequestHeader('Content-type', 'application/json');
		xhr.onload = () => {
			console.log(xhr.status);
			if(xhr.status == 200) {
				location.reload();
			}
			else {
				console.log(xhr.status);
			}
		}
		xhr.send(JSON.stringify(json));

	}

	document.getElementById('add-btn').addEventListener('click', (e) => {
		e.preventDefault();
		json = newTodo();
		if(typeof json === 'undefined') {
			M.toast({html:'Todo: Nothing?', classes:'light-blue lighten-3 black-text circular large'});
			return;
		}

		console.log(json);
		sendRequest(json);
		document.getElementById('new-todo').value = '';
	});

	toggleTodo = (e) => {
		let id = e.target.parentNode.parentNode.id;
		json = {
			type: 'toggle',
			id:id
		};
		sendRequest(json);
	}

	delTodo = (e) => {
		let id = e.target.parentNode.parentNode.id;
		json = {
			type: 'del',
			id: id
		};
		sendRequest(json);
	}

	newTodo = () => {
		let text = document.getElementById('new-todo').value;
		if(text.trim() === '') {
			console.log('Empty todo');
			return;
		}
		let timestamp = (new Date()).toDateString();
		json = {
			type:'add',
			todo: {
				text: text,
				timestamp: timestamp,
				completed: false
			}
		};
		return json;
	}
});
