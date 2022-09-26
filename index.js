const servicios = [
    { id: 1, nombre: "Trabajo de Pintura" },
    { id: 2, nombre: "Construcción de Radier" },
]

const pintura = [
    { id: 1, nombre: "Casa", nota: "(Obs: 1 Solo piso)" },
    { id: 2, nombre: "Edificio", nota: "(Obs: Se agrega 5% extra al valor del mt2 por cada piso a contar desde 2do piso)" },
]

const mtXvalor = (mt, valor) => { return mt * valor; }

const extraXpiso = (porc, numPiso, precio) => { return ((precio / 100) * (porc * numPiso)) + precio }

function fnBuildMessage(item) {
    let msg = "";

    switch (item) {
        case "servicios":
            let lstServicio = JSON.parse(localStorage.getItem("ltServicios"));

            msg = `<option value="0" selected>Seleccione Servicio</option>`

            for (const item of lstServicio) {
                msg = msg + `<option value="${item.id}">${item.nombre}</option>`
            }
            document.getElementById("listServicio").innerHTML = msg;
            break;

        case "pintura":
            let lstPintura = JSON.parse(localStorage.getItem("ltPintura"));
            msg = `<option value="0" selected>Seleccione Superficie a Pintar</option>`

            for (const item of lstPintura) {

                msg = msg + `<option value="${item.id}">${item.nombre} ${item.nota}</option>`
            }
            document.getElementById("listPintura").innerHTML = msg;
            break;

        default:
            msg = "sin informacion";
            break;
    }
    return msg;
}

function fnCalcular() {
    let mt2 = 0;              // Inicializa variable
    let totalMonto = 0;       // Inicializa variable
    let tipoServicio = Number(localStorage.getItem("lsServicioSelect"));
    let precio = tipoServicio === 1 ? 2000 : 2500;      // Valor de mano de obra por metro cuadrado
    
    //SERVICIO DE PINTURA
    if (tipoServicio === 1) {

        let tipoTrabajo = Number(localStorage.getItem("lsTipoTrabajoSelect"));

        if (tipoTrabajo === 1) {
            mt2 = Number(document.getElementById("txtMtCasa").value);
            document.getElementById("alertValor").innerHTML = "El valor total del trabajo de pintura de la casa es de : $" + mtXvalor(mt2, precio).toString();
        } else if (tipoTrabajo === 2) {
            let porcAdic = 5;
            let pisos = Number(document.getElementById("txtPisos").value);
            mt2 = Number(document.getElementById("txtMtEdificio").value);

            //Se realiza calculo del piso 1
            totalMonto = mtXvalor(mt2, precio);
            for (let x = 1; x < pisos; x++) {
                totalMonto = totalMonto + mtXvalor(mt2, extraXpiso(porcAdic, x, precio));
            }
            document.getElementById("alertValor").innerHTML = "El valor total del trabajo de pintura del edificio es de $" + totalMonto.toString();
        }
    } else if (tipoServicio === 2) {
        //SERVICIO DE RADIER
        let mtCubicosXsaco = 0.025;       // Se entienede que un 1 saco rinde para 1 mt cuadrado con una altura de 25 cm 

        mt2 = Number(document.getElementById("txtMtRadier").value);
        let cmAltura = Number(document.getElementById("txtCmRadier").value);

        let cantSacos = Math.round((mt2 * (cmAltura / 1000)) / mtCubicosXsaco);

        document.getElementById("alertValor").innerHTML = "El valor del trabajo es de $" + mtXvalor(mt2, precio).toString() + " y se requieren un total de " + cantSacos.toString() + " sacos de concreto.";
    } else {
        document.getElementById("alertValor").innerHTML = "Servicio seleccionado no valido";
    }

    document.getElementById("alertValor").style.visibility = "visible";
}



document.getElementById('listServicio').addEventListener('change', function () {

    let tipoServicio = Number(this.value);
    localStorage.setItem("lsServicioSelect", tipoServicio);

    document.getElementById("alertServicio").style.visibility = (tipoServicio !== 1 && tipoServicio !== 2) ? "visible" : "hidden";
    document.getElementById("divPintura").style.visibility = (tipoServicio === 1) ? "visible" : "hidden";
    document.getElementById("divCasa").style.visibility = "hidden";
    document.getElementById("divEdificio").style.visibility = "hidden";
    document.getElementById("divRadier").style.visibility = (tipoServicio === 2) ? "visible" : "hidden";
    document.getElementById("btnCalcular").style.visibility = (tipoServicio === 1 || tipoServicio === 2) ? "visible" : "hidden";
    document.getElementById("alertValor").style.visibility = "hidden";
});


document.getElementById('listPintura').addEventListener('change', function () {

    let tipoTrabajo = Number(this.value);
    localStorage.setItem("lsTipoTrabajoSelect", tipoTrabajo);

    document.getElementById("alertPintura").style.visibility = (tipoTrabajo !== 1 && tipoTrabajo !== 2) ? "visible" : "hidden";
    document.getElementById("divCasa").style.visibility = (tipoTrabajo === 1) ? "visible" : "hidden";
    document.getElementById("divEdificio").style.visibility = (tipoTrabajo === 2) ? "visible" : "hidden";
    document.getElementById("btnCalcular").style.visibility = (tipoTrabajo === 1 || tipoTrabajo === 2) ? "visible" : "hidden";
    document.getElementById("alertValor").style.visibility = "hidden";
});

function fnStar() {

    localStorage.setItem("ltServicios", JSON.stringify(servicios));
    localStorage.setItem("ltPintura", JSON.stringify(pintura));

    document.getElementById("alertServicio").style.visibility = "hidden";
    document.getElementById("alertPintura").style.visibility = "hidden";
    document.getElementById("divPintura").style.visibility = "hidden";
    document.getElementById("divRadier").style.visibility = "hidden";
    document.getElementById("divCasa").style.visibility = "hidden";
    document.getElementById("divEdificio").style.visibility = "hidden";


    document.getElementById("btnCalcular").style.visibility = "hidden";
    document.getElementById("alertValor").style.visibility = "hidden";

    document.getElementById("btnCalcular").addEventListener("click", fnCalcular);


    fnBuildMessage("servicios");
    fnBuildMessage("pintura");
}

fnStar()


