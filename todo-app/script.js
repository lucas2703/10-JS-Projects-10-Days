var todoInput = document.getElementById('todo-entry');
var form = document.getElementById('todo-container');
var todoStorage = JSON.parse(localStorage.getItem('todos'));

if (todoStorage)
{
    todoStorage.forEach(todo => {
        console.log(todo);
        addTodo(todo.todo, exists=true, completed=todo.completed);
    })
}

document.addEventListener('submit', function (e) {
    e.preventDefault();

    addTodo(todoInput.value);
})

function addTodo(todoText, exists=false, completed=false)
{
    todoInput.value = '';

    var newTodo = document.createElement('label');
    newTodo.classList.add('todo');
    newTodo.innerText = todoText 

    if (completed)
    {
        newTodo.classList.add('completed');
    }

    newTodo.addEventListener('click', () => {
        newTodo.classList.toggle('completed');

        updateLS();
    })

    newTodo.addEventListener('contextmenu', function (e) {
        e.preventDefault();
        newTodo.remove();
        updateLS();
        return false;
    })

    form.appendChild(newTodo);
    console.log(localStorage);
    updateLS();
    console.log(localStorage);
}

function updateLS()
{
    var todoEle = document.querySelectorAll('label')
    var todoArr = []

    todoEle.forEach(todo => {
        todoArr.push({
            todo: todo.innerText,
            completed: todo.classList.contains('completed')
        })
    })

    localStorage.setItem('todos', JSON.stringify(todoArr));
}