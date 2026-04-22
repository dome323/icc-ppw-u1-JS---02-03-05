'use strict';

/* =========================
   FORMULARIO
========================= */

const formulario = document.querySelector('#formulario');
const inputNombre = document.querySelector('#nombre');
const inputEmail = document.querySelector('#email');
const selectAsunto = document.querySelector('#asunto');
const textMensaje = document.querySelector('#mensaje');
const charCount = document.querySelector('#chars');
const resultado = document.querySelector('#resultado');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ===== VALIDACIÓN BASE ===== */
function validarCampo(input, esValido, errorId) {
  const errorMsg = document.getElementById(errorId);

  if (esValido) {
    input.classList.remove('error');
    errorMsg.classList.remove('visible');
  } else {
    input.classList.add('error');
    errorMsg.classList.add('visible');
  }

  return esValido;
}

/* ===== VALIDADORES ===== */
function validarNombre() {
  return validarCampo(
    inputNombre,
    inputNombre.value.trim().length >= 3,
    'error-nombre'
  );
}

function validarEmail() {
  return validarCampo(
    inputEmail,
    EMAIL_REGEX.test(inputEmail.value.trim()),
    'error-email'
  );
}

function validarAsunto() {
  return validarCampo(
    selectAsunto,
    selectAsunto.value !== '',
    'error-asunto'
  );
}

function validarMensaje() {
  return validarCampo(
    textMensaje,
    textMensaje.value.trim().length >= 10,
    'error-mensaje'
  );
}

/* ===== CONTADOR ===== */
function actualizarContador(e) {
  const longitud = e.target.value.length;

  charCount.textContent = longitud;
  charCount.style.color = longitud > 270 ? '#e74c3c' : '#999';
}

textMensaje.addEventListener('input', actualizarContador);

/* ===== EVENTOS BLUR ===== */
inputNombre.addEventListener('blur', validarNombre);
inputEmail.addEventListener('blur', validarEmail);
selectAsunto.addEventListener('blur', validarAsunto);
textMensaje.addEventListener('blur', validarMensaje);

/* ===== LIMPIAR ERRORES ===== */
function limpiarError(input, errorId) {
  input.classList.remove('error');
  document.getElementById(errorId).classList.remove('visible');
}

inputNombre.addEventListener('input', () => limpiarError(inputNombre, 'error-nombre'));
inputEmail.addEventListener('input', () => limpiarError(inputEmail, 'error-email'));
selectAsunto.addEventListener('change', () => limpiarError(selectAsunto, 'error-asunto'));
textMensaje.addEventListener('input', () => limpiarError(textMensaje, 'error-mensaje'));

/* ===== MOSTRAR RESULTADO ===== */
function mostrarResultado() {
  resultado.innerHTML = '';

  const titulo = document.createElement('strong');
  titulo.textContent = 'Datos recibidos:';

  const pNombre = document.createElement('p');
  pNombre.textContent = `Nombre: ${inputNombre.value}`;

  const pEmail = document.createElement('p');
  pEmail.textContent = `Email: ${inputEmail.value}`;

  const pAsunto = document.createElement('p');
  pAsunto.textContent = `Asunto: ${selectAsunto.value}`;

  const pMensaje = document.createElement('p');
  pMensaje.textContent = `Mensaje: ${textMensaje.value}`;

  resultado.append(titulo, pNombre, pEmail, pAsunto, pMensaje);
  resultado.classList.add('visible');
}

/* ===== RESET ===== */
function resetearFormulario() {
  formulario.reset();
  charCount.textContent = '0';
  charCount.style.color = '#999';

  [inputNombre, inputEmail, selectAsunto, textMensaje].forEach(c => {
    c.classList.remove('error');
  });

  document.querySelectorAll('.error-msg').forEach(e => {
    e.classList.remove('visible');
  });
}

/* ===== SUBMIT ===== */
formulario.addEventListener('submit', (e) => {
  e.preventDefault();

  const nombreValido = validarNombre();
  const emailValido = validarEmail();
  const asuntoValido = validarAsunto();
  const mensajeValido = validarMensaje();

  if (nombreValido && emailValido && asuntoValido && mensajeValido) {
    mostrarResultado();
    resetearFormulario();
    return;
  }

  if (!nombreValido) return inputNombre.focus();
  if (!emailValido) return inputEmail.focus();
  if (!asuntoValido) return selectAsunto.focus();

  textMensaje.focus();
});

/* ===== ATAJO CTRL + ENTER ===== */
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === 'Enter') {
    e.preventDefault();
    formulario.requestSubmit();
  }
});

/* =========================
   TAREAS
========================= */

const inputNuevaTarea = document.querySelector('#nueva-tarea');
const btnAgregar = document.querySelector('#btn-agregar');
const listaTareas = document.querySelector('#lista-tareas');
const contadorTareas = document.querySelector('#contador-tareas');

let tareas = [
  { id: 1, texto: 'Estudiar JS', completada: false },
  { id: 2, texto: 'Hacer práctica', completada: false },
  { id: 3, texto: 'Subir repo', completada: true }
];

/* ===== CREAR ELEMENTOS ===== */
function crearItemTarea(tarea) {
  const li = document.createElement('li');
  li.className = tarea.completada ? 'completada' : '';
  li.dataset.id = tarea.id;

  const span = document.createElement('span');
  span.textContent = tarea.texto;
  span.dataset.action = 'toggle';

  const btn = document.createElement('button');
  btn.textContent = 'Eliminar';
  btn.dataset.action = 'eliminar';

  li.append(span, btn);
  return li;
}

/* ===== CONTADOR ===== */
function actualizarContadorTareas() {
  const pendientes = tareas.filter(t => !t.completada).length;
  contadorTareas.textContent = `${pendientes} pendiente(s)`;
}

/* ===== RENDER ===== */
function renderizarTareas() {
  listaTareas.innerHTML = '';

  if (tareas.length === 0) {
    const li = document.createElement('li');
    li.textContent = 'No hay tareas';
    listaTareas.appendChild(li);
    return;
  }

  tareas.forEach(t => {
    listaTareas.appendChild(crearItemTarea(t));
  });

  actualizarContadorTareas();
}

/* ===== AGREGAR ===== */
function agregarTarea() {
  const texto = inputNuevaTarea.value.trim();

  if (texto === '') return inputNuevaTarea.focus();

  tareas.push({
    id: Date.now(),
    texto,
    completada: false
  });

  inputNuevaTarea.value = '';
  renderizarTareas();
  inputNuevaTarea.focus();
}

btnAgregar.addEventListener('click', agregarTarea);

inputNuevaTarea.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    agregarTarea();
  }
});

/* ===== DELEGACIÓN ===== */
listaTareas.addEventListener('click', (e) => {
  const action = e.target.dataset.action;
  if (!action) return;

  const li = e.target.closest('li');
  const id = Number(li.dataset.id);

  if (action === 'eliminar') {
    tareas = tareas.filter(t => t.id !== id);
  }

  if (action === 'toggle') {
    const tarea = tareas.find(t => t.id === id);
    tarea.completada = !tarea.completada;
  }

  renderizarTareas();
});

/* ===== INICIAL ===== */
renderizarTareas();