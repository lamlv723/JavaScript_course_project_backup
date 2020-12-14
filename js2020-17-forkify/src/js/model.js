export const state = {
   recipe: {},
};

export const loadRecipe = async function (id) {
   try {
      // 1. Get data
      const res = await fetch(
         `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
      );
      const data = await res.json();
      if (!res.ok)
         throw new Error(
            `Something went wrong!! ${data.message} (${res.status})`
         );
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
      console.log(err);
   }
};
