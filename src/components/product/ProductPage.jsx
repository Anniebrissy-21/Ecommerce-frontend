import React, { useEffect, useState } from 'react';
import ProductPlaceholder from './ProductPlaceholder';
import { useParams } from 'react-router-dom';
import api from '../../api';
import RelatedProducts from './RelatedProducts';
import { toast } from 'react-toastify';

const ProductPage = ({ setNumCartItems }) => {
    const { slug } = useParams();
    const [product, setProduct] = useState({});
    const [similarProducts, setSimilarProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [inCart, setInCart] = useState(false);
    const cart_code = localStorage.getItem('cart_code');
    const newItem = { cart_code, product_id: product.id };

    function add_item() {
        api.post("/add_item/", newItem)
            .then(res => {
                toast.success("Item added to cart");
                setInCart(true);
                setNumCartItems(curr => curr + 1);
            })
            .catch(err => {
                toast.error("Could not add item to cart");
            });
    }

    useEffect(() => {
        if (product.id && cart_code) {
            api.get(`/products_in_cart?cart_code=${cart_code}&product_id=${product.id}`)
                .then(res => {
                    setInCart(res.data.product_in_cart);
                })
                .catch(() => { });
        }
    }, [cart_code, product.id]);

    useEffect(() => {
        setLoading(true);
        api.get(`/product_detail/${slug}`).then(res => {
            setProduct(res.data);
            setSimilarProducts(res.data.similar_products);
            setLoading(false);
        })
            .catch(() => {
                setLoading(false);
            });
    }, [slug]);

    if (loading) {
        return <ProductPlaceholder />;
    }

    return (
        <div>
            <section className='py-5' style={{ background: '#fbfbfc' }}>
                <div className='container px-4 px-lg-5 my-4'>
                    <div className='row gx-5 gy-3 align-items-center'>
                        <div className="col-md-6 d-flex justify-content-center">
                            <div style={{
                                background: "#fff",
                                borderRadius: 16,
                                boxShadow: "0 2px 16px rgba(200,183,167,0.11)",
                                padding: 24,
                                width: "100%",
                                maxWidth: 400,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <img
                                    className='img-fluid'
                                    src={product.image}
                                    alt={product.name}
                                    style={{
                                        maxHeight: 320,
                                        objectFit: "contain",
                                        borderRadius: 12,
                                        boxShadow: "0 1px 8px rgba(210,192,170,0.10)"
                                    }}
                                />
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className="mb-2 small text-secondary">
                                {product.sku && <span>SKU: {product.sku}</span>}
                            </div>
                            <h1 className='fw-bold mb-2' style={{ fontSize: "2.4rem", color: "#4c392a" }}>{product.name}</h1>
                            <div className="fs-4 fw-bold mb-3" style={{ color: "#bb9646" }}>
                                {product.price && <><span>${product.price}</span></>}
                            </div>
                            <p className='mb-4 text-secondary' style={{ fontSize: "1.07rem", lineHeight: 1.6 }}>
                                {product.description}
                            </p>
                            <div className="d-flex align-items-center gap-3">
                                <button
                                    className='btn'
                                    type='button'
                                    onClick={add_item}
                                    disabled={inCart}
                                    style={{
                                        background: !inCart ? "linear-gradient(90deg,#e1c48a,#dab47d)" : "#e6e6e6",
                                        color: !inCart ? "#78591d" : "#949494",
                                        fontWeight: 600,
                                        borderRadius: 24,
                                        padding: "0.7rem 2.2rem",
                                        transition: "all .13s",
                                        boxShadow: "0 2px 8px rgba(201,170,80,0.08)",
                                        letterSpacing: 0.3
                                    }}
                                >
                                    <i className='bi-cart-fill me-2'></i>
                                    {inCart ? "Product Added to Cart" : "Add to Cart"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <RelatedProducts products={similarProducts} />
        </div>
    );
};

export default ProductPage;
