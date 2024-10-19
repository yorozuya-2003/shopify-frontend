import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "./assets/Config";

const ShopifyCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      const params = new URLSearchParams(window.location.search);
      const shop = params.get("shop");
      const code = params.get("code");
      const state = params.get("state");
      const hmac = params.get("hmac");
      const timestamp = params.get("timestamp");
      const host = params.get("host");

      if (!shop || !code || !state || !hmac || !timestamp || !host) {
        console.error("Missing required parameters");
        return;
      }

      try {
        const response = await axios.get(
          `${backendUrl}/api/shopify-callback`, {
            withCredentials: true,
            params: {
              shop: shop,
              code: code,
              state: state,
              hmac: hmac,
              timestamp: timestamp,
              host: host
            },
            headers: { "ngrok-skip-browser-warning": "69420" }
          }
        );


        if (response.data.success) {
          localStorage.setItem("accessToken", response.data.accessToken);
          localStorage.setItem("shopId", shop);
          navigate(`/dashboard?shop=${shop}`);
        } else {
          console.error("Error in callback:", response.data.error);
        }
      } catch (error) {
        console.error("Callback error:", error);
      }
    };

    handleCallback();
  }, [navigate]);

  return <div>Processing Shopify callback, please wait...</div>;
};

export default ShopifyCallback;
