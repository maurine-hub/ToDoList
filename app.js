// "use strict"
//  import {addItems} from "./functions/input";

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');
const todoFilter = document.querySelector('.ul-filter');


// les écouteurs


todoButton.addEventListener("click" , addItems );

todoList.addEventListener("click" , deleteCheck);
todoFilter.addEventListener("click" , filterOption);

//les fonctions


function addItems (e) {
    e.preventDefault();
    
    
    //création de la div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo-div');
    todoList.appendChild(todoDiv)

    // création de la checkbox

    const check = document.createElement('input');
    check.type = 'checkbox';
    check.classList.add('checkbox');
    todoDiv.appendChild(check);

    //création du li

    const newLi = document.createElement('li');
    newLi.innerText = todoInput.value;
    newLi.classList.add('todoLi');
    todoDiv.appendChild(newLi);

    todoInput.value = "";

    // création du bouton supprimer

    const trash = document.createElement('button');
    trash.innerHTML = '<i class="fa-regular fa-trash-can"></i>'
    trash.classList.add('trash-btn');
    todoDiv.appendChild(trash);  
}



function deleteCheck (e) {
    const item = e.target;

    if (item.classList[0] === "trash-btn"){
        item.parentNode.remove();
    }

    if (item.classList[0] === "checkbox") {
        const todo = item.parentElement;
        todo.classList.toggle('check-btn');
    }

}

// function filterItems (){
//     const Li1 = document.createElement("li");
//     Li1.innerHTML = "toutes";
//     todoFilter.appendChild(Li1);

//     const Li2 = document.createElement("li");
//     Li2.innerHTML = "faites";
//     todoFilter.appendChild(Li2);

//     const Li3 = document.createElement("li");
//     Li3.innerHTML = "à faire";
//     todoFilter.appendChild(Li3);

// }
// filterItems();

function filterOption (e){
    const todos = todoList.childNodes;
    // const filter = prompt("Entrez votre class");
    todos.forEach (function(todo){
        switch (e.target.value) {
            case "all":   
                todo.style.display = "flex";
                break;
                
            case "check-btn":
                if (todo.classList.contains("check-btn")){
                    todo.style.display = "flex";
                }
                else{
                    todo.style.display = "none";
                }
                break;

            case "uncompleted":
                if (!todo.classList.contains("check-btn")){
                    todo.style.display = "flex";
                }
                else{
                    todo.style.display = "none";
                }
                break;
            
            default:
                break;
        }
    })
}



