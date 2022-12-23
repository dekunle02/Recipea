import axios from "axios";
import { Ingredient, Recipe } from "../database/models";
import { useForm, SubmitHandler } from "react-hook-form";
import React, { FormEvent, useEffect, useMemo, useState } from "react";
import ClosePopupButton from "./ClosePopupButton";
import FormInput from "./FormInput";
import ToggleButton from "./ToggleButton";
import SpinnerButton, { LoadState } from "./SpinnerButton";
import { PopupProvider } from "../hooks/PopupContext";
import { MdDone } from "react-icons/md";

function CreateEditRecipe({ recipe }: { recipe?: Recipe }) {
  const [name, setName] = useState(recipe?.name ?? "");
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [allIngredientsArr, setAllIngredientsArr] = useState<Ingredient[]>([]);
  const [loadState, setLoadState] = useState(LoadState.Default);

  useEffect(() => {
    axios.get("/api/ingredients").then((response) => {
      setAllIngredientsArr(response.data);
    });
  }, []);

  const displayableIngredients = useMemo(() => {
    const ingredientsIdArr = ingredients.map((i) => i.id);
    return allIngredientsArr.map((ing) => {
      let included = false;
      if (ingredientsIdArr.includes(ing.id)) {
        included = true;
      }
      return { ...ing, included: included };
    });
  }, [ingredients, allIngredientsArr]);

  function handleSubmit(event: FormEvent) {
    setLoadState(LoadState.Loading);
    event.preventDefault();
    if (recipe) {
      axios
        .patch(`/api/recipes/${recipe.id}`, {
          name: name,
          ingredients: ingredients.map((i) => i.id),
        })
        .then((response) => {
          setLoadState(LoadState.Success);
          setName("");
          setIngredients([]);
          alert("Recipe Updated");
        });
      return;
    }
    axios
      .post("/api/recipes", {
        name: name,
        ingredients: ingredients.map((i) => i.id),
      })
      .then((response) => {
        setLoadState(LoadState.Success);
        setName("");
        setIngredients([]);
        alert("New Recidepe Added");
      });
  }

  function handleChange(event: React.ChangeEvent) {
    if (event.target.id === "name") {
      setName((event.target as HTMLInputElement).value);
    }
  }

  function handleIngredientClick(ingredientId: string) {}

  return (
    <div className="popupcard p-5">
      <h2 className="text-2xl">{recipe ? "Edit Recipe" : "Create Recipe"}</h2>
      <ClosePopupButton />
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 my-3">
        <FormInput
          id="name"
          type="text"
          placeholder="Name of Recipe"
          label="Name"
          value={name}
          onChange={handleChange}
        />
        <div className="flex flex-row p-2 border-colorWhite/10 rounded gap-2 flex-flow">
          {displayableIngredients.map((ingredient) => (
            <button
              key={ingredient.id}
              onClick={() => handleIngredientClick(ingredient.id)}
              className="icon-button border border-colorPrimary"
            >
              {ingredient.included && <MdDone />}
              {ingredient.name}
            </button>
          ))}
        </div>

        <SpinnerButton
          type="submit"
          className="button w-1/2 mx-auto text-center"
          loadState={loadState}
        >
          Save
        </SpinnerButton>
      </form>
    </div>
  );
}

export default CreateEditRecipe;
