// console.log("Hello World")
let url = "https://ghibliapi.herokuapp.com/films/58611129-2dbc-4a81-a72f-77ddfc1b1b49"

fetch(url)  // The fetch method is available to us in the browser
            // And we supply at least a url and it will kick off 
            // a "GET" request to that url
    .then(res => res.json()) // .then() can be chained on a fetch to allow us
                             // to take the response and do something with it

    .then(json => { // In this case I have used the json data to display in the console
        console.log(json)
        console.log(json.title)  // These logs are unique to the json that we got back
        console.log(json.locations)// and only work on this objects structure
        console.log(json.director)
    })

/*
BASIC fetch usage
fetch(<url>)
    .then(<cb to process the data>)
    .then(<cb to use the data>)
*/

const baseURL = "https://ghibliapi.herokuapp.com"

fetch(baseURL + "/films") // Reaches out to the internet to get data
    .then(res => res.json()) // Returns on the json data
    .then(json => {
        let myArr = json.map(film => { // Make a new array reducing the items
            return {
                title: film.title,
                rt_score: Number(film.rt_score)}
            })
        // Sort them by rating
        let sortedArr = myArr.sort((cur, prev) => prev.rt_score - cur.rt_score)
        // Passes off the Sorted Array to be displayed
        displayResults(sortedArr)
    })

// Display Results
function displayResults(films) {
    // Grabs the ul element from the index.html
    let filmList = document.getElementById("film-list")
    // Goes through the films that are passed in to the function
    films.map(film => {
        // For each film I make a new li tag
        let filmLi = document.createElement('li') 
        // Assignment of the film title and rt_score to the inner text 
        filmLi.innerText = `${film.title } ${film.rt_score}`
        // Adds the newly made li tag with text to the ul tag
        filmList.appendChild(filmLi)
    })
}