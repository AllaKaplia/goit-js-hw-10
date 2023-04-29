function onFetchError(error) {
    if(error.status === 404){
        Notiflix.Notify.failure('Oops, such a country name does not exist');
    }
    Notiflix.Notify.warning('Enter the correct country name!');
}

export { onFetchError };