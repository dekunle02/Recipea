// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import * as dbClient from "../../../database/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "GET") {
    const ingredients = await dbClient.listIngredients();
    res.status(200).json(ingredients);
    return;
  }

  if (req.method === "POST") {
    const { name, in_stock } = req.body;
    dbClient.createIngredient(name, in_stock);
    res.status(200).json("Success");
    return;
  }

  if (req.method === "PATCH") {
    const { id, name, in_stock } = req.body;
    dbClient.updateIngredient({ id: id, name: name, in_stock: in_stock });
    res.status(200).json("Success");
    return;
  }

  if (req.method === "DELETE") {
    const { id } = req.body;
    dbClient.deleteIngredient(id);
    res.status(200).json("Success");
  }

  res.status(400).json("Something went wrong");
}
