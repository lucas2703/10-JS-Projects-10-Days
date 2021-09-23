const APIKEY = 'd8ed6c494c5c38232f0ba10432035608';
const IMGPATH = 'https://image.tmdb.org/t/p/original/';
const APISEARCH = `https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&language=en-US&page=1&include_adult=false`
const searchBar = document.getElementById('search-bar');

const genres = {
    '27' : 'horror',
    '28' : 'action',
    '16' : 'animation',
    '18' : 'drama'
};

// for each genre in the dictionary at the top, add those (basically the start of the script)
Object.keys(genres).forEach(async function(genre) {
    console.log(genre);
    await showMovies(genre).then(console.log("done adding genre"));
});

// get the movie data
async function getMovieByGenre(genre)
{
    var response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${APIKEY}&with_genres=${genre}`);
    var responseData = await response.json();

    return responseData.results;
}

async function searchMovie(searchTerm)
{
    var response = await fetch(APISEARCH + '&query=' + searchTerm);
    var responseData = await response.json();
    // return first film
    return responseData.results[0];
}

// adding the sldie info the each slide, called 20 times for each genre
async function addSlide(genre, movie)
{
    console.log(movie);
    var parent = document.getElementById(genre);
    var newSlide = document.createElement('li');
    newSlide.classList.add('splide__slide');
    
    var imgThumbnail = IMGPATH + movie.poster_path;

    newSlide.innerHTML = `
        <div class="slide"> 
            <div class='movie-info'>
                <h3>${movie.original_title}</h3>
                <p style="line-height:1.4">
                    ${movie.overview}<br>
                    <br>
                    Release Date: ${movie.release_date}
                    Rating/10: <span class="rating ${colourRating(movie.vote_average)}">${movie.vote_average}</span>
                </p>
            </div> 
            <img src="${imgThumbnail}">
        </div>
    `

    parent.appendChild(newSlide);
}

// css determining for rating colour    
function colourRating(rating)
{
    if (rating > 7.5)
    {
        return 'greenRate';
    }
    if (rating >= 6)
    {
        return 'orangeRate';
    }
    if (rating < 6)
    {
        return 'redRate';
    }
}

// finds cast for a given movie
async function findCast(movieID)
{
    var response = await fetch(`https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=${APIKEY}&language=en-US`);
    var responseData = await response.json();
    return responseData.cast.slice(0, 5);
}

// using first 20 movies from getMovieByGenre func, pass each movie through
// addSlide and create the HTML for that movie (thumbnail, text etc.)
async function showMovies(genre)
{
    console.log("starting to add slides");
    // fetch movie by genre
    await getMovieByGenre(genre).then(function(result){
        console.log(genre);
        document.getElementById(genres[genre]).innerHTML = '';
        // using promise object, display each movie within slide html
        result.forEach(function(movie) {
            addSlide(genres[genre], movie);
        })
    });

    createSlider(genre);
    console.log("finished adding slides")
}

// function to create each slider based on genre 
function createSlider(sliderNumber)
{
    console.log('#image-slider' + sliderNumber);
    console.log("creating slider");
	new Splide( '#image-slider' + sliderNumber,
    {
        gap: '1.3em',
        type: 'loop',
        perPage: 6,
        pagination: false   
    } ).mount();

    console.log("finished making slider");
}

function showSearchedMovie(movie)
{
    var movieContainer = document.createElement('div');
    movieContainer.classList.add('searchedMovie');
    var imgThumbnail = IMGPATH + movie.poster_path;
    movieContainer.innerHTML = `
            <img src="${imgThumbnail}">
            <h3>${movie.original_title}</h3>
            <p style="line-height:1.4">
                ${movie.overview}<br>
                <br>
                Release Date: ${movie.release_date}<br>
                Rating/10: <span class="rating ${colourRating(movie.vote_average)}">${movie.vote_average}</span>
            </p>
    `

    movieContainer.addEventListener('click', () => {
        movieContainer.remove();
    });

    document.body.appendChild(movieContainer);

}

searchBar.addEventListener('keypress', async function(e) {
    if (e.key != 'Enter'){
        return;
    }

    var searchText = searchBar.value;
    var searchFilm = await searchMovie(searchText);

    if (searchFilm == null)
    {
        alert('No movie found with that word, please try again.');
    }

    showSearchedMovie(searchFilm);

    document.getElementsByClassName('splide').style.visibility = 'none';
});