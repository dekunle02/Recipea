import { MdEdit } from "react-icons/md";
import { Ingredient, Recipe } from "../database/models";

function RecipeCard({ recipe }: { recipe: Recipe }) {
  const ingredientString = recipe.ingredients.map((ing) => ing.name).join(", ");
  return (
    <div className="py-3 grid grid-cols-[1fr_auto_min-content] grid-rows-2 gap-2">
      <p className="text-lg font-semibold">{recipe.name}</p>
      <button className="icon-button button my-auto px-3 row-span-2">
        <MdEdit />
        Edit
      </button>
      <button className="text-button row-span-2 my-auto px-3">Delete</button>
      <p className="font-thin text-sm">Ingredients: {ingredientString}</p>
    </div>
  );
}
export default RecipeCard;
