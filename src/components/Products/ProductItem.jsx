import React from 'react';
import DefaultImage from '../../assets/defaultproductimage.jpg'
import { Link } from 'react-router';

const ProductItem = ({product}) => {
    return (
        <Link
            to={`/shop/${product.id}`} 
        >
            <div className="card bg-base-100 w-96 shadow-sm">
                <figure className="px-10 pt-10">
                    <img
                    src={
                        product.images && product.images.length > 0 ? product.images[0].image : DefaultImage
                    }
                    // src={product.images[0].image}
                    // src= {DefaultImage}
                    alt="Shoes"
                    className="rounded-xl" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title"> {product.name} </h2>
                    <h3 className='font-bold text-xl text-red-700'> {product.price} </h3>
                    <p> {product.description} </p>
                    <div className="card-actions mt-1">
                    <button className="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductItem;