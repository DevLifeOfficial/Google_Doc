import { supabase } from "../lib/supbase";
import type { User } from "../types";

export const userService = {
  async getAll() {
    const { data, error } = await supabase.from("users").select("*");

    if (error) throw error;

    return data as User[];
  },
};