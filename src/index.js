import './css/styles.css';
import { fetchCountries } from './js/fetchCountries.js';
import { createMarkupList, createMarkup } from './js/markup.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector('#search-box'),
    list: document.querySelector('.country-list'),
    countryInf: document.querySelector('.country-info'),
}

refs.input.addEventListener('clik' , debounce(onInput, DEBOUNCE_DELAY));


function onClean(){
    refs.list.innerHTML = '';
    refs.countryInf.innerHTML = '';
}

function onInput(e) {
    const value = e.target.value.trim();
    if(value.length < 1) return;
    fetchCountries(value).then(country).catch(error);
    console.log(fetchCountries(value));
}

function onNameCountry(name){
    refs.list.innerHTML = createMarkupList(name);
    if(name.length > 10){
        Notify.info('Too many matches found. Please enter a more specific name.');
        onClean();
    }

    if(name.length > 1 && name.length <= 10){
        refs.countryInf.innerHTML = '';
    }
    

    if(name.length === 1){
        refs.list.innerHTML = '';
        refs.countryInf.innerHTML = createMarkup(name);
        
    }

}

function error() {
    Notify.failure('Oops, there is no country with that name');
    onClean();
  }

