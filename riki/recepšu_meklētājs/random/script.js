function create() {
  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then(response => response.json())
    .then(data => {
      let meal = data.meals[0];

      const card = document.createElement("div");
      card.className = "card";

      //bilde
      const imga = document.createElement("img");
      imga.className = "picture";
      imga.src = meal.strMealThumb;
      imga.alt = meal.strMeal;

      //info
      const info = document.createElement("div");
      info.className = "info";

      const name = document.createElement("p");
      name.textContent = `Name: ${meal.strMeal}`;

      const area = document.createElement("p");
      area.textContent = `Area: ${meal.strArea}`;

      const type = document.createElement("p");
      type.textContent = `Category: ${meal.strCategory}`;

      const link = document.createElement("a");
      link.textContent = `Link`;
      link.href = `recipe/index.html?id=${meal.idMeal}`

      //pievieno
      info.appendChild(name);
      info.appendChild(area);
      info.appendChild(type);
      info.appendChild(link);

      card.appendChild(imga);
      card.appendChild(info);

      let parent = document.getElementById("main");
      parent.appendChild(card);
    })
}
