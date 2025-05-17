console.log(cargarProductos);



//cargar todos productos
cargarProductos(arrayProductos, "#productos-flex");



function cargarProductos(_array, _contenedor) {
    let contenido = "";
    for (let i = 0; i < _array.length; i++) {
        let div = "";
        if (_array[i].productonuevo) {
            div = `<div class="nuevo-sticker-vademecum"><h6>NUEVO</h6></div>`;
        }
        // Accedo a la primera imagen del array "imagen" de cada producto
        let primeraImagen = _array[i].imagen[0];
        contenido += `
            <article class="productos-destacados">
                ${div}
                <img src="img/${primeraImagen}" alt="${_array[i].nombre}" title="${_array[i].nombre}">
                <h4>${_array[i].nombre}</h4>
                <p class="detalle-producto">${_array[i].mininfo}</p>
                <a href="ampliacion-pasteur.html?id=${_array[i].id}">Más información</a>
            </article>
        `;
    }
    document.querySelector(_contenedor).innerHTML = contenido;
}





/* filtrar por especie */

let equinos = document.querySelector("#iconos-equinos");
let bovinos = document.querySelector("#iconos-bovinos");
let ovinos = document.querySelector("#iconos-ovinos");
let caprinos = document.querySelector("#iconos-caprinos");
let porcinos = document.querySelector("#iconos-porcinos");

equinos.addEventListener("click", function () { buscarProdEspecie("Equinos");});
bovinos.addEventListener("click", function () { buscarProdEspecie("Bovinos"); });
ovinos.addEventListener("click", function () { buscarProdEspecie("Ovinos"); });
caprinos.addEventListener("click", function () {buscarProdEspecie("Caprinos");});
porcinos.addEventListener("click", function () { buscarProdEspecie("Porcinos");});

function buscarProdEspecie(especie) {
    let arrayProdEspecies = [];

    for (let i = 0; i < arrayProductos.length; i++) {
        let producto = arrayProductos[i];
        if (producto.especies.includes(especie)) {
            arrayProdEspecies.push(producto);
        }
    }

    console.log(arrayProdEspecies);
    cargarProductos(arrayProdEspecies, "#productos-flex");
}



/////////////
nuevo por api

/* filtrar por categorias de recetas*/
let selectCategoria = document.querySelector("#recetas-categorias");

//Evento
selectCategoria.addEventListener("change", filtrarPorCategoria);

function filtrarPorCategoria(){
    let categoriaSeleccionada = selectCategoria.value;
    console.log(categoriaSeleccionada);

    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    .then(response => response.json())
    .then(data => {
        let arrayCategorias = data.categories;

        if (categoriaSeleccionada === "") {
            cargarRecetas(arrayCategorias, "#contenedor");
        } else {
            let arrayFiltradoCategoriaRecetas = arrayCategorias.filter(receta => receta.strCategory === categoriaSeleccionada);
            cargarRecetas(arrayFiltradoCategoriaRecetas, "#contenedor");
        }
    })
    .catch(error => console.error('Error al obtener las categorías:', error));
}

function cargarRecetas(recetas, contenedor) {
    
}




////viejo por array

let selectCategoria = document.querySelector("#recetas-categorias");

//Evento
selectCategoria.addEventListener("change", filtrarPorCategoria);

function filtrarPorCategoria(){
    let categoriaSeleccionada=selectCategoria.value;
    console.log(categoriaSeleccionada);
    let arrayFiltradoCategoriaRecetas = [];

    
        for (let i = 0; i <= arrayRecetas.length - 1; i++) {
           
            if (arrayRecetas[i].selectCategoria === categoriaSeleccionada || categoriaSeleccionada === "") {
                arrayFiltradoCategoriaRecetas.push(arrayRecetas[i]);
            }
        }
    
        console.log(arrayFiltradoCategoriaRecetas);
        cargarRecetas(arrayFiltradoCategoriaRecetas, "#contenedor");
    }
    

/////////////

/* Buscador por nombre */


// Apuntador
let nombreInput = document.querySelector("#buscar-input");

// Evento
nombreInput.addEventListener("keyup", filtrarPorNombre);

function filtrarPorNombre() {
    let arrayFiltradoNombre = [];

    for (let i = 0; i < arrayProductos.length-1; i++) {
        if (arrayProductos[i].nombre.toLowerCase().includes(nombreInput.value.toLowerCase().trim())) {
            arrayFiltradoNombre.push(arrayProductos[i]);
        }
    }

    cargarProductos(arrayFiltradoNombre, "#productos-flex");
}




////////////////Validar mail



//VARIABLE GLOBAL
let mailValido = false;
let telefonoValido = false;
let nombreValido = false;
let localidadValida = false;
let tipoSeleccionado = false;
let mensajeIngresado = false;

//ELEMENTOS
let inputNombre = document.querySelector("#nombre");
let inputTelefono = document.querySelector("#telefono");
let inputLocalidad = document.querySelector("#localidad");
let inputMail = document.querySelector("#email");
let mensajes = document.querySelector("#mensaje-correo");
let botonForm = document.querySelector("#boton-form");
let radioEmpresa = document.querySelector("#empresa");
let radioParticular = document.querySelector("#particular");
let textArea = document.querySelector("#comentarios")

