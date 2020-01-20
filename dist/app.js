/*********************
  1. Element Hooks
**********************/

// Task Container
let article = document.querySelector("article");

// Add Button
let add = document.querySelector("button#add-btn");

// Add Input
let addInput = document.querySelector("input#add-inp");

// Clear Button
let clear = document.querySelector("button#clear-btn");

// Filter Input
let filterInput = document.querySelector("input#filter-inp");

/*********************
  2. Get local storage
**********************/
tasks = JSON.parse(localStorage.getItem("tasks"));
if (tasks == null) {
  tasks = [];
}
tasks.forEach(function(task) {
  createDomTask(task);
});

/*********************
  3. Create new DOM task
**********************/
function createDomTask(task) {
  // Create elements
  let newTask = document.createElement("div");
  let newPara = document.createElement("p");
  let newTextNode = document.createTextNode(task);
  let newI = document.createElement("i");

  // Configure elements
  newPara.appendChild(newTextNode);
  newI.className = "fas fa-times";

  // Append to parent
  newTask.appendChild(newPara);
  newTask.appendChild(newI);
  article.appendChild(newTask);
}

/*********************
  4. Add Event
**********************/
add.addEventListener("click", function(e) {
  e.preventDefault();

  if (addInput.value != null && addInput.value.trim() != "") {
    createDomTask(addInput.value);
    updateLocalStorage(addInput.value);
    addInput.value = "";
  }
});

/*********************
  5. Update local storage
**********************/
function updateLocalStorage(task) {
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

/*********************
  6. Clear Event
**********************/
clear.addEventListener("click", function(e) {
  e.preventDefault();

  // Clear tasks from DOM
  article.innerHTML = "";

  // Clear Local Storage
  tasks = [];
  localStorage.setItem("tasks", JSON.stringify([]));
});

/*********************
  7. Filter Event
**********************/
filterInput.addEventListener("keyup", function(e) {
  // Clear tasks from DOM
  article.innerHTML = "";

  tasks.forEach(function(task) {
    if (task.toLowerCase().includes(filterInput.value.toLowerCase())) {
      createDomTask(task);
    }
  });
});

/*********************
  7. Delete Event
**********************/
article.addEventListener("click", function(e) {
  if (e.target.className === "fas fa-times") {
    let proceed = confirm("Are you sure you wanna delete this todo?");
    if (proceed) {
      e.target.parentElement.remove();
      // Remove task from array based on index
      tasks.splice(tasks.indexOf(e.target.previousSibling.textContent), 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }
});
