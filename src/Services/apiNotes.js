import { supabase } from "./Supabase";

export async function fetchNotes(userId, petId) {
  const { data, error } = await supabase
    .from("Notes")
    .select("*")
    .eq("user_id", userId)
    .eq("pet_id", petId)
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data;
}
export async function fetchAllNotes(userId) {
  const { data, error } = await supabase
    .from("Notes")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data;
}
export async function addNotes(notes) {
  const { data, error } = await supabase.from("Notes").insert([notes]).select();
  if (error) throw new Error(error.message);
  return data;
}

export async function updateNotes(id, updates) {
  const { data, error } = await supabase
    .from("Notes")
    .update(updates)
    .eq("id", id)
    .select();
  if (error) throw new Error(error.message);
  return data;
}

export async function deleteNotes(id) {
  const { error } = await supabase.from("Notes").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
