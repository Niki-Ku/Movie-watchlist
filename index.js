// Here is your key: 445ba942    api key

const searchInpt = document.getElementById("search")
const searchResultsDiv = document.getElementById('search-results')

document.getElementById("search-form").addEventListener('submit', (e) => {
    e.preventDefault()
    const searchResult = searchInpt.value
    const backgroundText = document.getElementById('bg-text-main')
    searchInpt.value = ''

    searchResultsDiv.innerHTML = ''
    backgroundText.style.display = 'none'

    fetch(`http://www.omdbapi.com/?apikey=445ba942&s=${searchResult}`)
        .then(res => res.json())
        .then(data => {
            const fetchResultObj = data.Search
            console.log(fetchResultObj)
            if (fetchResultObj === undefined){
                backgroundText.innerHTML = `<h2 class="not-found">Unable to find what you’re looking for. Please try another search.</h2>`
                backgroundText.style.display = 'block'
            }else{
                fetchResultObj.forEach(element => {
                    let result = getFilmData(element.Title, element.imdbID)
                        .then(resp => {
                            searchResultsDiv.innerHTML += resp
                            })
                    })
            }
        })
})



async function getFilmData(title, movieID){
    const res = await fetch(`http://www.omdbapi.com/?apikey=445ba942&t=${title}&plot=short`)
    const data = await res.json()
    // console.log(data)
    let posterImg = data.Poster
    // let filmId = data.Title.split(' ').join('')
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
                    <i class="fa-solid fa-circle-plus"></i>  Watchlist
                </button>
            </div>
            <p class="plot">${data.Plot}</p>
        </div>
    </div>
    `
}

document.addEventListener('click', function(e){
    if(e.target.dataset.filmTitle){
        handleWatlistClick(e.target.dataset.filmTitle)
    }
})

function handleWatlistClick(el){
    localStorage.setItem(el, el)
}

const sml = {...localStorage}
console.log(sml)
