'use strict';

const urlStart="https://api.github.com/users/";
const urlEnd="/repos"

function displayResults(responseJson){  
    console.log(responseJson) 
    $('#results').empty()
    $('#results').append(`<h2>Repository list for ${$('#js-username-input').val()}</h2>`);
    for(let i = 0; i < responseJson.length; i++){
        $('#results').append(
            `<ul id="results-list">
                <li>
                    <a href=${responseJson[i].html_url} target="_blank"><h3>${responseJson[i].name}</h3> </a> 
                </li>
            </ul>`
            );
            }
    $('#results').removeClass('hidden')
    }


function pullRepos(username){
    const url = urlStart + username + urlEnd;
    console.log(url);

    fetch(url)
        .then(response => response.json())
        .then(responseJson => displayResults(responseJson));
}

// fetch(url, options)
//     .then(response => {
//       if (response.ok) {
//         return response.json();
//       }
//       throw new Error(response.statusText);
//     })
//     .then(responseJson => displayResults(responseJson, maxResults))
//     .catch(err => {
//       $('#js-error-message').text(`Something went wrong: ${err.message}`);
//     });
// }


function watchForm(){
    $('form').submit(event => {
        event.preventDefault();
        const searchTerm= $('#js-username-input').val();
        pullRepos(searchTerm);
    }

    )
}

function getResults(){

}

$(watchForm);