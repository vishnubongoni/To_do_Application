async function fetchTodos() {
  const res = await fetch('/api/todos');
  const todos = await res.json();
  const list = document.getElementById('todoList');
  const count = document.getElementById('taskCount');
  list.innerHTML = '';

  todos.forEach(todo => {
    const li = document.createElement('li');
    li.textContent = todo.task;

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.onclick = () => deleteTodo(todo.id);

    li.appendChild(delBtn);
    list.appendChild(li);
  });

  count.textContent = `Total Tasks: ${todos.length}`;
}

async function addTodo() {
  const input = document.getElementById('taskInput');
  const task = input.value.trim();
  if (!task) return alert("Please enter a task.");

  await fetch('/api/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ task })
  });

  input.value = '';
  alert("Task added successfully!");
  fetchTodos();
}

async function deleteTodo(id) {
  await fetch(`/api/todos/${id}`, {
    method: 'DELETE'
  });
  fetchTodos();
}

window.onload = fetchTodos;

