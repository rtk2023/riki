const params = new URLSearchParams(window.location.search);
const search = params.get("id");

console.log("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + search);
fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + search)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    const meal = data.meals[0];
    const ingredients = [];
    const measures = [];
    document.title = meal.strMeal;

    for (let i = 1; i <= 20; i++) {
      if (meal["strIngredient" + i]) {
        ingredients.push(meal["strIngredient" + i]);
        measures.push(meal["strMeasure" + i]);
      }
    }

    console.log(ingredients, measures);

    document.querySelector(".meal").innerHTML = `
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
    <h3>${meal.strMeal}</h3>
    <h4>Ingredients:</h4>
   <ul>
      ${ingredients.map((ingredient, index) => `
        <li>${ingredient} - ${measures[index]}</li>
      `).join("")}
    </ul>
    <h4>Instructions</h4>
    <p>${meal.strInstructions}</p>
  `;
  })

