// URL de tu Apps Script
const API = "https://script.google.com/macros/s/AKfycbzmsIQJYULRvBXolCS-hkwr6Z3nzC_wITQH1rEvMbttdLh7GQUnr8Zo88MrGvOuthRe/exec";

// Controles
const txtCI = document.getElementById("ci");
const btnBuscar = document.getElementById("buscar");

const loading = document.getElementById("loading");
const resultado = document.getElementById("resultado");
const mensaje = document.getElementById("mensaje");

// Datos
const nombre = document.getElementById("nombre");
const curso = document.getElementById("curso");
const instrumento = document.getElementById("instrumento");
const años = document.getElementById("años");
const descripcion = document.getElementById("descripcion");
const observacion = document.getElementById("observacion");
const tablaAños = document.getElementById("tablaAños");

// Eventos
btnBuscar.addEventListener("click", consultar);

txtCI.addEventListener("keypress", function(e){

    if(e.key === "Enter"){
        consultar();
    }

});

// Ocultar paneles
function ocultarTodo(){

    loading.style.display = "none";
    resultado.style.display = "none";
    mensaje.style.display = "none";

}

// Consultar
async function consultar(){

    let ci = txtCI.value.trim();

    if(ci === ""){

        alert("Ingrese su número de Carnet de Identidad.");
        txtCI.focus();
        return;

    }

    ocultarTodo();

    loading.style.display = "block";

    try{

        const respuesta = await fetch(API + "?ci=" + encodeURIComponent(ci));

        const datos = await respuesta.json();

        loading.style.display = "none";

        if(datos.estado === "ok"){

            nombre.textContent = datos.nombre;
            curso.textContent = datos.curso;
            instrumento.textContent = datos.instrumento;
            años.textContent = datos.totalAños;
            descripcion.textContent = datos.descripcion;
            observacion.textContent = datos.observacion;

            // Limpiar tabla
            tablaAños.innerHTML = "";

            // Agregar años
            datos.historial.forEach((gestion, index)=>{

                tablaAños.innerHTML += `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${gestion}</td>
                    </tr>
                `;

            });

            resultado.style.display = "block";

        }else{

            mensaje.style.display = "block";

        }

    }catch(error){

        console.error(error);

        loading.style.display = "none";
        mensaje.style.display = "block";

    }

}