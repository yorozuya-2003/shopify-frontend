import { useState } from "react";
import axios from "axios";
import { backendUrl } from "./assets/Config";
import Cookies from 'js-cookie';

const ShopifyLogin = () => {
  const [shop, setShop] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${backendUrl}/api/login?shop=${shop}`, {
        headers: { "ngrok-skip-browser-warning": "69420" },
      });
      const { url, shopify_oauth_state_param } = response.data;
      Cookies.set('shopify_oauth_state_param', shopify_oauth_state_param, { expires: 1 / 24 });
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
