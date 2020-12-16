import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import ResultsView from './views/resultsView.js';

// import icons from '../img/icons.svg'; // parcel 1

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
   try {
      const id = window.location.hash.slice(1);

      if (!id) return;

      recipeView.renderSpinner();
      // 1. Loading recipe
      await model.loadRecipe(id);

      // 2. Display recipe
      recipeView.render(model.state.recipe);
   } catch (err) {
      recipeView.renderError();
   }
};

const controlSearchResults = async function () {
   try {
      // 1. Get query
      const query = searchView.getQuery();
      if (!query) return;

      ResultsView.renderSpinner();

      // 2. load results
      await model.loadSearchResult(query);

      // 3. Render results
      console.log(model.state.search.results);
      ResultsView.render(model.state.search.results);
   } catch (err) {
      console.log(err);
   }
};

const init = function () {
   recipeView.addHandlerRender(controlRecipes);
   searchView.addHandlerSearch(controlSearchResults);
};
init();
