const input = document.querySelector("#input");
const addTaskButton = document.querySelector("#addTaskBtn");
const list = document.querySelector("#list");
let tasks = [];

// Ye code sabse pehly chalo
const savedTasks = JSON.parse(localStorage.getItem("tasks"));
console.log("TASKS IN LOCALSTORAGE: ", savedTasks);

if (savedTasks) {
  tasks = savedTasks;
  renderTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function Render
function renderTasks() {
  list.innerHTML = "";

  tasks.map((taskInput, index) => {
    // Task ka child bana rahy hain
    const task = document.createElement("div");

    const taskText = document.createElement("span");
    taskText.textContent = taskInput;

    task.appendChild(taskText);

    // Task k div me edit ka button append karo
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    task.appendChild(editBtn);

    editBtn.addEventListener("click", () => {
      const newValue = prompt("Edit your task:");

      if (newValue !== null && newValue !== "") {
        tasks[index] = newValue;
        saveTasks();
        renderTasks();
      }
    });

    // Task k div me delete button append karna hai
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    task.appendChild(deleteBtn);

    deleteBtn.addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
      //   list.removeChild(task);
    });

    // Append karo parent list me
    list.appendChild(task);
  });
}

// Add Task Event Listener
addTaskButton.addEventListener("click", () => {
  tasks.push(input.value);
  console.log("TASKS ", tasks);

  saveTasks();
  renderTasks();

  // Input field ki value ura do
  input.value = "";
});
