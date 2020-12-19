import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

// import icons from '../img/icons.svg'; // parcel 1

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

// // // // // // // // // // // //
// hot module replacement (HMR)
// if (module.hot) {
//    module.hot.accept();
// }

const controlRecipes = async function () {
   try {
      const id = window.location.hash.slice(1);

      if (!id) return;
      recipeView.renderSpinner();

      // Update to marked result
      resultsView.update(model.getSearchResultsPage());

      // 1. Loading recipe
      await model.loadRecipe(id);

      // 2. Display recipe
      recipeView.render(model.state.recipe);
   } catch (err) {
      recipeView.renderError();
   }
};

const renderResAndBtn = function (page) {
   // 3. Render results
   resultsView.render(model.getSearchResultsPage(page));

   // 4. Render pagination
   paginationView.render(model.state.search);
};

export const controlSearchResults = async function () {
   try {
      // 1. Get query
      const query = searchView.getQuery();
      if (!query) return;

      resultsView.renderSpinner();

      // 2. Load results
      await model.loadSearchResult(query);
      /*
      resultsView.render(model.getSearchResultsPage()); // 3. Render results
      
      paginationView.render(model.state.search); // 4. Render pagination
      */
      // 3.
      renderResAndBtn();
   } catch (err) {
      console.log(err);
   }
};

const controlPagination = function (goToPage) {
   /*  
   resultsView.render(model.getSearchResultsPage(goToPage)); // 1. Render new results

   paginationView.render(model.state.search); // 2. Render new btn
   */
   renderResAndBtn(goToPage);
};

const controlServings = function (newServing) {
   // 1. Update serving
   model.updateServings(newServing);
   // 2. Render recipe
   recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
   if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
   else model.deleteBookmark(model.state.recipe.id);
   // Update view
   recipeView.update(model.state.recipe);
};

const init = function () {
   recipeView.addHandlerRender(controlRecipes);
   recipeView.addHandlerUpdateServings(controlServings);
   recipeView.addHandlerAddBookmark(controlAddBookmark);
   searchView.addHandlerSearch(controlSearchResults);
   paginationView.addHandlerClick(controlPagination);
};
init();
