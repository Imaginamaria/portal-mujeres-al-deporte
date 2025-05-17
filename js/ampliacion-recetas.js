import { imprimir } from "./utils.js";
import Receta from "./Receta.js";


// Levantar querystring
let parametros = new URLSearchParams(window.location.search);
let idMeal = parametros.get("mealid");

if (idMeal) { 
    let mealUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;

    // Obtener datos del producto de la API
    fetch(mealUrl)
        .then(response => response.json())
        .then(data => {
            let recetaData = data.meals[0];
            let receta = new Receta(
                recetaData.strMeal,
                recetaData.strMealThumb,
                recetaData.strCategory,
                recetaData.strArea,
                recetaData.idMeal,
                recetaData.strInstructions,
                recetaData.strIngredient1,
                recetaData.strIngredient2,
                recetaData.strIngredient3,
                recetaData.strIngredient4,
                recetaData.strIngredient5,
                recetaData.strIngredient6,
                recetaData.strIngredient7,
                recetaData.strIngredient8,
                recetaData.strTags,
                recetaData.strYoutube,
            );

            cargarProductos([receta], "#recetas-content-ampliacion");
        })
        .catch(error => console.error('Error al obtener datos del producto:', error));
}

console.log(idMeal);

function cargarProductos(recetas, contenedor) {
    let contenido = "";
    
    recetas.forEach(receta => {
        const flagImagen = `img/${receta.strArea.toLowerCase()}.png`; // Ruta de la bandera en mi carpeta de img
        contenido += `
        <div class="ampliacion-receta">
          <div class="columna-imagenes">
              <img class="mealthumb" src="${receta.strMealThumb}" alt="${receta.strMeal}">
              <div class="grid-img-recetas">
                <div class="item ingrediente">
                <img src="https://www.themealdb.com/images/ingredients/${receta.strIngredient1}.png" alt="${receta.strIngredient1}">
                <p>${receta.strIngredient1}</p></div>
                <div class="item ingrediente">
                <img src="https://www.themealdb.com/images/ingredients/${receta.strIngredient2}.png" alt="${receta.strIngredient2}">
                <p>${receta.strIngredient2}</p></div>
                <div class="item ingrediente">
                <img src="https://www.themealdb.com/images/ingredients/${receta.strIngredient3}.png" alt="${receta.strIngredient3}">
                <p>${receta.strIngredient3}</p></div>
                <div class="item ingrediente">
                <img src="https://www.themealdb.com/images/ingredients/${receta.strIngredient4}.png" alt="${receta.strIngredient4}">
                <p>${receta.strIngredient4}</p></div>
                <div class="item ingrediente">
                <img src="https://www.themealdb.com/images/ingredients/${receta.strIngredient5}.png" alt="${receta.strIngredient5}">
                <p>${receta.strIngredient5}</p></div>
                <div class="item ingrediente">
                <img src="https://www.themealdb.com/images/ingredients/${receta.strIngredient6}.png" alt="${receta.strIngredient6}">
                <p>${receta.strIngredient6}</p></div>
                <div class="item ingrediente">
                <img src="https://www.themealdb.com/images/ingredients/${receta.strIngredient7}.png" alt="${receta.strIngredient7}">
                <p>${receta.strIngredient7}</p></div>
                <div class="item ingrediente">
                <img src="https://www.themealdb.com/images/ingredients/${receta.strIngredient8}.png" alt="${receta.strIngredient8}">
                <p>${receta.strIngredient8}</p></div>
                

                

                
              </div>
              <div class="item pais"><img class="flag" src="${flagImagen}" alt="${receta.strArea}"></div>
          </div>
        </div>
        <div class="texto-recetas">
            <h1>${receta.strMeal}</h1>
            <h4 class="preparacion">Preparación</h4>
            <p></p>
            <p>${receta.strInstructions}</p>
            
            ${receta.strYoutube ? `<iframe class="video" src="${receta.strYoutube.replace('watch?v=', 'embed/')}" frameborder="0"></iframe>` : ''}
          </div>`;
    });
    document.querySelector(contenedor).innerHTML = contenido;
}

