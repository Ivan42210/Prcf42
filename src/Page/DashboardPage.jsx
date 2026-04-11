// src/Page/DashboardPage.jsx
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid,
} from "recharts";
import "./DashboardPage.css";

const SESSION_KEY = "admin_session";
function getSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const s = JSON.parse(raw);
    return s.expiresAt > Date.now() ? s : null;
  } catch { return null; }
}

function StatCard({ label, value, sub }) {
  return (
    <div className="stat-card">
      <p className="stat-label">{label}</p>
      <p className="stat-value">{value ?? "—"}</p>
      {sub && <p className="stat-sub">{sub}</p>}
    </div>
  );
}

const PERIODS = [
  { key: "byDay",   label: "Par jour",    xKey: "day"   },
  { key: "byWeek",  label: "Par semaine", xKey: "week"  },
  { key: "byMonth", label: "Par mois",    xKey: "month" },
];

function ScanChart({ data, xKey }) {
  if (!data?.length) {
    return (
      <div className="no-data">
        Aucune donnée sur cette période.
      </div>
    );
  }
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
        <XAxis
          dataKey={xKey}
          tick={{ fontSize: 11, fill: "#999" }}
          axisLine={false} tickLine={false}
        />
        <YAxis
          allowDecimals={false}
          tick={{ fontSize: 11, fill: "#999" }}
          axisLine={false} tickLine={false}
        />
        <Tooltip
          cursor={{ fill: "#ffe6e6" }}
          contentStyle={{ borderRadius: 8, border: "1px solid #e0e0e0", fontSize: 12 }}
        />
        <Bar dataKey="count" fill="#CA2E2F" radius={[4, 4, 0, 0]} name="Scans" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const [stats, setStats]           = useState(null);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState("");
  const [period, setPeriod]         = useState("byDay");
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (!getSession()) navigate("/login");
  }, [navigate]);

  const fetchStats = useCallback(async () => {
    const s = getSession();
    if (!s) { navigate("/login"); return; }
    setRefreshing(true);
    try {
      const res = await fetch("/.netlify/functions/get-stats", {
        headers: { Authorization: `Bearer ${s.password}` },
      });
      if (res.status === 401) { navigate("/login"); return; }
      if (!res.ok) throw new Error("Erreur serveur");
      setStats(await res.json());
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [navigate]);

  useEffect(() => { fetchStats(); }, [fetchStats]);

  const handleLogout = () => {
    localStorage.removeItem(SESSION_KEY);
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="loading">
        Chargement…
      </div>
    );
  }

  const currentPeriod = PERIODS.find((p) => p.key === period);
  const thisMonth = stats?.byMonth?.at(-1)?.count ?? 0;
  const thisWeek  = stats?.byWeek?.at(-1)?.count ?? 0;

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Tableau de bord</h1>
          <p className="dashboard-subtitle">Statistiques de scans QR code</p>
        </div>
        <div className="header-buttons">
          <button
            onClick={fetchStats} disabled={refreshing}
            className="btn-refresh"
          >
            {refreshing ? "…" : "↻ Actualiser"}
          </button>
          <button
            onClick={handleLogout}
            className="btn-logout"
          >
            Déconnexion
          </button>
        </div>
      </header>

      <main className="dashboard-main">
        {error && (
          <div className="error-message">{error}</div>
        )}

        {/* Cartes de stat */}
        <div className="stats-grid">
          <StatCard label="Total scans" value={stats?.total} sub="depuis le début" />
          <StatCard
            label="Aujourd'hui"
            value={stats?.today}
            sub={new Date().toLocaleDateString("fr-FR")}
          />
          <StatCard
            label="Cette semaine"
            value={thisWeek}
            sub="7 derniers jours"
          />
          <StatCard
            label="Ce mois"
            value={thisMonth}
            sub={new Date().toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}
          />
        </div>

        {/* Graphique + sélecteur de période */}
        <section className="chart-section">
          <div className="chart-header">
            <h2 className="chart-title">Évolution des scans</h2>
            <div className="period-selector">
              {PERIODS.map((p) => (
                <button
                  key={p.key}
                  onClick={() => setPeriod(p.key)}
                  className={`period-btn ${period === p.key ? 'active' : ''}`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
          <ScanChart data={stats?.[period]} xKey={currentPeriod?.xKey} />
        </section>

        {/* Historique récent */}
        <section className="recent-section">
          <h2 className="recent-title">Historique récent</h2>
          {!stats?.recent?.length ? (
            <p className="no-data">Aucun scan enregistré.</p>
          ) : (
            <div className="recent-list">
              {stats.recent.map((s) => (
                <div key={s.id} className="recent-item">
                  <div className="recent-info">
                    <div className="dot" />
                    <span className="recent-name">
                      {s.visitor_name || "Visiteur anonyme"}
                    </span>
                  </div>
                  <span className="recent-time">
                    {new Date(s.created_at).toLocaleString("fr-FR", {
                      day: "2-digit", month: "2-digit",
                      hour: "2-digit", minute: "2-digit",
                    })}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}