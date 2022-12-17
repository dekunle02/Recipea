import path from "path";
import fs from "fs/promises";

const IngredientPath = path.join(process.cwd() + "/database/ingredients.json");

export function createIngredient() {}

export async function getIngredients() {
  const ingredientsJson = await fs.readFile(IngredientPath);
  const ingredientArr = JSON.parse(ingredientsJson.toString());
  return ingredientArr;
}

export function updateIngredient(id: string) {}

export function createRecipe() {}
