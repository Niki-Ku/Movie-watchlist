

const watchlistFilmObj = {...localStorage}
console.log(watchlistFilmObj)
const arrayOfWatchlistFilmObj = Object.keys(watchlistFilmObj).map(key => ({ [key]: watchlistFilmObj[key]}))

const searchResultsDiv = document.getElementById('search-results')

if (Object.keys(watchlistFilmObj).length > 0){
    document.getElementById('bg-text-main').style.display = 'none'
}

arrayOfWatchlistFilmObj.forEach((e) => hh(e))

async function getFilmData(title, movieID){
    const res = await fetch(`http://www.omdbapi.com/?apikey=445ba942&t=${title}&plot=short`)
    const data = await res.json()
    let posterImg = data.Poster
    if (posterImg === 'N/A'){ 
        posterImg = 'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg'
    }
    return `
    <div class="card">
        <div class="card-poster">
            <img src=${posterImg}>
        </div>
        <div class="card-description">
            <div class="description-title">
                <h2>${data.Title} <span class='fs-mini'><i class="fa-solid fa-star"></i> ${data.Ratings[0].Value.slice(0, 3)}</span></h2>
                
            </div>
            <div class="description-details">
                <p class="fs-mini flex-no-wrap">${data.Runtime}</p>  
                <p class="fs-mini flex-no-wrap">${data.Genre}</p>
                <button class="add-watchlist flex-no-wrap" data-film-title=${movieID}>
                    <i class="fa-solid fa-circle-minus"></i>  Remove
                </button>
            </div>
            <p class="plot">${data.Plot}</p>
        </div>
    </div>
    `
}


document.addEventListener('click', function(e){
    if(e.target.dataset.filmTitle){
        searchResultsDiv.innerHTML = ''
        handleRemoveClick(e.target.dataset.filmTitle)
        arrayOfWatchlistFilmObj.forEach((e) => hh(e))
    }
})

function handleRemoveClick(e){
    localStorage.removeItem(e)
}

function hh (element){
    const filmId = Object.keys(element)[0]

    fetch(`http://www.omdbapi.com/?apikey=445ba942&i=${filmId}`)
        .then(res => res.json())
        .then(data => {
            let result = getFilmData(data.Title, data.imdbID)
            .then(resp => {
                searchResultsDiv.innerHTML += resp
                })
        
        })
}