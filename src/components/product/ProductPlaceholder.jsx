import React from 'react'

const ProductPlaceholder = () => {
    return (
        <section className='py-3'>
            <div className="container px-4 px-lg-5 my-5">
                <div className="row gx-4 gx-lg-5 align-items-center">
                    <div className="col-md-6">
                        <img className='card-img-top mb-5 mb-md-0' src="https://dummyimage.com/600x700/dee2e6/6c757d.jpg" alt="..." />

                    </div>
                    <div className="col-md-6">
                        <div className="placeholder col-4"></div>
                        <div className="placeholder col-12"></div>
                        <div className="placeholder col-4"></div>
                        <p className='lead'>
                        </p>
                        <div className="placeholder col-12"></div>
                        <div className="placeholder col-12"></div>
                        <div className="placeholder col-12"></div>
                        <div className="placeholder col-12"></div>
                        <div className="placeholder col-12"></div>

                    </div>
                </div>
            </div>

        </section>
    )
}

export default ProductPlaceholder