import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const [shop, setShop] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const shopId = localStorage.getItem("shopId");
    const accessToken = localStorage.getItem("accessToken");

    if (shopId) {
      setShop(shopId);
    }

    if (accessToken) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("shopId");
    setIsAuthenticated(false);
    window.location.href = "/";
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <h1>Welcome to Your Shopify App!</h1>
      {shop ? (
        <p>You are logged in with the shop: {shop}</p>
      ) : (
        <p>Loading shop details...</p>
      )}
      <p>This is a dummy dashboard. You can build out your app here.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
