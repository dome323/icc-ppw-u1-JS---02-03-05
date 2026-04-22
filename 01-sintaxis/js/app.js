'use strict';

const nombre = 'Domenica';
const apellido = 'Uyunkar';
let edad = 20;
const carrera = 'Ingeniería en Computación';
let semestre = 5;
const activo = true;
const materias = ['Redes', 'Programación', 'Base de Datos'];

const direccion = {
    ciudad: 'Cuenca',
    provincia: 'Azuay'
};

// Mostrar en consola
console.log('Datos del estudiante');
console.table({ nombre, apellido, edad, carrera, semestre, activo, materias, direccion });


const calcularPromedio = (notas) => {
    const suma = notas.reduce((acc, nota) => acc + nota, 0);
    return suma / notas.length;
};

const esMayorDeEdad = (edad) => edad >= 18;

const formatearNombre = (nombre, apellido) =>
    `${apellido.toUpperCase()}, ${nombre}`;

const generarSaludo = (nombre, hora) => {
    if (hora < 12) return `Buenos días, ${nombre}`;
    if (hora < 18) return `Buenas tardes, ${nombre}`;
    return `Buenas noches, ${nombre}`;
};

// Pruebas en consola
console.log('Promedio:', calcularPromedio([80, 90, 100]));
console.log('Mayor de edad:', esMayorDeEdad(edad));
console.log('Nombre formateado:', formatearNombre(nombre, apellido));
console.log('Saludo:', generarSaludo(nombre, 10));

const estudiantes = [
  { nombre: 'Ana', nota: 85, activo: true },
  { nombre: 'Luis', nota: 42, activo: true },
  { nombre: 'Maria', nota: 93, activo: false },
  { nombre: 'Carlos', nota: 67, activo: true },
  { nombre: 'Sofia', nota: 78, activo: true }
];

// filter
const aprobados = estudiantes.filter(e => e.nota >= 70);

// map
const nombres = estudiantes.map(e => e.nombre);

// reduce (promedio)
const promedioGeneral = estudiantes.reduce((acc, e) => acc + e.nota, 0) / estudiantes.length;

// mejor estudiante
const mejor = estudiantes.reduce((max, e) => e.nota > max.nota ? e : max);

// every
const todosActivos = estudiantes.every(e => e.activo);

// some
const algunoMayor90 = estudiantes.some(e => e.nota > 90);

// Mostrar en consola
console.log('Aprobados:', aprobados);
console.log('Nombres:', nombres);
console.log('Promedio general:', promedioGeneral);
console.log('Mejor estudiante:', mejor);
console.log('Todos activos:', todosActivos);
console.log('Alguno > 90:', algunoMayor90);

document.getElementById('nombre').textContent = `Nombre: ${nombre}`;
document.getElementById('apellido').textContent = `Apellido: ${apellido}`;
document.getElementById('edad').textContent = `Edad: ${edad}`;
document.getElementById('carrera').textContent = `Carrera: ${carrera}`;
document.getElementById('semestre').textContent = `Semestre: ${semestre}`;
document.getElementById('activo').textContent = `Activo: ${activo}`;
document.getElementById('direccion').textContent =
    `Dirección: ${direccion.ciudad}, ${direccion.provincia}`;

// resultados
document.getElementById('promedio').textContent =
    `Promedio: ${promedioGeneral.toFixed(2)}`;

document.getElementById('saludo').textContent =
    generarSaludo(nombre, 10);

document.getElementById('aprobados').textContent =
    `Aprobados: ${aprobados.map(e => e.nombre).join(', ')}`;

document.getElementById('nombres').textContent =
    `Todos: ${nombres.join(', ')}`;

document.getElementById('mejor').textContent =
    `Mejor: ${mejor.nombre} (${mejor.nota})`;