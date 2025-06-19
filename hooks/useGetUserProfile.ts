import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Database } from "@/types/database/supabase";

type UserId = string;
type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export function useGetUserProfile(id: UserId) {
  return useQuery({
    queryKey: ["profile", id],
    queryFn: async (): Promise<Profile[]> => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .limit(1);

      if (error) throw error;
      return data;
    },
  });
}
