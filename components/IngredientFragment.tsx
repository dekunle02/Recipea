import axios from "axios";
import { Ingredient } from "../database/models";
import IngredientCard from "./IngredientCard";
import { MdAdd } from "react-icons/md";
import { useEffect, useState } from "react";
import { getIngredients } from "../database/client";

function IngredientFragment() {
  const [ingredientArr, setIngredientArr] = useState<Ingredient[]>([]);
  useEffect(() => {
    axios("/api/ingredients").then((response) => {
      setIngredientArr(response.data);
    });
  }, []);

  return (
    <div className="py-3 px-5">
      <div className="my-2">
        <span className="text-2xl mx-3">Ingredients</span>
        <button className="button">
          <MdAdd />
        </button>
      </div>

      <ul className="flex flex-col divide-y divide-colorWhite/10 border rounded-lg border-colorWhite/10 px-2">
        {ingredientArr.map((ingredient) => (
          <li key={ingredient.id}>
            <IngredientCard ingredient={ingredient} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default IngredientFragment;
