import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "./assets/Config";
import { useOnMountUnsafe } from "./useOnMountUnsafe";

const ShopifyCallback = () => {
  const navigate = useNavigate();

  useOnMountUnsafe(() => {
    const handleCallback = async () => {
      const params = new URLSearchParams(window.location.search);
      const shop = params.get("shop");
      const code = params.get("code");
      const state = params.get("state");
      const hmac = params.get("hmac");
      const timestamp = params.get("timestamp");
      const host = params.get("host");

      const storedState = localStorage.getItem("shopify_oauth_state_param");

      if (!shop || !code || !state || !hmac || !timestamp || !host) {
        console.error("Missing required parameters");
        return;
      }

      try {
        const response = await axios.get(
          `${backendUrl}/v1/shopify/api/shopify-callback`,
          {
            withCredentials: true,
            params: {
              shop,
              code,
              state,
              hmac,
              timestamp,
              host,
            },
            headers: {
              "ngrok-skip-browser-warning": "69420",
              "x-shopify-oauth-state-param": storedState,
            },
          }
        );

        if (response.data.success) {
          localStorage.setItem("accessToken", response.data.accessToken);
          localStorage.setItem("shopId", shop);

          localStorage.removeItem("shopify_oauth_state_param");
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
