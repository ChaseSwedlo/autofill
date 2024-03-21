'use strict';
import movies from '../data/movies.js';

const userInput = document.querySelector('.user-input');
const movieList = document.querySelector('.movie-lis');

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