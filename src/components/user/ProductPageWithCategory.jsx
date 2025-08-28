// import React, { useState, useEffect } from "react";
// import api from "../../api";

// const categories = [
//   "Electronics",
//   "Gloceries",
//   "Clothings"
// ];

// const ProductsPageWithCategory = () => {
//   const [activeCategory, setActiveCategory] = useState(""); 
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     let url = "/products/all/";
//     if (activeCategory) {
//       url += `?category=${activeCategory}`;
//     }
//     api.get(url).then(
//       res => setProducts(res.data))
//       .catch(err => {
//         console.log(err.message)
//       })
//   }, [activeCategory]);

//   return (
//     <div style={{padding: "40px"}}>
//       <h2>Products</h2>
//       <div style={{marginBottom: "24px"}}>
//         <button
//           onClick={() => setActiveCategory("")}
//           style={{marginRight: 16, background: activeCategory === "" ? "#817B5E" : "#eee", color: "white", border: "none", padding: "8px 24px", borderRadius: "4px"}}
//         >
//           All
//         </button>
//         {categories.map(cat => (
//           <button
//             key={cat}
//             onClick={() => setActiveCategory(cat)}
//             style={{marginRight: 16, background: activeCategory === cat ? "#817B5E" : "#eee", color: activeCategory === cat ? "white" : "#333", border: "none", padding: "8px 24px", borderRadius: "4px"}}
//           >
//             {cat}
//           </button>
//         ))}
//       </div>
//       <div style={{display: "flex", flexWrap: "wrap", gap: "24px"}}>
//         {products.map(product => (
//           <div key={product.id} style={{border: "1px solid #eee", borderRadius: "8px", padding: "18px", width: 240}}>
//             <img src={product.image} alt={product.name} style={{maxWidth: "100%", height: 120, objectFit: "cover", borderRadius: "6px"}} />
//             <h4>{product.name}</h4>
//             <p style={{fontWeight: "bold"}}>₹{product.price}</p>
//             <p style={{color: "#888"}}>{product.category}</p>
//             <p>{product.description}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductsPageWithCategory;

import React, { useState, useEffect } from "react";
import { FaRegHeart, FaShoppingCart } from "react-icons/fa";
import api from "../../api";
import Spinner from "../ui/Spinner";

const categories = [
  "Electronics",
  "Gloceries",
  "Clothings",
];

// Sand/earth palette (customize to your theme!)
const BG = "#f4ecd9";
const CARD_BG = "#fff";
const MAIN = "#bfa76a";
const ACCENT = "#817B5E";
const BADGE_BG = MAIN;
const HOVER = "#f7e5ba";

const ProductsPageWithCategory = () => {
  const [activeCategory, setActiveCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false)

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
  }, [activeCategory]);


  return (
    <div style={{ background: BG, minHeight: "100vh", padding: "44px 0" }}>
      <Spinner loading={loading} /> 
      <div style={{ padding: "20", margin: "0 auto" }}>
        <h2 style={{ color: ACCENT, fontWeight: 700, marginBottom: 8, fontSize: 32, paddingLeft: "25px" }}>Products</h2>
        <div style={{ display: "flex", gap: 16, marginBottom: 32, paddingLeft: "30px" }}>
          <button
            onClick={() => setActiveCategory("")}
            style={{
              background: activeCategory === "" ? MAIN : "#eae1cb",
              color: activeCategory === "" ? "#fff" : ACCENT,
              border: "none",
              fontWeight: 600,
              borderRadius: 24,
              fontSize: 16,
              padding: "10px 24px",
              boxShadow: activeCategory === "" ? "0 2px 10px #e2d7b4" : "none",
              cursor: "pointer",
              outline: "none"
            }}>
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                background: activeCategory === cat ? MAIN : "#eae1cb",
                color: activeCategory === cat ? "#fff" : ACCENT,
                border: "none",
                fontWeight: 600,
                borderRadius: 24,
                fontSize: 16,
                padding: "10px 24px",
                boxShadow: activeCategory === cat ? "0 2px 10px #e2d7b4" : "none",
                cursor: "pointer",
                outline: "none"
              }}>
              {cat}
            </button>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "28px 28px",
            justifyContent: "flex-start",
            alignItems: "stretch",
            marginLeft: "62px"
          }}
        >
          {products.length === 0 &&
            <div style={{ color: MAIN, fontSize: 22, marginTop: 80 }}>No products found.</div>}
          {products.map(product => (
            <div
              key={product.id}
              style={{
                background: CARD_BG,
                borderRadius: 20,
                boxShadow: "0 4px 32px rgba(191,167,106,0.11)",
                padding: 22,
                width: 260,
                minHeight: 420,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
                transition: "box-shadow 0.18s, transform 0.18s",
                cursor: "pointer"
              }}>
              {/* Price Badge */}
              <span style={{
                position: "absolute",
                top: 18,
                right: 18,
                background: BADGE_BG,
                color: "#fff",
                padding: "6px 16px",
                borderRadius: 16,
                fontWeight: 600,
                fontSize: 15,
                boxShadow: "0 2px 4px #efe2bb"
              }}>
                ₹{product.price}
              </span>
              {/* Favorite Icon */}
              <FaRegHeart
                size={22}
                color="#b3a26e"
                style={{ position: "absolute", top: 22, left: 22, opacity: 0.62, cursor: "pointer" }}
                title="Add to wishlist"
              />
              <img src={product.image} alt={product.name}
                style={{
                  width: "86%",
                  height: 125,
                  objectFit: "contain",
                  borderRadius: 12,
                  marginBottom: 18,
                  boxShadow: "0 2px 8px #efe2bb"
                }} />
              <div style={{ fontSize: 18.5, fontWeight: 700, color: ACCENT, marginBottom: 5, textAlign: "center" }}>
                {product.name}
              </div>
              <div style={{ color: "#dac386", fontWeight: 600, marginBottom: 6, fontSize: 15.5 }}>
                {product.category}
              </div>
              <div style={{
                fontSize: 14.2,
                color: "#877a61",
                textAlign: "center",
                marginBottom: 18,
                lineHeight: 1.4,
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical"
              }}>
                {product.description}
              </div>
              <button
                style={{
                  marginTop: "auto",
                  background: ACCENT,
                  color: "#fff",
                  border: "none",
                  borderRadius: 21,
                  padding: "10px 0",
                  fontWeight: 600,
                  width: "89%",
                  transition: "background .16s",
                  fontSize: 15,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 9
                }}>
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
