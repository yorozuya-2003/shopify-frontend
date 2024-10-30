import { useState } from "react";
import axios from "axios";
import { backendUrl } from "./assets/Config";

const ShopifyLogin = () => {
  const [shop, setShop] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${backendUrl}/v1/shopify/api/login?shop=${shop}`, {
        headers: { "ngrok-skip-browser-warning": "69420" },
      });
      const { url, shopify_oauth_state_param } = response.data;
      localStorage.setItem('shopify_oauth_state_param', shopify_oauth_state_param);

      window.location.href = url;
    } catch (error) {
      setError(
        error.response ? error.response.data.error : "An error occurred"
      );
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="example.myshopify.com"
          value={shop}
          onChange={(e) => setShop(e.target.value)}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Install App</button>
      </form>
    </div>
  );
};

export default ShopifyLogin;
