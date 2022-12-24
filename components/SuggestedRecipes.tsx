import { useEffect, useState } from "react";
import ClosePopupButton from "./ClosePopupButton";
import { Recipe, Ingredient } from "../database/models";
import EmptyMessage from "./EmptyMessage";
import axios from "axios";

interface RecipeWithAvail extends Recipe {
  outOfStockIngredients: Ingredient[];
  displayedText: string;
}

function mapRecipesWithAvail(recipeArr: Recipe[]) {
  const updatedRecipes: RecipeWithAvail[] = [];
  for (let i = 0; i < recipeArr.length; i++) {
    const recipe = recipeArr[i];
    const outOfStockIngredients: Ingredient[] = [];
    recipe.ingredients.forEach((ingredient) => {
      if (!ingredient.in_stock) {
        outOfStockIngredients.push(ingredient);
      }
    });
    let displayedText = "";
    if (outOfStockIngredients.length === 0) {
      displayedText = "All ingredients available";
    }
    if (
      outOfStockIngredients.length === 1 ||
      outOfStockIngredients.length === 2
    ) {
      displayedText = `Ingredient needed: ${outOfStockIngredients
        .map((i) => i.name)
        .join(" and ")}`;
    }
    updatedRecipes.push({
      ...recipe,
      outOfStockIngredients: outOfStockIngredients,
      displayedText: displayedText,
    });
  }
  return updatedRecipes;
}

function SuggestedRecipes() {
  const [recipeArr, setRecipeArr] = useState<RecipeWithAvail[]>([]);

  useEffect(() => {
    axios
      .get("/api/recipes")
      .then((response) => {
        const arr: Recipe[] = response.data;
        const mappedArr = mapRecipesWithAvail(arr)
          .filter((r) => r.outOfStockIngredients.length < 3)
          .sort((a, b) => {
            const aLenght = a.outOfStockIngredients.length;
            const bLenght = b.outOfStockIngredients.length;
            if (aLenght > bLenght) return 1;
            if (aLenght < bLenght) return -1;
            return 0;
          });
        setRecipeArr(mappedArr);
      })
      .catch((err) => {
        alert("Something Went Wrong!");
        location.reload();
      });
  }, []);

  return (
    <div className="popupcard p-5">
      <h2 className="text-2xl">Suggested Recipes</h2>
      <ClosePopupButton />
      <ul className="flex flex-col divide-y gap-2 my-2 divide-colorWhite/10">
        {recipeArr.map((recipe, idx) => (
          <li key={recipe.id}>
            <p>
              {idx + 1}. {recipe.name}
            </p>
            <p className="text-xs text-colorWhite/50">{recipe.displayedText}</p>
          </li>
        ))}
      </ul>
      {recipeArr.length === 0 && (
        <EmptyMessage message="No Recipes Can be Suggested" />
      )}
    </div>
  );
}

export default SuggestedRecipes;
