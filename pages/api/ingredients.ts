// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getIngredients } from "../../database/client";
import { Ingredient } from "../../database/models";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "GET") {
    const ingredients = await getIngredients();
    res.status(200).json(ingredients);
    return;
  }

  // res.status(200).json({ message: "ingredients" });
}
