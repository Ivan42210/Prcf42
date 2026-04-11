import { createClient } from "@supabase/supabase-js";

function normalizeEnvVar(value) {
  let result = (value || "").trim();
  if ((result.startsWith("'") && result.endsWith("'")) || (result.startsWith('"') && result.endsWith('"'))) {
    result = result.slice(1, -1).trim();
  }
  return result;
}

function createSupabase() {
  const supabaseUrl = normalizeEnvVar(process.env.SUPABASE_URL);
  const supabaseKey = normalizeEnvVar(process.env.SUPABASE_SERVICE_KEY);
  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase environment variables are missing.");
  }
  if (!/^https?:\/\//.test(supabaseUrl)) {
    throw new Error("Invalid SUPABASE_URL: must start with http:// or https://");
  }
  return createClient(supabaseUrl, supabaseKey);
}

export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  try {
    const supabase = createSupabase();
    const { visitor_name, metadata } = JSON.parse(event.body || "{}");
    const { error } = await supabase
      .from("scans")
      .insert([{ visitor_name: visitor_name || null, metadata: metadata || null }]);
    if (error) throw error;
    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
