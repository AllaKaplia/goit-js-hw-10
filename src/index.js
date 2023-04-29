import './css/styles.css';
var debounce = require('lodash.debounce');
import NewsFetchCountriesAPI from "./js/fetchCountries";
import getRefs from "./js/refs";

const DEBOUNCE_DELAY = 300;
let name = '';
const newsFetchCountriesAPI = new NewsFetchCountriesAPI;
const refs = getRefs();

refs.inputSearch.addEventListener('submit', onSearchCountry);

function onSearchCountry(evt) {
    evt.preventDefault();

    name = evt.currentTarget.elements.query.value;
    console.log(name);

    newsFetchCountriesAPI.fetchCountries(name);
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


