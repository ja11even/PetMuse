import { supabase } from "./Supabase";
export async function getUserLocation() {
  const res = await fetch("https://ipapi.co/json/");
  const data = await res.json();
  return {
    city: data.city,
    country: data.country,
  };
}
export async function signUp({ firstName, lastName, email, password }) {
  const location = await getUserLocation();
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        firstName,
        lastName,
        city: location.city,
        country: location.country,
        avatar_url: "",
        timezone: timezone,
      },
    },
  });
  if (error) throw new Error(error.message);
  return data;
}

export async function logIn({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  if (data.user) {
    await supabase.from("user").update({ timezone }).eq("id", data.user.id);
  }
  return data;
}

export async function logOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;
  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);
  return data.user;
}
