

// class TodoListItem {
//     constructor(todo) {
//         this.id = todo.id;
//         this.completed = todo.completed;
//         this.text = todo.text;

//         this.li = this.createElement('li', { class: 'todo-li' });
//         this.checkbox = this.createElement('input', {
//             type: 'checkbox',
//             class: 'todo-check',
//             id: this.id,
//             // checked: this.completed ? true : false,
//         });
//         this.label = this.createElement('label', {
//             class: 'todo-label',
//             // for: this.id,
//             innerText: this.text
//         });

//         this.li.appendChild(this.checkbox);
//         this.li.appendChild(this.label);

//         // Ajouter un événement pour marquer la tâche comme faite
//         // this.checkbox.addEventListener('change', () => {
//         //     this.completed = this.checkbox.checked;
//         // });
//     }

//     createElement(tag, attributes) {
//         const element = document.createElement(tag);
//         for (let key in attributes) {
//             if (key === 'innerText') {
//                 element.innerText = attributes[key];
//             } else {
//                 element.setAttribute(key, attributes[key]);
//             }
//         }
//         return element;
//     }

//     render() {
//         return this.li;
//     }
// }


// class TodoList {
//     #todos =  [];;

//     constructor(todos = []) {
//         this.#todos = todos;
//     }

//     addTask(todo) {
//         const newTodo = new TodoListItem(todo);
//         this.#todos.push(todo);
//         return newTodo;
//     }

//     saveLocalStorage(newtodo) {
//         let todos;
//       if (localStorage.getItem("todos") === null) {
//         todos = [];
//       } else {
//         todos = JSON.parse(localStorage.getItem("todos"));
//       }
//       todos.push(todo);
//       localStorage.setItem("todos", JSON.stringify(todos));
//     }
    

//     filterTasks(filter) {
//         return this.#todos.filter(todo => {
//             if (filter === 'all') return true;
//             if (filter === 'completed') return todo.completed;
//             if (filter === 'pending') return !todo.completed;
//         });
//     }

//     appendTo(element, filter = 'all') {
//         element.innerHTML = '';
//         const tasksToRender = this.filterTasks(filter);
//         console.log(tasksToRender);
//         tasksToRender.forEach(todo => {
//             const todoItem = new TodoListItem(todo);
//             element.appendChild(todoItem.render());
//         });
//     }
// }


// document.addEventListener('DOMContentLoaded', () => {
//     const todoList = new TodoList();
//     const todoListElement = document.querySelector('.todoList');
//     const todoInput = document.querySelector('#todo-input');
//     const addTodoButton = document.querySelector('#add-todo');
//     const filterButtons = document.querySelectorAll('.options-filters button');

//     // Ajouter une tâche lorsqu'on clique sur "Ajouter"
//     addTodoButton.addEventListener('click', () => {
//         const newTask = {
//             id: Date.now().toString(),  // Identifiant unique
//             text: todoInput.value,
//             completed: false
//         };
//         console.log(newTask);
//         todoList.addTask(newTask);
//         todoList.appendTo(todoListElement);  // Mettre à jour la liste
//         todoInput.value = '';  // Réinitialiser le champ de saisie
//     });

//     // Filtrer les tâches en fonction du bouton cliqué
//     filterButtons.forEach(button => {
//         button.addEventListener('click', () => {
//             const filter = button.getAttribute('data-filter');
//             todoList.appendTo(todoListElement, filter);
//         });
//     });

//     // Initialiser la liste vide
//     todoList.appendTo(todoListElement);
// });

const btn1 = document.querySelector(".btn1");
const btn2 = document.querySelector(".btn2");
const btn3 = document.querySelector(".btn3");

