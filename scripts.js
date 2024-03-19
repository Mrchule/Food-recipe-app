let Itemname = document.querySelector("#searchItem");
let main = document.querySelector(".main");

document.querySelector("#search").addEventListener("click", () => {
  let name = Itemname.value;
  if (name !== "") {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
    main.innerHTML = "";
    getData(url);
    name = "";
  } else {
    alert("enter name bro !!!");
  }
});

async function getData(url) {
  try {
    const resp = await fetch(url);
    if (resp.ok) {
      const data = await resp.json();
      LoadData(data.meals);
    } else {
      console.log("could not fetch data");
    }
  } catch (error) {
    alert("unable to get data");
  }
}
function LoadData(data) {
  data.map((item) => {
    const list = ({ idMeal, strMeal, strInstruction, strMealThumb } = item);
    Elements(list);
  });
}
function Elements(data) {
  const div = document.createElement("div");
  div.classList.add("items");
  main.appendChild(div);
  const img = document.createElement("img");
  div.appendChild(img);
  img.classList.add("img");
  img.src = data.strMealThumb;
  img.alt = data.strMeal;
  const p = document.createElement("p");
  p.innerHTML = data.strMeal;
  p.classList.add("p");
  div.appendChild(p);
  div.addEventListener("click", () => {
    main.innerHTML = "";
    main.appendChild(div);
    let desc = document.createElement("p");
    desc.classList.add("desc");
    // let heading=document.createElement('h1');
    // heading.classList.add('heading');
    // heading.innerHTML=data.strMeal;
    // main.appendChild(heading)
    desc.innerHTML = `<h2>Instructions for making ${data.strMeal}</h2><br>${data.strInstructions}`;
    let it = document.createElement("p");
    it.innerHTML = `<h2>Ingredients need to make ${data.strMeal} </h2><br> ${data.strIngredient1}<br>${data.strIngredient2}<br>${data.strIngredient3}<br>${data.strIngredient4}<br>${data.strIngredient5}<br>${data.strIngredient6}<br>${data.strIngredien7}<br>${data.strIngredient8}<br>${data.strIngredien9}<br>${data.strIngredient10}<br>`;
    main.appendChild(it);
    main.appendChild(desc);
  });
}

async function RandomMeal() {
  const resp = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
  if (resp.ok) {
    const data = await resp.json();
    // console.log(data.meals);
    const list = ({ idMeal, strMeal, strInstruction, strMealThumb } =
      data.meals[0]);
    AddingItem(list);
  } else {
    alert("could not fetch the data");
  }
}

for (let i = 0; i < 5; i++) {
  RandomMeal();
}
const ul = document.querySelector("#ul");
function AddingItem(data) {
  const MealName = data.strMeal.slice(0, 10);
  const li = document.createElement("li");
  const img = document.createElement("img");
  li.appendChild(img);
  img.classList.add("img");
  img.src = data.strMealThumb;
  img.alt = MealName;
  const span = document.createElement("span");
  span.innerHTML = MealName;
  li.appendChild(span);
  ul.appendChild(li);
  li.addEventListener("click", () => {
    main.innerHTML = "";
    const div = document.createElement("div");
    div.classList.add("items");
    main.appendChild(div);
    const img = document.createElement("img");
    div.appendChild(img);
    img.classList.add("img");
    img.src = data.strMealThumb;
    img.alt = data.strMeal;
    let desc = document.createElement("p");
    desc.classList.add("desc");
    desc.innerHTML = `<h2>Instructions for making ${data.strMeal}</h2><br>${data.strInstructions}`;
    let it = document.createElement("p");
    it.innerHTML = `<h2>Ingredients for ${data.strMeal} </h2><br> ${data.strIngredient1}<br>${data.strIngredient2}<br>${data.strIngredient3}<br>${data.strIngredient4}<br>${data.strIngredient5}<br>${data.strIngredient6}<br>${data.strIngredien7}<br>${data.strIngredient8}<br>${data.strIngredien9}<br>${data.strIngredient10}<br>`;
    main.appendChild(it);
    main.appendChild(desc);
  });
}
let select1 = document.querySelector("#c");
let food = document.querySelector("#food");

select1.addEventListener("change", () => {
  let country = select1.value;
  Country(country);
  food.innerHTML = " <option hidden>Chooes one</option>";
});

async function Country(country) {
  const resp = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`
  );
  // console.log(resp);
  const data = await resp.json();
  const foods = data.meals;
  foods.map((food) => {
    // console.log(food.strMeal);
    CreateItem(food.strMeal);
  });
}
function CreateItem(foods) {
  const items = document.createElement("option");
  items.value = foods;
  items.innerHTML = foods;
  food.appendChild(items);
}

food.addEventListener("change", (event) => {
  Itemname.value = event.target.value;
});
