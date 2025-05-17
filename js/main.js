const asideWidth = $('.aside-container .links').innerWidth();
const closeIcon = $('#close');
const openIcon = $('#open');
const aside = $('aside');
const loaddingScreen = $('.loading');
const searchLoading = $('#searchLoading');
const recipesData = $('#recipesData')
const search = $('#search');
const categories = $('#categories');
const area = $('#area');
const ingredients = $('#ingredients');
const contact = $('#contact');
const searchByName = $('#searchByName');
const searchByChar = $('#searchByChar');
const apiUrlChar = `https://www.themealdb.com/api/json/v1/1/search.php?f=`;
const apiUrlName = `https://www.themealdb.com/api/json/v1/1/search.php?s=`;
const apiUrlId = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=`;
const apiUrlCategory = `https://www.themealdb.com/api/json/v1/1/categories.php`;
const rowSearch = $('#rowSearch');
const rowAreaData = $('#rowAreaData');
const searchSection = $('#searchSection');
const areaSection = $('#areaSection');
const resipesSection = $('#resipesSection');
const info = $('#info');

// ^ validation input selectors

let inputName = document.getElementById('inputName')
let inputEmail = document.getElementById('inputEmail')
let inputPhone = document.getElementById('inputPhone')
let inputAge = document.getElementById('inputAge')
let inputPassword = document.getElementById('inputPassword')
let inputRePassword = document.getElementById('inputRePassword')
let submit = document.getElementById('submit')

let regex = {
    inputName       :/^[A-Z][a-z0-9_-]{3,15}$/,
    inputEmail      :/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    inputAge        :   /^(1[8-9]|[2-9][0-9]|1[0-9]{2})$/ , 
    inputPhone      : /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/ , 
    inputPassword   :/^[a-zA-Z0-9]+$/,
    inputRePassword :/^[a-zA-Z0-9]+$/

}

$('form').on('submit', (event) => {
    event.preventDefault()
})

$('a').on('click', (event) => {
    event.preventDefault()
})

// * event for loadding screen

window.addEventListener("DOMContentLoaded", () => {
    aside.css({ left: `-${asideWidth}px` });
    loaddingScreen.fadeOut(1000 ,function (){
        $('body').css({overflow : 'auto'})
    })
});


// * event that open and close asidbar
openIcon.on('click', openAside);
closeIcon.on('click', closeAside);


// * function to the events for asidebar
function openAside() {
    aside.animate({ left: `0px`}, 300, 'linear' , () => {
        search.animate({top:'0%'},50, () => {
            categories.animate({top:'0%'},50, () => {
                area.animate({top:'0%'},50, () => {
                    ingredients.animate({top:'0%'},50, () => {
                        contact.animate({top:'0%'},50)
                    })
                })
            })
        })
    });
    openIcon.addClass('d-none');
    closeIcon.removeClass('d-none');
}
function closeAside() {
    aside.animate({ left: `-${asideWidth}px`} ,400 , "linear" , () => {
        search.animate({top:'100%'},0, () => {
            categories.animate({top:'100%'},0, () => {
                area.animate({top:'100%'},0, () => {
                    ingredients.animate({top:'100%'},0, () => {
                        contact.animate({top:'100%'},0)
                    })
                })
            })
        })    });
    openIcon.removeClass('d-none')
    closeIcon.addClass('d-none')
}


// !   function to display meals on loading 



async function getMealsInLoadding() {
    try {
        rowSearch.html('');
        let respons = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
        let data = await respons.json()
        let responsData = data.meals;
        console.log(responsData);
        displayMeals(responsData)
        
    } catch (error) {
        console.log(error);
    }
}

function displayMeals(arr) {
    if (typeof arr != 'object') return;
    let recipesss = ''
    if (arr) {
        for (let i = 0; i < Math.min(arr.length, 20); i++) {
            recipesss += `
                    <div class="col">
                        <div class="inner position-relative overflow-hidden" onclick="displayRecipesIfo(${arr[i].idMeal})">
                            <div class="img">
                                <img src="${arr[i].strMealThumb}" alt="" class="d-block w-100 h-100">
                            </div>
                            <div class="heading">
                                <h4 class="text-capitalize ps-3">${arr[i].strMeal}</h4>
                            </div>
                        </div>
                    </div>
            `
        }
    } else {
        console.log(error);
    }
    searchSection.addClass('d-none');
    resipesSection.removeClass('d-none');
    recipesData.html(recipesss);

}

getMealsInLoadding()


// * api part that in   clude function to display it in the reciepes section
search.on('click', () => {
    resipesSection.addClass('d-none');
    searchSection.removeClass('d-none');
    areaSection.addClass('d-none');
})

