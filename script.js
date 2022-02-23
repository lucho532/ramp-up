//variables
let tarjetasdestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerresultado = null;
let segundoresultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 60;
let timerinicial = 60;
let tiemporegresivoid = null

//apuntando a documento html
let mostrarmovimientos = document.getElementById('movimientos');
let mostraraciertos = document.getElementById('aciertos');
let mostrartiempo = document.getElementById('t-restante')

//generacion de numeros aleatorios

let numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numeros = numeros.sort(() => { return Math.random() - 0.5 });
console.log(numeros);

//funciones
function contartiempo() {
    tiemporegresivoid = setInterval(() => {
        timer--;
        mostrartiempo.innerHTML = ('Tiempo: ') + timer + ('segundos');
        if (timer === 0) {
            clearInterval(tiemporegresivoid);
            bloqueartarjetas()
            // algo
            alert("GAME OVER")
        }
    }, 1000)
}

function bloqueartarjetas() {
    for (let i = 0; i <= 15; i++) {
        let tarjetabloqueada = document.getElementById(i);
        tarjetabloqueada.innerHTML = numeros[i];
        tarjetabloqueada.disabled = true;
    }
}
//funcion principal
function destapar(id) {

    if (temporizador == false) {
        contartiempo()
        temporizador = true;
    }
    tarjetasdestapadas++;
    console.log(tarjetasdestapadas);

    if (tarjetasdestapadas == 1) {
        //mostrar primer numero
        tarjeta1 = document.getElementById(id);
        primerresultado = numeros[id]
        tarjeta1.innerHTML = primerresultado;

        //deshabilitar primer boton
        tarjeta1.disabled = true;
    } else if (tarjetasdestapadas == 2) {
        //mostrar segundo numero
        tarjeta2 = document.getElementById(id);
        segundoresultado = numeros[id];
        tarjeta2.innerHTML = segundoresultado;

        //deshabilitar segundo boton
        tarjeta2.disabled = true
        //contador de movimientos
        movimientos++;
        mostrarmovimientos.innerHTML = ('movimientos:' + movimientos);

        if (primerresultado == segundoresultado) {
            //encerrar contador de tarjetas destapadas
            tarjetasdestapadas = 0;

            //aumentar aciertos
            aciertos++;
            mostraraciertos.innerHTML = ('aciertos' + aciertos);

            if (aciertos == 8) {
                clearInterval(tiemporegresivoid);
                mostraraciertos.innerHTML = ('aciertos' + aciertos + '😎')
                mostrartiempo.innerHTML = ('felicidades lo has logrado en: ') + (timerinicial - timer) + ('segundos ⏲');
                mostrarmovimientos.innerHTML = ('movimientos:' + movimientos + '🙉');
            }
        } else {
            //mostrar momentaneamente valores y volver a tapar
            setTimeout(() => {
                tarjeta1.innerHTML = '';
                tarjeta2.innerHTML = '';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasdestapadas = 0;
            }, 2000);
        }
    }
}
