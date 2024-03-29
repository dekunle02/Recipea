// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import * as dbClient from "../../../database/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "PATCH") {
    const { id } = req.query;
    const { name, in_stock } = req.body;
    dbClient.updateIngredient({
      id: id as string,
      name: name,
      in_stock: in_stock,
    });
    res.status(200).json("Success");
    return;
  }

  if (req.method === "DELETE") {
    const { id } = req.query;
    dbClient.deleteIngredient(id as string);
    res.status(200).json("Success");
  }

  res.status(400).json("Something went wrong");
}
