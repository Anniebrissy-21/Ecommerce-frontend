import React, { useState, useEffect } from "react";
import "./WishListPage.css";
import api from "../../api";
import { toast } from "react-toastify";

const WishListPage = ({ setWishListCount }) => {
  // Initialize quantities as an object with product IDs as keys, initial quantity = 1
  const [quantities, setQuantities] = useState({});
  const [wishList, setWishList] = useState([])

  useEffect(() => {
    api.get('/wishlist')
      .then(res => {
        const filteredWishlist = res.data.filter(item => item.is_added === true);
        setWishList(filteredWishlist);
        setWishListCount(filteredWishlist.length);

        const initialQuantities = filteredWishlist.reduce((acc, item) => {
          acc[item.product.id] = 1;
          return acc;
        }, {});
        setQuantities(initialQuantities);
      })
      .catch(err => {
        console.error("Failed to fetch wishlist:", err);
      });
  }, []); // Run only once on mount


  const increaseQty = (id) => {
    setQuantities((curr) => ({
      ...curr,
      [id]: (curr[id] || 0) + 1,
    }));
  };

  const decreaseQty = (id) => {
    setQuantities((curr) => ({
      ...curr,
      [id]: curr[id] > 1 ? curr[id] - 1 : 1,
    }));
  };

  const add_to_cart = (productId, quantity) => {
    const cartId = localStorage.getItem('cart_id');
    const objToSnd = {
      cart: cartId,
      product: productId,
      quantity: quantity,
    }
    api.post('api/add_to_cart/', objToSnd)
      .then(response => response.json())
      .then(data => {
        console.log('Item added to cart:', data);
        toast.success('Product Added to Cart')
      })
      .catch(error => {
        console.error('Error adding to cart:', error);
      });
  };


  return (
    <div className="wishlist-root">
      <h2 className="wishlist-title">Wishlist</h2>

      {wishList.length === 0 ? (
        <div className="wishlist-empty-table">
          <span className="wishlist-empty-heart" role="img" aria-label="empty-heart">🤍</span>
          <br />
          <span className="wishlist-empty-text">
            Your wishlist is empty.<br />Start adding your favorite products!
          </span>
        </div>
      ) : (
        <div className="wishlist-table-container">
          <table className="wishlist-table">
            <thead>
              <tr>
                <th><input type="checkbox" aria-label="select all" /></th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {wishList.map((item) => (
                <tr key={item.product.id}>
                  <td>
                    <input type="checkbox" aria-label={`select ${item.product.name}`} />
                  </td>
                  <td className="wishlist-product">
                    <img src={item.product.image} alt={item.product.name} />
                    <div>
                      <div className="wishlist-prodname">{item.product.name}</div>
                      <div className="wishlist-sku">SKU: {item.product.sku || "N/A"}</div>
                    </div>
                  </td>
                  <td>
                    <div className="wishlist-qty">
                      <button onClick={() => decreaseQty(item.product.id)} aria-label="Decrease quantity">-</button>
                      <span>{quantities[item.product.id] || 1}</span>
                      <button onClick={() => increaseQty(item.product.id)} aria-label="Increase quantity">+</button>
                    </div>
                  </td>
                  <td>
                    <span className="wishlist-price">
                      ₹{(quantities[item.product.id] || 1) * Number(item.product.price)}
                    </span>
                  </td>
                  <td>
                    <button
                      className="wishlist-addcart"
                      onClick={() => add_to_cart(item.product.id, quantities[item.product.id] || 1)}
                    >
                      Add to Cart
                    </button>

                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}

      <div className="wishlist-below-link">
        <a className="wishlist-link" href="/products">Continue Shopping</a>
      </div>
    </div>
  );
};

export default WishListPage;
