'use strict';
import movies from '../data/movies.js';

const userInput = document.querySelector('.user-input');
const movieList = document.querySelector('.movie-lis');
const lis = document.querySelectorAll('li');

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
    if(occurrences.length != 0) {
        for(let i = 0; i < occurrences.length; i++) {
            htmlList += `<li>${occurrences[i].title}</li>`;
            console.log(occurrences[i].title);
        }
        movieList.innerHTML = htmlList;
    }
    else if(userInput.value.length >= 2) {
        htmlList = '<li>No movies found</li>';
        movieList.innerHTML = htmlList;
    }
    else {
        htmlList = '';
        movieList.innerHTML = htmlList;
    }
    if(userInput.value === '') {
        movieList.innerHTML = '';
    }
}

userInput.addEventListener('input', () => {
    console.log(searchMovies(userInput.value));
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
function buildMovieInfo(title) {
    let index = findIndex(title);
    console.log(index);
    let imgURL = movies[index].poster;
    console.log(imgURL);
    movPoster.style.backgroundImage = `url(${imgURL})`;
    movTitle.innerText = movies[index].title;
    movDescription.innerText = movies[index].description;
    movTime.innerText = movies[index].runningTime;
}

function clearInput() {
    userInput.value = '';
    movieList.innerHTML = '';
}

document.addEventListener("DOMContentLoaded", () => {
    movieList.addEventListener("click", (event) => {
      if (event.target.tagName === "LI") {
        let selectedTitle = event.target.innerText;
        buildMovieInfo(selectedTitle);
        clearInput();
      }
    });
  });