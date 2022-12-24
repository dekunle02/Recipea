import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs/promises";
import { Ingredient, Recipe } from "./models";

const IngredientPath = path.join(process.cwd() + "/database/ingredients.json");
const RecipePath = path.join(process.cwd() + "/database/recipes.json");

interface Named {
  name: string;
}

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
  let ingredientsString = "[]";
  try {
    const ingredientsJson = await fs.readFile(IngredientPath);
    ingredientsString = ingredientsJson.toString();
  } catch (err) {
    await fs.writeFile(IngredientPath, ingredientsString);
  }
  const ingredientArr = JSON.parse(ingredientsString);
  return sortByName(ingredientArr) as Ingredient[];
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
  let recipesString = "[]";
  try {
    const recipesJson = await fs.readFile(RecipePath);
    recipesString = recipesJson.toString();
  } catch (err) {
    await fs.writeFile(RecipePath, recipesString);
  }
  const recipeArr = JSON.parse(recipesString);
  const ingredientArr: Ingredient[] = await listIngredients();

  const hydratedRecipeArr: Recipe[] = [];
  recipeArr.forEach((recipe: any) => {
    const hydratedIngredientArr: Ingredient[] = [];
    recipe.ingredients.forEach((ing: string) => {
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
  ingredients: string
) {
  const recipesJson = await fs.readFile(RecipePath);
  const recipeArr = JSON.parse(recipesJson.toString());
  recipeArr.push({
    id: uuidv4(),
    name: name,
    description: description,
    ingredients: ingredients.split(","),
  });
  await fs.writeFile(RecipePath, JSON.stringify(recipeArr));
}

type RecipeForm = {
  id: string;
  name: string;
  description: string;
  ingredients: string;
};

export async function updateRecipe({
  id,
  name,
  description,
  ingredients,
}: RecipeForm) {
  const recipesJson = await fs.readFile(RecipePath);
  const recipeArr = JSON.parse(recipesJson.toString());

  const newArr = recipeArr.map((rec: any) => {
    if (rec.id === id) {
      return {
        id: id,
        name: name,
        description: description,
        ingredients: ingredients.split(","),
      };
    }
    return rec;
  });
  await fs.writeFile(RecipePath, JSON.stringify(newArr));
}

export async function deleteRecipe(recipeId: string) {
  const recipesJson = await fs.readFile(RecipePath);
  const recipeArr: Recipe[] = JSON.parse(recipesJson.toString());
  const newArr = recipeArr.filter((rec) => rec.id !== recipeId);
  await fs.writeFile(RecipePath, JSON.stringify(newArr));
}
