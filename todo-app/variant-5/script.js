// DOM Elements
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const searchInput = document.getElementById('searchInput');
const filterBtns = document.querySelectorAll('.filter-btn');
const totalTasksEl = document.getElementById('totalTasks');
const completedCountEl = document.getElementById('completedCount');
const pendingCountEl = document.getElementById('pendingCount');
const clearCompletedBtn = document.getElementById('clearCompleted');
const deleteAllBtn = document.getElementById('deleteAll');
const themeToggle = document.getElementById('themeToggle');

// State
let tasks = [];
let currentFilter = 'all';
let searchQuery = '';

// Load from Local Storage
function loadTasks() {
  const saved = localStorage.getItem('todo-tasks');
  tasks = saved ? JSON.parse(saved) : [];
  renderTasks();
}

// Save to Local Storage
function saveTasks() {
  localStorage.setItem('todo-tasks', JSON.stringify(tasks));
}

// Generate unique ID
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Add Task
function addTask() {
  const text = taskInput.value.trim();
  if (!text) {
    taskInput.focus();
    return;
  }

  // Prevent duplicates (case-insensitive)
  const exists = tasks.some(t => t.text.toLowerCase() === text.toLowerCase());
  if (exists) {
    alert('This task already exists!');
    taskInput.focus();
    return;
  }

  const task = {
    id: generateId(),
    text: text,
    completed: false,
    createdAt: Date.now()
  };

  tasks.unshift(task);
  taskInput.value = '';
  saveTasks();
  renderTasks();
  taskInput.focus();
}

// Delete Task
function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  renderTasks();
}

// Toggle Complete
function toggleComplete(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.completed = !task.completed;
    saveTasks();
    renderTasks();
  }
}

// Edit Task
function startEdit(id, li) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;

  li.classList.add('editing');
  const textEl = li.querySelector('.task-text');
  const actionsEl = li.querySelector('.task-actions');

  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'edit-input';
  input.value = task.text;

  textEl.replaceWith(input);
  input.focus();
  input.select();

  // Hide action buttons while editing
  actionsEl.style.display = 'none';

  function finishEdit() {
    const newText = input.value.trim();
    if (newText && newText !== task.text) {
      // Check duplicate
      const exists = tasks.some(t => t.id !== id && t.text.toLowerCase() === newText.toLowerCase());
      if (exists) {
        alert('A task with this name already exists!');
        input.focus();
        return;
      }
      task.text = newText;
      saveTasks();
    }
    renderTasks();
  }

  input.addEventListener('blur', finishEdit);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      finishEdit();
    } else if (e.key === 'Escape') {
      renderTasks();
    }
  });
}

// Clear Completed
function clearCompleted() {
  const completed = tasks.filter(t => t.completed);
  if (completed.length === 0) return;
  if (confirm(`Clear ${completed.length} completed task(s)?`)) {
    tasks = tasks.filter(t => !t.completed);
    saveTasks();
    renderTasks();
  }
}

// Delete All
function deleteAll() {
  if (tasks.length === 0) return;
  if (confirm(`Delete all ${tasks.length} task(s)? This cannot be undone.`)) {
    tasks = [];
    saveTasks();
    renderTasks();
  }
}

// Filter & Search
function getFilteredTasks() {
  let filtered = [...tasks];

  // Filter by status
  if (currentFilter === 'active') {
    filtered = filtered.filter(t => !t.completed);
  } else if (currentFilter === 'completed') {
    filtered = filtered.filter(t => t.completed);
  }

  // Search
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(t => t.text.toLowerCase().includes(q));
  }

  return filtered;
}

// Update Stats
function updateStats() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;

  totalTasksEl.textContent = `${total} task${total !== 1 ? 's' : ''}`;
  completedCountEl.textContent = `${completed} completed`;
  pendingCountEl.textContent = `${pending} pending`;
}

// Render Tasks
function renderTasks() {
  const filtered = getFilteredTasks();
  taskList.innerHTML = '';

  if (filtered.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.innerHTML = `
      <i class="fas fa-clipboard-list"></i>
      <p>${searchQuery || currentFilter !== 'all' ? 'No matching tasks found' : 'No tasks yet. Add one above!'}</p>
    `;
    taskList.appendChild(empty);
  } else {
    filtered.forEach(task => {
      const li = document.createElement('li');
      li.className = `task-item${task.completed ? ' completed' : ''}`;
      li.dataset.id = task.id;

      li.innerHTML = `
        <div class="task-checkbox" title="Mark as ${task.completed ? 'incomplete' : 'complete'}">
          ${task.completed ? '<i class="fas fa-check"></i>' : ''}
        </div>
        <span class="task-text">${escapeHtml(task.text)}</span>
        <div class="task-actions">
          <button class="task-btn edit" title="Edit"><i class="fas fa-pen"></i></button>
          <button class="task-btn delete" title="Delete"><i class="fas fa-trash"></i></button>
        </div>
      `;

      // Events
      li.querySelector('.task-checkbox').addEventListener('click', () => toggleComplete(task.id));
      li.querySelector('.task-text').addEventListener('dblclick', () => startEdit(task.id, li));
      li.querySelector('.task-btn.edit').addEventListener('click', () => startEdit(task.id, li));
      li.querySelector('.task-btn.delete').addEventListener('click', () => {
        if (confirm('Delete this task?')) {
          deleteTask(task.id);
        }
      });

      taskList.appendChild(li);
    });
  }

  updateStats();
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Theme Toggle
function loadTheme() {
  const theme = localStorage.getItem('todo-theme') || 'light';
  if (theme === 'dark') {
    document.body.classList.add('dark');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }
}

function toggleTheme() {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  localStorage.setItem('todo-theme', isDark ? 'dark' : 'light');
  themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
}

// Event Listeners
addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    addTask();
  }
});

searchInput.addEventListener('input', () => {
  searchQuery = searchInput.value.trim();
  renderTasks();
});

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    renderTasks();
  });
});

clearCompletedBtn.addEventListener('click', clearCompleted);
deleteAllBtn.addEventListener('click', deleteAll);
themeToggle.addEventListener('click', toggleTheme);

// Initialize
loadTheme();
loadTasks();
