function validarTexto(input) {
    // con esta función, al tener el valor "this" en el html, el parámetro, en este caso input, toma todo el objeto del evento que llama a la función
    if (input.value == "") {
        input.className = "form-control is-invalid";
        return false;
    } else {
        input.className = "form-control is-valid";
        return true;
    }
}

function validarEmail(input) {
    // como se escriben los mails: texto@dominio.algo
    // expresión regular:
    let expresion = /\w+@\w+\.[a-z]{2,}$/;
    if (input.value != "" && expresion.test(input.value)) {
        input.className = "form-control is-valid";
        return true;
    } else {
        input.className = "form-control is-invalid";
        return false;
    }
}

function validarTel(input) {
    if (input.value.length >= 10 && !isNaN(input.value)) {
        input.className = "form-control is-valid";
        return true;
    } else {
        input.className = "form-control is-invalid";
        return false;
    }
}

function validarConsulta(input) {
    if (input.value.length >= 10) {
        input.className = "form-control is-valid";
        return true;
    } else {
        input.className = "form-control is-invalid";
        return false;
    }
}

// validar todo el formulario
function validarForm(e) {
    e.preventDefault(); // evita que el submit refresque la página
    console.log("desde validarForm");
    if (validarTexto(document.getElementById("nombre")) &&
        validarTexto(document.getElementById("empresa")) &&
        validarEmail(document.getElementById("email")) &&
        validarTel(document.getElementById("telefono")) &&
        validarConsulta(document.getElementById("consulta"))) {
        enviarMail();
    }
}

function enviarMail() {
    let template_params = { // esto es un objeto
        "from_name": document.getElementById("nombre").value,
        "message_html": `Mensaje: ${document.getElementById("consulta").value}<br>Empresa: ${document.getElementById("empresa").value}<br>Teléfono: ${document.getElementById("telefono").value}<br>Email: ${document.getElementById("email").value}`
    }

    let service_id = "default_service";
    let template_id = "template_rjT9nbxT";
    emailjs.send(service_id, template_id, template_params).then( //con el then "capturamos la promesa" esperando que el servidor nos conteste si se envió el mail o no
        function (response){
            console.log("cuando se envió correctamente: " + response.status) //cuando responde 200 es que se completó el envío);
        document.getElementById("envioConsulta").className = "alert alert-info my-4";
        document.getElementById("envioConsulta").innerHTML = "Su consulta fue enviada correctamente";
        }, function(error){
            console.log("cuando no se pudo enviar: " + error);
            document.getElementById("envioConsulta").className = "alert alert-danger my-4";
        document.getElementById("envioConsulta").innerHTML = "Ups! Ocurrió un error y no pudo enviarse la consulta";
        }
    )
}