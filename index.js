let cantNumeros = parseInt(prompt("¿Cuantos numeros desea ingresar?"));
let numero = 0;
let cantPrimos = 0;
let suma = 0;

for(let i = 1; i <= cantNumeros; i++){
    let numero = parseInt(prompt("Ingrese numero "+i.toString()+":"));
    if(numero<=0){
        i--;
        alert("Ingrese numero positivos (matores a 0)!");
        continue;
    }

    esPrimo = true;

    // Determina si el numero ingresado es primo;
    if (numero == 1 || numero == 4){
        esPrimo = false;
    } else {
        for (let x = 2; x < numero / 2; x++) {
            if (numero % x == 0) {
                esPrimo = false;
            } 
        }
    }

    if(esPrimo) { 
        cantPrimos++;
    }

    //Realiza suma de los numeros ingresados
    suma = suma + numero;
}

let promedio = suma / cantNumeros;

alert("Cantidad de numeros primos ingresados: "+ cantPrimos.toString());
alert("Promedio de numeros ingresados: "+ promedio.toString());
alert("Sumatoria de numeros ingresados: "+ suma.toString());