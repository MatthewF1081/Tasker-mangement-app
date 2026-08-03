const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const remainingTasks = document.getElementById("remainingTasks");


// Add Task

function addTask() {

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        return;
    }


    const li = document.createElement("li");

    li.innerHTML = `
        <label>
            <input type="checkbox" class="complete">
            <span>${taskText}</span>
        </label>

        <button class="delete">
            Delete
        </button>
    `;


    taskList.appendChild(li);

    taskInput.value = "";

    updateDashboard();

}

// Add button event

addTaskButton.addEventListener("click", addTask);

// Complete task

taskList.addEventListener("change", function(e) {


    if (e.target.classList.contains("complete")) {


        e.target.closest("li")
        .classList.toggle("completed");


        updateDashboard();

    }

});

// Delete task

taskList.addEventListener("click", function(e){


    if(e.target.classList.contains("delete")){


        e.target.closest("li").remove();


        updateDashboard();

    }


});

// Update statistics

function updateDashboard(){


    const tasks = document.querySelectorAll("#taskList li");

    const completed =
    document.querySelectorAll(".complete:checked");


    totalTasks.textContent = tasks.length;


    completedTasks.textContent =
    completed.length;


    remainingTasks.textContent =
    tasks.length - completed.length;


}