const meals = {
    breakfast: [
        {name:"Olu kultenis", img:"https://images.delfi.lv/media-api-image-cropper/v1/a52a6050-7ceb-11ed-92cb-db23f4b2c041.jpg?w=1200", ingredients:["olas","sāls"], link:"https://www.google.com/search?q=olu+kultenis+recepte"},
        {name:"Putra", img:"https://images.delfi.lv/media-api-image-cropper/v1/bdd1c170-7c7d-11ed-8971-c3ec4dbbddb3.jpg?w=576&h=324&r=16:9", ingredients:["auzas","piens"], link:"https://www.google.com/search?q=putra+recepte"},
        {name:"Maizītes", img:"https://cdn.santa.lv/media/2019/01/0/large/6e8d2972f96c.jpg", ingredients:["maize","siers"], link:"https://www.google.com/search?q=maizites+recepte"},
        {name:"Jogurts", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRevbp1fqoBt7UTZdDbN3DS5t8fvHDlrbt7cg&s", ingredients:["jogurts"], link:"https://www.google.com/search?q=jogurts"},
        {name:"Pankūkas", img:"https://i.receptes.tvnet.lv/t/2015/10/13/7676/940x550.jpg", ingredients:["milti","olas"], link:"https://www.google.com/search?q=pankukas+recepte"}
    ],
    lunch: [
        {name:"Makaroni", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS23U4bh6r3iILj7qcDTDL582T3EadxqnKNUQ&s", ingredients:["makaroni"], link:"https://www.google.com/search?q=makaroni+recepte"},
        {name:"Zupa", img:"https://i.receptes.tvnet.lv/t/2023/01/31/35798/940x550.jpg", ingredients:["kartupeļi"], link:"https://www.google.com/search?q=zupa+recepte"},
        {name:"Rīsi", img:"https://www.padoms.lv/images/blog/ka-varit-risus-33.jpg", ingredients:["rīsi"], link:"https://www.google.com/search?q=risi+recepte"},
        {name:"Vista", img:"https://i.receptes.tvnet.lv/t/2015/10/15/5889/940x550.jpg", ingredients:["vista"], link:"https://www.google.com/search?q=vistas+recepte"},
        {name:"Pelmeņi", img:"https://esse.lv/image/cache/catalog/products_2026/pelmeni-1000x1000.jpg", ingredients:["pelmeņi"], link:"https://www.google.com/search?q=pelmeni"}
    ],
    dinner: [
        {name:"Salāti", img:"https://i.receptes.tvnet.lv/t/2017/06/14/19383/940x550.jpg", ingredients:["tomāti"], link:"https://www.google.com/search?q=salati"},
        {name:"Omlete", img:"https://i.receptes.tvnet.lv/t/2017/04/04/18464/940x550.jpg", ingredients:["olas"], link:"https://www.google.com/search?q=omlete"},
        {name:"Sviestmaize", img:"https://images.delfi.lv/media-api-image-cropper/v1/39b82a30-7987-11ed-a86a-c93f95387e96.jpg?w=576&h=324&r=16:9", ingredients:["maize"], link:"https://www.google.com/search?q=sviestmaize"},
        {name:"Augļi", img:"https://www.laukuferma.lv/cdn/shop/products/Attachment1_5_600x600.jpg?v=1635003083", ingredients:["ābols"], link:"https://www.google.com/search?q=augli"},
        {name:"Kūka", img:"https://www.dansukker.lv/Files/product-cataloge/recipe_large/zemenu-sarlotes-kuka.jpg", ingredients:["cukurs"], link:"https://www.google.com/search?q=kuka+recepte"}
    ]
};

let plan = {};
let shopping = {};
let selectedMeal = null;

const days = ["Pirmdiena","Otrdiena","Trešdiena","Ceturtdiena","Piektdiena","Sestdiena","Svētdiena"];

function openTab(tab) {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    document.getElementById(tab).classList.add("active");
}

// MODAL
function openModal(meal) {
    selectedMeal = meal;
    let select = document.getElementById("daySelect");
    select.innerHTML = "";
    days.forEach(d => {
        let opt = document.createElement("option");
        opt.value = d;
        opt.textContent = d;
        select.appendChild(opt);
    });
    document.getElementById("modal").style.display = "block";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

function confirmAdd() {
    let day = document.getElementById("daySelect").value;

    if (!plan[day]) plan[day] = [];
    plan[day].push(selectedMeal);

    selectedMeal.ingredients.forEach(i => shopping[i] = false);

    closeModal();
    renderPlan();
    renderShopping();
}

// MEALS
function renderMeals() {
    Object.keys(meals).forEach(cat => {
        let container = document.getElementById(cat);
        meals[cat].forEach(meal => {
            let card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `
                <img src="${meal.img}">
                <h4>${meal.name}</h4>
                <button class="add">Pievienot</button>
            `;
            card.querySelector("button").onclick = () => openModal(meal);
            container.appendChild(card);
        });
    });
}

// PLAN (ar dzēšanu)
function renderPlan() {
    let week = document.getElementById("week");
    week.innerHTML = "";

    days.forEach(day => {
        let div = document.createElement("div");
        div.className = "day";
        div.innerHTML = `<b>${day}</b>`;

        if (plan[day]) {
            plan[day].forEach((meal, index) => {
                let m = document.createElement("div");
                m.className = "meal";

                let name = document.createElement("span");
                name.textContent = meal.name;
                name.onclick = () => window.open(meal.link, "_blank");

                let del = document.createElement("button");
                del.textContent = "❌";
                del.style.marginLeft = "10px";
                del.onclick = () => {
                    plan[day].splice(index, 1);
                    renderPlan();
                };

                m.appendChild(name);
                m.appendChild(del);
                div.appendChild(m);
            });
        }

        week.appendChild(div);
    });
}

// SHOPPING (ar dzēšanu)
function renderShopping() {
    let list = document.getElementById("shoppingList");
    list.innerHTML = "";

    Object.keys(shopping).forEach(item => {
        let li = document.createElement("li");

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = shopping[item];
        checkbox.onchange = () => shopping[item] = checkbox.checked;

        let text = document.createTextNode(" " + item);

        let del = document.createElement("button");
        del.textContent = "❌";
        del.style.marginLeft = "10px";
        del.onclick = () => {
            delete shopping[item];
            renderShopping();
        };

        li.appendChild(checkbox);
        li.appendChild(text);
        li.appendChild(del);

        list.appendChild(li);
    });
}

renderMeals();
renderPlan();