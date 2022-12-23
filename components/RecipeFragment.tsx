import axios from "axios";
import { useState, useEffect } from "react";
import { MdAdd } from "react-icons/md";
import { Recipe } from "../database/models";
import RecipeCard from "./RecipeCard";
import { usePopup } from "../hooks/PopupContext";
import CreateEditRecipe from "./CreateEditRecipe";

function RecipeFragment() {
  const popup = usePopup();
  const [recipeArr, setRecipeArr] = useState<Recipe[]>([]);

  useEffect(() => {
    axios("/api/recipes").then((response: any) => {
      setRecipeArr(response.data);
    });
  }, []);

  function handleAddRecipeClick() {
    popup?.show(<CreateEditRecipe />);
  }

  return (
    <div className="flex flex-col">
      <div className="my-2">
        <span className="text-2xl mx-3 my-1">Recipes</span>
        <button className="button" onClick={handleAddRecipeClick}>
          <MdAdd />
        </button>
      </div>

      <ul className="flex flex-col divide-y divide-colorWhite/10 border rounded-lg border-colorWhite/10 px-2 max-h-80  overflow-auto">
        {recipeArr.map((recipe) => (
          <li key={recipe.id}>
            <RecipeCard recipe={recipe} />
          </li>
        ))}
      </ul>
    </div>
  );
}
export default RecipeFragment;
