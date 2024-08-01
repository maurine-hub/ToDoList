const todos = JSON.parse(localStorage.getItem('todos')) || [];

const doneTask = todos.filter((item) => item.action === 'done');
console.log(doneTask);

const undoneTask = todos.filter(item => item.action === "undone");

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-btn");
const todoList = document.querySelector(".todo-list");
const todoFilter = document.querySelector(".ul-filter");
const todoAll = document.querySelector(".all");
const todoComplete = document.querySelector(".complete");
const todoUndone = document.querySelector(".undone");


const style1 = todoAll.classList.add('style');

// les écouteurs

todoButton.addEventListener("click", addItems);
todoList.addEventListener("click", deleteCheck);
todoFilter.addEventListener("click", filterOption);
document.addEventListener("DOMContentLoaded", getTodos(todos, style1));
// todoAll.addEventListener("click" , style(todoAll));
// todoComplete.addEventListener("click" , style(todoComplete));
// todoUndone.addEventListener("click" , style(todoUndone));

//les fonctions


function addItems(e) {
  e.preventDefault();

  //création de la div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo-div");
  todoList.appendChild(todoDiv);

  // création de la checkbox

  const check = document.createElement("input");
  check.type = "checkbox";
  check.classList.add("checkbox");
  todoDiv.appendChild(check);

  //création du li

  const newLi = document.createElement("li");
  newLi.innerText = todoInput.value;
  newLi.classList.add("todoLi");
  todoDiv.appendChild(newLi);

  // création du bouton supprimer

  const trash = document.createElement("button");
  trash.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
  trash.classList.add("trash-btn");
  todoDiv.appendChild(trash);

  //ajout du li dans le local storage

  let tache = {
    id: new Date().getTime(),
    content: todoInput.value,
    statu: "new",
    action: "undone",
  };
  saveLocalStorage(tache);

  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;

  if (item.classList[0] === "trash-btn") {
    const todo = item.parentNode;
    todo.classList.add("fail");
    todo.addEventListener("transitionend", function () {
        todo.remove(); 
    });
    // removeLocalTodo(todo.children[1].innerText);
  }

  if (item.classList[0] === "checkbox") {
    const todo = item.parentElement;
    todo.classList.toggle("done");
    let todos;
    todos = JSON.parse(localStorage.getItem("todos"));

    todos.forEach((todoItem, index) => {
      if (todoItem.content === item.parentElement.children[1].innerText) {
        if (todo.classList.contains("done")) {
          todos[index].action = "done";
        } else {
          todos[index].action = "undone";
        }
      }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
  }
}


function filterOption(e) {

  let item = e.target;

  switch (item.classList[0]) {
    case "complete":
        todoList.innerHTML = "";
        const option1 = todoComplete.classList.add('style');
        todoUndone.classList.remove('style');
        todoAll.classList.remove('style');
        getTodos(doneTask, option1);
        break;
    case "undone" : 
        todoList.innerHTML = '';
        todoComplete.classList.remove('style');
        todoAll.classList.remove('style');
        const option2 = todoUndone.classList.add('style');
        getTodos(undoneTask , option2);
        break;
    default:
        todoList.innerHTML = '';
        const style = todoAll.classList.add('style');
        todoUndone.classList.remove('style');
        todoComplete.classList.remove('style');

        // todoList.innerHTML = '';
        // todoComplete.style = '';
        // todoUndone.style = '';
        // todoAll.style.backgroundColor = '#000';
        //  todoAll.style.color = '#fff';
        getTodos(todos , style);
        break;
  }
     
}


// gestion du local storage

function saveLocalStorage(todo) {
    let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

//fonction pour afficher les éléments après actualiser

function getTodos(todos , style) {

//   if (localStorage.getItem("todos") === null) {
//     todos = [];
//   } else {
//     todos = JSON.parse(localStorage.getItem("todos"));
//   }

  todos.map((todo) => {
    //création de la div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo-div");
    todoList.appendChild(todoDiv);

    // création de la checkbox

    const check = document.createElement("input");
    check.type = "checkbox";
    check.classList.add("checkbox");
    todoDiv.appendChild(check);

    //création du li

    const newLi = document.createElement("li");
    newLi.innerText = todo.content;
    newLi.classList.add("todoLi");
    todoDiv.appendChild(newLi);

    const trash = document.createElement("button");
    trash.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
    trash.classList.add("trash-btn");
    todoDiv.appendChild(trash);

    // trash.onclick = function() {
    //     console.log("c'est le todo", todo.id)
  
    //     const newTodo = todos.filter(item => item.id !== todo.id);
    //     console.log('newTodo' , newTodo);
    //     localStorage.setItem("todos", JSON.stringify(newTodo));
    //     todoList.addEventListener("click", deleteCheck);
    // }
    //   const todoIndex = todo.children[1].innerText;
    //   todos.splice(todos.indexOf(todoIndex), 1);

    //pour sauvegarder les status des tâches

    if (todo.action === "done") {
      check.checked = true;
      todoDiv.classList.add("done");
    }
  });
}

function removeLocalTodo(id) {
  
    
}




