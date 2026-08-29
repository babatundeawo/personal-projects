// State Management
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";
let searchQuery = "";

// DOM Elements
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const searchInput = document.getElementById("search");
const filterBtns = document.querySelectorAll(".filter-btn");
const activeCountEl = document.getElementById("activeCount");
const completedCountEl = document.getElementById("completedCount");
const clearCompletedBtn = document.getElementById("clearCompletedBtn");
const deleteAllBtn = document.getElementById("deleteAllBtn");

// Save state to Local Storage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Render Tasks based on state, filter, and search
function render() {
  taskList.innerHTML = "";

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter =
      currentFilter === "all"
        ? true
        : currentFilter === "completed"
        ? task.completed
        : !task.completed;

    const matchesSearch = task.text.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  filteredTasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = `task-item ${task.completed ? "completed" : ""}`;

    li.innerHTML = `
      <div class="task-content">
        <input type="checkbox" ${task.completed ? "checked" : ""} data-id="${task.id}" class="toggle-check">
        <span class="task-text">${escapeHTML(task.text)}</span>
      </div>
      <div class="task-actions">
        <button type="button" class="action-icon edit" data-id="${task.id}">✏️</button>
        <button type="button" class="action-icon delete" data-id="${task.id}">❌</button>
      </div>
    `;

    taskList.appendChild(li);
  });

  updateCounters();
}

// Prevent XSS attacks
function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

// Update task counters
function updateCounters() {
  const activeCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;

  activeCountEl.textContent = `${activeCount} active`;
  completedCountEl.textContent = `${completedCount} completed`;
}

// Event: Add Task (Handles Empty & Duplicate checks)
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = taskInput.value.trim();

  if (!text) return;

  const isDuplicate = tasks.some((t) => t.text.toLowerCase() === text.toLowerCase());
  if (isDuplicate) {
    alert("This task already exists!");
    return;
  }

  const newTask = {
    id: Date.now(),
    text: text,
    completed: false,
  };

  tasks.push(newTask);
  saveTasks();
  render();
  taskInput.value = "";
});

// Event Delegation for Delete, Toggle Complete, and Edit
taskList.addEventListener("click", (e) => {
  const id = Number(e.target.dataset.id);

  // Toggle Complete
  if (e.target.classList.contains("toggle-check")) {
    tasks = tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
  }

  // Delete Task
  if (e.target.classList.contains("delete")) {
    tasks = tasks.filter((t) => t.id !== id);
  }

  // Edit Task
  if (e.target.classList.contains("edit")) {
    const taskToEdit = tasks.find((t) => t.id === id);
    if (!taskToEdit) return;

    const newText = prompt("Edit task:", taskToEdit.text);
    if (newText !== null && newText.trim() !== "") {
      taskToEdit.text = newText.trim();
    }
  }

  saveTasks();
  render();
});

// Event: Search Input
searchInput.addEventListener("input", (e) => {
  searchQuery = e.target.value;
  render();
});

// Event: Filters
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    render();
  });
});

// Event: Clear Completed
clearCompletedBtn.addEventListener("click", () => {
  tasks = tasks.filter((t) => !t.completed);
  saveTasks();
  render();
});

// Event: Delete All
deleteAllBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to delete all tasks?")) {
    tasks = [];
    saveTasks();
    render();
  }
});

// Initial Render
render();
