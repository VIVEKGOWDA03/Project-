document.addEventListener("DOMContentLoaded",()=>{
    const storedTasks =JSON.parse(localStorage.getItem('tasks'))
    if(storedTasks){
        storedTasks.forEach((tasks)=> tasks.push(tasks))
        updateTasksList();
        updateStats();
    }
})

let tasks = [];
const saveTasks=()=>{
    localStorage.setItem('tasks',JSON.stringify(tasks))
}

const addTask = () => {
  const taskInput = document.getElementById("taskInput");
  const text = taskInput.value.trim();
  if (text) {
    tasks.push({ text: text, completed: false }); // Adds a new task with completed set to false
    taskInput.value ="";
    updateTasksList();
    updateStats(); // Corrected by adding the parentheses
    saveTasks();
  }
};

const toggleTaskComplete = (index) => {
  tasks[index].completed = !tasks[index].completed; // Toggles the completed state of the task
  updateTasksList(); // Updates the task list to reflect changes
  updateStats(); // Corrected by adding the parentheses
  saveTasks();

};
const deleteTask = (index) => {
  tasks.splice(index, 1);
  updateTasksList();
  updateStats(); // Corrected by adding the parentheses
  saveTasks();


};
const editTask = (index) => {
  const taskInput = document.getElementById("taskInput");
  taskInput.value = tasks[index].text;
  tasks.splice(index, 1);
  updateTasksList();
  updateStats(); // Corrected by adding the parentheses
  saveTasks();
  

};
const updateStats = () => {
  const completeTasks = tasks.filter((task) => task.completed).length;
  const totaltask = tasks.length;
  const progress = (completeTasks / totaltask) * 100;
  const progressBar = document.getElementById("progress");
  
  progressBar.style.width = `${progress}%`; // Corrected to use the assignment operator

document.getElementById('numbers').innerText = `${completeTasks} /${totaltask} `
if(tasks.length && completeTasks === totaltask){
    blastConfetti();
}
};

const updateTasksList = () => {
  const taskList = document.querySelector(".task-list"); // Selects the task list element
  taskList.innerHTML = ""; // Clears the current task list
  tasks.forEach((task, index) => {
    const listItem = document.createElement("li"); // Creates a new list item for each task
    listItem.innerHTML = `
        <div class="taskItem">
            <div class="task ${
              task.completed ? "completed" : ""
            }"> <!-- Applies the completed class if the task is completed -->
                <input type="checkbox" class="checkbox" ${
                  task.completed ? "checked" : ""
                }/> <!-- Marks the checkbox as checked if the task is completed -->
                <p>${task.text}</p>
            </div>
            <div class="icons">
                <img src="./edit.svg" onClick="editTask(${index})"/>
                <img src="./delete.svg" onClick="deleteTask(${index})"/>
            </div>
        </div>
        `;
    listItem.addEventListener("change", () => toggleTaskComplete(index)); // Adds an event listener to toggle task completion
    taskList.append(listItem); // Appends the task item to the task list
  });
};

document.getElementById("newTask").addEventListener("click", function (e) {
  e.preventDefault();
  addTask(); // Adds a new task when the button is clicked
});


const blastConfetti =()=>{
    const end = Date.now() + 15 * 1000;

// go Buckeyes!
const colors = ["#bb0000", "#ffffff"];

(function frame() {
  confetti({
    particleCount: 2,
    angle: 60,
    spread: 55,
    origin: { x: 0 },
    colors: colors,
  });

  confetti({
    particleCount: 2,
    angle: 120,
    spread: 55,
    origin: { x: 1 },
    colors: colors,
  });

  if (Date.now() < end) {
    requestAnimationFrame(frame);
  }
})();
}