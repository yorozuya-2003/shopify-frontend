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

      if (!shop || !code || !state) {
        console.error("Missing shop, code, or state");
        return;
      }

      try {
        const response = await axios.get(
          `${backendUrl}/api/shopify-callback?shop=${shop}&code=${code}&state=${state}`,
          {
            headers: { "ngrok-skip-browser-warning": "69420" },
          }
        );

        if (response.data.success) {
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
