import { supabase } from "../supabaseClient";

const login = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { user: data.user, error };
}

const logout = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
}

export { login, logout };