import { Database } from "./supabase";

type DbProfile = Database["public"]["Tables"]["profiles"]["Row"];

export interface CreatedItems {
  id: string;
}

export interface FavoritedItems {
  id: string;
}

export interface Profile extends DbProfile {
  created_items: CreatedItems[];
  favorited_items: FavoritedItems[];
}
