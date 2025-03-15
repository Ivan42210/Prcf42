import { supabase } from "../supabaseClient";

const login = async (email, password) => {
  const { user, error } = await supabase.auth.signIn({
    email,
    password,
  });
  return { user, error };
}

const logout = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
}

export {login, logout};