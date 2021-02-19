const todoForm = document.querySelector('.js-todoForm'),
    todoInput = todoForm.querySelector('input'),
    todoList = document.querySelector('.js-todoList');

const TODOS_LS = 'todos';

let toDos = [];

function deleteTodo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    todoList.removeChild(li);
    const cleanTodos = toDos.filter(function(todo){
        return todo.id !== parseInt(li.id);
    });
    toDos = cleanTodos;
    saveTodos();
}

function saveTodos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintTodo(text) {
    const li = document.createElement('li');
    const delBtn = document.createElement('button');
    const span = document.createElement('span');
    const newId = toDos.length + 1;
    delBtn.innerHTML = "❌";
    delBtn.addEventListener('click', deleteTodo);
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    todoList.appendChild(li);
    const todoObj = {
        text: text,
        id: newId,
    }
    toDos.push(todoObj);
    saveTodos();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = todoInput.value;
    paintTodo(currentValue);
    todoInput.value = "";
}

function loadTodos() {
    const loadedTodos = localStorage.getItem(TODOS_LS);
    if (loadedTodos !== null) {
        const parsedTodos = JSON.parse(loadedTodos);
        parsedTodos.forEach(function(todo) {
            paintTodo(todo.text);
        });
    } else {

    }
}
function init() {
    loadTodos();
    todoForm.addEventListener('submit', handleSubmit)
}

init();