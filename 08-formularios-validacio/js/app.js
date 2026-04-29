'use strict';

const formRegistro = document.querySelector('#form-registro');
const inputPassword = document.querySelector('#password');
const inputConfirmarPassword = document.querySelector('#confirmar_password');
const inputTelefono = document.querySelector('#telefono');
const passwordStrength = document.querySelector('#password-strength');
const btnEnviar = document.querySelector('#btn-enviar');
const btnLimpiar = document.querySelector('#btn-limpiar');

const mensajeEstado = document.querySelector('#mensaje-estado');
const resultadoRegistro = document.querySelector('#resultado-registro');

/* FUNCIONES */

function validarCampoConFeedback(campo) {
  const resultado = ValidacionService.validarCampo(campo);

  if (!resultado.valido) {
    mostrarError(campo, resultado.error);
  } else {
    limpiarError(campo);
  }
}

function actualizarIndicadorFuerza(password) {
  if (!password) {
    passwordStrength.textContent = '';
    passwordStrength.className = 'password-strength';
    return;
  }

  const fuerza = ValidacionService.evaluarFuerzaPassword(password);

  passwordStrength.textContent = `Fortaleza: ${fuerza.nivel}`;
  passwordStrength.className = `password-strength ${fuerza.clase}`;
}

function verificarCamposLlenos(form) {
  const campos = form.querySelectorAll('[required]');
  return [...campos].every(c => c.type === 'checkbox' ? c.checked : c.value.trim());
}

function actualizarBotonEnviar(form) {
  const todos = verificarCamposLlenos(form);
  btnEnviar.disabled = !todos;
}

function procesarEnvio(formData) {
  const datos = Object.fromEntries(formData);
  datos.terminos = formRegistro.querySelector('#terminos').checked;

  console.log('Datos a enviar:', datos);

  mostrarMensajeTemporal(
    mensajeEstado,
    MensajeExito('Registro completado exitosamente.'),
    5000
  );

  renderizarResultado(datos, resultadoRegistro);

  formRegistro.reset();

  const campos = formRegistro.querySelectorAll('input, select');
  campos.forEach(c => c.classList.remove('campo--valido', 'campo--error'));

  passwordStrength.textContent = '';
  actualizarBotonEnviar(formRegistro);

  resultadoRegistro.scrollIntoView({ behavior: 'smooth' });
}

/* EVENTOS */

formRegistro.addEventListener('submit', e => {
  e.preventDefault();

  const valido = ValidacionService.validarFormulario(formRegistro);

  if (!valido) {
    mostrarMensajeTemporal(
      mensajeEstado,
      MensajeError('Corrige los errores del formulario'),
      4000
    );

    const error = formRegistro.querySelector('.campo--error');
    if (error) error.scrollIntoView({ behavior: 'smooth' });

    return;
  }

  const formData = new FormData(formRegistro);
  procesarEnvio(formData);
});

formRegistro.addEventListener('focusout', e => {
  if (e.target.matches('input, select')) {
    validarCampoConFeedback(e.target);
  }
});

formRegistro.addEventListener('input', e => {
  if (campo.matches('input, select')) {
    limpiarError(campo);
  }
  actualizarBotonEnviar(formRegistro);
});

inputPassword.addEventListener('input', e => {
  actualizarIndicadorFuerza(e.target.value);
});

inputTelefono.addEventListener('input', e => {
  aplicarMascaraTelefono(e.target);
});

btnLimpiar.addEventListener('click', () => {
  if (confirm('¿Estás seguro de que deseas limpiar el formulario?')) {

    formRegistro.reset();

    const campos = formRegistro.querySelectorAll('input, select, textarea');
    campos.forEach(campo => {
      campo.classList.remove('campo--valido', 'campo--error');

      const errorDiv = campo.parentElement.querySelector('.error-mensaje');
      if (errorDiv) errorDiv.textContent = '';
    });

    passwordStrength.textContent = '';
    passwordStrength.className = 'password-strength';

    limpiarResultado(resultadoRegistro);
    mensajeEstado.classList.add('oculto');

    actualizarBotonEnviar(formRegistro);

    document.querySelector('#nombre').focus();
  }
});

/* INIT */
actualizarBotonEnviar(formRegistro);