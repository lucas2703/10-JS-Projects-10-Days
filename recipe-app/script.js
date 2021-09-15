var favContainer = document.getElementById('favContainer');
var randomMealData = null;
var searchMeal = null;
var randFavMeal = false;
var favourites = {};

function startUp()
{
    document.getElementById('meal-desc').style.display = 'none';
}

startUp();

function loadImage(imgSrc, parentID, id, random=false)
{
    // for random meal image
    if (random == true)
    {
        let randImg = document.createElement('img');
        randImg.src = imgSrc;
        randImg.id = id;
        document.getElementById(parentID).appendChild(randImg);

        document.getElementById('rand-img').addEventListener('click', () => {
            displayMealInfo(random=true);
        })

        return
    }
    // else it's for favourite meals

}

async function displayMealInfo(random=false, mealName=null)
{
    var window = document.getElementById('meal-desc');

    document.getElementById('meal-desc').addEventListener('click', function(e) {
        if (e.target.classList[1] != 'fa-heart')
        {
            document.getElementById('meal-desc').style.display = 'none';
        }
    })

    if (random == true)
    {
        var data = randomMealData.meals[0];
    }
    else if (data)
    {
        var data = favourites[mealName];
    }
    else
    {
        var data = searchMeal;
    }

    var ingredients = [];
    for (let i = 1; i < 20; i++)
    {
        if (data["strIngredient" + i])
        {
            ingredients.push(`${data["strIngredient" + i]}: ${data["strMeasure" + i]}`);
        }
        else
        {
            break;
        }
    }

    window.innerHTML = `
        <h2>${data.strMeal}</h2>
        
        <h3>Ingredients</h3>
        <p id="meal-ingred">
        <ul id="ingred-list">
            ${ingredients.map( (ing) => `
            <li>${ing}</li>
            `).join("")}
        </ul>
        </p>

        <h3>Instructions</h3>
        <p id="meal-instr">${data.strInstructions}</p>

        <button id="fav-button"><i class="fas fa-heart"></i></button>
        `

    var favButton = document.getElementById('fav-button');
    favButton.addEventListener('click', () => {
        if (!favourites[data.strMeal]) 
        {
            console.log("favourited");
            favourites[data.strMeal] = data;
            addFavMeal(data.strMeal, data.strMealThumb);
        }
    })

    // display window
    document.getElementById('meal-desc').style.display = 'block';
}

function addFavMeal(name, img)
{
    var favMeal = document.createElement('li');

    favMeal.innerHTML = `
    <img
        src="${img}"
        alt="${name}"
    /><span class="caption">${name}</span>
    `;

    favMeal.addEventListener('click', () => {
        displayMealInfo(name=name);
    });

    favContainer.appendChild(favMeal);

    console.log(name, img);
}

async function loadRandomMeal() 
{
    var randomMeal = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    randomMealData = await randomMeal.json();

    console.log(randomMealData.meals[0]);

    loadImage(randomMealData.meals[0].strMealThumb, 'rand-body', 'rand-img', true);

    let randomName = randomMealData.meals[0].strMeal;
    document.getElementById('rand-meal-header').innerHTML = randomName;
}

loadRandomMeal();

// n is number of meals wanted in return
async function fetchSearchMeal(n, input, names=false)
{
    let searchTerm = 'https://www.themealdb.com/api/json/v1/1/search.php?s=' + input;
    let getMeals = await fetch(searchTerm);
    let meals = await getMeals.json();

    if (meals.meals == null)
    {
        throw "No meal found!";
    }

    if (names == true)
    {
        let mealArr = new Array();
        for (let i = 0; i < n; i++)
        {
            mealArr[i] = meals.meals[i].strMeal;
        }
    
        return mealArr;
    }

    else
    {
        return meals.meals[0];
    }
}

// search box functionality 
document.getElementById('search-button').addEventListener('click', async () => {
    let searchText = document.getElementById('search-box').value;
    searchMeal = await fetchSearchMeal(1, searchText);
    console.log(searchMeal);
    displayMealInfo();
})

document.getElementById('search-box').addEventListener('input', async () => {
    let searchText = document.getElementById('search-box').value;
    try {
        var meals = await fetchSearchMeal(5, searchText, names=true);
    }
    catch (e) {
        return
    }

    var options = '';
    
    for (var i = 0; i < meals.length; i++) {
        options += '<option value="' + meals[i] + '" />';
    }

    document.getElementById('search-text').innerHTML = options;
})