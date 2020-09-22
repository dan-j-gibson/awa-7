'use strict';

const apiKey='60nlsIVM3HBtdQionDcOxEWoMsFQEBxqQpRRTpzJ'
const url='https://developer.nps.gov/api/v1/parks?api_key=' + apiKey;

// adds formatting for each new parameter after API key
function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
  }

// displays national parks along with link to .gov site
  function displayResults(responseJson){
    console.log(responseJson);
    $('#results').removeClass('hidden');
      $('#results-list').empty();
      for(let i = 0; i < responseJson.data.length; i++){
        $('#results-list').append(
                `<ul>
                    <li>
                      <a href=${responseJson.data[i].url} target="_blank">
                      <h3>${responseJson.data[i].fullName}</h3></a>
                      <h4>${responseJson.data[i].description}</h4>
                      <p>${responseJson.data[i].addresses[i].line1}
                      <br> ${responseJson.data[i].addresses[i].city}, 
                      ${responseJson.data[i].addresses[i].stateCode}   
                      ${responseJson.data[i].addresses[i].postalCode}
                    </li>
                `
                );
            }
  };


  function getParksList(query, limit, stateArray) {
      console.log(stateArray)
        const params = {
            q: query,
            limit
        };
      const queryString = formatQueryParams(params)
      let finalUrl = url + '&' + queryString
        for (let i = 0; i < stateArray.length; i++) {
            finalUrl += `&stateCode=${stateArray[i]}`
        }
    

      console.log(finalUrl)

      fetch(finalUrl)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw alert('nothing to see here');
      })
      .then(responseJson => displayResults(responseJson))
      .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
      });
    }



  function watchForm() {
    $('form').submit(event => {
      event.preventDefault();
      const searchTerm = $('#js-search-area').val();
      const maxResults = $('#js-max-results').val();
      const stateArr  = $('#js-multiple-states').val().split(" ")
      getParksList(searchTerm, maxResults, stateArr);
    });
  }

$(function(){
  console.log('App loaded! Waiting for submit!');
  watchForm()
})


// value.split(',')

// New York,New Jersey -> ['New York', 'New Jersey']
// NY, NJ