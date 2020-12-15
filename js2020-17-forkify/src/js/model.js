import { API_URL } from './config.js';
import { getJSON } from './helpers.js';
export const state = {
   recipe: {},
   search: {
      query: '',
      results: [],
   },
};

export const loadRecipe = async function (id) {
   try {
      // 1. Get data
      const data = await getJSON(`${API_URL}${id}`);

      const { recipe } = data.data;
      state.recipe = {
         title: recipe.title,
         id: recipe.id,
         cookingTime: recipe.cooking_time,
         servings: recipe.servings,
         ingredients: recipe.ingredients,
         image: recipe.image_url,
         publisher: recipe.publisher,
         sourceUrl: recipe.source_url,
      };
      //   console.log(state.recipe); // TODO: need to be deleted
   } catch (err) {
      console.error(err);
      throw err;
   }
};

export const loadSearchResult = async function (query) {
   try {
      const data = await getJSON(`${API_URL}?search=${query}`);

      state.search.results = data.data.recipes.map(rec => {
         return {
            title: rec.title,
            id: rec.id,
            image: rec.image_url,
            publisher: rec.publisher,
         };
      });
   } catch (err) {
      console.error(err);
      throw err;
   }
};
