'use strict';
import movies from '../data/movies.js';

const userInput = document.querySelector('.user-input');
const movieList = document.querySelector('.movie-lis');
const button = document.querySelector('.search');
const movPoster = document.querySelector('.poster');
const movTitle = document.querySelector('.title');
const movDescription = document.querySelector('.description');
const movTime = document.querySelector('.time');
const movBox = document.querySelector('.movie-box');
const genreP = document.querySelector('.genre');
let selectedTitle = '';

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
    if(userIn.length > 2)
        list(userIn);
    else
        movieList.innerHTML = '';
});

function findIndex(title) {
    for(let i = 0; i < movies.length; i++) {
        if(title === movies[i].title)
            return i;
    }
}

function buildMovieInfo(title) {
    let index = findIndex(title);
    let imgURL = movies[index].poster;
    let genreList = '';
    movPoster.style.backgroundImage = `url(${imgURL})`;
    movTitle.innerText = movies[index].title;
    movDescription.innerText = movies[index].description;
    movTime.innerText = `${movies[index].year} | ${movies[index].runningTime}`;
    for(let i = 0; i < movies[index].genre.length; i++) {
        genreList += `<span>${movies[index].genre[i]}</span>`
    }
    genreP.innerHTML = genreList;
}

function clearInput() {
    userInput.value = '';
    movieList.innerHTML = '';
}

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
        if(userInput.value != movTitle.innerText && movieList.innerHTML === '') {
            clearInput();
            console.log('hello');
            movBox.classList.add('hidden');
            movBox.classList.remove('shown');
            setTimeout(function() {
                buildMovieInfo(selectedTitle);
                movBox.classList.remove('hidden');
                movBox.classList.add('shown');
            }, 400); 
        }
    }
    else {
        movBox.classList.remove('shown');
        movBox.classList.add('hidden');
    }
});

document.addEventListener('click', (event) => {
    let target = event.target;
    if (![movieList, userInput, button].includes(target) && selectedTitle !== 'No movies found') {
        movieList.innerHTML = '';
    }
});