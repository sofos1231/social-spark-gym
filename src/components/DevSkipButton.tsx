import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

export default function DevSkipButton() {
  const navigate = useNavigate();
  const { login, completeOnboarding } = useAuth();

  if (!import.meta.env.DEV) return null;

  const handleDevSkip = () => {
    login();
    completeOnboarding();
    navigate("/", { replace: true });
  };

  return (
    <Button
      onClick={handleDevSkip}
      className="fixed bottom-4 right-4 z-50 bg-red-500 hover:bg-red-600 text-white font-bold text-xs px-3 py-2 rounded-lg shadow-lg"
      size="sm"
    >
      DEV SKIP
    </Button>
  );
}