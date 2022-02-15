// Create an app object so that we can use namespacing
const artApp = {}

// save information which will be reused (e.g. API key within properties on the app object)
artApp.apiKey = 'peJtsNdm';
artApp.apiUrl = 'https://www.rijksmuseum.nl/api/en/collection';


// make a call to our API to get some data back
    // once we get that data back, we take it and put it on the page
artApp.getArt = function() {
    // use the url constructor to format the API endpoint to which we will be making our request
    const url = new URL(artApp.apiUrl);
    console.log(url);
    url.search = new URLSearchParams({
        key: artApp.apiKey,
        q: 'monkey', 
        imgonly: true
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
        })
}



// create an initialization method which will kickstart our app
artApp.init = function() {
    console.log(`app is initialized`);
    artApp.getArt();
}

artApp.init();