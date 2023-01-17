//Declaración de variables globales
const user = document.getElementById('user');
const passwd = document.getElementById('passwd');
const pedirCarta = document.getElementById('Cards');
const nuevoJuego = document.getElementById('NewGame');
const detener = document.getElementById('Reboot');
const numeros = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'A', 'J', 'Q', 'K'];
const palo = ['C', 'D', 'H', 'S'];
let baraja = [];
let barajaJ = [];
let barajaC = [];
let contador = 0;
let punto = 0;
baraja = generarBaraja();

//Funciones

//Crea la baraja añadiendo las cartas en un array y se barajan las cartas
function generarBaraja() {

    for (let i = 0; i < palo.length; i++) {
        for (let j = 0; j < numeros.length; j++) {
            baraja.push(numeros[j] + palo[i]);

        }

    }
    return _.shuffle(baraja);
}


//Añade la etiqueta img al código HTML con el atributo src
function mostrarCarta(contenedor, arreglo) {
    const img = document.getElementById(contenedor);
    const imag = document.createElement('img');
    img.append(imag);
    imag.setAttribute('src', 'cartas/' + baraja[contador] + '.png');
    arreglo.push(baraja[contador]);
    contador++;
}


/*Coge las cartas y obtiene el primer carácter (4H -> obtendrá 4),
lo multiplicamos por 1 para convertirlo en un número y lo suma*/

function puntos(barajas) {
    let suma = 0;

    barajas.forEach(cartas => {
        num = cartas.substring(0, cartas.length - 1);
        if (isNaN(num) && num == 'A') suma += 11 * 1;
        else if (isNaN(num)) suma += 10 * 1;
        else suma += num * 1;
    });

    return suma;
}

//Imprime los puntos en el HTML
function mostrarPuntos(barajas, tipoPunto) {
    punto = puntos(barajas);
    const punt = document.querySelector(tipoPunto);
    punt.innerText = punto;

}

//Devuelve el valor 0 a los puntos para el nuevo juego
function resetearPuntos(tipoPunto) {
    punto = 0;
    const punt = document.querySelector(tipoPunto);
    punt.innerText = punto;
}

/*Realiza una comparación de los puntos del jugador
y la máquina para saber quien ha ganado y lo muestra a través de un alert */

function comprobarPuntos() {
    const puntJ = document.getElementById('puntosJ').textContent;
    const puntC = document.getElementById('puntosC').textContent;

    if ((puntJ < 21 || puntJ == 21) && (puntC > 21)) {
        alert('Ha ganado el jugador');
        pedirCarta.disabled = true;
        detener.disabled = true;
    } else if (puntC == puntJ) {
        alert('Empate');
        pedirCarta.disabled = true;
        detener.disabled = true;
    } else {
        alert('Ha ganado la computadora');
        pedirCarta.disabled = true;
        detener.disabled = true;
    }
}


//Computadora
function computadora() {
    while (puntos(barajaC) < puntos(barajaJ)) {
        mostrarCarta('cartaC', barajaC);
        mostrarPuntos(barajaC, '#puntosC');
    }
}


//Botones
pedirCarta.addEventListener('click', function() {

    mostrarCarta('cartaJ', barajaJ);
    mostrarPuntos(barajaJ, '#puntosJ');

    const punt = document.getElementById('puntosJ').textContent;

    setTimeout(function() {

        if (punt > 21) {
            mostrarCarta('cartaC', barajaC);
            mostrarPuntos(barajaC, '#puntosC');
            setTimeout(function() { comprobarPuntos(); }, 250);

        } else if (punt == 21) {
            computadora();
            setTimeout(function() { comprobarPuntos(); }, 250);
        }
    }, 200);

});


nuevoJuego.addEventListener('click', function() {
    let cartas = document.getElementById("cartaJ");
    while (cartas.firstChild) {
        cartas.removeChild(cartas.firstChild);
    }
    let cartas2 = document.getElementById("cartaC");
    while (cartas2.firstChild) {
        cartas2.removeChild(cartas2.firstChild);
    }
    baraja = [];
    barajaJ = [];
    barajaC = [];
    baraja = generarBaraja();
    resetearPuntos('#puntosJ');
    resetearPuntos('#puntosC');
    pedirCarta.disabled = false;
    detener.disabled = false;

});


detener.addEventListener('click', function() {
    computadora();
    setTimeout(function() { comprobarPuntos(); }, 250);
})