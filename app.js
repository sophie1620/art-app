// Create an app object so that we can use namespacing
const artApp = {}

// save information which will be reused (e.g. API key within properties on the app object)
artApp.apiKey = 'peJtsNdm';
artApp.apiUrl = 'https://www.rijksmuseum.nl/api/en/collection';


// make a call to our API to get some data back
    // once we get that data back, we take it and put it on the page
artApp.getArt = function(userAnimalChoice) {
    // use the url constructor to format the API endpoint to which we will be making our request
    const url = new URL(artApp.apiUrl);
    // console.log(url)
    url.search = new URLSearchParams({
        key: artApp.apiKey,
        q: userAnimalChoice, //this is a parameter that will be replaced based on the animal choice from the user
        imgonly: true, 
        ps: 25
    });

    // now it's time to fetch some data ~ this is a function call
    fetch(url)
    .then( function(apiResponse) {
            // take the promise that is returned and parse it into json
            // console.log(apiResponse)
            return apiResponse.json()
        })
        .then( function(apiData) {
            console.log(apiData.artObjects)
            artApp.displayArt(apiData.artObjects);
        })
} //end of getArt

// create a method which will take the API data and display it on our page 
artApp.displayArt = function(array) {
    array.forEach( function(item) {
        console.log(item);
        // item just represents each individual item within the array

        // extract the data from the API (artist, name, piece, etc) and save it within variables
        const artworkTitle = item.title;
        const artworkImage = item.webImage.url;
        const artist = item.principalOrFirstMaker;
        const altText = item.longTitle;

        console.log(artworkTitle, artworkImage, artist, altText);

        // create an li element in which this information will be added
        const listElement = document.createElement('li')
        console.log(listElement);
        listElement.classList.add('piece');

        // create an h2 to hold the art title
        const heading = document.createElement('h2');
        heading.textContent = artworkTitle;

        // create an img to hold the artwork picture
        const image = document.createElement('img');
        // console.log(image);
        image.alt = altText;
        image.src = artworkImage;

        // create a p wtih a class of .artist to hold the artist name
        const paragraphElement = document.createElement('p');
        paragraphElement.classList.add('artist');
        paragraphElement.textContent = artist;

        // take the elements we have created and add them to the li
        listElement.append(heading, image, paragraphElement)

        // add the li to the ul (so that the data is finally on the DOM)
        const ulElement = document.querySelector('#artwork');
        ulElement.appendChild(listElement);

    }); //we take this forEach method that's been nested in the displayArt method and we ensure that it can access the app object array (so we call it in the second .then() )
}

// artApp.displayAnimal = function() {
//     const animal = document.querySelector('option')
//     const animalChoice = animal.value
//     // console.log(animalChoice); 
// }


// create an initialization method which will kickstart our app
artApp.init = function() {
    console.log(`app is initialized`);
    artApp.getArt('whale');
}

artApp.init();