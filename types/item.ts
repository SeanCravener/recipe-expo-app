import { Database } from "./supabase";

type DbItem = Database["public"]["Tables"]["items"]["Row"];
type DbCategory = Database["public"]["Tables"]["item_categories"]["Row"];

export interface Instruction {
  "image-url": string;
  content: string;
}

export interface Item extends Omit<DbItem, "instructions"> {
  instructions: Instruction[];
  category: string;
}

export interface ItemSummary {
  id: string;
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
  tags: string[];
  ingredients: string[];
  instructions: Instruction[];
};
