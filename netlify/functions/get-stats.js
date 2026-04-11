import { createClient } from "@supabase/supabase-js";

const db = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export const handler = async (event) => {
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

    // Graphiques : jour / semaine / mois (agrégation en JS)
    const { data: allScans } = await db
      .from("scans")
      .select("created_at")
      .not("created_at", "is", null);

    const byDay = {};
    const byWeek = {};
    const byMonth = {};

    (allScans || []).forEach(scan => {
      if (!scan.created_at) return;
      const date = new Date(scan.created_at);
      const day = date.toISOString().split('T')[0];
      const week = `W${Math.ceil((date.getDate() + new Date(date.getFullYear(), date.getMonth(), 1).getDay()) / 7)}/${date.getMonth() + 1}`;
      const month = date.toISOString().substring(0, 7);

      byDay[day] = (byDay[day] || 0) + 1;
      byWeek[week] = (byWeek[week] || 0) + 1;
      byMonth[month] = (byMonth[month] || 0) + 1;
    });

    const formatData = (obj, key) => Object.entries(obj)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([k, v]) => ({ [key]: k, count: v }));

    const formattedByDay = formatData(byDay, "day");
    const formattedByWeek = formatData(byWeek, "week");
    const formattedByMonth = formatData(byMonth, "month");

    // Historique récent
    const { data: recent } = await db
      .from("scans")
      .select("id, created_at, visitor_name")
      .order("created_at", { ascending: false })
      .limit(50);

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ total, today, byDay: formattedByDay, byWeek: formattedByWeek, byMonth: formattedByMonth, recent }),
    };
  } catch (err) {
    console.error("Error in get-stats:", err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message || "Unknown error" }) };
  }
};

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

    // Graphiques : jour / semaine / mois (agrégation en JS)
    const { data: allScans } = await db
      .from("scans")
      .select("created_at")
      .not("created_at", "is", null);

    const byDay = {};
    const byWeek = {};
    const byMonth = {};

    (allScans || []).forEach(scan => {
      const date = new Date(scan.created_at);
      const day = date.toISOString().split('T')[0];
      const week = `W${Math.ceil((date.getDate() + new Date(date.getFullYear(), date.getMonth(), 1).getDay()) / 7)}/${date.getMonth() + 1}`;
      const month = date.toISOString().substring(0, 7);

      byDay[day] = (byDay[day] || 0) + 1;
      byWeek[week] = (byWeek[week] || 0) + 1;
      byMonth[month] = (byMonth[month] || 0) + 1;
    });

    const formatData = (obj, key) => Object.entries(obj)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([k, v]) => ({ [key]: k, count: v }));

    const formattedByDay = formatData(byDay, "day");
    const formattedByWeek = formatData(byWeek, "week");
    const formattedByMonth = formatData(byMonth, "month");

    // Historique récent
    const { data: recent } = await db
      .from("scans")
      .select("id, created_at, visitor_name")
      .order("created_at", { ascending: false })
      .limit(50);

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ total, today, byDay: formattedByDay, byWeek: formattedByWeek, byMonth: formattedByMonth, recent }),
    };
  } catch (err) {
    console.error("Error in get-stats:", err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message || "Unknown error" }) };
  }
};