import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export type AuthContextType = {
  isAuthenticated: boolean;
  onboardingDone: boolean;
  login: (email?: string) => void;
  logout: () => void;
  completeOnboarding: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const getLS = (key: string) => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};
const setLS = (key: string, val: string) => {
  try {
    localStorage.setItem(key, val);
  } catch { }
};
const removeLS = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch { }
};

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (import.meta.env.DEV) return false;
    return getLS("AUTH") === "1";
  });
  const [onboardingDone, setOnboardingDone] = useState<boolean>(() => {
    if (import.meta.env.DEV) return false;
    return getLS("ONBOARDING_DONE") === "1";
  });

  useEffect(() => {
    // persist only in production; in dev, session is memory-only
    if (import.meta.env.DEV) return;
    if (isAuthenticated) {
      setLS("AUTH", "1");
    } else {
      removeLS("AUTH");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    // persist only in production; in dev, session is memory-only
    if (import.meta.env.DEV) return;
    if (onboardingDone) {
      setLS("ONBOARDING_DONE", "1");
    } else {
      removeLS("ONBOARDING_DONE");
    }
  }, [onboardingDone]);

  const login = (email?: string) => {
    // mock login for UI dev
    setIsAuthenticated(true);
  };
  const logout = () => {
    setIsAuthenticated(false);
    setOnboardingDone(false);
  };
  const completeOnboarding = () => setOnboardingDone(true);

  const value = useMemo<AuthContextType>(
    () => ({ isAuthenticated, onboardingDone, login, logout, completeOnboarding }),
    [isAuthenticated, onboardingDone]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
