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
    console.log("Step 1: Fetching total count...");
    const { count: total } = await db
      .from("scans")
      .select("*", { count: "exact", head: true });
    console.log("Total:", total);

    console.log("Step 2: Fetching today count...");
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const { count: today } = await db
      .from("scans")
      .select("*", { count: "exact", head: true })
      .gte("created_at", todayStart.toISOString());
    console.log("Today:", today);

    console.log("Step 3: Fetching all scans...");
    const { data: allScans, error: scansError } = await db
      .from("scans")
      .select("created_at");
    
    if (scansError) {
      console.error("Error fetching scans:", scansError);
      throw scansError;
    }
    console.log("Scans fetched:", allScans?.length);

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

    console.log("Step 4: Fetching recent scans...");
    const { data: recent } = await db
      .from("scans")
      .select("id, created_at, visitor_name")
      .order("created_at", { ascending: false })
      .limit(50);
    console.log("Recent scans:", recent?.length);

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ total, today, byDay: formattedByDay, byWeek: formattedByWeek, byMonth: formattedByMonth, recent }),
    };
  } catch (err) {
    console.error("Error in get-stats:", err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message || "Unknown error", stack: err.stack }) };
  }
};
