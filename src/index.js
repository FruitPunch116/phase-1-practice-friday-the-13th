const URL = "http://localhost:3000/movies"

fetch(URL)
.then(res => res.json())
.then(movies => {
    movies.forEach(movie => renderMovie(movie))
    displayMovie(movies[0])
})
.catch(e => alert (e.message))

let selectedMovie

const watched = document.querySelector("#watched")
.addEventListener("click", () => toggleWatched (selectedMovie))

const bloodForm = document.querySelector("#blood-form")
bloodForm.addEventListener("submit", (event)=>bloodCount(event))

function renderMovie (movie) {
    const movieList = document.querySelector("#movie-list")
    const movieImage = document.createElement("img")
    movieImage.src = movie.image
    movieList.append(movieImage)
    movieImage.addEventListener("click", () => displayMovie(movie))
}

function displayMovie(movie) {
    const movieTitle = document.querySelector("#title")
    const movieRelease = document.querySelector("#year-released")
    const movieDescription = document.querySelector("#description")
    const movieImage = document.querySelector("#detail-image")
    const movieWatched = document.querySelector("#watched")
    const bloodAmount = document.querySelector("#amount")
    movieTitle.textContent = movie.title
    movieRelease.textContent = movie.release_year
    movieDescription.textContent = movie.description
    movieImage.src = movie.image
    movieWatched.textContent = movie.watched? "watched" : "unwatched"
    bloodAmount.textContent = movie.blood_amount
    selectedMovie = movie
}

function toggleWatched (movie) {
    movie.watched = !movie.watched
    const watched = document.querySelector("#watched")
    if (movie.watched === false) {
        watched.textContent = 'unwatched'
    } else {
        watched.textContent = "watched"
    }
}

function bloodCount (event) {
    event.preventDefault()
    let bloodInput = document.querySelector("#blood-amount").value
    bloodInput = parseInt(bloodInput)
    // console.log(bloodInput)
    let bloodOutput = document.querySelector("#amount")
    bloodOutput = parseInt(bloodOutput.textContent)
    bloodInput = parseInt(bloodInput) + parseInt(bloodOutput)
    // console.log(bloodOutput)
    
    selectedMovie.blood_amount = bloodInput
    document.querySelector("#amount").textContent= selectedMovie.blood_amount
    document.querySelector("#blood-amount").value = ""

}