import React, { useState, useEffect } from "react";
import { FaRegHeart, FaShoppingCart, FaHeart } from "react-icons/fa";
import api from "../../api";
import Spinner from "../ui/Spinner";
import styles from "./ProductPageWithCategory.module.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const categories = [
  "Electronics",
  "Groceries",
  "Clothings",
];

const ProductsPageWithCategory = ({ setNumCartItems, setWishListCount }) => {
  const [activeCategory, setActiveCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const cart_code = localStorage.getItem('cart_code');

  // Map product IDs to {id: wishlistItemId, is_added: boolean}
  const [wishlistMap, setWishlistMap] = useState({});

  useEffect(() => {
    setLoading(true);
    let url = "/products/all/";
    if (activeCategory) url += `?category=${activeCategory}`;
    api.get(url)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });

    api.get("/wishlist/")
      .then(res => {
        const map = {};
        res.data.forEach(item => {
          map[item.product.id] = { id: item.id, is_added: item.is_added };
        });
        setWishlistMap(map);
      })
      .catch(err => {
        console.log(err.message);
      });
  }, [activeCategory]);

  const add_item = (e, product_id) => {
    e.preventDefault();
    e.stopPropagation();

    const newItem = { cart_code, product_id };

    api.post("/add_item/", newItem)
      .then(res => {

        toast.success("Item added to cart");
        api.get(`/cart_status?cart_code=${cart_code}`)
          .then(res => {
            if (setNumCartItems) {
              setNumCartItems(res.data.num_of_items);
            }
          });
      })
      .catch(err => {
        toast.error("Could not add item to cart");
      });
  };

  const toggle_wishlist = (e, product_id) => {
    e.preventDefault();
    e.stopPropagation();

    const wishlistEntry = wishlistMap[product_id];

    if (wishlistEntry && wishlistEntry.is_added) {
      setLoading(true)
      api.put(`/wishlist/${wishlistEntry.id}/`, { product_id: product_id, is_added: false })
        .then(() => {
          toast.info("Product removed from wishlist");
          setWishlistMap(prev => ({
            ...prev,
            [product_id]: { ...wishlistEntry, is_added: false }
          }));
          setLoading(false)
          setWishListCount(curr => curr - 1)
        })
        .catch(() => toast.error("Could not remove product from wishlist"));
    } else if (wishlistEntry) {
      setLoading(true)
      api.put(`/wishlist/${wishlistEntry.id}/`, { product_id: product_id, is_added: true })
        .then(() => {
          toast.success("Product added to wishlist");
          setWishlistMap(prev => ({
            ...prev,
            [product_id]: { ...wishlistEntry, is_added: true }
          }));
          setLoading(false)
          setWishListCount(curr => curr + 1)
        })
        .catch(() => toast.error("Could not add product to wishlist"));
    } else {
      setLoading(true)
      api.post("/wishlist/", { product_id: product_id, is_added: true })
        .then(res => {
          toast.success("Product added to wishlist");
          setWishlistMap(prev => ({
            ...prev,
            [product_id]: { id: res.data.id, is_added: true }
          }));
          setLoading(false)
          setWishListCount(curr => curr + 1)
        })
        .catch(() => toast.error("Could not add product to wishlist"));
    }
  };

  return (
    <div className={styles.pageBackground}>
      <Spinner loading={loading} />
      <div>
        <h2 className={styles.heading}>Products</h2>
        <div className={styles.categoriesBar}>
          <button className={`${styles.categoryBtn} ${activeCategory === "" ? styles.categoryBtnActive : ""}`}
            onClick={() => setActiveCategory("")} >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              className={`${styles.categoryBtn} ${activeCategory === cat ? styles.categoryBtnActive : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className={styles.productsGrid}>
          {products.length === 0 &&
            <div style={{ color: "#bfa76a", fontSize: 22, marginTop: 80 }}>No products found.</div>
          }
          {products.map(product => (
            
            <div key={product.id} className={styles.productCard}>
              <span className={styles.priceBadge}>₹{product.price}</span>
              <button onClick={e => toggle_wishlist(e, product.id)} className={styles.wishlistIcon} aria-label="Toggle wishlist" style={{ border: "none", backgroundColor: "inherit" }}>
                {wishlistMap[product.id]?.is_added ? (
                  <FaHeart size={22} color="red" title="Remove from wishlist" />
                ) : (
                  <FaRegHeart size={22} color="red" title="Add to wishlist" />
                )}
              </button>

              <Link to={`/products/${product.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                <img
                  src={product.image}
                  alt={product.name}
                  className={styles.productImage}
                />
                <div className={styles.productTitle}>{product.name}</div>
                <div className={styles.productCategory}>{product.category}</div>
                <div className={styles.productDescription}>{product.description}</div>
              </Link>
              <button className={styles.addToCartButton} onClick={(e) => add_item(e, product.id)}>
                <FaShoppingCart size={17} />
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPageWithCategory;

