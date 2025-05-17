const obtenerRecetas = (query) => {
    return fetch(`https://api.edamam.com/api/recipes/v2?q=${query}&type=public&app_id=c9ad304d&app_key=a12ee23806f8cba8c303b7fa66a828ce`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            return response.json();
        });
};

const renderRecetas = (recetas) => {
    recipeResults.innerHTML = "";
    recetas.forEach(receta => {
        const nuevaReceta = new Receta(
            receta.recipe.uri,
            receta.recipe.ingredientLines,
            receta.recipe.dietLabels,
            receta.recipe.healthLabels,
            receta.recipe.cuisineType,
            receta.recipe.mealType,
            receta.recipe.dishType,
            receta.recipe.calories,
            receta.recipe.totalTime,
            receta.recipe.image,
            receta.recipe.totalNutrients.CA ? receta.recipe.totalNutrients.CA.quantity : 0,
            receta.recipe.totalNutrients.CHOCDF ? receta.recipe.totalNutrients.CHOCDF.quantity : 0,
            receta.recipe.totalNutrients.CHOLE ? receta.recipe.totalNutrients.CHOLE.quantity : 0,
            receta.recipe.totalNutrients.ENERC_KCAL ? receta.recipe.totalNutrients.ENERC_KCAL.quantity : 0,
            receta.recipe.totalNutrients.FAMS ? receta.recipe.totalNutrients.FAMS.quantity : 0,
            receta.recipe.totalNutrients.FAPU ? receta.recipe.totalNutrients.FAPU.quantity : 0
        );
        const recetaHTML = nuevaReceta.mostrarReceta();
        recipeResults.insertAdjacentHTML("beforeend", recetaHTML);
    });
};