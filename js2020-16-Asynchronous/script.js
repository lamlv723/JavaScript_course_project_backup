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
   contriesContainer.style.opacity = 1;
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

const getConntryData = function (country) {
   fetch(`https://restcountries.eu/rest/v2/name/${country}`)
      .then(response => response.json())
      .then(data => {
         renderCountry(data[0]);
         const neighbour = data[0].borders[0];

         if (!neighbour) return;
         return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
      })
      .then(response => response.json())
      .then(data => renderCountry(data, 'neighbour'))
      .catch(err => {
         console.error(`${err} 🔥🔥🔥`);
         renderError(`🆘ERROR: ${err.message}. Please try again!`);
      })
      .finally(() => {
         contriesContainer.style.opacity = 1;
      });
};

const getJSON = function (url, errorMsg = 'Something went wrong') {
   return fetch(url).then(response => {
      if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
      return response.json();
   });
};
/*
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
*/

// btn.addEventListener('click', function () {
//    // getCountryData('vietnam');
//    whereAmI(51.50354, -0.12768);
// });

const getPosition = function () {
   return new Promise(function (resovle, reject) {
      navigator.geolocation.getCurrentPosition(resovle, reject);
   });
};
/*
const whereAmI = function () {
   getPosition()
      .then(pos => {
         const { latitude: lat, longitude: lng } = pos.coords;
         return fetch(`https://geocode.xyz/${lat},${lng}?geoit=JSON`);
      })
      .then(response => {
         console.log(response);
         if (!response) throw new Error(`Can't found`);
         return response.json();
      })
      .then(data => {
         console.log(data);
         console.log(`You are in ${data.city}, ${data.country}`);

         return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
      })
      .then(res => {
         if (!res.ok) throw new Error(`Country not found (${res.status})`);
         return res.json();
      })
      .then(data => renderCountry(data[0]))
      .catch(err => console.error(`${err} 🔥🔥🔥`))
      .finally(() => {
         contriesContainer.style.opacity = 1;
      });
};
// whereAmI(51.50354, -0.12768);
btn.addEventListener('click', whereAmI);


//  NOTE: CODING CHALLENGE 2
const wait = function (seconds) {
   return new Promise(function (resolve) {
      setTimeout(resolve, seconds * 1000);
   });
};

const imageContainer = document.querySelector('.images');

const createImage = function (path) {
   return new Promise(function (resolve, reject) {
      const img = document.createElement('img');
      img.src = path;

      img.addEventListener('load', function () {
         imageContainer.append(img);
         resolve(img);
      });

      img.addEventListener('error', function () {
         reject(new Error('Image not found'));
      });
   });
};

let currentImg;

createImage('img/img-1.jpg')
   .then(img => {
      currentImg = img;
      console.log('Loaded');
      return wait(2);
   })
   .then(() => {
      currentImg.style.display = 'none';
      return createImage('img/img-2.jpg');
   })
   .then(img => {
      currentImg = img;
      return wait(2);
   })
   .then(() => {
      currentImg.style.display = 'none';
      return createImage('img/img-3.jpg');
   })
   .then(img => {
      currentImg = img;
      return wait(2);
   })
   .then(() => {
      currentImg.style.display = 'none';
   })
   .catch(err => console.log(err));
*/

///////////////////////

// const whereAmI = async function () {
//    try {
//       const pos = await getPosition();
//       const { latitude: lat, longitude: lng } = pos.coords;

//       const resGeo = await fetch(
//          `https://geocode.xyz/${lat},${lng}?geoit=JSON`
//       );
//       if (!resGeo.ok) throw new Error(`Promise rejected 🍕`);
//       const dataGeo = await resGeo.json();

//       const res = await fetch(
//          `https://restcountries.eu/rest/v2/name/${dataGeo.country}`
//       );
//       if (!res.ok) throw new Error(`Promise country rejected 🍕🍕`);

//       const data = await res.json();
//       renderCountry(data[0]);
//       return `You are in ${dataGeo.city}, ${dataGeo.country}`;
//    } catch (err) {
//       renderError(`${err.message}`);
//       throw err;
//    }
// };
// // whereAmI(51.50354, -0.12768);
// btn.addEventListener('click', whereAmI);
// (async function () {
//    try {
//       const city = await whereAmI();
//       console.log(`2: ${city}`);
//    } catch (err) {
//       console.error(`2: ${err.message}`);
//    }
//    console.log(`3: Finished`);
// })();

///////////////////////////////

const get3Countries = async function (c1, c2, c3) {
   try {
      const data = await Promise.all([
         getJSON(`https://restcountries.eu/rest/v2/name/${c1}`),
         getJSON(`https://restcountries.eu/rest/v2/name/${c2}`),
         getJSON(`https://restcountries.eu/rest/v2/name/${c3}`),
      ]);
      console.log(data);
      console.log(data.map(d => d[0].capital));
   } catch (err) {
      console.log(err);
   }
};
btn.addEventListener('click', get3Countries('vietnam', 'laos', 'usa'));

/////////NOTE:///////////////

const wait = function (seconds) {
   return new Promise(function (resolve) {
      setTimeout(resolve, seconds * 1000);
   });
};

const imageContainer = document.querySelector('.images');

const createImage = function (path) {
   return new Promise(function (resolve, reject) {
      const img = document.createElement('img');
      img.src = path;

      img.addEventListener('load', function () {
         imageContainer.append(img);
         resolve(img);
      });

      img.addEventListener('error', function () {
         reject(new Error('Image not found'));
      });
   });
};

let currentImg;

const loadNPause = async function () {
   try {
      let img = await createImage('img/img-1.jpg');
      console.log('img 1 loaded');
      await wait(2);
      img.style.display = 'none';

      img = await createImage('img/img-2.jpg');
      console.log('img 2 loaded');
      await wait(2);
      img.style.display = 'none';

      img = await createImage('img/img-3.jpg');
      console.log('img 3 loaded');
      await wait(2);
      img.style.display = 'none';
   } catch (err) {
      console.error(err);
   }
};
// loadNPause();

const loadAll = async function (imgArr) {
   try {
      const imgs = imgArr.map(async imgPath => await createImage(imgPath));
      console.log(imgs);

      const imgsEl = await Promise.all(imgs);
      imgsEl.forEach(img => img.classList.add('parallel'));
   } catch (err) {
      console.error(err);
   }
};
loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
