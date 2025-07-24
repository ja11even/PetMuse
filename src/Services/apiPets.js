import { supabase } from "./Supabase";
export async function fetchPets(userId) {
  const { data, error } = await supabase
    .from("Pets")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data;
}

export async function addPets(pets) {
  const { data, error } = await supabase.from("Pets").insert([pets]).select();
  if (error) throw new Error(error.message);
  return data;
}

export async function updatePets(id, updates) {
  const { data, error } = await supabase
    .from("Pets")
    .update(updates)
    .eq("id", id)
    .select();
  if (error) throw new Error(error.message);
  return data;
}

export async function deletePets(id) {
  const { error } = await supabase.from("Pets").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
