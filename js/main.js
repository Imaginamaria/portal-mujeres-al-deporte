// menu mobile slide

document.addEventListener('DOMContentLoaded', ()=>{
    const hamburgerButton = document.querySelector('.Hamburger-button');
    const mobileMenu = document.querySelector('.mobile-menu');

    hamburgerButton.addEventListener('click', () => 
    mobileMenu.classList.toggle('active')
    );

});

//Ampliacion por URL
// Levantar querystring
console.log(window.location.search);
let parametros = new URLSearchParams(window.location.search);
console.log(parametros.get("id"));
let idAmpliar = parametros.get("id");

// URL de la API de TheMealDB
let apiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idAmpliar}`;

// Obtener datos del producto de la API
fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    let productoAmpliar = data.meals[0]; // Suponiendo que la respuesta tiene una propiedad meals que es un array
    console.log(productoAmpliar);
    cargarProductos([productoAmpliar], "#ampliacion-vademecum");
  })
  .catch(error => console.error('Error al obtener datos del producto:', error));
