const todosContainer = document.getElementById("todos");
const newTodoInput = document.getElementById('newTodo');

function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(todo => {
        addTodoToDOM(todo.text, todo.active);
    });
}

function saveTodos() {
    const todos = [];
    document.querySelectorAll('.todo').forEach(todoElement => {
        todos.push({
            text: todoElement.firstChild.textContent.trim(),
            active: todoElement.classList.contains('active')
        });
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}

function addTodo() {
    const newTodoText = newTodoInput.value.trim();
    if(newTodoText) {
        addTodoToDOM(newTodoText, false);
        saveTodos();
        newTodoInput.value = '';
    }
}
function addTodoToDOM(text, isActive) {
    const li = document.createElement('li');
    li.className = 'todo';
    if(isActive) li.classList.add('active');
    li.innerHTML = `
        <span>${text}</span>
        <a class="remove-btn" onclick="removeTodo(this)">Remove</a>
    `;
    li.addEventListener("click", (e) => {
        if(e.target.tagName !== 'BUTTON') {
            li.classList.toggle('active');
            saveTodos();
        }
    });
    todosContainer.appendChild(li);
}

function removeTodo(button) {
    button.parentElement.remove();
    saveTodos();
}
window.onload = loadTodos;