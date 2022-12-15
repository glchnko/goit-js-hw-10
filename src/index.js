import './css/styles.css';
import { fetchCountries } from './js/fetchCountries.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector('#search-box'),
    list: document.querySelector('ul.country-list'),
    countryInf: document.querySelector('div.country-info'),
}

refs.input.addEventListener('input' , debounce(onInput, DEBOUNCE_DELAY));

function onInput(e){
    onClear();
    const trimValue = e.target.value.trim();
    if (trimValue < 1) {
        Notify.warning('Please, specify country');
    }
    fetchCountries(trimValue)
    .then(onRenderMarcup)
    .catch(onError);
}


  function onRenderMarcup(countries){
    if (countries.length > 10) {
        Notify.info('Too many matches found. Please, enter a more specific name.');
      } else if (countries.length > 1) {
        refs.list.innerHTML = onMarkupList(countries);
      } else {
        refs.list.innerHTML = onMarkupInfo(countries);
        
      }

  }


   function onClear(){
    refs.input.innerHTML = '';
    refs.countryInf.innerHTML = '';
}
   
    function onError(){
        Notify.failure('Oops, there is no country with that name');

}


function onMarkupList(countriesArr) {
    return countriesArr
    .map(({name , flags}) => {
        return `<li class="list-item" data-name="${name.official}">
        <img class = "list-item__image" src="${flags.svg}" alt="flag of ${name.official} width="15px"/>
        <p class = "list-item__name">${name.official}</p>
        </li>`;
      })
      .join('');
}
 
function onMarkupInfo(countriesArr) {
    return countriesArr
    .map(({name,capital,population,flags,languages}) => {
      const langs = Object.values(languages);
      return `<div class="country-info__header">
      <img class="country-info__image" src="${flags.svg}" alt="flag of ${name.official}" width="30px"/>
      <h2 class="country-info__name">${name.official}</h2></div>
      <p class="country-info__title"><span>Capital: </span>${capital}</p>
      <p class="country-info__title"><span>Population: </span>${population}</p>
      <p class="country-info__title"><span>Languages: </span>${langs}</p>`;
    })
    .join('');
}