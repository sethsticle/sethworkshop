import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/button";
import FuzzyText from "@/components/FuzzyText";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const handleHome = () => {
    navigate("/");
  }

  return (
    <div className="flex min-h-screen flex-col gap-6 items-center justify-center bg-background p-4">
      <FuzzyText
        baseIntensity={0.2}
        hoverIntensity={0.5}
        enableHover={true}
      >
        404
      </FuzzyText>
      <FuzzyText
        fontSize="clamp(1.5rem, 8vw, 6rem)"
        baseIntensity={0.2}
        hoverIntensity={0.5}
        enableHover={true}
      >
        Page Not Found
      </FuzzyText>
      <Button className="gradient-primary" onClick={handleHome}>Home</Button>
    </div>
  );
};

export default NotFound;
