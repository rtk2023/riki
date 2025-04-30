const params = new URLSearchParams(window.location.search);
const search = params.get("query");

console.log("https://www.themealdb.com/api/json/v1/1/filter.php?i=" + search);

fetch("https://www.themealdb.com/api/json/v1/1/filter.php?i=" + search)
  .then(response => response.json())
  .then(data => {
    for (let i = 0; i < data.meals.length; i++) {
      console.log(data.meals[i]);
      const meal = document.createElement("div");
      meal.classList.add("meal");
      meal.innerHTML = `
        <img src="${data.meals[i].strMealThumb}" alt="${data.meals[i].strMeal}">
        <a href="result/index.html?id=${data.meals[i].idMeal}" <h3>${data.meals[i].strMeal}</h3>
      `;
      document.querySelector(".meals").appendChild(meal);
    }
  })
  .catch(error => console.error("Error fetching meals:", error));

