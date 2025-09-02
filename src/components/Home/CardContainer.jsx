import HomeCard from './HomeCard';

const CardContainer = ({ products }) => (
    <section style={{ padding: "24px 0", background: "#f5efe7", minHeight: "60vh" }} id="shop">
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <h2 style={{
                fontWeight: 600, fontSize: 28,
                textAlign: "center", color: "#704f28", marginBottom: "2.4rem"
            }}>
                Our Products
            </h2>
            <div style={{
                display: "grid", gridTemplateColumns: "repeat(4, minmax(236px, 1fr))",
                gap: "1.8rem"
            }}>
                {products.map(product => (
                    <HomeCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    </section>
);

export default CardContainer;

