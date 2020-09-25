// Ejecuta iniciar cuando el documento se haya renderizado por completo
$(document).ready(iniciar);

function iniciar(){
    /* Lista de Paises disponibles */
    let paises = [   
      {zona:"Europe/Paris", ciudad: "Paris"},
      {zona:"America/New_York", ciudad: "Nueva York"},
      {zona:"Asia/Tokyo", ciudad: "Tokio"}
    ]
    
    /* selecciono los elementos donde renderizaremos cada reloj */
    let horaLocal = $("input#horaLocal");

    let titleHora1 = $("h2#titleHora1");
    let hora1 = $("p#hora1");

    let titleHora2 = $("h2#titleHora2");
    let hora2 = $("p#hora2");

    let titleHora3 = $("h2#titleHora3");
    let hora3 = $("p#hora3");

    /* Definimos los formatos en los que se mostrará la hora */
    let form1 = Intl.DateTimeFormat("es-ES",{
        timeZone: paises[0].zona,
        timeStyle: "medium"
    });
    let form2 = Intl.DateTimeFormat("es-ES",{
        timeZone: paises[1].zona,
        timeStyle: "medium"
    });
    let form3 = Intl.DateTimeFormat("es-ES",{
        timeZone: paises[2].zona,
        timeStyle: "medium"
    });

    /* La función se ejecuta después de que transcurra un segundo */
    setInterval(function(){
        fecha_local = new Date();

        // Hora local
        horaLocal[0].value = fecha_local.toLocaleTimeString();
        // Hora 1
        hora1[0].innerText = form1.format(fecha_local);
        titleHora1.innerText = paises[0].ciudad; 
        // Hora 2
        hora2[0].innerText = form2.format(fecha_local);
        titleHora2.innerText = paises[1].ciudad;
        // Hora 3
        hora3[0].innerText = form3.format(fecha_local);
        titleHora3.innerText = paises[2].ciudad;
    }, 1000);
}