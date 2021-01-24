const { db } = require('../util/admin');

exports.getAllTodos = (request, response) => {
	db
		.collection('todos')
		.orderBy('order', 'desc')
		.get()
		.then((data) => {
			let todos = [];
			data.forEach((doc) => {
				todos.push({
                    todoId: doc.id,
					order: doc.data().order,
                    title: doc.data().title,
                    body: doc.data().body,
                    status: doc.data().status
				});
			});
			return response.json(todos);
		})
		.catch((err) => {
			console.error(err);
			return response.status(500).json({ error: err.code});
		});
};

exports.postOneTodo = (request, response) => {
	if (request.body.body.trim() === '') {
		return response.status(400).json({ body: 'Must not be empty' });
    }
    
    if(request.body.title.trim() === '') {
        return response.status(400).json({ title: 'Must not be empty' });
    }
    
    const newTodoItem = {
        order: request.body.order,
        title: new Date().toISOString(),
        body: request.body.body,
        status: request.body.status
    }
    db
        .collection('todos')
        .add(newTodoItem)
        .then((doc)=>{
            const responseTodoItem = newTodoItem;
            responseTodoItem.id = doc.id;
            return response.json(responseTodoItem);
        })
        .catch((err) => {
			response.status(500).json({ error: 'Something went wrong' });
			console.error(err);
		});
};

exports.deleteTodo = (request, response) => {
    const document = db.doc(`/todos/${request.params.todoId}`);
    document
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return response.status(404).json({ error: 'Todo not found' })
            }
            return document.delete();
        })
        .then(() => {
            response.json({ message: 'Delete successfull' });
        })
        .catch((err) => {
            console.error(err);
            return response.status(500).json({ error: err.code });
        });
};


// exports.getAllTodos = (request, response) => {
//     todos = [
//         {
//             'id': '1',
//             'userId': '1',
//             'title': 'Fri Jan 22 2021 10:57:56 GMT-0500',
//             'body': 'Program a to do app',
//             'status': 'active'
//         },
//         {
//             'id': '2',
//             'userId': '1',
//             'title': 'Fri Jan 22 2021 10:57:56 GMT-0500',
//             'body': 'Do Cyber Protection homework 3',
//             'status': 'active'
//         }
//     ]
//     return response.json(todos);
// }