export interface Item {
  id: string;
  user_id: string;
  title: string;
  description: string;
  main_image: string;
  created_at: string;
  updated_at: string;
  average_rating: number;
  categories: string[];
  tags: string[];
  ingredients: string[];
  instructions: Instruction[];
}

export interface Instruction {
  step_number: number;
  instruction: string;
  image_url?: string;
}

export interface ItemSummary {
  id: string;
  title: string;
  main_image: string;
  average_rating: number;
  categories: string[];
}

export interface Rating {
  item_id: string;
  user_id: string;
  rating: number;
  created_at: string;
}
