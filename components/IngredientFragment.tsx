import axios from "axios";
import { Ingredient } from "../database/models";
import IngredientCard from "./IngredientCard";
import { MdAdd } from "react-icons/md";
import { useEffect, useState } from "react";
import { usePopup } from "../hooks/PopupContext";
import CreateEditIngredient from "./CreateEditIngredient";
import EmptyMessage from "./EmptyMessage";

function IngredientFragment() {
  const [ingredientArr, setIngredientArr] = useState<Ingredient[]>([]);
  const popup = usePopup();
  useEffect(() => {
    axios("/api/ingredients").then((response) => {
      setIngredientArr(response.data);
    });
  }, []);

  function handleAddClick() {
    popup?.show(<CreateEditIngredient />);
  }

  return (
    <div className="flex flex-col">
      <div className="my-2">
        <span className="text-2xl mx-3">Ingredients</span>
        <button className="button" onClick={handleAddClick}>
          <MdAdd />
        </button>
      </div>

      <ul className="flex flex-col divide-y divide-colorWhite/10 border rounded-lg border-colorWhite/10 px-2 max-h-80 overflow-auto">
        {ingredientArr.map((ingredient) => (
          <li key={ingredient.id}>
            <IngredientCard ingredient={ingredient} />
          </li>
        ))}
      </ul>
      {ingredientArr.length === 0 && (
        <EmptyMessage message="No Ingredients In Database" />
      )}
    </div>
  );
}

export default IngredientFragment;
