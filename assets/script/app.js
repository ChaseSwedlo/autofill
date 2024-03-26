'use strict';
import movies from '../data/movies.js';

const userInput = document.querySelector('.user-input');
const movieList = document.querySelector('.movie-lis');
const button = document.querySelector('.search');

function searchMovies(val) {
    let inputVal = val;
    const foundMovies = movies.filter(movie => movie.title.toLowerCase().includes(inputVal));
    if(foundMovies.length > 5) {
        return foundMovies.splice(0, 5);
    }
    else {
        return foundMovies;
    }
}

function list(input) {
    const occurrences = searchMovies(input);
    let htmlList = '';
    if (occurrences.length !== 0) {
        const htmlList = occurrences.map(movie => `<li>${movie.title}</li>`).join('');
        movieList.innerHTML = htmlList;
    } else if (userInput.value.length >= 2) {
        movieList.innerHTML = '<li class="no-hover">No movies found</li>';
    } else {
        movieList.innerHTML = '';
    }
    
    if (userInput.value === '') {
        movieList.innerHTML = '';
    }
}

userInput.addEventListener('input', () => {
    let userIn = userInput.value.toLowerCase();
    const arr = searchMovies(userIn);
    list(userIn);
});

function findIndex(title) {
    for(let i = 0; i < movies.length; i++) {
        if(title === movies[i].title)
            return i;
    }
}

const movPoster = document.querySelector('.poster');
const movTitle = document.querySelector('.title');
const movDescription = document.querySelector('.description');
const movTime = document.querySelector('.time');
const movBox = document.querySelector('.movie-box');
function buildMovieInfo(title) {
    let index = findIndex(title);
    let imgURL = movies[index].poster;
    movPoster.style.backgroundImage = `url(${imgURL})`;
    movTitle.innerText = movies[index].title;
    movDescription.innerText = movies[index].description;
    movTime.innerText = movies[index].runningTime;
}

function clearInput() {
    userInput.value = '';
    movieList.innerHTML = '';
}

let selectedTitle = '';
document.addEventListener("DOMContentLoaded", () => {
    movieList.addEventListener("click", (event) => {
      if (event.target.tagName === "LI") {
        selectedTitle = event.target.innerText;
        if(selectedTitle != 'No movies found') {
            userInput.value = selectedTitle;
            movieList.innerHTML = '';
        }
      }
    });
});

button.addEventListener("click", () => {
    if(userInput.value != '') {
        if(userInput.value != movTitle.innerText) {
            buildMovieInfo(selectedTitle);
            clearInput();
            movBox.classList.remove('hidden');
            movBox.classList.add('shown');
        }
    }
    else {
        movBox.classList.remove('shown');
        movBox.classList.add('hidden');
    }
});

document.addEventListener('click', (event) => {
    let target  = event.target;
    if(target !== movieList && target !== userInput && target !== button) {
        movieList.innerHTML = '';
    }
});