//selectors
var todoInput = document.querySelector(".todo-input");
var todoButton = document.querySelector(".todo-button");
var todoList = document.querySelector(".todo-list");
var filterOption = document.querySelector(".filter-todo")


//EVENT LISTENERS

document.addEventListener('DOMContentLoaded', getTodos);

todoButton.addEventListener('click', addTodo);

todoList.addEventListener('click', deleteCheck);

filterOption.addEventListener('click', filterTodo);



//functions

function addTodo(event) {

    event.preventDefault();
    //todo div
    var todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //create li
    var newTodo = document.createElement('li') 
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);


    //ADD TODO TO LOCAL STORAGE
    saveLocalTodos(todoInput.value);

    //check mark button
    var completedButton = document.createElement('button');
    completedButton.innerHTML = `<i class = "fas fa-check"></i>`
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //check trash button
    var trashButton = document.createElement('button');
    trashButton.innerHTML = `<i class = "fas fa-trash"></i>`
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //append to todo-list

    todoList.appendChild(todoDiv);

    //clear todo input value

    todoInput.value = ""
}

function deleteCheck(e) {
    console.log(e.target)
    var item = e.target;
    //console.log(item)
    //console.log(item.classList);

    //DELETE TODO
    if (item.classList[0] === "trash-btn") {
        var todo = item.parentElement;
        //console.log(todo)

        //ANIMATION
        todo.classList.add("fall");

        removeLocalTodos(todo);


        todo.addEventListener('transitionend', function() {
            todo.remove();
        })

    }

    //CHECK-MARK TODO

    if (item.classList[0] === "complete-btn") {
        var todo = item.parentElement;
        todo.classList.toggle("completed")
    }
}

function filterTodo(e) {
    var todos = todoList.children;
    console.log(todos);
    for (todo of todos) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex"
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "notcompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    }


    //var todos = todoList.childNodes;
    //console.log(todos);
    // todos.forEach(function(todo) {
    //     switch (e.target.value) {
    //         case "all":
    //             todo.style.display = "flex"
    //             break;
    //         case "completed":
    //             if (todo.classList.contains("completed")) {
    //                 todo.style.display = "flex";
    //             } else {
    //                 todo.style.display = "none";
    //             }
    //             break;
    //         case "notcompleted":
    //             if (!todo.classList.contains("completed")) {
    //                 todo.style.display = "flex";
    //             } else {
    //                 todo.style.display = "none";
    //             }
    //             break;
    //     }

    // });

}



function saveLocalTodos(todo) {
    // CHECK==== HEY Do I already have thing in Local Storage?

    var todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}


function getTodos() {
    // CHECK==== HEY Do I already have thing in Local Storage?
    //console.log("HELLO")
    var todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    console.log(JSON.stringify(todos));
    todos.forEach(function(todo) {
        //todo div
        var todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        //create li
        var newTodo = document.createElement('li')
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);


 
        //check mark button
        var completedButton = document.createElement('button');
        completedButton.innerHTML = `<i class = "fas fa-check"></i>`
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        //check trash button
        var trashButton = document.createElement('button');
        trashButton.innerHTML = `<i class = "fas fa-trash"></i>`
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        //append to todo-list

        todoList.appendChild(todoDiv);
    });

}

function removeLocalTodos(todo) {
    var todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    /*
        //console.log(todo);
        ?? console.log(todos)
        // console.log(todo.children)
        ??console.log(todo.children[0]);
        ?? console.log(todo.children[0].innerText);
        // console.log(todos.indexOf("apple"))
    */
    var todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1)
    localStorage.setItem("todos", JSON.stringify(todos))


}