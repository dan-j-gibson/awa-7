'use strict';

const apiKey='60nlsIVM3HBtdQionDcOxEWoMsFQEBxqQpRRTpzJ'
const url='https://developer.nps.gov/api/v1/parks?api_key=' + apiKey;

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
  }


  function displayResults(responseJson){
    console.log(responseJson);
    $('#results').removeClass('hidden');
      $('#results-list').empty();
      for(let i = 0; i < responseJson.data.length; i++){
        $('#results-list').append(
                `
                    <li>
                      <a href=${responseJson.data[i].url} target="_blank">
                      <h3>${responseJson.data[i].fullName}</h3></a>
                      <h4>${responseJson.data[i].description}</h4>
                      <br>
                      <p>${responseJson.data[i].addresses[1].line1}<br>
                      ${responseJson.data[i].addresses[1].city}, 
                      ${responseJson.data[i].addresses[1].stateCode}<br>
                      ${responseJson.data[i].addresses[1].postalCode}</p>
                    </li>
                `
                );
            }
  };


  function getParksList(limit, stateArray) {
    
      console.log(stateArray)
      // for(let i = 0; i < stateArray.length; i++){
        const params = {
            limit,
            stateCode: stateArray
        };
      // }
      const queryString = formatQueryParams(params)
      let finalUrl = url + '&' + queryString
        // for (let i = 0; i < stateArray.length; i++) {
        //     finalUrl += `&stateCode=${stateArray[i]}`
        // }
    

      console.log(finalUrl)

      fetch(finalUrl)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw Error(`looks like there was an issue: ${response.statusText}`);
      })
      .then(responseJson => displayResults(responseJson))
      .catch(err => {
        return alert(`${err.message}`);
      });
    }



  function watchForm() {
    $('form').submit(event => {
      event.preventDefault();
      // const searchTerm = $('#js-search-area').val();
      const maxResults = $('#js-max-results').val();
      const stateArr  = $('#js-multiple-states').val().split(" ")
      getParksList(maxResults, stateArr);
    });
  }

$(function(){
  console.log('App loaded! Waiting for submit!');
  watchForm()
})


// value.split(',')

// New York,New Jersey -> ['New York', 'New Jersey']
// NY, NJ