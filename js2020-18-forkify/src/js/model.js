import { API_URL, RES_PER_PAGE, DEF_FIRST_PAGE, KEY } from './config.js';
// import { getJSON, sendJSON } from './helpers.js';
import { AJAX } from './helpers.js';

// // // // // // // // // // // //

export const state = {
   recipe: {},
   search: {
      query: '',
      results: [],
      page: DEF_FIRST_PAGE,
      resultsPerPage: RES_PER_PAGE,
   },
   bookmarks: [],
};

const createRecipeObject = function (data) {
   const { recipe } = data.data;
   return {
      title: recipe.title,
      id: recipe.id,
      cookingTime: recipe.cooking_time,
      servings: recipe.servings,
      ingredients: recipe.ingredients,
      image: recipe.image_url,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      ...(recipe.key && { key: recipe.key }), // nếu ko có key (left) => falsey value => right ko thực hiện. Nếu left có key => return giá trị key bên phải
   };
};

export const loadRecipe = async function (id) {
   try {
      // 1. Get data
      const data = await AJAX(`${API_URL}${id}?key=${KEY}`);
      state.recipe = createRecipeObject(data);

      if (state.bookmarks.some(bookmark => bookmark.id === id)) {
         state.recipe.bookmarked = true;
      } else state.recipe.bookmarked = false;
   } catch (err) {
      console.error(err);
      throw err;
   }
};

export const loadSearchResult = async function (query) {
   try {
      const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);

      state.search.results = data.data.recipes.map(rec => {
         return {
            title: rec.title,
            id: rec.id,
            image: rec.image_url,
            publisher: rec.publisher,
            ...(rec.key && { key: rec.key }),
         };
      });
   } catch (err) {
      console.error(err);
      throw err;
   }
};

export const getSearchResultsPage = function (page = state.search.page) {
   state.search.page = page;

   const start = (page - 1) * state.search.resultsPerPage;
   const end = page * state.search.resultsPerPage;

   return state.search.results.slice(start, end);
};

export const updateServings = function (newServing) {
   state.recipe.ingredients.forEach(ing => {
      // new ing = old ing * newSer / oldSer
      ing.quantity = (ing.quantity * newServing) / state.recipe.servings;
   });

   state.recipe.servings = newServing;
};

const persistBookmark = function () {
   localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
   // Thêm bookmarks
   state.bookmarks.push(recipe);
   // Đánh dấu bookmarked
   if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
   persistBookmark();
};

export const deleteBookmark = function (id) {
   // Xóa bookmark
   const index = state.bookmarks.findIndex(el => el.id === id);
   state.bookmarks.splice(index, 1);
   // Đánh dấu đã xóa
   if (id === state.recipe.id) state.recipe.bookmarked = false;
   persistBookmark();
};

const init = function () {
   const storage = localStorage.getItem('bookmarks');
   if (storage) state.bookmarks = JSON.parse(storage);
};
init();

// Function để debug
const clearBookmarks = function () {
   localStorage.clear('bookmarks');
};

export const uploadRecipe = async function (newRecipe) {
   try {
      const ingredients = Object.entries(newRecipe)
         .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
         .map(ing => {
            // const ingArr = ing[1].replaceAll(' ', '').split(',');
            const ingArr = ing[1].split(',').map(el => el.trim());
            if (ingArr.length !== 3)
               throw new Error(
                  'Wrong ingredients format. Please submit correct format. 👨‍🍳 Hint: 1,kg,sugar'
               );
            const [quantity, unit, description] = ingArr;
            return { quantity: quantity ? +quantity : null, unit, description };
         });
      const recipe = {
         title: newRecipe.title,
         source_url: newRecipe.sourceUrl,
         image_url: newRecipe.image,
         publisher: newRecipe.publisher,
         cooking_time: +newRecipe.cookingTime,
         servings: +newRecipe.servings,
         ingredients,
      };
      const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
      state.recipe = createRecipeObject(data);
      addBookmark(state.recipe);
   } catch (err) {
      throw err;
   }
};
