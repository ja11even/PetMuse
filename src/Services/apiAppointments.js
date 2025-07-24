import { supabase } from "./Supabase";

export async function fetchAppointments(userId, petId) {
  const { data, error } = await supabase
    .from("Appointments")
    .select("*")
    .eq("user_id", userId)
    .eq("pet_id", petId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}
export async function fetchAllAppointments(userId) {
  const { data, error } = await supabase
    .from("Appointments")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}
export async function addAppointments(appointment) {
  const { data, error } = await supabase
    .from("Appointments")
    .insert([appointment])
    .select();
  if (error) throw new Error(error.message);
  return data;
}

export async function updateAppointments(id, updates) {
  const { data, error } = await supabase
    .from("Appointments")
    .update(updates)
    .eq("id", id)
    .select();
  if (error) throw new Error(error.message);
  return data;
}

export async function deleteAppointments(id) {
  const { error } = await supabase.from("Appointments").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
