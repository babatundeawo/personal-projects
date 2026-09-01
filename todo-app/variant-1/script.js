const STORAGE_KEY = "todo-app-tasks";
const THEME_KEY = "todo-app-theme";

const form = document.getElementById("todoForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const searchInput = document.getElementById("searchInput");
const emptyState = document.getElementById("emptyState");
const totalCount = document.getElementById("totalCount");
const activeCount = document.getElementById("activeCount");
const completedCount = document.getElementById("completedCount");
const clearCompletedBtn = document.getElementById("clearCompletedBtn");
const deleteAllBtn = document.getElementById("deleteAllBtn");
const themeBtn = document.getElementById("themeBtn");
const filterButtons = document.querySelectorAll(".filter-btn");

let tasks = loadTasks();
let currentFilter = "all";
let searchTerm = "";

function createTask(text) {
  return {
    id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
    text,
    completed: false,
    createdAt: Date.now()
  };
}

function loadTasks() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function render() {
  const filteredTasks = tasks.filter(task => {
    const matchesFilter =
      currentFilter === "all" ||
      (currentFilter === "active" && !task.completed) ||
      (currentFilter === "completed" && task.completed);

    const matchesSearch = task.text.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  taskList.innerHTML = "";

  filteredTasks.forEach(task => {
    const li = document.createElement("li");
    li.className = `task-item${task.completed ? " completed" : ""}`;
    li.dataset.id = task.id;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-check";
    checkbox.checked = task.completed;
    checkbox.setAttribute("aria-label", `Mark "${task.text}" as completed`);
    checkbox.addEventListener("change", () => toggleTask(task.id));

    const text = document.createElement("span");
    text.className = "task-text";
    text.textContent = task.text;

    const actions = document.createElement("div");
    actions.className = "task-actions";

    const editBtn = document.createElement("button");
    editBtn.type = "button";
    editBtn.className = "small-btn";
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => editTask(task.id));

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "small-btn delete";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteTask(task.id));

    actions.append(editBtn, deleteBtn);
    li.append(checkbox, text, actions);
    taskList.appendChild(li);
  });

  totalCount.textContent = tasks.length;
  activeCount.textContent = tasks.filter(task => !task.completed).length;
  completedCount.textContent = tasks.filter(task => task.completed).length;

  emptyState.hidden = filteredTasks.length !== 0;
  emptyState.querySelector("h2").textContent =
    tasks.length === 0 ? "No tasks yet" : "No matching tasks";
  emptyState.querySelector("p").textContent =
    tasks.length === 0
      ? "Add your first task above to get started."
      : "Try another search or filter.";

  clearCompletedBtn.disabled = !tasks.some(task => task.completed);
  deleteAllBtn.disabled = tasks.length === 0;
}

function addTask(text) {
  const cleanText = text.trim();

  if (!cleanText) {
    taskInput.focus();
    return;
  }

  const duplicate = tasks.some(
    task => task.text.toLowerCase() === cleanText.toLowerCase()
  );

  if (duplicate) {
    alert("That task already exists.");
    taskInput.focus();
    return;
  }

  tasks.unshift(createTask(cleanText));
  saveTasks();
  render();
  taskInput.value = "";
  taskInput.focus();
}

function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  saveTasks();
  render();
}

function editTask(id) {
  const task = tasks.find(item => item.id === id);
  if (!task) return;

  const updatedText = prompt("Edit task:", task.text);
  if (updatedText === null) return;

  const cleanText = updatedText.trim();
  if (!cleanText) return;

  const duplicate = tasks.some(
    item => item.id !== id && item.text.toLowerCase() === cleanText.toLowerCase()
  );

  if (duplicate) {
    alert("Another task already has that name.");
    return;
  }

  task.text = cleanText;
  saveTasks();
  render();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  render();
}

form.addEventListener("submit", event => {
  event.preventDefault();
  addTask(taskInput.value);
});

searchInput.addEventListener("input", event => {
  searchTerm = event.target.value.trim();
  render();
});

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;

    filterButtons.forEach(btn =>
      btn.classList.toggle("active", btn === button)
    );

    render();
  });
});

clearCompletedBtn.addEventListener("click", () => {
  tasks = tasks.filter(task => !task.completed);
  saveTasks();
  render();
});

deleteAllBtn.addEventListener("click", () => {
  if (!tasks.length) return;

  const confirmed = confirm("Delete all tasks? This cannot be undone.");
  if (!confirmed) return;

  tasks = [];
  saveTasks();
  render();
});

function applyTheme(theme) {
  const dark = theme === "dark";
  document.body.classList.toggle("dark", dark);
  themeBtn.textContent = dark ? "☀️" : "🌙";
  themeBtn.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
}

themeBtn.addEventListener("click", () => {
  const nextTheme = document.body.classList.contains("dark") ? "light" : "dark";
  localStorage.setItem(THEME_KEY, nextTheme);
  applyTheme(nextTheme);
});

applyTheme(localStorage.getItem(THEME_KEY) || "light");
render();
