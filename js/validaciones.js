/*Aqui Validamos que en campo edad sea mayor de edad

const inputNacimiento = document.querySelector('#birth');

inputNacimiento.addEventListener('blur', (evento) =>{
    validarNacimiento(evento.target);
})*/ //esto se elimino en el curso por mala practica 
//data-tipo="nacimiento" este dato se pone en el input del formulario con su respectivo type dato
export function valida(input) {
    const tipoDeInput = input.dataset.tipo; //el dato tipo viene del html y hace referencia a data-tipo="nacimiento" no se pone el data solo se referencia el tipo el data es una función de javaScript
    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input);
    }
    //console.log(input.parentElement);
    if (input.validity.valid) {
        input.parentElement.classList.remove('input-container--invalid');
        input.parentElement.querySelector('.input-message-error').innerHTML = '';
    } else {
        input.parentElement.classList.add('input-container--invalid');
        input.parentElement.querySelector('.input-message-error').innerHTML = mostrarMensajeDeError(tipoDeInput, input);
    }
}

const tipoDeErrores = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customError',

]

const mensajesDeError = {
    nombre: {
        valueMissing: 'Este campo no puede estar vacio'
    },
    email: {
        valueMissing: 'Este campo no puede estar vacio',
        typeMismatch: 'El correo no es valido',
    },
    password: {
        valueMissing: 'Este campo no puede estar vacio',
        patternMismatch: 'Al menos 8 caracteres, máximo 10, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales',
    },
    nacimiento: {
        valueMissing: 'Este campo no puede estar vacio',
        customError: 'Debes tener almenos 18 años de edad',
    },
    numero: {
        valueMissing: 'Este campo no puede estar vacio',
        patternMismatch: 'El formato requerido es xxx xxx xxxx 10 números',
    },
    direccion: {
        valueMissing: 'Este campo no puede estar vacio',
        patternMismatch: 'La Dirección debe contontener entre 10 y 40 caracteres',
    },
    ciudad: {
        valueMissing: 'Este campo no puede estar vacio',
        patternMismatch: 'La Ciudad debe contontener entre 4 y 30 caracteres',
    },
    estado: {
        valueMissing: 'Este campo no puede estar vacio',
        patternMismatch: 'el Estado debe contontener entre 10 y 40 caracteres',
    }
}

const validadores = {
    nacimiento: (input) => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoDeInput, input) {
    let mensaje = '';
    tipoDeErrores.forEach(error => {
        if(input.validity[error]){
            console.log(tipoDeInput, error);
            console.log(input.validity[error])
            console.log(mensajesDeError[tipoDeInput][error]);

            mensaje = mensajesDeError[tipoDeInput][error];
        }
    });

    return mensaje;
}

function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    let mensaje = '';
    if (!mayorDeEdad(fechaCliente)) {
        mensaje = 'Debes tener almenos 18 años de edad';
    }

    input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFecha = new Date(
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDay());
    return diferenciaFecha <= fechaActual;
}