// Inicial
let Tareas = [
    { id: 1, description: "Ir al supermercado", completed: false },
    { id: 2, description: "Estudiar para la prueba", completed: false },
    { id: 3, description: "Sacar a pasear al perro", completed: false }
];

const TareaInput = document.getElementById("TareaInput");
const addTareaBtn = document.getElementById("addTareaBtn");
const TareaList = document.getElementById("TareaList");
const totalTareas = document.getElementById("totalTareas");
const completedTareas = document.getElementById("completedTareas");

function renderTareas() {
    TareaList.innerHTML = ""; // Limpia
    Tareas.forEach(Tarea => {
        const li = document.createElement("li");
        li.className = "TareaItem";

        const idSpan = document.createElement("span");
        idSpan.textContent = Tarea.id;
        li.appendChild(idSpan);

        const descSpan = document.createElement("span");
        descSpan.textContent = Tarea.description;
        if (Tarea.completed) {
            descSpan.style.textDecoration = "line-through";
            descSpan.style.color = "gray";
        }
        li.appendChild(descSpan);

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = Tarea.completed;
        checkbox.addEventListener("click", () => toggleTareaCompletion(Tarea.id));
        li.appendChild(checkbox);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";
        deleteBtn.className = "deleteBtn";
        deleteBtn.addEventListener("click", () => deleteTarea(Tarea.id));
        li.appendChild(deleteBtn);

        TareaList.appendChild(li);
    });

    // Actualizar contadores
    totalTareas.textContent = Tareas.length;
    completedTareas.textContent = Tareas.filter(Tarea => Tarea.completed).length;
}

// Función para agregar una nueva tarea
function addTarea() {
    const description = TareaInput.value.trim();
    if (description === "") return; // No agregar si el input está vacío

    const newTarea = {
        id: Tareas.length > 0 ? Tareas[Tareas.length - 1].id + 1 : 1,
        description,
        completed: false
    };

    Tareas.push(newTarea);
    TareaInput.value = "";
    renderTareas(); // Volver a renderizar las tareas
}

// Elimina
function deleteTarea(id) {
    Tareas = Tareas.filter(Tarea => Tarea.id !== id);
    renderTareas();
}

// Marca una tarea como completada
function toggleTareaCompletion(id) {
    const Tarea = Tareas.find(Tarea => Tarea.id === id);
    if (Tarea) {
        Tarea.completed = !Tarea.completed;
        renderTareas();
    }
}

// Eventos
addTareaBtn.addEventListener("click", addTarea);
document.addEventListener("DOMContentLoaded", renderTareas); // Cargar tareas al inicio
