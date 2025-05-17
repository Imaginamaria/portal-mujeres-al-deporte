import { imprimir , setupModal } from "./utils.js";
import Receta from "./Receta.js";

setupModal('openModalBtn', 'subscriptionModal', 'closeModalBtn');


let recetas = [];
let busqueda = "";
let palabra = ""; 

let recetasFavoritas = JSON.parse(localStorage.getItem("favoritos")) || [];

// Función para guardar una receta como favorita
const guardarFavorito = (receta) => {
    // Almacenar receta en localStorage
    recetasFavoritas.push(receta);
    localStorage.setItem("favoritos", JSON.stringify(recetasFavoritas));

    // Imprimir recetas guardadas
    imprimirFavoritas();
};

const imprimirFavoritas = () => {
    let contenidoFavoritas = '';
    
    recetasFavoritas.forEach((receta, index) => {
        contenidoFavoritas += receta.mostrarReceta();   
    });

    imprimir("guardadas", contenidoFavoritas);
};


//////////////////////Carga de recetas aleatorias

const obtenerRecetasAleatorias = () => {
    // Hacer múltiples llamadas para obtener varias recetas aleatorias
    const llamadasAPI = [];
    for (let i = 0; i < 8; i++) {
        llamadasAPI.push(fetch(`https://themealdb.com/api/json/v1/1/random.php`)
            .then((response) => response.json())
            .then((data) => data.meals[0]) // Obtener solo la primera receta de cada respuesta
            .catch((error) => console.log(error)));
    }

    // Resolver todas las promesas de las llamadas a la API
    return Promise.all(llamadasAPI)
        .then((recetas) => recetas.filter(Boolean)) // Filtrar recetas nulas (en caso de error)
        .catch((error) => {
            console.log(error);
            return [];
        });
};


obtenerRecetasAleatorias()
    .then((recetasObtenidas) => {
        recetas = recetasObtenidas.map((receta) => new Receta(receta.strMeal, receta.strMealThumb, receta.strCategory, receta.strArea, receta.idMeal));
        console.log(recetas);
        imprimirRecetas();
    })
    .catch((error) => {
        console.log(error);
    });





// Cambio la función imprimirRecetas para recorrer un conjunto de recetas,
// organizarlas en filas de cuatro elementos y luego imprimirlas en el contenedor especificado en el HTML
const imprimirRecetas = () => {
    let contenido = '<div class="recetas-content">';
    recetas.forEach((receta, index) => {
        if (index % 4 === 0 && index !== 0) {
            contenido += '</div><div class="recetas-content">';
        }
        contenido += receta.mostrarReceta();
    });
    contenido += '</div>';
    imprimir("contenedor", contenido);
    document.querySelectorAll(".favorito-icon").forEach((button)=>{
        button.addEventListener("click", (event) => {
            guardarFavorito(button.getAttribute("${this.strMeal}"));
            button.classList.toggle("active");
        });
    });
};



///SECCION BUSQUEDAS Oh Margot!!!

// Esta función realiza la búsqueda por palabra////////////////////////////////////////////
const obtenerRecetasPorPalabra = (palabra) => {
    return fetch(`https://themealdb.com/api/json/v1/1/search.php?s=${palabra}`)
        .then((response) => response.json())
        .then((data) => data.meals)
        .catch((error) => {
            console.log(error);
        });
};

// Event listener en el input de búsqueda
const inputPalabra = document.querySelector("#search-input");

inputPalabra.addEventListener("input", () => {
    const palabra = inputPalabra.value.trim();

    if (palabra !== "") {
        obtenerRecetasPorPalabra(palabra)
            .then((recetasObtenidas) => {
                recetas = recetasObtenidas.map((receta) => new Receta(receta.strMeal, receta.strMealThumb, receta.strCategory, receta.strArea));
                imprimirRecetas();
            });
    } else {
        obtenerRecetasAleatorias("")
            .then((recetasObtenidas) => {
                recetas = recetasObtenidas.map((receta) => new Receta(receta.strMeal, receta.strMealThumb, receta.strCategory, receta.strArea));
                imprimirRecetas();
            });
    }
});



/* filtrar por categorias de recetas*/////////////////////////////////////////


// Guardar la opción "Todas las categorías" en una variable para no perderla en el select
const opcionTodasCategorias = '<option value="">Todas las categorías</option>';

// Obtener las categorías de la API
fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    .then(response => response.json())
    .then(data => {
        let categorias = data.categories;
        let opciones = categorias.map(categoria => {
            return `<option value="${categoria.strCategory}">${categoria.strCategory}</option>`;
        });
        document.querySelector("#recetas-categorias").innerHTML = opcionTodasCategorias + opciones.join('');
    })
    .catch(error => console.error('Error al obtener las categorías:', error));


function obtenerRecetasPorCategoria(categoria) {
    return fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoria}`)
        .then(response => response.json())
        .then(data => data.meals)
        .catch(error => console.error('Error al obtener las recetas por categoría:', error));
}

// Función para mostrar las recetas en el contenedor
function mostrarRecetas(recetas) {
    let contenido = '';
    
    recetas.forEach((receta, index) => {
        contenido += `
        

            <div class="receta">
                <img src="${receta.strMealThumb}" alt="${receta.strMeal}">

                <div class="grid-detalle">

                    <div class="columna1-detalle">
                    <h3>${receta.strMeal}</h3>
                    <p>${receta.strCategory}</p>
                    </div>

                    <div class="columna2-detalle">
                    
                    <button class="button-icon favorito-icon">
                    <i class="fas fa-heart card-icon"></i>
                    </button>
                    
                    </div>
                </div>

                
            </div>
        `;
    });
    document.querySelector(".recetas-content").innerHTML = contenido;
}




// Event listener para el cambio en el select de categorías
document.querySelector("#recetas-categorias").addEventListener("change", function() {
    const categoriaSeleccionada = this.value;
    if (categoriaSeleccionada !== "") {
        obtenerRecetasPorCategoria(categoriaSeleccionada)
            .then(recetas => mostrarRecetas(recetas))
            .catch(error => console.error('Error al obtener recetas por categoría:', error));
    } else {
        // Si se selecciona la opción por defecto, mostrar todas las recetas
        obtenerRecetasAleatorias("")
            .then(recetas => mostrarRecetas(recetas))
            .catch(error => console.error('Error al obtener recetas aleatorias:', error));
    }
});
 


imprimirRecetas()
imprimirFavoritas()


