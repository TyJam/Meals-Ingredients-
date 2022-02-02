const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const reciperCloseBtn = document.getElementById('recipe-close-btn');

//event listeners 
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
 reciperCloseBtn.addEventListener('click', () => {
     mealDetailsContent.parentElement.classList.remove('showRecipe');
 })
//get meal list chat matches withe ingredients 
function getMealList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    //console.log(searchInputTxt)
      if(searchInputTxt === ""){
          return false;
      }
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html  += `
                <div class=" meal-item" data-id = "${meal.idMeal}">
                <div class="meal-img">
                    <img src="${meal.strMealThumb}" alt="Food">
                </div>
                <div class=" meal-name">
                    <h3>${meal.strMeal}</h3>
                    <a href= "#" class="recipe-btn">Get Recipe </a>
                </div>

            </div>
                `;

            });
            mealList.classList.remove('notFound');
        }else{
            html = "Sorry, we didn't find my meal";
            mealList.classList.add('notFound');
        }
        //console.log(data);
        mealList.innerHTML = html;
        
    });
}


//get recipe of the meal 
function getMealRecipe(e){

    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
        console.log(mealItem);
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => {
            //console.log(data);
            mealRecipeModal(data.meals)
        });
    }
    
}

function mealRecipeModal(meal){
    console.log(meal);
    meal = meal[0];
    let html = `
    <h2 class="recipe-title">${meal.strMeal}</h2>
    <p class="recipe-category">${meal.strCategory}</p>
    <div class="recipe-instruct">
      <h3>Instructions:</h3>
      <p>${meal.strInstructions}</p>
          <p>Lorem ipsum dolor sit amet consectetur
               adipisicing elit. Iusto dolore nihil pariatur 
               quia voluptatibus quis ullam deserunt dolor 
               suscipit nobis? Aperiam debitis aliquid provident 
               illum praesentium, dolorum libero error optio!</p>
      </div>
      <div class="recipe-meal-img">
         <img src="${meal.strMealThumb}" alt="">
      </div>
      <div class="recipe-link">
        <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
  </div>
    `
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}

