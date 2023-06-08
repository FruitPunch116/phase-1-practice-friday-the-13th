const URL = "http://localhost:3000/movies"

fetch(URL)
.then(resp => resp.json())
.then(movies => {
    movies.forEach(movie => renderMovie(movie))
    displayDetails(movies[0])//Out of the scope for the loop, start code from the first object of the array.
})
.catch(e => alert(e.message))
let selectedMovie //Does not iterate with the forEach loop.
document.querySelector("#watched").addEventListener("click", () => toogleWatched(selectedMovie))//Select the desired movie value.
const bloodForm = document.querySelector("#blood-form")//Target to add the event listener.
bloodForm.addEventListener("submit", bloodCount)//Target to display the event listener.

function renderMovie(movie){
    const movieList = document.querySelector("#movie-list")
    const movieImage = document.createElement("img")
    movieImage.src = movie.image
    movieImage.addEventListener("click", () => displayDetails(movie))
    movieList.append(movieImage)//Adds the images to the `nav` movie list.
    // console.log(movieImage)
}

function displayDetails (movie){
    const movieImage = document.querySelector("#detail-image")
    const movieTitle = document.querySelector("#title")
    const movieRelease = document.querySelector("#year-released")
    const movieDescripton = document.querySelector("#description")
    const watched =document.querySelector("#watched")
    const bloodAmount = document.querySelector("#amount")

    movieImage.src = movie.image
    movieTitle.textContent = movie.title
    movieRelease.textContent = movie.release_year
    movieDescripton.textContent = movie.description
    watched.textContent = movie.watched ? "watched" : "unwatched"//if "watched" equalTo true return watched.
    bloodAmount.textContent = movie.blood_amount
    selectedMovie = movie//Displays the details of each movie.
}

function toogleWatched (movie) {
    movie.watched = !movie.watched//Movie value qual to the oposite.
    const watched = document.querySelector("#watched")
    if (movie.watched===false){
        watched.textContent = "unwatched"
    }
    else {
        watched.textContent = "watched"
    }

}

function bloodCount (event) {
    event.preventDefault()
    let inputBlood = document.querySelector("input#blood-amount").value
    inputBlood = parseInt(inputBlood)//Converts input into a number.
    let currentBlood = document.querySelector("#amount").textContent
    currentBlood = parseInt(currentBlood)//Target output to be converted into number.
    inputBlood = inputBlood + currentBlood//Increment number desired with the form number input.
    selectedMovie.blood_amount = inputBlood//Rates the movie selected with the provided input.
    document.querySelector("#amount").textContent = selectedMovie.blood_amount
    document.querySelector("input#blood-amount").value = ""//Resets the form input value.
}
