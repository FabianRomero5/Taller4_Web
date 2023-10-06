// Obtener referencias a los campos de entrada y los elementos de error
var nombreInput = document.getElementById("nombre");
var apellidoInput = document.getElementById("apellido");
var direccionInput = document.getElementById("direccion");
var ccusuarioInput = document.getElementById("ccusuario");
var ccpaswdInput = document.getElementById("ccpaswd");
var confirmar_ccpaswdInput = document.getElementById("confirmar_ccpaswd");
var emailInput = document.getElementById("email");

var errorNombre = document.getElementById("error_nombre");
var errorApellido = document.getElementById("error_apellido");
var errorDireccion = document.getElementById("error_direccion");
var errorCCUsuario = document.getElementById("error_ccusuario");
var errorCCPaswd = document.getElementById("error_ccpaswd");
var errorConfirmarCCPaswd = document.getElementById("error_confirmar_ccpaswd");
var errorEmail = document.getElementById("error_email");

// Agregar eventos de escucha para comprobaciones en tiempo real
nombreInput.addEventListener("input", validarNombre);
apellidoInput.addEventListener("input", validarApellido);
direccionInput.addEventListener("input", validarDireccion);
ccusuarioInput.addEventListener("input", validarCCUsuario);
ccpaswdInput.addEventListener("input", validarCCPasw);
confirmar_ccpaswdInput.addEventListener("input", validarConfirmarContraseña);
emailInput.addEventListener("input", validarEmail);

function validarNombre() {
    var nombre = nombreInput.value;
    if (nombre.length > 25 || nombre.trim() === "") {
        mostrarError(errorNombre, "El nombre debe tener máximo 25 caracteres y no puede estar vacío.");
    } else {
        ocultarError(errorNombre);
    }
}

function validarApellido() {
    var apellido = apellidoInput.value;
    if (apellido.length > 25 || apellido.trim() === "") {
        mostrarError(errorApellido, "El apellido debe tener máximo 25 caracteres y no puede estar vacío.");
    } else {
        ocultarError(errorApellido);
    }
}

function validarDireccion() {
    var direccion = direccionInput.value;
    var palabrasPermitidas = ["cll", "cra", "av", "anv", "trans"];
    var direccionValida = false;
    for (var i = 0; i < palabrasPermitidas.length; i++) {
        if (direccion.startsWith(palabrasPermitidas[i])) {
            direccionValida = true;
            break;
        }
    }
    if (!direccionValida) {
        mostrarError(errorDireccion, "La dirección debe comenzar con cll, cra, av, anv o trans.");
    } else {
        ocultarError(errorDireccion);
    }
}

function validarCCUsuario() {
    var ccusuario = ccusuarioInput.value;

    if (!/^[0-9]+$/.test(ccusuario)) {
        mostrarError(errorCCUsuario, "Carácteres inválidos.");
        //console.log('first if',/^[0-9]+$/.test(ccusuario));
    }
    else if (ccusuario.length < 10 || ccusuario.length > 20) {
        mostrarError(errorCCUsuario, "La CC del Usuario debe tener entre 10 y 20 caracteres.");
        //console.log(/^[0-9]+$/.test(ccusuario));
    } else {
        ocultarError(errorCCUsuario);
    }
}

function validarCCPasw() {
    var ccpaswd = ccpaswdInput.value;

    if (!/[A-Z]/.test(ccpaswd)) {
        mostrarError(errorCCPaswd, "Debe contener al menos una mayúscula.");
    }
    else if (!/\d/.test(ccpaswd)) {
        mostrarError(errorCCPaswd, "Debe contener al menos un número.");
    }
    else if (!/[\%&#/]/.test(ccpaswd)) {
        mostrarError(errorCCPaswd, "Debe contener al menos uno de los caracteres #, %, / o &.");
    }    
    else if (ccpaswd.length > 20 || ccpaswd.length < 15) {
        mostrarError(errorCCPaswd, "Debe tener entre 15 y 20 caracteres.");
    }
    else {
        ocultarError(errorCCPaswd);
    }

}

function validarConfirmarContraseña() {
    var ccpaswd = ccpaswdInput.value;
    var confirmar_ccpaswd = confirmar_ccpaswdInput.value;
    if (ccpaswd !== confirmar_ccpaswd) {
        mostrarError(errorConfirmarCCPaswd, "Las contraseñas no coinciden.");
    } else {
        ocultarError(errorConfirmarCCPaswd);
    }
}

function validarEmail() {
    var email = emailInput.value;
    if (email.length > 120 || !/^\S+@\S+\.\S+$/.test(email)) {
        mostrarError(errorEmail, "El email debe tener máximo 120 caracteres y tener un formato válido.");
    } else {
        ocultarError(errorEmail);
    }
}

function mostrarError(elementoError, mensaje) {
    elementoError.innerHTML = mensaje;
    elementoError.style.color = "red";
}

function ocultarError(elementoError) {
    elementoError.innerHTML = "";
}
document.getElementById("formulario").addEventListener("submit", function(event) {
    if (!validarFormulario()) {
        event.preventDefault(); // Evita que el formulario se envíe
    }
});

// Obtener referencia al input de registro de gustos
var registroGustosInput = document.getElementById("registroGustos");
// Obtener referencia a la sección de registro de gustos
var seccionGustos = document.getElementById("seccionGustos");

// Agregar un evento para mostrar la sección de registro de gustos
registroGustosInput.addEventListener("click", function() {
    if (registroGustosInput.checked) {
        registroGustosInput.checked=true;
        seccionGustos.style.display = "block";
    }
});

// Obtener referencias a los elementos HTML
var rangoPrecio = document.getElementById("rangoPrecio");
var minPrecio = document.getElementById("minPrecio");
var maxPrecio = document.getElementById("maxPrecio");

// Configurar la barra de rango con dos controles deslizantes
var slider = noUiSlider.create(rangoPrecio, {
    start: [0, 200000000], // Valores iniciales mínimo y máximo
    connect: true, // Conectar los puntos de inicio y fin
    range: {
        'min': 0,
        'max': 200000000
    }
});

// Escuchar el evento de cambio en la barra de rango
slider.on('update', function(values, handle) {
    // Actualizar los valores mínimo y máximo en tiempo real
    minPrecio.textContent = values[0];
    maxPrecio.textContent = values[1];
});

rangoPrecio.noUiSlider.on('update', function (values, handle) {
    if (handle === 0) {
        minPrecio.innerHTML = "$" + values[0];
    }
    if (handle === 1) {
        maxPrecio.innerHTML = "$" + values[1];
    }
});




