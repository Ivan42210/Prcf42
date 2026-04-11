import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import logoSainte from "../assets/logo Sainté 100.png";
 
const SESSION_KEY = "admin_session";
 
export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const navigate = useNavigate();
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
 
    try {
      // On vérifie le mot de passe via la fonction serverless
      const res = await fetch("/.netlify/functions/get-stats", {
        headers: { Authorization: `Bearer ${password}` },
      });
 
      if (res.status === 401) {
        setError("Mot de passe incorrect.");
        return;
      }
      if (!res.ok) throw new Error("Erreur serveur");
 
      // Session valide 8h
      localStorage.setItem(
        SESSION_KEY,
        JSON.stringify({ password, expiresAt: Date.now() + 8 * 60 * 60 * 1000 })
      );
      navigate("/dashboard");
    } catch {
      setError("Impossible de contacter le serveur.");
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <img src={logoSainte} alt="Logo Sainté" className="login-logo" />
          <div className="login-icon">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="login-title">Espace admin</h1>
          <p className="login-subtitle">Accès tableau de bord</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label className="form-label">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoFocus
              className="form-input"
            />
          </div>

          {error && (
            <p className="error-box">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="submit-button"
          >
            {loading ? "Connexion…" : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
}