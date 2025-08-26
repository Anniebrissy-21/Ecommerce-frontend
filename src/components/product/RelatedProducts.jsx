import React from 'react';
import HomeCard from '../Home/HomeCard';

const RelatedProducts = ({ products }) => {
  return (
    <section className='py-4' style={{ background: "#f8f4ef" }}>
      <div className="container px-4 px-lg-5">
        <h2 className='fw-bold mb-4' style={{ color: "#7d6145" }}>
          Related Products
        </h2>
        {/* Responsive CSS grid with gap */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "2rem"
          }}
        >
          {products.map(product => (
            <HomeCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;
