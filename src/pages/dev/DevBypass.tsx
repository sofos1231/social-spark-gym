import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function DevBypass() {
  const navigate = useNavigate();
  const { login, completeOnboarding } = useAuth();

  useEffect(() => {
    if (import.meta.env.DEV) {
      // Memory-only auth in dev: no persistence
      login();
      completeOnboarding();
    }
    navigate("/", { replace: true });
  }, [navigate, login, completeOnboarding]);

  return null;
}
