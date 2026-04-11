const { createClient } = require("@supabase/supabase-js");

const db = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

exports.handler = async (event) => {
  const token = (event.headers["authorization"] || "").replace("Bearer ", "");
  if (token !== process.env.ADMIN_PASSWORD) {
    return { statusCode: 401, body: JSON.stringify({ error: "Non autorisé" }) };
  }

  try {
    // Total général
    const { count: total } = await db
      .from("scans")
      .select("*", { count: "exact", head: true });

    // Aujourd'hui
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const { count: today } = await db
      .from("scans")
      .select("*", { count: "exact", head: true })
      .gte("created_at", todayStart.toISOString());

    // Graphiques : jour / semaine / mois
    const [{ data: byDay }, { data: byWeek }, { data: byMonth }] = await Promise.all([
      db.rpc("scans_by_day"),
      db.rpc("scans_by_week"),
      db.rpc("scans_by_month"),
    ]);

    // Historique récent
    const { data: recent } = await db
      .from("scans")
      .select("id, created_at, visitor_name")
      .order("created_at", { ascending: false })
      .limit(50);

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ total, today, byDay, byWeek, byMonth, recent }),
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};