// Variables
const marca = document.querySelector('#marca');
const año = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');
const resultado = document.querySelector('#resultado');
const max = new Date().getFullYear();
const min = max - 10;

// Generar objeto
const datosBusqueda = {
    marca: "",
    year: 0,
    minimo: 0,
    maximo: 0,
    puertas: "",
    transmision: "",
    color: ""
}

document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos(autos); // Pinta en el HTML los AUTOS
    llenarSelect();
})

// AddEventListener para select/formularios
marca.addEventListener('change', () => {    console.log('Evento de cambio en marca');
filtrarAuto()} );
año.addEventListener('change', () => filtrarAuto());
minimo.addEventListener('change', () => filtrarAuto());
maximo.addEventListener('change', () => filtrarAuto());
puertas.addEventListener('change', () => filtrarAuto());
transmision.addEventListener('change', () => filtrarAuto());
color.addEventListener('change', () => filtrarAuto());

// Funciones
function mostrarAutos(autos) {
    limpiarHTML();
    autos.forEach(auto => {
        const { marca, modelo, año, puertas, transmision, precio, color } = auto;
        const autoHTML = document.createElement('p');
        autoHTML.textContent = `${marca} ${modelo} - ${año} - ${puertas} Puertas - Transmisión: ${transmision} - Precio: ${precio} $`;
        resultado.appendChild(autoHTML);
    });
}

function noResultado() {
    limpiarHTML();
    const noResultado = document.createElement('p');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'NO hay Resultados, Intenta con otros términos';
    resultado.appendChild(noResultado);
}

function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function llenarSelect() {
    for (let i = max; i >= min; i--) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        año.appendChild(option);
    }
}

function filtrarAuto() {
    datosBusqueda.marca = marca.value;
    datosBusqueda.year = parseInt(año.value);
    datosBusqueda.minimo = parseInt(minimo.value);
    datosBusqueda.maximo = parseInt(maximo.value);
    datosBusqueda.puertas = puertas.value;
    datosBusqueda.transmision = transmision.value;
    datosBusqueda.color = color.value;

    const resultadoFiltrado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);

    if (resultadoFiltrado.length) {
        mostrarAutos(resultadoFiltrado);
    } else {
        noResultado();
    }
}

function filtrarMarca(auto) {
    return datosBusqueda.marca ? auto.marca === datosBusqueda.marca : true;
}

function filtrarYear(auto) {
    return datosBusqueda.year ? auto.año === datosBusqueda.year : true;
}

function filtrarMinimo(auto) {
    return datosBusqueda.minimo ? auto.precio >= datosBusqueda.minimo : true;
}

function filtrarMaximo(auto) {
    return datosBusqueda.maximo ? auto.precio <= datosBusqueda.maximo : true;
}

function filtrarPuertas(auto) {
    return datosBusqueda.puertas ? auto.puertas === datosBusqueda.puertas : true;
}

function filtrarTransmision(auto) {
    return datosBusqueda.transmision ? auto.transmision === datosBusqueda.transmision : true;
}

function filtrarColor(auto) {
    return datosBusqueda.color ? auto.color === datosBusqueda.color : true;
}
