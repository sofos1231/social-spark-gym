import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function DevBypass() {
  const navigate = useNavigate();
  useEffect(() => {
    if (import.meta.env.DEV) {
      localStorage.setItem("DEV_AUTH", "1");
      localStorage.setItem("DEV_ONBOARDING_DONE", "1");
      // keep non-dev flags in sync too
      localStorage.setItem("AUTH", "1");
      localStorage.setItem("ONBOARDING_DONE", "1");
      navigate("/", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  }, [navigate]);
  return null;
}
