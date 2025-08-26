import React, { useEffect, useState } from 'react'
import ProductPlaceholder from './ProductPlaceholder'
import { useParams } from 'react-router-dom'
import api from '../../api'
import RelatedProducts from './RelatedProducts'
import { BASE_URL } from '../../api'
import { toast } from 'react-toastify'

const ProductPage = ({setNumCartItems}) => {

    const { slug } = useParams()
    const [product, setProduct] = useState({})
    const [similarProducts, setSimilarProducts] = useState([])
    const [loading, setloading] = useState(false)
    const [inCart, setInCart] = useState(false)

    const cart_code = localStorage.getItem('cart_code')

    const newItem = { cart_code: cart_code, product_id: product.id }

    function add_item() {
        api.post("/add_item/", newItem)
            .then(res => {
                console.log(res.data)
                toast.success("Item added to cart")
                setInCart(true)
                setNumCartItems(curr => curr+1)
            })
            .catch(err => {
                console.log(err.message)
            })
    }

    useEffect(function () {
        if (product.id && cart_code) {
            api.get(`/products_in_cart?cart_code=${cart_code}&product_id=${product.id}`)
                .then(res => {
                    console.log(res.data)
                    setInCart(res.data.product_in_cart)
                })
                .catch(err => {
                    console.log(err.message)
                })
        }
    }, [cart_code, product.id])

    useEffect(function () {
        setloading(true)
        api.get(`/product_detail/${slug}`).then(res => {
            console.log(res.data)
            setProduct(res.data)
            setSimilarProducts(res.data.similar_products)
            setloading(false)
        })
            .catch(err => {
                console.log(err.message)
                setloading(false)
            })
    }, [slug])

    if (loading) {
        return <ProductPlaceholder />;
    }

    return (
        <div>
            <section className='py-3'>
                <div className='container px-4 px-lg-5 my-5'>
                    <div className='row gx-4 gx-lg-5 align-items-center'>
                        <div className="col-md-6">
                            <img className='card-img-top mb-5 mb-md-0' src={`${product.image}`} alt="..." />
                        </div>
                        <div className='col-md-6'>
                            <div className="small mb-1"> SKU: BST-496</div>
                            <h1 className='display-5 fw-bolder'>{product.name}</h1>
                            <div className="fs-5 mb-5">
                                {/* <span className='text-decoration-line-through'>$40.00</span> */}
                                <span>{`$${product.price}`}</span>
                            </div>
                            <p className='lead'>
                                {product.description}
                            </p>
                            <div className="d-flex">
                                {/* <input type="num" className='form-control text-center me-3'
                                    id='inputQuantity' value='1' style={{ maxWidth: '3rem' }} /> */}

                                <button className='btn btn-outline-dark flex-shrink-0' type='button' onClick={add_item}
                                    disabled={inCart}>
                                    <i className='bi-cart-fill me-1'></i>
                                    {inCart ? "Product Added to Cart" : "Add to cart"}
                                </button>
                            </div>
                        </div>
                    </div>

                </div>


            </section>
            <RelatedProducts products={similarProducts} />
        </div>
    )
}

export default ProductPage