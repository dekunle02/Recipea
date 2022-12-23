import type { NextApiRequest, NextApiResponse } from "next";
import * as dbClient from "../../database/client";
import { Ingredient, Recipe } from "../../database/models";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "GET") {
    const recipes = await dbClient.listRecipes();
    res.status(200).json(recipes);
    return;
  }

  // if (req.method === "POST") {
  //   const { name, in_stock } = req.body;
  //   dbClient.createIngredient(name, in_stock);
  //   res.status(200).json("Success");
  //   return;
  // }

  // if (req.method === "PATCH") {
  //   const { id, name, in_stock } = req.body;
  //   dbClient.updateIngredient({ id: id, name: name, in_stock: in_stock });
  //   res.status(200).json("Success");
  //   return;
  // }

  res.status(400).json("Something went wrong");
}
