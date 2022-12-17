import { MdAdd } from "react-icons/md";
import { Ingredient, Recipe } from "../database/models";
import RecipeCard from "./RecipeCard";

function RecipeFragment(props: {
  recipeArr: Recipe[];
  ingredientArr: Ingredient[];
}) {
  const { ingredientArr, recipeArr } = props;

  return (
    <div className="py-3 px-5">
      <div className="my-2">
        <span className="text-2xl mx-3 my-1">Recipes</span>
        <button className="button">
          <MdAdd />
        </button>
      </div>

      <ul className="flex flex-col divide-y divide-colorWhite/10 border rounded-lg border-colorWhite/10 px-2">
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
