import { imprimir } from "./utils.js";
import Receta from "./Receta.js";


// Definir la URL de la API y el parámetro de consulta "id"
const url = 'https://www.themealdb.com/api/json/v1/1/lookup.php';

// Obtener los parámetros de la URL
const parametros = new URLSearchParams(window.location.search);
const id = parametros.get("id");
const apiUrl = `${url}?i=${id}`;

// Utilizar fetch para obtener los datos de la API
fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    // Obtener el primer elemento del array de comidas
    const meal = data.meals[0];

    // Procesar la comida de manera similar a como lo haces con tu array local
    let contenido = `
      <div id="producto-ampliacion">
          <div id="producto-central">
              <img id="img_principal" src="${meal.strMealThumb}" alt="${meal.strMeal}" title="${meal.strMeal}">
              <div id="secundarias">
                  <img src="${meal.strMealThumb}" alt="${meal.strMeal}" title="${meal.strMeal}">
                  
              </div> 
          </div>
      </div>

      <div id="todo-texto">  
          <div id="nombre">
              <h2 id="nombre-prod">${meal.strMeal}</h2>
              <p class="detalle-producto">${meal.strArea}</p>

              <div id="detalle">
                  <div class="info" id="columna1">
                      <h5>Ingredientes</h5>
                      <ul>
                          ${generateIngredientsList(meal)}
                      </ul>
                      
                  </div>
              </div>
          </div>
      </div>
    `;

    // Insertar el contenido en el contenedor
    document.querySelector("#recetas-content-ampliacion").innerHTML = contenido;
  })
  .catch(error => console.error('Error al obtener los datos:', error));

// Función para generar la lista de ingredientes
function generateIngredientsList(meal) {
    let ingredientsList = '';
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal['strIngredient' + i];
        const measure = meal['strMeasure' + i];
        if (ingredient && ingredient.trim() !== '') {
            ingredientsList += `<li>${measure} ${ingredient}</li>`;
        }
    }
    return ingredientsList;
}
