import axios from "axios";
import { Ingredient, Recipe } from "../database/models";
import React, { FormEvent, useEffect, useMemo, useState } from "react";
import ClosePopupButton from "./ClosePopupButton";
import FormInput from "./FormInput";
import SpinnerButton, { LoadState } from "./SpinnerButton";
import { MdDone } from "react-icons/md";

interface EditableIngredient extends Ingredient {
  selected: boolean;
}

function CreateEditRecipe({ recipe }: { recipe?: Recipe }) {
  const [name, setName] = useState(recipe?.name ?? "");
  const [description, setDescription] = useState(recipe?.description ?? "");
  const [ingredientArr, setIngredientArr] = useState<EditableIngredient[]>([]);
  const [loadState, setLoadState] = useState(LoadState.Default);

  useEffect(() => {
    axios.get("/api/ingredients").then((response) => {
      const allIngredientArr: Ingredient[] = response.data;
      const ingredientFromRecipeArr = recipe?.ingredients ?? [];
      if (ingredientFromRecipeArr.length === 0) {
        setIngredientArr(
          allIngredientArr.map((ing) => ({
            ...ing,
            selected: false,
          }))
        );
        return;
      }
      const ingredientFromRecipeIdArr = ingredientFromRecipeArr.map(
        (i) => i.id
      );
      setIngredientArr(
        allIngredientArr.map((ing) => {
          let selected = false;
          if (ingredientFromRecipeIdArr.includes(ing.id)) {
            selected = true;
          }
          return { ...ing, selected: selected };
        })
      );
    });
  }, [recipe?.ingredients]);

  function handleSubmit(event: FormEvent) {
    setLoadState(LoadState.Loading);
    event.preventDefault();
    const selectedIngredients = ingredientArr.filter((i) => i.selected);
    console.log("selectedIngredients =>", selectedIngredients.length);
    if (recipe) {
      axios
        .patch(`/api/recipes/${recipe.id}`, {
          name: name,
          description: description,
          ingredients: selectedIngredients.map((i) => i.id).join(","),
        })
        .then((response) => {
          setLoadState(LoadState.Success);
          alert("Recipe Updated");
          location.reload();
        })
        .catch((err) => {
          alert("Recipe Not Updated");
        });

      return;
    }
    axios
      .post("/api/recipes", {
        name: name,
        description: description,
        ingredients: selectedIngredients.map((i) => i.id).join(","),
      })
      .then((response) => {
        setLoadState(LoadState.Success);
        alert("New Recipe Added");
        location.reload();
      })
      .catch((err) => {
        alert("Recipe Not Added");
      });
  }

  function handleChange(event: React.ChangeEvent) {
    if (event.target.id === "name") {
      setName((event.target as HTMLInputElement).value);
    }
    if (event.target.id === "description") {
      setDescription((event.target as HTMLInputElement).value);
    }
  }

  function handleIngredientClick(ingredientId: string) {
    setIngredientArr((ingredientArr) =>
      ingredientArr.map((i) => {
        let selected = i.selected;
        if (i.id === ingredientId) selected = !selected;
        return { ...i, selected: selected };
      })
    );
  }

  return (
    <div className="popupcard p-5">
      <h2 className="text-2xl">{recipe ? "Edit Recipe" : "Create Recipe"}</h2>
      <ClosePopupButton />
      <form onSubmit={handleSubmit} className="flex flex-col my-3">
        <FormInput
          id="name"
          type="text"
          placeholder="Name of Recipe"
          label="Name"
          value={name}
          onChange={handleChange}
        />
        <br className="mt-6" />
        <FormInput
          id="description"
          type="textarea"
          placeholder="recipe directions or short note"
          label="Description"
          value={description}
          onChange={handleChange}
        />
        <p className="label mt-6">Ingredients</p>
        <div className="flex flex-row px-2 py-3 border border-colorWhite/10 rounded gap-2 flex-wrap">
          {ingredientArr.map((ingredient) => (
            <button
              type="button"
              key={ingredient.id}
              onClick={() => handleIngredientClick(ingredient.id)}
              className={`${
                ingredient.selected
                  ? "bg-teal-600 border-teal-600"
                  : " border-colorPrimary/30"
              }border hover:bg-teal-600/50 icon-button  rounded-2xl px-2`}
            >
              {ingredient.name}
              {ingredient.selected && <MdDone />}
            </button>
          ))}
        </div>

        <SpinnerButton
          type="submit"
          className="button w-1/2 mx-auto text-center mt-6"
          loadState={loadState}
        >
          Save
        </SpinnerButton>
      </form>
    </div>
  );
}

export default CreateEditRecipe;
