import './css/styles.css';
var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;
let name = ""; 

const refs = {
    inputSearch: document.querySelector('input#search-box'),
    listCountry: document.querySelector('.country-list'),
    infoCountry: document.querySelector('.country-info'),
};

refs.inputSearch.addEventListener('input', debounce(onSearchCountry, DEBOUNCE_DELAY));

function fetchCountries(name) {
    return fetch(`https://restcountries.com/v3.1/all?fields=${name},name.official,capital,population,flags.svg,languages`).then(response => response.json());
}

function onSearchCountry(evt) {
    evt.preventDefault();

    name = evt.target.value;

  if(name.length === 1){
    fetchCountries(name).then(country => renderCountryCard(country))
    .catch(error => console.log(error));
  } else if(name.length > 2 && name.length < 10){
    fetchCountries(`'${name}'`).then(country => markupCountryList(country))
    .catch(error => console.log(error));
  }

}

function markupCountryList (countries){
    const markup = countries.map(country => {
        return `
        <li class="box-country">
            <img src="${country.flags.svg}" alt="${country.name}" width="60">
            <span>${country.name}</span>
        </li>`
    }).join('');

    refs.listCountry.innerHTML = markup;
}

function renderCountryCard(countries) {
    const markupCountryCard = countries.map(({ name, capital, population, flags, languages }) => {
        return `
        <li class="box-country">
            <h1 class="title">Name official: ${name.official}</h1>
            <h2>Capital: ${capital}</h2>
            <p>Population: ${population}</p>
            <p>Flag: 
                <img src="${flags.svg}" alt="${flags.alt}" width="75">
            </p>
            <p>Languages: ${Object.values(languages)}</p>
        </li>`
    }).join('');

    refs.infoCountry.innerHTML = markupCountryCard;
}