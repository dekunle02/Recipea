import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs/promises";
import { Ingredient, Recipe } from "./models";

const IngredientPath = path.join(process.cwd() + "/database/ingredients.json");
const RecipePath = path.join(process.cwd() + "/database/recipes.json");

type Named = {
  name: string;
};

function sortByName(arr: Named[]) {
  arr.sort((a: Named, b: Named) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  return arr;
}

export async function listIngredients() {
  const ingredientsJson = await fs.readFile(IngredientPath);
  const ingredientArr = JSON.parse(ingredientsJson.toString());
  return sortByName(ingredientArr);
}

export async function createIngredient(name: string, in_stock: boolean) {
  const ingredientsJson = await fs.readFile(IngredientPath);
  const ingredientArr: Ingredient[] = JSON.parse(ingredientsJson.toString());
  ingredientArr.push({ id: uuidv4(), name: name, in_stock: in_stock });
  await fs.writeFile(IngredientPath, JSON.stringify(ingredientArr));
}

export async function updateIngredient(ingredient: Ingredient) {
  const ingredientsJson = await fs.readFile(IngredientPath);
  const ingredientArr: Ingredient[] = JSON.parse(ingredientsJson.toString());
  const newArr = ingredientArr.map((ingr) => {
    if (ingr.id === ingredient.id) {
      return ingredient;
    } else return ingr;
  });
  await fs.writeFile(IngredientPath, JSON.stringify(newArr));
}

export async function deleteIngredient(ingredientId: string) {
  const ingredientsJson = await fs.readFile(IngredientPath);
  const ingredientArr: Ingredient[] = JSON.parse(ingredientsJson.toString());
  const newArr = ingredientArr.filter((ingr) => ingr.id !== ingredientId);
  await fs.writeFile(IngredientPath, JSON.stringify(newArr));
}

export async function listRecipes() {
  const recipesJson = await fs.readFile(RecipePath);
  const recipeArr = JSON.parse(recipesJson.toString());
  const ingredientsJson = await fs.readFile(IngredientPath);
  const ingredientArr = JSON.parse(ingredientsJson.toString());

  const hydratedRecipeArr: Recipe[] = [];
  recipeArr.forEach((recipe: Recipe) => {
    const hydratedIngredientArr: Ingredient[] = [];
    recipe.ingredients.forEach((ing: any) => {
      const ingredient = ingredientArr.find((i: any) => i.id === ing);
      if (ingredient) hydratedIngredientArr.push(ingredient);
    });
    hydratedRecipeArr.push({ ...recipe, ingredients: hydratedIngredientArr });
  });
  return sortByName(hydratedRecipeArr);
}

export async function createRecipe(
  name: string,
  description: string,
  ingredients: string[]
) {
  const recipesJson = await fs.readFile(RecipePath);
  const recipeArr = JSON.parse(recipesJson.toString());
  recipeArr.push({
    id: uuidv4(),
    name: name,
    description: description,
    ingredients: ingredients,
  });
  await fs.writeFile(RecipePath, JSON.stringify(recipeArr));
}

export async function updateRecipe(recipe: Recipe, ingredients?: string[]) {
  const recipesJson = await fs.readFile(RecipePath);
  const recipeArr = JSON.parse(recipesJson.toString());
  const newRecipe = {
    ...recipe,
    ingredients: recipe.ingredients.map((i) => i.id),
  };
  if (ingredients) newRecipe.ingredients = ingredients;
  const newArr = recipeArr.map((rec: any) => {
    if (rec.id === recipe.id) {
      return newRecipe;
    } else return rec;
  });
  await fs.writeFile(RecipePath, JSON.stringify(newArr));
}
