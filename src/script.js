const addBtn = document.getElementById("add-btn");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const themeToggle = document.getElementById("toggle-theme");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
renderTasks();

addBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (text !== "") {
    tasks.push({ text, completed: false });
    updateStorage();
    renderTasks();
    taskInput.value = "";
  }
});

taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addBtn.click();
});

themeToggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
});

function updateStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";

  const sorted = [...tasks].sort((a, b) => a.completed - b.completed);

  sorted.forEach((task) => {
    const li = document.createElement("li");
    li.textContent = task.text;
    if (task.completed) li.classList.add("completed");

    li.addEventListener("click", () => {
      if (!task.completed) {
        task.completed = true;
        li.classList.add("completed");
        updateStorage();
        renderTasks();

        setTimeout(() => {
          if (task.completed) {
            tasks = tasks.filter(t => t !== task);
            updateStorage();
            renderTasks();
          }
        }, 60000);
      }
    });

    taskList.appendChild(li);
  });
}
