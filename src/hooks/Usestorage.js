import { useState, useEffect, useCallback } from "react";
 
const SCANS_KEY = "contact_scans";
const SESSION_KEY = "admin_session";
 
export function useScans() {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
 
  const loadScans = useCallback(async () => {
    try {
      const result = await window.storage.get(SCANS_KEY, true); // shared=true
      const data = result ? JSON.parse(result.value) : [];
      setScans(data);
    } catch {
      setScans([]);
    } finally {
      setLoading(false);
    }
  }, []);
 
  // Enregistre un nouveau scan (appelé depuis le formulaire de contact)
  const recordScan = useCallback(async (metadata = {}) => {
    try {
      const result = await window.storage.get(SCANS_KEY, true);
      const current = result ? JSON.parse(result.value) : [];
      const newScan = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        date: new Date().toLocaleDateString("fr-FR"),
        ...metadata,
      };
      const updated = [...current, newScan];
      await window.storage.set(SCANS_KEY, JSON.stringify(updated), true);
      return newScan;
    } catch (err) {
      console.error("Erreur enregistrement scan:", err);
    }
  }, []);
 
  useEffect(() => {
    loadScans();
  }, [loadScans]);
 
  return { scans, loading, recordScan, refreshScans: loadScans };
}
 
export function useAdminSession() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
 
  useEffect(() => {
    const check = async () => {
      try {
        const result = await window.storage.get(SESSION_KEY);
        if (result) {
          const session = JSON.parse(result.value);
          const valid = session.expiresAt > Date.now();
          setIsAuthenticated(valid);
          if (!valid) await window.storage.delete(SESSION_KEY);
        }
      } catch {
        setIsAuthenticated(false);
      } finally {
        setChecking(false);
      }
    };
    check();
  }, []);
 
  const login = async (password) => {
    // Remplacez "admin123" par votre mot de passe ou une vérification API
    const ADMIN_PASSWORD = process.env.REACT_APP_ADMIN_PASSWORD || "admin123";
    if (password !== ADMIN_PASSWORD) return false;
 
    const session = {
      loggedAt: Date.now(),
      expiresAt: Date.now() + 8 * 60 * 60 * 1000, // 8h
    };
    await window.storage.set(SESSION_KEY, JSON.stringify(session));
    setIsAuthenticated(true);
    return true;
  };
 
  const logout = async () => {
    await window.storage.delete(SESSION_KEY);
    setIsAuthenticated(false);
  };
 
  return { isAuthenticated, checking, login, logout };
}
 