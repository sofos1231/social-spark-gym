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
    const dev = import.meta.env.DEV && getLS("DEV_AUTH") === "1";
    const prod = getLS("AUTH") === "1";
    return dev || prod;
  });
  const [onboardingDone, setOnboardingDone] = useState<boolean>(() => {
    const dev = import.meta.env.DEV && getLS("DEV_ONBOARDING_DONE") === "1";
    const prod = getLS("ONBOARDING_DONE") === "1";
    return dev || prod;
  });

  useEffect(() => {
    // keep flags in sync for convenience
    if (isAuthenticated) {
      setLS("AUTH", "1");
      if (import.meta.env.DEV) setLS("DEV_AUTH", "1");
    } else {
      removeLS("AUTH");
      if (import.meta.env.DEV) removeLS("DEV_AUTH");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (onboardingDone) {
      setLS("ONBOARDING_DONE", "1");
      if (import.meta.env.DEV) setLS("DEV_ONBOARDING_DONE", "1");
    } else {
      removeLS("ONBOARDING_DONE");
      if (import.meta.env.DEV) removeLS("DEV_ONBOARDING_DONE");
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
