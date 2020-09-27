//TODO: Cargar el fichero con las ciudades
//import * as ciudades from '../data/ciudades.json';

let num_relojes = 0;

// Cuando se haya renderizado todo el documento, que ejecute iniciar
$("document").ready(iniciar);

function iniciar(){
    // cargar las ciudades de las cuales podemos saber la hora
    //let ciudades = ciudades;
    
    let ciudades=[
        {"zona":"Europe/Paris", "ciudad": "Paris"},
        {"zona":"America/New_York", "ciudad": "Nueva York"},
        {"zona":"Asia/Tokyo", "ciudad": "Tokio"}
    ];

    // Renderizamos la hora local cada segundo
    setInterval(() => {
        $("#horaLocal").val((new Date).toLocaleTimeString())           
    }, 1000);

    // Cargar el combo de ciudades
    cargar_ciudades(ciudades);

    // Agregar listeners para seleccion de elementos
    $("#sel-ciudades option").click(function(){
       if (num_relojes > 3){
          alert("No puede añadir más relojes. Debe eliminar antes uno de los existentes.");
       }else{
          agregar_reloj(this.value, this.text);
       }
    });   

    // Agregamos listeners para cerrar tarjeta
    $(".card-header button").click(eliminar_reloj);
}

function cargar_ciudades(ciudades){
    for (let ciudad of ciudades){
        $("#sel-ciudades").append(`<option value="${ciudad.zona}">${ciudad.ciudad}</option>`)
    }
}

function agregar_reloj(zona, ciudad){
    // Incrementamos el número de relojes
    num_relojes++;
    
    switch (num_relojes) {
        case 1:
            $(".card-deck").addClass("w-25");    
            break;
        case 2:
            $(".card-deck").removeClass("w-25");
            $(".card-deck").addClass("w-50");
            break;
        case 3:
            $(".card-deck").removeClass("w-50");
            $(".card-deck").addClass("w-75");
            break;
        default:
            $(".card-deck").removeClass("w-75");
            $(".card-deck").addClass("w-100");
            break;
    }

    // Agregamos el nuevo reloj al card deck
    $(".card-deck").append(`
        <div class="card">
            <div class="card-header">
                <div class="row">
                    <h2 id="titleHora1" class="card-title col-10">${ciudad}</h2>
                    <button class="btn btn-primary col-2" type="button">X</button>
                </div>
            </div>
            <div class="card-body">
                <p id="hora1" class="card-text text-center"></p>
            </div>
        </div>
    `);

    let tarjeta = $(".card-deck .card:last p");

    //Renderizamos la hora cada segundo
    setInterval(() => {
        let formato = Intl.DateTimeFormat("es-ES",{
            timeZone: zona,
            timeStyle: "medium"
        });
        let hora = formato.format(new Date);

        tarjeta.text(hora);    
    }, 1000);   
}

function eliminar_reloj(){
    //TODO - Ver por qué no funciona (No entra aquí)
    console.log("He entrado en eliminar reloj");
    this.closest("card").remove();
}