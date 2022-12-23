import axios from "axios";
import { Ingredient } from "../database/models";
import { useForm, SubmitHandler } from "react-hook-form";
import React, { FormEvent, useState } from "react";
import ClosePopupButton from "./ClosePopupButton";
import FormInput from "./FormInput";
import ToggleButton from "./ToggleButton";
import SpinnerButton, { LoadState } from "./SpinnerButton";
import { PopupProvider } from "../hooks/PopupContext";

function CreateEditIngredient({ ingredient }: { ingredient?: Ingredient }) {
  const [name, setName] = useState(ingredient?.name ?? "");
  const [in_stock, setInStock] = useState(ingredient?.in_stock ?? false);
  const [loadState, setLoadState] = useState(LoadState.Default);

  function handleSubmit(event: FormEvent) {
    setLoadState(LoadState.Loading);
    event.preventDefault();
    if (ingredient) {
      axios
        .patch("/api/ingredients", {
          id: ingredient.id,
          name: name,
          in_stock: in_stock,
        })
        .then((response) => {
          setLoadState(LoadState.Success);
          setName("");
          setInStock(false);
          alert("Ingredient Updated");
        });
      return;
    }
    axios
      .post("/api/ingredients", { name: name, in_stock: in_stock })
      .then((response) => {
        setLoadState(LoadState.Success);
        setName("");
        setInStock(false);
        alert("New Ingredient Added");
      });
  }

  function handleChange(event: React.ChangeEvent) {
    if (event.target.id === "name") {
      setName((event.target as HTMLInputElement).value);
    }
  }

  function handleToggle(event: React.MouseEvent) {
    event?.preventDefault();
    setInStock((prev) => !prev);
  }

  return (
    <div className="popupcard p-5">
      <h2 className="text-2xl">
        {ingredient ? "Edit Ingredient" : "Create Ingredient"}
      </h2>
      <ClosePopupButton />
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 my-3">
        <FormInput
          id="name"
          type="text"
          placeholder="Name of Ingredient"
          label="Name"
          value={name}
          onChange={handleChange}
        />

        <ToggleButton
          label="In Stock:"
          toggleState={in_stock}
          onClick={handleToggle}
        />
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

export default CreateEditIngredient;
