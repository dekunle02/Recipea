import axios from "axios";
import { Ingredient } from "../database/models";
import ClosePopupButton from "./ClosePopupButton";
import { usePopup } from "../hooks/PopupContext";

function DeleteIngredient({ ingredient }: { ingredient: Ingredient }) {
  const popup = usePopup();
  function handleConfirmDelete() {
    axios
      .delete(`/api/ingredients/${ingredient.id}`)
      .then((response) => {
        alert("Ingredient Deleted");
        location.reload();
      })
      .catch((err) => {
        alert("Error occured!");
      });
  }

  return (
    <div className="popupcard p-5">
      <h2 className="text-2xl">Delete Ingredient</h2>
      <ClosePopupButton />
      <p className="my-5">
        Are you sure you want to delete <u>{ingredient.name}</u>? It is
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

export default DeleteIngredient;
