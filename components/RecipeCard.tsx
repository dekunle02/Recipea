import { MdEdit } from "react-icons/md";
import { Recipe } from "../database/models";
import { usePopup } from "../hooks/PopupContext";
import CreateEditRecipe from "./CreateEditRecipe";

function RecipeCard({ recipe }: { recipe: Recipe }) {
  const popup = usePopup();
  const ingredientString = recipe.ingredients.map((ing) => ing.name).join(", ");
  function handleRecipeEditClick() {
    popup?.show(<CreateEditRecipe recipe={recipe} />);
  }
  return (
    <div className="py-3 grid grid-cols-[1fr_auto_min-content] grid-rows-2 gap-2">
      <p className="text-lg font-semibold">{recipe.name}</p>
      <button
        className="icon-button button my-auto px-3 row-span-2"
        onClick={handleRecipeEditClick}
      >
        <MdEdit />
        Edit
      </button>
      <button className="text-button row-span-2 my-auto px-3">Delete</button>
      <p className="font-thin text-sm">Ingredients: {ingredientString}</p>
    </div>
  );
}
export default RecipeCard;
