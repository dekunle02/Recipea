import axios from "axios";
import { Recipe } from "../database/models";
import ClosePopupButton from "./ClosePopupButton";
import { usePopup } from "../hooks/PopupContext";

function DeleteRecipe({ recipe }: { recipe: Recipe }) {
  const popup = usePopup();
  function handleConfirmDelete() {
    axios
      .delete(`/api/recipes/${recipe.id}`)
      .then((response) => {
        alert("Recipe Deleted");
        location.reload();
      })
      .catch((err) => {
        alert("Error occured!");
      });
  }

  return (
    <div className="popupcard p-5">
      <h2 className="text-2xl">Delete Recipe</h2>
      <ClosePopupButton />
      <p className="my-5">
        Are you sure you want to delete <u>{recipe.name}</u>? It is
        irreversible.
      </p>
      <div className="flex flex-row gap-3 justify-end mt-5">
        <button
          className="text-button"
          onClick={() => {
            popup?.dismiss();
          }}
        >
          Cancel
        </button>
        <button className="button" onClick={handleConfirmDelete}>
          Yes, Delete
        </button>
      </div>
    </div>
  );
}

export default DeleteRecipe;
