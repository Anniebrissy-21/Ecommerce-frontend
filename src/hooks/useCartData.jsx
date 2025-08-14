import { useState, useEffect } from "react";
import api from "../api";

const useCartData = () => {
  const cart_code = localStorage.getItem("cart_code");
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0.0);
  const tax = 4.0;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!cart_code) return;

    const fetchCart = async () => {
      try {
        setLoading(true);
        const res = await api.get(`get_cart?cart_code=${cart_code}`);
        console.log(res.data);

        setCartItems(res.data.items || []);
        setCartTotal(res.data.sum_total || 0);

        // if (setNumCartItems) {
        //   setNumCartItems(
        //     (res.data.items || []).reduce((acc, curr) => acc + curr.quantity, 0)
        //   );
        // }
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [cart_code]); 

  return {
    cartItems,
    setCartItems, 
    cartTotal,
    setCartTotal,
    tax,
    loading
  };
};

export default useCartData;
