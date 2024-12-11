// Seleciona os elementos HTML necessários
const newTaskInput = document.getElementById("new-task");
const addTaskButton = document.querySelector("button");

// Cria um container para exibir as tarefas
const tasksContainer = document.createElement("div");
tasksContainer.className = "tasks-container";
document.querySelector(".to-do-list-container").appendChild(tasksContainer);

// Recupera as tarefas do localStorage ou inicializa como um array vazio
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Função para salvar as tarefas no localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Função para renderizar as tarefas
function renderTasks() {
    tasksContainer.innerHTML = ""; // Limpa o container
    tasks.forEach((task, index) => {
        // Cria uma nova div para a tarefa
        const taskItem = document.createElement("div");
        taskItem.className = "task-item";

        // Checkbox para marcar a tarefa como concluída
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => toggleTaskCompletion(index));

        // Texto da tarefa
        const taskText = document.createElement("span");
        taskText.textContent = task.text;
        taskText.style.textDecoration = task.completed ? "line-through" : "none";

        // Botão para remover a tarefa
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-task";
        deleteButton.addEventListener("click", () => removeTask(index));

        // Adiciona os elementos à tarefa
        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskText);
        taskItem.appendChild(deleteButton);

        // Adiciona a tarefa ao container
        tasksContainer.appendChild(taskItem);
    });
}

// Função para adicionar uma nova tarefa
function addTask() {
    const taskValue = newTaskInput.value.trim(); // Obtém o valor do input e remove espaços extras

    if (taskValue) {
        tasks.push({ text: taskValue, completed: false }); // Adiciona a tarefa ao estado local
        saveTasks(); // Salva as tarefas no localStorage
        renderTasks(); // Re-renderiza as tarefas
        newTaskInput.value = ""; // Limpa o input
    } else {
        alert("Please enter a task.");
    }
}

// Função para remover uma tarefa
function removeTask(index) {
    tasks.splice(index, 1); // Remove a tarefa do estado local
    saveTasks(); // Salva as tarefas no localStorage
    renderTasks(); // Re-renderiza as tarefas
}

// Função para alternar o estado de conclusão de uma tarefa
function toggleTaskCompletion(index) {
    tasks[index].completed = !tasks[index].completed; // Altera o estado de conclusão
    saveTasks(); // Salva as tarefas no localStorage
    renderTasks(); // Re-renderiza as tarefas
}

// Adiciona o evento de clique ao botão
addTaskButton.addEventListener("click", addTask);

// Adiciona o evento de pressionar Enter no input
newTaskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});

// Renderiza as tarefas iniciais
renderTasks();
