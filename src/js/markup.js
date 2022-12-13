function createMarkupList(names){
    return names
    .map(({flags, name}) => {
    return `<li class='country-item'>
     <img class='country-flg' width='40' src="${flags.svg}">
    <span class=span-id>${name.official}</span>
    </li>`;
    }).join('');
}

function createMarkup(names) {
    return names
      .map(({ flags, name, capital, population, languages }) => {
        const lang = Object.values(languages)
        return `<div>
        <img height="24" src="${flags.svg}" />
        <h2 class="country-name">${name.official}</h2>
       </div>
       <p class="descr"><span>Capital</span>: ${capital}</p>
       <p class="descr"><span>Population</span>: ${population}</p>
       <p class="descr"><span>Languages</span>: ${lang}</p>`;
      }).join()
  }
  
  export { createMarkupList, createMarkup };
