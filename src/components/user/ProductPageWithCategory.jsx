import React, { useState, useEffect } from "react";
import { FaRegHeart, FaHeart, FaShoppingCart } from "react-icons/fa";
import api from "../../api";
import Spinner from "../ui/Spinner";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./ProductPageWithCategory.module.css";

const categories = ["Electronics", "Gloceries", "Clothings"];
const sortOptions = ["Best Selling", "Price: Low to High", "Price: High to Low", "A-Z", "Z-A"];

const ProductsPageWithCategory = ({ setNumCartItems, setWishListCount }) => {
  const [activeCategory, setActiveCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("Best Selling");

  const cart_code = localStorage.getItem("cart_code");
  const [wishlistMap, setWishlistMap] = useState({});

  useEffect(() => {
    setLoading(true);
    let url = "/products/all/";
    if (activeCategory) url += `?category=${activeCategory}`;
    api
      .get(url)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });

    api.get("/wishlist/").then((res) => {
      const map = {};
      res.data.forEach((item) => {
        map[item.product.id] = { id: item.id, is_added: item.is_added };
      });
      setWishlistMap(map);
    });
  }, [activeCategory]);

  const add_item = (e, product_id) => {
    e.preventDefault();
    e.stopPropagation();

    const newItem = { cart_code, product_id };
    api
      .post("/add_item/", newItem)
      .then(() => {
        toast.success("Item added to cart");
        api.get(`/cart_status?cart_code=${cart_code}`).then((res) => {
          if (setNumCartItems) setNumCartItems(res.data.num_of_items);
        });
      })
      .catch(() => toast.error("Could not add item to cart"));
  };

  const toggle_wishlist = (e, product_id) => {
    e.preventDefault();
    e.stopPropagation();

    const wishlistEntry = wishlistMap[product_id];

    if (wishlistEntry && wishlistEntry.is_added) {
      api
        .put(`/wishlist/${wishlistEntry.id}/`, { product_id, is_added: false })
        .then(() => {
          toast.info("Removed from wishlist");
          setWishlistMap((prev) => ({
            ...prev,
            [product_id]: { ...wishlistEntry, is_added: false },
          }));
          setWishListCount((c) => c - 1);
        });
    } else if (wishlistEntry) {
      api
        .put(`/wishlist/${wishlistEntry.id}/`, { product_id, is_added: true })
        .then(() => {
          toast.success("Added to wishlist");
          setWishlistMap((prev) => ({
            ...prev,
            [product_id]: { ...wishlistEntry, is_added: true },
          }));
          setWishListCount((c) => c + 1);
        });
    } else {
      api
        .post("/wishlist/", { product_id, is_added: true })
        .then((res) => {
          toast.success("Added to wishlist");
          setWishlistMap((prev) => ({
            ...prev,
            [product_id]: { id: res.data.id, is_added: true },
          }));
          setWishListCount((c) => c + 1);
        });
    }
  };

  return (
    <div className={styles.pageContainer}>
      <Spinner loading={loading} />

      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <h3>Browse by:</h3>
        <ul className={styles.categoryList}>
          {categories.map((cat) => (
            <li
              key={cat}
              className={activeCategory === cat ? styles.activeCategory : ""}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </li>
          ))}
        </ul>

        <h3>Filter by:</h3>
        <div className={styles.filters}>
          <details>
            <summary>Price</summary>
            <label><input type="checkbox" /> Under ₹500</label>
            <label><input type="checkbox" /> ₹500 - ₹2000</label>
            <label><input type="checkbox" /> Above ₹2000</label>
          </details>

          <details>
            <summary>Brand</summary>
            <label><input type="checkbox" /> Apple</label>
            <label><input type="checkbox" /> Samsung</label>
            <label><input type="checkbox" /> Others</label>
          </details>

          <details>
            <summary>Color</summary>
            <label><input type="checkbox" /> Black</label>
            <label><input type="checkbox" /> White</label>
            <label><input type="checkbox" /> Red</label>
          </details>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        {/* Breadcrumb + Sort */}
        <div className={styles.topBar}>
          <div className={styles.breadcrumb}>
            {activeCategory ? `Home > ${activeCategory}` : "All Products"}
          </div>
          <div className={styles.sorting}>
            <label>Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              {sortOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className={styles.productsGrid}>
          {products.length === 0 && (
            <div className={styles.noProducts}>No products found.</div>
          )}
          {products.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <button
                onClick={(e) => toggle_wishlist(e, product.id)}
                className={styles.wishlistBtn}
              >
                {wishlistMap[product.id]?.is_added ? (
                  <FaHeart color="red" />
                ) : (
                  <FaRegHeart />
                )}
              </button>
              <Link to={`/products/${product.slug}`} style={{ textDecoration: "none" }}>
                <img
                  src={product.image}
                  alt={product.name}
                  className={styles.productImage}
                />
                <h4>{product.name}</h4>
              </Link>
              <p className={styles.price}>
                ₹{product?.price}
              </p>
              <button
                className={styles.addToCart}
                onClick={(e) => add_item(e, product.id)}
              >
                <FaShoppingCart /> Add to Cart
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProductsPageWithCategory;
