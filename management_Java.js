const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const remainingTasks = document.getElementById("remainingTasks");
const greeting = document.getElementById("greeting");
const userNameSpan = document.getElementById("userName");
const loginModal = document.getElementById("loginModal");
const nameInput = document.getElementById("nameInput");
const confirmLogin = document.getElementById("confirmLogin");
const cancelLogin = document.getElementById("cancelLogin");

// Load saved name on page load
const savedName = localStorage.getItem("taskAppUserName");
if (savedName) {
    userNameSpan.textContent = savedName;
}

// Open modal when greeting is clicked
greeting.addEventListener("click", function () {
    nameInput.value = userNameSpan.textContent === "User" ? "" : userNameSpan.textContent;
    loginModal.classList.remove("hidden");
    nameInput.focus();
});

// Confirm login
confirmLogin.addEventListener("click", function () {
    const name = nameInput.value.trim();
    if (name !== "") {
        userNameSpan.textContent = name;
        localStorage.setItem("taskAppUserName", name);
    }
    loginModal.classList.add("hidden");
});

// Cancel
cancelLogin.addEventListener("click", function () {
    loginModal.classList.add("hidden");
});

// Allow Enter key to submit
nameInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") confirmLogin.click();
});


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
// Weather Statisics 

async function getWeather(){

    try {

        const response = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=-33.9249&longitude=18.4241&current_weather=true"
        );

        const data = await response.json();

        const temperature =
        data.current_weather.temperature;

        const wind =
        data.current_weather.windspeed;

        document.getElementById("weather").innerHTML =
        `
        Temperature: ${temperature}°C <br>
        Wind Speed: ${wind} km/h
        `;

    } catch(error){

        document.getElementById("weather").textContent =
        "Unable to load weather";

        console.error(error);
    }
}
getWeather();

// Daily Motivational Quotes

async function getQuote() {

    try {

        const response = await fetch("https://dummyjson.com/quotes/random");

        const data = await response.json();

        console.log(data);

        document.getElementById("quote").innerHTML = `
            "${data.quote}"
            <br><br>
            - ${data.author}
        `;

    } catch (error) {

        console.error(error);

    }

}

getQuote();