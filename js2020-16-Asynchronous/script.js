'use strict';

const btn = document.querySelector('.btn-country');
const contriesContainer = document.querySelector('.countries');

const renderCountry = function (data, neighbour = '') {
   const html = `
   <article class="country ${neighbour}">
        <img class="country__img" src="${data.flag}" />
        <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
               data.population / 1000000
            ).toFixed(1)} people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${
               data.currencies[0].name
            }</p>
        </div>
    </article>
   `;
   contriesContainer.insertAdjacentHTML('beforeend', html);
};

const renderError = function (message) {
   contriesContainer.insertAdjacentText('beforeend', message);
};
////////////////////////////////////
/*
const getCountryData = function (country) {
   const request = new XMLHttpRequest();
   request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
   request.send();

   request.addEventListener('load', function () {
      const [data] = JSON.parse(this.responseText);
      console.log(data);
      const html = `
   <article class="country">
        <img class="country__img" src="${data.flag}" />
        <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
               data.population / 1000000
            ).toFixed(1)} people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${
               data.currencies[0].name
            }</p>
        </div>
    </article>
   `;
      contriesContainer.insertAdjacentHTML('beforeend', html);
      contriesContainer.style.opacity = 1;
   });
};
getCountryData('vietnam');
getCountryData('thailand');
*/

// const getConntryData = function (country) {
//    fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//       .then(function (response) {
//          return response.json();
//       })
//       .then(function (data) {
//          renderCountry(data[0]);
//          console.log(data);
//       });
// };

// const getConntryData = function (country) {
//    fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//       .then(response => response.json())
//       .then(data => {
//          renderCountry(data[0]);
//          const neighbour = data[0].borders[0];

//          if (!neighbour) return;
//          return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
//       })
//       .then(response => response.json())
//       .then(data => renderCountry(data, 'neighbour'))
//       .catch(err => {
//          console.error(`${err} 🔥🔥🔥`);
//          renderError(`🆘ERROR: ${err.message}. Please try again!`);
//       })
//       .finally(() => {
//          contriesContainer.style.opacity = 1;
//       });
// };

/*
const getJSON = function (url, errorMsg = 'Something went wrong') {
   return fetch(url).then(response => {
      if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
      return response.json();
   });
};

const getCountryData = function (country) {
   getJSON(
      `https://restcountries.eu/rest/v2/name/${country}`,
      'Country not found'
   )
      .then(data => {
         renderCountry(data[0]);
         const neighbour = data[0].borders[0];

         if (!neighbour) throw new Error(`There's no neighbour`);
         return getJSON(
            `https://restcountries.eu/rest/v2/alpha/${neighbour}`,
            'Country not found'
         );
      })
      .then(data => renderCountry(data, 'neighbour'))
      .catch(err => {
         console.error(`${err} 🔥🔥🔥`);
         renderError(`🆘ERROR: ${err.message}. Please try again!`);
      })
      .finally(() => {
         contriesContainer.style.opacity = 1;
      });
};

btn.addEventListener('click', function () {
   getCountryData('vietnam');
});
getCountryData('australia');
*/

const whereAmI = function (lat, lng) {
   fetch(`https://geocode.xyz/${lat},${lng}?geoit=JSON`)
      .then(response => {
         if (!response) throw new Error(`Can't found`);
         return response.json();
      })
      .then(data => {
         console.log(data);
         console.log(`You are in ${data.city}, ${data.country}`);
      })
      .catch(err => console.error(`${err} 🔥🔥🔥`));
};
whereAmI(51.50354, -0.12768);
