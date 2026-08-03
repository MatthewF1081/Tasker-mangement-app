const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const fetchTaskButton = document.getElementById("fetchTaskButton");

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") return;

    const li = document.createElement("li");
    li.innerHTML = `${taskText} <button class="delete">Delete</button>`;
    taskList.appendChild(li);

    taskInput.value = "";
}

addTaskButton.addEventListener("click", addTask);

function deleteTask(e) {
    if (e.target.classList.contains("delete")) {
        e.target.parentElement.remove();
    }
}

taskList.addEventListener("click", deleteTask);

async function fetchTask() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5");
        const data = await response.json();

        data.forEach(task => {
            const li = document.createElement("li");
            li.innerHTML = `${task.title} <button class="delete">Delete</button>`;
            taskList.appendChild(li);
        });

    } catch (error) {
        console.error("An error occurred while fetching tasks:", error);
    }
}

fetchTaskButton.addEventListener("click", fetchTask);