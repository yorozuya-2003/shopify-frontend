import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Dashboard = () => {
  const [searchParams] = useSearchParams();
  const [shop, setShop] = useState("");

  useEffect(() => {
    const shopParam = searchParams.get("shop");
    if (shopParam) {
      setShop(shopParam);
    }
  }, [searchParams]);

  return (
    <div>
      <h1>Welcome to Your Shopify App!</h1>
      {shop ? (
        <p>You are logged in with the shop: {shop}</p>
      ) : (
        <p>Loading shop details...</p>
      )}
      <p>This is a dummy dashboard. You can build out your app here.</p>
    </div>
  );
};

export default Dashboard;