//EVENTOS

inputMail.addEventListener("focusout", validarMail);
inputNombre.addEventListener("focusout", validarNombre);
inputLocalidad.addEventListener("focusout", validarLocalidad);
inputTelefono.addEventListener("focusout" , validarTelefono);
textArea.addEventListener("focusout" , validarMensaje)
radioEmpresa.addEventListener("change", validarTipo);
radioParticular.addEventListener("change", validarTipo);


//FUNCIONES


function validarNombre() {

    let nombreIngresado = inputNombre.value.trim();
    console.log(nombreIngresado);
    mensajes.textContent = "";
    let contadorEspacio = 0;
    nombreValido = false;



    if (isNaN(nombreIngresado) || nombreIngresado.length > 0) {
        mensajes.textContent = "";

        for (let i = 0; i < nombreIngresado.length; i++) {
            if (nombreIngresado.charAt(i) === " ") {
                contadorEspacio++;
                console.log(contadorEspacio)
            }
        }

        if (contadorEspacio === 1) {
            mensajes.textContent = ``;
            nombreValido = true;
        }

        else {
            mensajes.textContent = `* Por favor identifícate con un nombre y apellido válido, conocerte nos ayuda a brindarte una mejor respuesta.`
            nombreValido = false;
        }

        nombreValido = true;
    }
    else {
        mensajes.textContent = `* Por favor identifícate con un nombre y apellido válido, conocerte nos ayuda a brindarte una mejor respuesta.`;
        nombreValido = false;
    }



    habilitarBotonForm();
}



function validarLocalidad() {

    let localidadIngresada = inputLocalidad.value.trim();
    console.log(localidadIngresada);
    mensajes.textContent = "";
    localidadValida = false;

    if (isNaN(localidadIngresada) || localidadIngresada.length > 0) {
        mensajes.textContent = ``;
        localidadValida = true;

    }

    else {
        mensajes.textContent = `* Por favor ingresa una localidad válida, conocerla nos ayuda a brindarte una mejor respuesta. `;
        localidadValida = false;
    }

    habilitarBotonForm();
}


function validarTelefono() {
    let telefonoIngresado = inputTelefono.value.trim();
    console.log(telefonoIngresado);
    mensajes.textContent = "";
    let todosNumeros = true;

    

    for (let i = 0; i < telefonoIngresado.length; i++) {


    //verificar si un carácter en el número de teléfono ingresado no es un número y que sean mas de 7 numeros.
        if (telefonoIngresado.length < 7 || isNaN(telefonoIngresado)) {
            todosNumeros = false;
            break;
        }
    }

    if (todosNumeros) {
        mensajes.textContent = ``;
        telefonoValido = true;

    } else {

        mensajes.textContent = `* Debes ingresar un número de teléfono válido de por lo menos siete digitos.`;
        telefonoValido = false;
    }


    habilitarBotonForm()

}




function validarMail() {
    let mail = inputMail.value.trim();
    console.log(mail);
    mensajes.textContent = "";
    mailValido = false;

    
    if (mail.length == 0) {
        mensajes.textContent = `* El mail no puede estar vacio.`; 

    }

    else if (!mail.includes("@")) {
        mensajes.textContent = `* El mail debe contener @`;

    }
    else if (mail.indexOf("@") == 0) {
        mensajes.textContent = `* El mail debe contener texto antes del @</h1>`;

    }
    else if (mail.charAt(mail.length - 1) == "@") {
        mensajes.textContent = `* El mail debe contener texto despues del @`;

    }
    else if (mail.indexOf(".", mail.indexOf("@")) == -1) {
        mensajes.textContent = `* El mail debe contener . despues del @`;

    }
    else if (mail.charAt(mail.length - 1) == ".") {
        mensajes.textContent = `* El mail debe contener texto despues del .`;

    }
    else {
        mensajes.textContent = ``;
        mailValido = true;
    }

    habilitarBotonForm();

}


function validarTipo() {
    let tipoSeleccionado = radioEmpresa.checked || radioParticular.checked;
    
    if (!tipoSeleccionado) {
        mensajes.textContent = `* Debes seleccionar un tipo (Empresa o Particular).`;
    
    } else {
        mensajes.textContent = ``;
    }
    
    habilitarBotonForm();
    
    }

    


    function validarMensaje() {
        let textoIngresado = textArea.value.trim();
        console.log(textoIngresado);
        mensajes.textContent = "";
        mensajeIngresado = false;
    
        if (textoIngresado.length > 0) {
            mensajes.textContent = ``;
            mensajeIngresado = true;
        } else {
            mensajes.textContent = `* El campo de comentarios se encuentra vacío, completa tu consulta.`;
            mensajeIngresado = false;
        }
    
        habilitarBotonForm();
    }
    




function habilitarBotonForm() {
    if (mailValido && nombreValido && localidadValida && tipoSeleccionado && textoIngresado && telefonoValido) {
        botonForm.disabled = false;

    } else {
        botonForm.disabled = true;
    }


}