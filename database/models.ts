export interface Ingredient {
  id: string;
  name: string;
  in_stock: boolean;
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  ingredients: Ingredient[];
}