searchByName.on('input', function () {

    let result = this.value.trim();
    getRecipes(result, apiUrlName);
    searchLoading.fadeIn(200);
});
searchByChar.on('input', function () {
    info.removeClass('d-none');
    let result = this.value.trim();
    getRecipes(result, apiUrlChar);
})


async function getRecipes(value, api) {
    try {
        rowSearch.html('');
        let respons = await fetch(`${api}${value}`);
        let data = await respons.json()
        let responsData = data.meals;
        console.log(responsData);
        displayRecipes(responsData);
    } catch (error) {
        // console.log('enter a valid name');
        console.log(error);
    }
}

// * function to get data form input and get data form the value 

function displayRecipes(arr) {
    if (typeof arr != 'object') return;
    let recipesss = ''
    if (arr) {
        for (let i = 0; i < Math.min(arr.length, 20); i++) {
            recipesss += `
                    <div class="col">
                        <div class="inner position-relative overflow-hidden" onclick="displayRecipesIfo(${arr[i].idMeal})">
                            <div class="img">
                                <img src="${arr[i].strMealThumb}" alt="" class="d-block w-100 h-100">
                            </div>
                            <div class="heading">
                                <h4 class="text-capitalize ps-3">${arr[i].strMeal}</h4>
                            </div>
                        </div>
                    </div>
                             <div class="loading">
            <span class="loader"></span>
        </div> 
            `
        }
    } else {
        console.log(error);
    }
    searchSection.removeClass('d-none');
    resipesSection.addClass('d-none');
    rowSearch.html(recipesss);
        loaddingScreen.fadeOut(2000 ,function (){
        $('body').css({overflow : 'auto'})
    })
}
// * function to display resipes information 
async function displayRecipesIfo(id) {
    try {
        let respons = await fetch(`${apiUrlId}${id}`)
        let data = await respons.json();
        let responsData = data.meals[0];
        console.log(responsData);
        let ingredientContainer = '';
        for(let i = 0 ; i < 20 ; i ++){
            let ingredient = responsData[`strIngredient${i + 1}`];
            if(ingredient){
                ingredientContainer +=` <span class="badge bg-primary-subtle p-2  text-dark fs-5 fw-normal">${ingredient}</span>`
            }
        }
        
        let resepe = ` 
    <div class="container">
            <div class="row text-white py-5">
                <div class="col-4">
                    <img src="${responsData.strMealThumb}" style="width: 300px; height: 300px;" class="w-100" alt="">
                    <h2 class="h1 mt-2">${responsData.strMeal}</h2>
                </div>
                <div class="col-8">
                    <div class="inst">
                        <h2 class="fs-1">Instructions</h2>
                        <p class="lh-lg">${responsData.strInstructions}</p>
                    </div>
                    <div class="area mt-3"><span class="h3">Area :${responsData.strArea}</span></div>
                    <div class="cat mt-3"><span class="h3">Cateogry : ${responsData.strArea}</span></div>
                    <div class="resipe mt-3">
                        <h3>Recipes</h3>
                        <div class="res d-flex flex-wrap gap-3 mt-3">
                            ${ingredientContainer}
                        </div>
                        <div class="mt-2 d-flex gap-3">
                        <button class="btn btn-success py-2 px-3  mt-3"> <a href="${responsData.strSource}" target="_blank"> Source </a></button>
                        <button  class="btn btn-danger py-2 px-3  mt-3"> <a href="${responsData.strYoutube}" target="_blank"> Youtube</a></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
        info.html(resepe);
        resipesSection.addClass('d-none');
        searchSection.addClass('d-none');
        rowAreaData.addClass('d-none');
    } catch (error) {
        console.log(error);

    }
}

categories.on('click',()=>{
    getCategores();
    resipesSection.removeClass('d-none');
    searchSection.addClass('d-none');
})


async function getCategores() {
    try {
        rowSearch.html('');
        let respons = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
        let data = await respons.json()
        let responsData = data.categories;
        console.log(responsData);
        displayCategory(responsData);
    } catch (error) {
        // console.log('enter a valid name');
        console.log(error);
    }
}
function displayCategory(arr) {
if (typeof arr != 'object') return;
    let recipesss = ''
    if (arr) {
        for (let i = 0; i < Math.min(arr.length, 20); i++) {
            recipesss += `
                    <div class="col">
                        <div class="inner position-relative overflow-hidden" onclick="getRecipes('${arr[i].strCategory}','${apiUrlName}')">
                            <div class="img">
                                <img src="${arr[i].strCategoryThumb}" alt="" class="d-block w-100 h-100">
                            </div>
                            <div class="heading d-flex flex-column ">
                                <h3 class="text-capitalize text-center fs-3">${arr[i].strCategory}</h3>
                                <p>${arr[i].strCategoryDescription.split(" ",35).join(" ")}</p>
                            </div>
                        </div>
                    </div>
            `
        }
    } else {
        console.log(error);
    }
    recipesData.html(recipesss);
}

// * area event to get the resipes in the area and the info about the recipeces

area.on('click',()=>{
    getArea();
    resipesSection.addClass('d-none')
});

async function getArea(){
        try {
        let respons = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
        let data = await respons.json()
        let responsData = data.meals;
        console.log(responsData);
        displayArea(responsData);
    } catch (error) {
        // console.log('enter a valid name');
        console.log(error);
    }
}
function displayArea (arr) {
    let box ='';
    for(let i =0 ; i < arr.length ; i++){
        box+=`
                        <div class="col p-5">
                    <div class="inner text-white" onclick="getRecipesByArea('${arr[i].strArea}')">
                        <i class="fa-solid fa-house-laptop fa-5x"></i>
                        <h3>${arr[i].strArea}</h3>
                    </div>
                </div>
        `
    }
    rowAreaData.html(box)
};
async function getRecipesByArea (area) {
        try {
        let respons = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
        let data = await respons.json();
        let responsData = data.meals;
        console.log(responsData);
        showRecipeces(responsData);
    } catch (error) {
        // console.log('enter a valid name');
        console.log(error);
    }
}
function showRecipeces(arr) {
    if (typeof arr != 'object') return;
    let recipesss = ''
    if (arr) {
        for (let i = 0; i < Math.min(arr.length, 20); i++) {
            recipesss += `
                    <div class="col">
                        <div class="inner position-relative overflow-hidden" onclick="displayRecipesIfo(${arr[i].idMeal})">
                            <div class="img">
                                <img src="${arr[i].strMealThumb}" alt="" class="d-block w-100 h-100">
                            </div>
                            <div class="heading d-flex flex-column ">
                                <h3 class="text-capitalize text-center fs-3">${arr[i].strMeal}</h3>
                                
                            </div>
                        </div>
                    </div>
            `
        }
        rowAreaData.html(recipesss);
}}



// * ingredients event to get the resipes and the info about the recipece
ingredients.on('click',()=>{
    getIngerdinets();
    resipesSection.addClass('d-none')
    searchSection.addClass('d-none')
    
});
async function getIngerdinets (){
    let respons = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    let data = await respons.json();
    let responsData = data.meals
    console.log(responsData);
    displayIngrediants(responsData)
}
function displayIngrediants (arr) {
    let box ='';
    for(let i =0 ; i <= 20 ; i++){
        box+=`
                        <div class="col p-5">
                    <div class="inner text-white text-center" onclick="getRecipesByIgrediant('${arr[i].strIngredient}')">
                        <i class="fa-solid fa-drumstick-bite fa-5x"></i>
                        <h3>${arr[i].strIngredient}</h3>
                    </div>
                </div>
        `
    }
    rowAreaData.html(box)
};
async function getRecipesByIgrediant (ingredient) {
        try {
        let respons = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
        let data = await respons.json();
        let responsData = data.meals;
        console.log(responsData);
        showRecipeces(responsData);
    } catch (error) {
        // console.log('enter a valid name');
        console.log(error);
    }
}


// * function to vlaidation input and send valid data

contact.on('click',()=>{
    $('#contactSection').removeClass('d-none')
    info.addClass('d-none')
    searchSection.addClass('d-none')
    areaSection.addClass('d-none')
    rowAreaData.addClass('d-none')
    rowSearch.addClass('d-none')
})

let inputs = [
    inputName , 
    inputEmail,
    inputPhone, 
    inputAge , 
    inputPassword , 
    inputRePassword
]

function checkAllValid() {
    if (
        validationContact(inputName, 'nameMsg') &&
        validationContact(inputEmail, 'emailMsg') &&
        validationContact(inputPhone, 'phoneMsg') &&
        validationContact(inputAge, 'ageMsg') &&
        validationContact(inputPassword, 'passMsg') &&
        validationContact(inputRePassword, 'repassMsg')
    ) {
        submit.classList.remove('opacity-50');
        submit.disaple
    } else {
        submit.classList.add('opacity-50');
    }
}
submit.addEventListener('click', (event)=>{
    event.defaultPrevented()
    clearInput();
})
inputs.forEach(ele =>{
    ele.addEventListener('input',checkAllValid);
})
function clearInput() {
    inputs.array.forEach(ele => {
        ele.value = ''
    });
}

function validationContact (element  , massageId){
    
    let text = element.value;
    let massage = document.getElementById(massageId);
    if (regex[element.id].test(text)){
        massage.classList.remove('d-block');
        massage.classList.add('d-none');
        return true;
    }else {
        massage.classList.remove('d-none');
        massage.classList.add('d-block');
        return false
  }
}
