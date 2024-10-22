import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { backendUrl } from "./assets/Config";
import axios from "axios";

const Dashboard = () => {
  const [shop, setShop] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingOrders, setLoadingOrders] = useState(false);

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


  const fetchProducts = async (shopId, accessToken) => {
    setLoadingProducts(true);
    try {
      const response = await axios.get(`${backendUrl}/shopify/api/products?shopId=${shopId}`, {
        headers: {
          "ngrok-skip-browser-warning": "69420",
          'X-Shopify-Access-Token': accessToken,
        },
      });
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoadingProducts(false);
    }
  };


  const fetchOrders = async (shopId, accessToken) => {
    setLoadingOrders(true);
    try {
      const response = await axios.get(`${backendUrl}/shopify/api/orders?shopId=${shopId}`, {
        headers: {
          "ngrok-skip-browser-warning": "69420",
          'X-Shopify-Access-Token': accessToken,
        },
      });
      setOrders(response.data.orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleLoadProducts = () => {
    const shopId = localStorage.getItem("shopId");
    const accessToken = localStorage.getItem("accessToken");
    if (shopId && accessToken) {
      fetchProducts(shopId, accessToken);
    } else {
      console.error("Shop ID or Access Token not found.");
    }
  };

  const handleLoadOrders = () => {
    const shopId = localStorage.getItem("shopId");
    const accessToken = localStorage.getItem("accessToken");
    if (shopId && accessToken) {
      fetchOrders(shopId, accessToken);
    } else {
      console.error("Shop ID or Access Token not found.");
    }
  };

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

      <h2>Product List</h2>
      <button onClick={handleLoadProducts} disabled={loadingProducts}>
        {loadingProducts ? "Loading Products..." : "Load Products"}
      </button>

      {products.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Product Name</th>
              <th>Vendor</th>
              <th>Product Type</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.title}</td>
                <td>{product.vendor}</td>
                <td>{product.product_type || "N/A"}</td>
                <td>{new Date(product.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No products found.</p>
      )}

      <h2>Order List</h2>
      <button onClick={handleLoadOrders} disabled={loadingOrders}>
        {loadingOrders ? "Loading Orders..." : "Load Orders"}
      </button>

      {orders.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Order ID</th>
              <th>Subtotal Price</th>
              <th>Currency</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.order_id}</td>
                <td>{order.current_subtotal_price}</td>
                <td>{order.currency}</td>
                <td>{new Date(order.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default Dashboard;
