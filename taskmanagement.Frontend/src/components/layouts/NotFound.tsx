import { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFound: FC = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCount) => prevCount - 1);
    }, 1000);

    if (countdown === 0) {
      navigate("/app");
    }

    return () => clearInterval(timer);
  }, [countdown, navigate]);

  return (
    <div>
      <h1>404 Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <p>Redirecting to App in {countdown} seconds...</p>
    </div>
  );
};

export default NotFound;