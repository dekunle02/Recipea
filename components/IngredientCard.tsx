import { MdEdit } from "react-icons/md";
import { Ingredient } from "../database/models";
import { usePopup } from "../hooks/PopupContext";
import CreateEditIngredient from "./CreateEditIngredient";
import DeleteIngredient from "./DeleteIngredient";

function IngredientCard({ ingredient }: { ingredient: Ingredient }) {
  const popup = usePopup();
  function handleEditClick() {
    popup?.show(<CreateEditIngredient ingredient={ingredient} />);
  }

  function handleDeleteClick() {
    popup?.show(<DeleteIngredient ingredient={ingredient} />);
  }

  return (
    <div className="py-3 grid grid-cols-[1fr_auto_min-content] grid-rows-2 gap-1">
      <p className="text-lg font-semibold">{ingredient.name}</p>
      <button
        className="icon-button button my-auto px-3 row-span-2"
        onClick={handleEditClick}
      >
        <MdEdit />
        Edit
      </button>
      <button
        className="text-button row-span-2 my-auto px-3"
        onClick={handleDeleteClick}
      >
        Delete
      </button>
      <div>
        <span
          className={`text-sm inline px-2 py-1 rounded ${
            ingredient.in_stock ? "bg-teal-600" : "bg-rose-600/50"
          }`}
        >
          {ingredient.in_stock ? "In Stock" : "Out of Stock"}
        </span>
      </div>
    </div>
  );
}
export default IngredientCard;
