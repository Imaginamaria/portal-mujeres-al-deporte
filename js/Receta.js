class Receta {
    constructor(strMeal, strMealThumb, strCategory, strArea, idMeal, strInstructions, strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient5, strIngredient6, strIngredient7, strIngredient8, strTags, strYoutube) {
        this.strMeal = strMeal;
        this.strMealThumb = strMealThumb;
        this.strCategory = strCategory;
        this.strArea = strArea;
        this.idMeal = idMeal;
        this.strInstructions = strInstructions;
        this.strIngredient1 = strIngredient1;
        this.strIngredient2 = strIngredient2;
        this.strIngredient3 = strIngredient3;
        this.strIngredient4 = strIngredient4;
        this.strIngredient5 = strIngredient5;
        this.strIngredient6 = strIngredient6;
        this.strIngredient7 = strIngredient7;
        this.strIngredient8 = strIngredient8;
        this.strTags = strTags;
        this.strYoutube = strYoutube;
        this.favorita = false;

        
    }

    
 
    mostrarReceta() {
        const enlaceAmpliacion = `ampliacion-receta.html?mealid=${this.idMeal}`;
        const flagImagen = `img/${this.strArea.toLowerCase()}.png`; // Ruta de la bandera en mi carpeta de img

        const card = `
        <div class="card-recetas">
                <div class="card-body" style="width: 250px;">
                    <a href="${enlaceAmpliacion}">
                        <img src="${this.strMealThumb}">
                    </a>

                    <div class="grid-detalle">

                    <div class="columna1-detalle">
                            <h5 class="card-title">${this.strMeal}</h5>
                            <p class="card-text">${this.strCategory}</p>
                            
                            
                    </div>

                    <div class="columna2-detalle">
                            
                            <button class="button-icon favorito-icon" data-nombre="${this.strMeal}"><i class="fas fa-heart card-icon"></i></button>
 
                            <img class="flag" src="${flagImagen}" alt="${this.strArea}">
                    </div>
                    
                    </div>

                </div>
        </div>
        `;

        return card;
    }


    

        
    
}


export default Receta