class TodoListItem {
    constructor(todo , onDelete) {
        this.id = todo.id;
        this.completed = todo.completed;
        this.text = todo.text;
        this.onDelete = onDelete;

        this.li = this.createElement('li', { class: 'todo-li' });
        this.checkbox = this.createElement('input', {
            type: 'checkbox',
            class: 'todo-check',
            id: this.id,
            // checked: this.completed,
        });
        this.trash = this.createElement('button' , {
            class : 'todo-trash',
            id : this.id
        })
        this.trash.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        this.label = this.createElement('label', {
            class: 'todo-label',
            for: this.id,
            innerText: this.text
        });
         // Appliquer la classe 'completed' si la tâche est terminée
         if (this.completed) {
            this.label.classList.add('completed');
            this.checkbox.checked = true;
        }

        this.li.appendChild(this.checkbox);
        this.li.appendChild(this.label);
        this.li.appendChild(this.trash);

        this.checkbox.addEventListener('change', () => {
            this.completed = this.checkbox.checked;
            this.updateTodoStatus();
        });

        this.trash.addEventListener('click', () => {
            this.onDelete(this.id);
        });
        
    }

    createElement(tag, attributes) {
        const element = document.createElement(tag);
        for (let key in attributes) {
            if (key === 'innerText') {
                element.innerText = attributes[key];
            } else {
                element.setAttribute(key, attributes[key]);
            }
        }
        return element;
    }

    updateTodoStatus() {
        const todos = JSON.parse(localStorage.getItem("todos")) || [];
        const updatedTodos = todos.map(todo => {
            if (todo.id === this.id) {
                todo.completed = this.completed;
            }
            return todo;
        });
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
    }

    render() {
        return this.li;
    }
}

class TodoList {
    constructor() {
        this.todos = this.loadFromLocalStorage();  // Charger les tâches depuis le localStorage
    }

    addTask(todo) {
        this.todos.push(todo);
        this.saveToLocalStorage();  // Sauvegarder dans le localStorage
    }

    saveToLocalStorage() {
        localStorage.setItem("todos", JSON.stringify(this.todos));
    }

    loadFromLocalStorage() {
        return JSON.parse(localStorage.getItem("todos")) || [];
    }

    deleteTask(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.saveToLocalStorage();  // Sauvegarder les tâches mises à jour
    }


    filterTasks(filter) {
        return this.todos.filter(todo => {
            if (filter === 'all'){
                btn1.classList.add("active");
                btn2.classList.remove("active");
                btn3.classList.remove("active");
                return true;
            } 
            if (filter === 'completed') {
                btn1.classList.remove("active");
                btn2.classList.add("active");
                btn3.classList.remove("active");
                return todo.completed;
            }
            if (filter === 'pending'){
                btn1.classList.remove("active");
                btn2.classList.remove("active");
                btn3.classList.add("active");
                return !todo.completed;
            } 
        });
    }

    appendTo(element, filter = 'all') {
        element.innerHTML = '';
        const tasksToRender = this.filterTasks(filter);
        tasksToRender.forEach(todo => {
            const todoItem = new TodoListItem(todo, id => {
                this.deleteTask(id);
                this.appendTo(element, filter);  // Recharger la liste après suppression
            });
            // const todoItem = new TodoListItem(todo);
            element.appendChild(todoItem.render());
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const todoList = new TodoList();
    const todoListElement = document.querySelector('.todoList');
    const todoInput = document.querySelector('#todo-input');
    const addTodoButton = document.querySelector('#add-todo');
    const filterButtons = document.querySelectorAll('.options-filters button');

    // Ajouter une tâche lorsqu'on clique sur "Ajouter"
    addTodoButton.addEventListener('click', () => {
        const newTask = {
            id: Date.now().toString(),  // Identifiant unique
            text: todoInput.value,
            completed: false
        };
        if (todoInput.value.trim()) {
            todoList.addTask(newTask);
            todoList.appendTo(todoListElement);  // Mettre à jour la liste
            todoInput.value = '';  // Réinitialiser le champ de saisie
        }
    });

    // Filtrer les tâches en fonction du bouton cliqué
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            todoList.appendTo(todoListElement, filter);
        });
    });
   

    // Initialiser la liste depuis le localStorage
    todoList.appendTo(todoListElement);
});
