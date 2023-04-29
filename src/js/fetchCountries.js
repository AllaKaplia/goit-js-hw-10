function fetchCountries(name) {
    const URL_BASE = 'https://restcountries.com/v3.1';

    return fetch(`${URL_BASE}/name/${name}?fields=name,capital,population,flags,languages`)
    .then(response => {
        if(!response.ok){
            throw new Error(response.statusText || response.status.toString())
        }

        return response.json();
    })
}

export { fetchCountries };