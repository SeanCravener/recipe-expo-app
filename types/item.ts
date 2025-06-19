import { Item as DbItem } from "./database";

export interface Ingredient {
  value: string;
}

export interface Instruction {
  content: string;
  "image-url": string;
}

export interface Item extends Omit<DbItem, "instructions"> {
  instructions: Instruction[];
  category: string;
}

export interface ItemSummary {
  id: string;
  user_id: string;
  title: string;
  main_image: string;
  average_rating: number | null;
  category_id: number | null;
  category: string;
}

export type ItemFormData = {
  title: string;
  description: string;
  main_image: string;
  category_id: number | null;
  ingredients: Ingredient[];
  instructions: Instruction[];
};
