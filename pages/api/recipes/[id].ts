import type { NextApiRequest, NextApiResponse } from "next";
import * as dbClient from "../../../database/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "PATCH") {
    const { id } = req.query;
    const { name, description, ingredients } = req.body;
    dbClient.updateRecipe({
      id: id as string,
      name: name,
      description: description,
      ingredients: ingredients,
    });
    res.status(200).json("Success");
    return;
  }

  if (req.method === "DELETE") {
    const { id } = req.query;
    dbClient.deleteRecipe(id as string);
    res.status(200).json("Success");
  }

  res.status(400).json("Something went wrong");
}
