import { MdEdit } from "react-icons/md";
import { Ingredient } from "../database/models";

function IngredientCard({ ingredient }: { ingredient: Ingredient }) {
  return (
    <div className="py-3 grid grid-cols-[1fr_auto_min-content] grid-rows-2 gap-2">
      <p className="text-lg font-semibold">{ingredient.name}</p>
      <button className="icon-button button my-auto px-3 row-span-2">
        <MdEdit />
        Edit
      </button>
      <button className="text-button row-span-2 my-auto px-3">Delete</button>
      <p className="font-thin text-sm">
        {ingredient.in_stock ? "In Stock" : "Out of Stock"}
      </p>
    </div>
  );
}
export default IngredientCard;
