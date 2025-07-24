import { supabase } from "./Supabase";

export async function fetchHealthlogs(userId, petId) {
  const { data, error } = await supabase
    .from("Healthlogs")
    .select("*")
    .eq("user_id", userId)
    .eq("pet_id", petId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}
export async function fetchAllHealthlogs(userId) {
  const { data, error } = await supabase
    .from("Healthlogs")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data;
}
export async function addHealthlogs(healthlog) {
  const { data, error } = await supabase
    .from("Healthlogs")
    .insert([healthlog])
    .select();

  if (error) throw new Error(error.message);
  return data;
}

export async function updateHealthLogs(id, updates) {
  const { data, error } = await supabase
    .from("Healthlogs")
    .update(updates)
    .eq("id", id)
    .select();
  if (error) throw new Error(error.message);
  return data;
}

export async function deleteHealthlogs(id) {
  const { error } = await supabase.from("Healthlogs").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
