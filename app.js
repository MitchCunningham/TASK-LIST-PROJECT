// Define UI VARS
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

//Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // DOM load event
  document.addEventListener("DOMContentLoaded", getTasks);
  //Add task event
  form.addEventListener("submit", addTask);
  // Remove task event
  taskList.addEventListener("click", removeTask);
  // Clearn task event
  clearBtn.addEventListener("click", clearTasks);
  // Filter Tasks event
  filter.addEventListener("keyup", filterTasks);
}

// Get Tasks from local storage // THIS WHOLE FUNCTION GETS TASKS TO SAVE AND BE RETRIEVED FROM LOCAL STORAGE
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (tasks) {
    // Create li element
    const li = document.createElement("li");
    // Add class
    li.className = "collection-item";
    // Create text node and append to li
    li.appendChild(document.createTextNode(task));
    // Create new link element
    const link = document.createElement("a");
    //Add Class
    link.className = "delete-item secondary-content";
    // Add icon html
    link.innerHTML = "<i class='fa fa-remove'></i>";
    //Append the link to li
    li.appendChild(link);

    //Append li to ul
    taskList.appendChild(li);
  });
}

// Add Task
function addTask(e) {
  if (taskInput.value === "") {
    alert("Add a task");
  }
  // Create li element
  const li = document.createElement("li");
  // Add class
  li.className = "collection-item";
  // Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element
  const link = document.createElement("a");
  //Add Class
  link.className = "delete-item secondary-content";
  // Add icon html
  link.innerHTML = "<i class='fa fa-remove'></i>";
  //Append the link to li
  li.appendChild(link);

  //Append li to ul
  taskList.appendChild(li);

  // STORE IN LOCAL STORAGE
  storeTaskInLocalStorage(taskInput.value);

  //Clear input
  taskInput.value = "";

  console.log(li);

  e.preventDefault();
}

// Store task
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are You Sure?")) {
      e.target.parentElement.parentElement.remove();

      // Remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove from Local storage
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Clear Tasks
function clearTasks() {
  //taskList.innerHTML = "";

  // Faster way to clear tasks
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  // Clear from Local storage
  clearTasksFromLocalStorage();
}

// Clear TASKS from local storage
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// Filter tasks    FIND WHICH TASKS YOUVE ADDED BY SEARCHING FOR IT
function filterTasks(e) {
  // FOR EACH LOOP
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;
    //
    if (
      item.toLowerCase().indexOf(text) != //<< this means not equalto>>
      -1
    ) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
