import './css/styles.css';
var debounce = require('lodash.debounce');
import Notiflix from 'notiflix';
import { fetchCountries } from './js/fetchCountries';
import { onFetchError } from './js/error';
import { markupCountryCard, markupCountryList } from './js/markupFun';

const DEBOUNCE_DELAY = 300;
let nameCountry = '';

const inputSearch = document.querySelector('input#search-box');
const listCountry = document.querySelector('.country-list');
const infoCountry = document.querySelector('.country-info');
inputSearch.addEventListener('input', debounce(onSearchCountry, DEBOUNCE_DELAY));

function onSearchCountry(evt) {
    evt.preventDefault();

    nameCountry = evt.target.value.trim();

    listCountry.innerHTML = '';
    infoCountry.innerHTML = '';

    if(nameCountry) {
        fetchCountries(nameCountry).then(renderResultFound).catch(onFetchError);
    }
}

function renderResultFound(countries) {
    if (!countries){
        return;
    }

    if(countries.length > 10){
        Notiflix.Notify.info('Please, enter a more specific country name');
        return;
    }

    if(countries.length === 1){
        infoCountry.innerHTML = markupCountryCard(countries);
        return;
    }

    if(countries.length > 1 && countries.length <= 10) {
        listCountry.innerHTML = markupCountryList(countries);
        return;
    }
}