// Selección de elementos en el DOM
const fecha = document.querySelector('#fecha');
const lista = document.querySelector('#lista');
const input = document.querySelector('#input');
const botonEnter = document.querySelector('#boton-enter');
const check = 'far fa-check-circle'; // Clases originales para el icono de "check"
const uncheck = 'far fa-circle co';   // Clases originales para el icono de "uncheck"
const lineThrough = 'line-through';   // Clase para marcar texto como tachado
let id = 0;
const LIST=[]


// Función para agregar tarea
function agregarTarea(tarea, id, realizado, eliminado) {
    if (eliminado) return;

    const REALIZADO = realizado ? check : uncheck;
    const LINE = realizado ? lineThrough : '';

    const elemento = `
        <li id="elemento">
            <i class="${REALIZADO}" data="realizado" id="${id}"></i>
            <p class="text ${LINE}">${tarea}</p>
            <i class="fas fa-trash de" data="eliminado" id="${id}"></i>
        </li>
    `;
    lista.insertAdjacentHTML("beforeend", elemento);
}

// Función para marcar tarea como realizada
function tareaRealizada(element) {
    // Código original: Cambia entre las clases de "check" y "uncheck" con espacios
    // Esto causa un error porque classList.toggle no soporta clases con espacios
    // element.classList.toggle(check);
    // element.classList.toggle(uncheck);

    // Nuevo código que manipula las clases de forma específica para alternar entre los iconos
    if (element.classList.contains('fa-circle')) {
        // Si el icono actual es el círculo (no realizado), cambiar a check (realizado)
        element.classList.remove('fa-circle');
        element.classList.add('fa-check-circle');
        
    } else {
        // Si el icono actual es check (realizado), cambiar a círculo (no realizado)
        element.classList.remove('fa-check-circle');
        element.classList.add('fa-circle');
        
    }
    console.log(element.classList);
    element.parentNode.querySelector('.text').classList.toggle(lineThrough);
}

//funcion de eliminar tarea

function tareaEliminada(element) {
    element.parentNode.parentNode.removeChild(element.parentNode)
}

// Evento para añadir tarea al hacer clic en el botón
botonEnter.addEventListener('click', () => {
    const tarea = input.value;
    if (tarea) {
        agregarTarea(tarea, id, false, false);
        LIST.push({ 
            nombre: tarea,
            id:id,
            realizado:false,
            eliminado:false
        })
    }
    input.value = '';
    id++;
});

// Evento para añadir tarea al presionar Enter
document.addEventListener('keyup', function(event) {
    if (event.key == 'Enter') {
        const tarea = input.value;
        if (tarea) {
            agregarTarea(tarea, id, false, false);
            LIST.push({ 
                nombre: tarea,
                id:id,
                realizado:false,
                eliminado:false
            })
        }
        input.value = '';
        id++;
    }
});

console.log(LIST)

// Evento para manejar el marcado y eliminación de tareas
lista.addEventListener('click', function(event) {
    const element = event.target;
    const elementData = element.attributes.data.value;

    if (elementData === 'realizado') {
        tareaRealizada(element);
    } else if (elementData === 'eliminado') {
        tareaEliminada(element);
    }
});
