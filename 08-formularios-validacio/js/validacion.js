'use strict';

function validarCampo(campo) {
  const valor = campo.value.trim();
  let error = '';

  // Nombre
  if (campo.name === 'nombre') {
    if (valor.length < 3) {
      error = 'Mínimo 3 caracteres';
    }
  }

  // Email
  if (campo.name === 'email') {
    const regex = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(valor)) {
      error = 'Email inválido';
    }
  }

  // Teléfono (10 dígitos)
  if (campo.name === 'telefono') {
    const regex = /^\d{10}$/;
    if (!regex.test(valor)) {
      error = 'Debe tener 10 dígitos';
    }
  }

  // Contraseña
  if (campo.name === 'password') {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!regex.test(valor)) {
      error = 'Min 8, mayúscula, minúscula y número';
    }
  }

  mostrarError(campo, error);

  return error === '';
}

function validarFormulario(form) {
  let valido = true;

  const campos = form.querySelectorAll('input, select');

  campos.forEach(campo => {
    if (!validarCampo(campo)) {
      valido = false;
    }
  });

  // Confirmar contraseña
  const pass = form.password.value;
  const confirm = form.confirmar.value;

  if (pass !== confirm) {
    mostrarError(form.confirmar, 'No coinciden');
    valido = false;
  }

  // Checkbox
  if (!form.terminos.checked) {
    alert('Debes aceptar términos');
    valido = false;
  }

  return valido;
}

function mostrarError(campo, mensaje) {
  campo.classList.remove('valido', 'error');

  let msg = campo.nextElementSibling;

  if (!msg || !msg.classList.contains('mensaje-error')) {
    msg = document.createElement('div');
    msg.className = 'mensaje-error';
    campo.parentNode.insertBefore(msg, campo.nextSibling);
  }

  msg.textContent = mensaje;

  if (mensaje) {
    campo.classList.add('error');
  } else {
    campo.classList.add('valido');
  }
}