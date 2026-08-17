// ============================================
// State
// ============================================
const STORAGE_KEY = 'ticket-todo-tasks';
const THEME_KEY = 'ticket-todo-theme';

let tasks = loadTasks();
let currentFilter = 'all';
let searchTerm = '';
let editingId = null;

function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function nextSerial() {
  const highest = tasks.reduce((max, t) => Math.max(max, t.serial || 0), 0);
  return highest + 1;
}

// ============================================
// DOM refs
// ============================================
const taskList = document.getElementById('taskList');
const addForm = document.getElementById('addForm');
const taskInput = document.getElementById('taskInput');
const priorityInput = document.getElementById('priorityInput');
const dueInput = document.getElementById('dueInput');
const addError = document.getElementById('addError');
const searchInput = document.getElementById('searchInput');
const filterTabs = document.getElementById('filterTabs');
const statTotal = document.getElementById('statTotal');
const statActive = document.getElementById('statActive');
const statDone = document.getElementById('statDone');
const clearCompletedBtn = document.getElementById('clearCompletedBtn');
const deleteAllBtn = document.getElementById('deleteAllBtn');
const ticketSerial = document.getElementById('ticketSerial');

const editOverlay = document.getElementById('editOverlay');
const editInput = document.getElementById('editInput');
const editPriority = document.getElementById('editPriority');
const editDue = document.getElementById('editDue');
const editSave = document.getElementById('editSave');
const editCancel = document.getElementById('editCancel');

// ============================================
// Theme toggle
// ============================================
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem(THEME_KEY);
if (savedTheme) document.documentElement.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem(THEME_KEY, next);
});

// ============================================
// Rendering
// ============================================
function formatDue(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

function isOverdue(task) {
  if (!task.due || task.completed) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(task.due + 'T00:00:00');
  return due < today;
}

function getFilteredTasks() {
  return tasks.filter(t => {
    if (currentFilter === 'active' && t.completed) return false;
    if (currentFilter === 'completed' && !t.completed) return false;
    if (searchTerm && !t.text.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });
}

function render() {
  const visible = getFilteredTasks();
  taskList.innerHTML = '';

  visible.forEach(task => {
    const li = document.createElement('li');
    li.className = 'ticket' + (task.completed ? ' completed' : '');
    li.dataset.id = task.id;

    const overdue = isOverdue(task);
    const dueLabel = formatDue(task.due);

    li.innerHTML = `
      <button class="ticket-check" aria-label="Toggle complete">
        <img src="icons/check.svg" alt="">
      </button>
      <div class="ticket-main">
        <p class="ticket-text"></p>
        <div class="ticket-meta">
          <span class="priority-chip ${task.priority}">${task.priority}</span>
          ${dueLabel ? `<span class="due-chip ${overdue ? 'overdue' : ''}">${overdue ? 'overdue · ' : 'due '}${dueLabel}</span>` : ''}
        </div>
      </div>
      <div class="ticket-actions">
        <button class="icon-btn edit-btn" aria-label="Edit task"><img src="icons/edit.svg" alt=""></button>
        <button class="icon-btn delete-btn" aria-label="Delete task"><img src="icons/trash.svg" alt=""></button>
      </div>
      <span class="stamp">DONE</span>
    `;
    li.querySelector('.ticket-text').textContent = task.text;
    taskList.appendChild(li);
  });

  statTotal.textContent = tasks.length;
  statActive.textContent = tasks.filter(t => !t.completed).length;
  statDone.textContent = tasks.filter(t => t.completed).length;
  ticketSerial.textContent = String(nextSerial()).padStart(4, '0');
}

// ============================================
// Add task
// ============================================
addForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = taskInput.value.trim();

  if (!text) {
    addError.textContent = "A ticket needs a task — the field can't be empty.";
    return;
  }
  const duplicate = tasks.some(t => t.text.toLowerCase() === text.toLowerCase() && !t.completed);
  if (duplicate) {
    addError.textContent = 'That task is already on an active ticket.';
    return;
  }
  addError.textContent = '';

  tasks.unshift({
    id: crypto.randomUUID(),
    serial: nextSerial(),
    text,
    priority: priorityInput.value,
    due: dueInput.value || null,
    completed: false,
    createdAt: Date.now()
  });

  saveTasks();
  render();
  taskInput.value = '';
  dueInput.value = '';
  priorityInput.value = 'medium';
  taskInput.focus();
});

// ============================================
// Task list interactions (event delegation)
// ============================================
taskList.addEventListener('click', (e) => {
  const ticketEl = e.target.closest('.ticket');
  if (!ticketEl) return;
  const id = ticketEl.dataset.id;
  const task = tasks.find(t => t.id === id);
  if (!task) return;

  if (e.target.closest('.ticket-check')) {
    task.completed = !task.completed;
    saveTasks();
    render();
  } else if (e.target.closest('.delete-btn')) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    render();
  } else if (e.target.closest('.edit-btn')) {
    openEditModal(task);
  }
});

// ============================================
// Edit modal
// ============================================
function openEditModal(task) {
  editingId = task.id;
  editInput.value = task.text;
  editPriority.value = task.priority;
  editDue.value = task.due || '';
  editOverlay.classList.add('open');
  editInput.focus();
}

function closeEditModal() {
  editOverlay.classList.remove('open');
  editingId = null;
}

editCancel.addEventListener('click', closeEditModal);
editOverlay.addEventListener('click', (e) => {
  if (e.target === editOverlay) closeEditModal();
});

editSave.addEventListener('click', () => {
  const task = tasks.find(t => t.id === editingId);
  if (!task) return;
  const newText = editInput.value.trim();
  if (!newText) return;
  task.text = newText;
  task.priority = editPriority.value;
  task.due = editDue.value || null;
  saveTasks();
  render();
  closeEditModal();
});

editInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') editSave.click();
  if (e.key === 'Escape') closeEditModal();
});

// ============================================
// Search
// ============================================
searchInput.addEventListener('input', (e) => {
  searchTerm = e.target.value;
  render();
});

// ============================================
// Filter tabs
// ============================================
filterTabs.addEventListener('click', (e) => {
  const btn = e.target.closest('.filter-tab');
  if (!btn) return;
  filterTabs.querySelectorAll('.filter-tab').forEach(b => {
    b.classList.remove('active');
    b.setAttribute('aria-selected', 'false');
  });
  btn.classList.add('active');
  btn.setAttribute('aria-selected', 'true');
  currentFilter = btn.dataset.filter;
  render();
});

// ============================================
// Bulk actions
// ============================================
clearCompletedBtn.addEventListener('click', () => {
  if (!tasks.some(t => t.completed)) return;
  tasks = tasks.filter(t => !t.completed);
  saveTasks();
  render();
});

deleteAllBtn.addEventListener('click', () => {
  if (tasks.length === 0) return;
  if (confirm('Delete all tickets? This cannot be undone.')) {
    tasks = [];
    saveTasks();
    render();
  }
});

// ============================================
// Init
// ============================================
render();
