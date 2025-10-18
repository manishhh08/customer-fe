import React from "react";
import { Link } from "react-router-dom";
import { BsCart } from "react-icons/bs";
import { Button } from "react-bootstrap";
import { addToCart } from "../../features/cart/cartSlice";
import { useDispatch } from "react-redux";

const CustomCard = ({ product }) => {
  const dispatch = useDispatch();
  return (
    <div className="card-neo rounded-4 h-100 overflow-hidden">
      <Link
        to={`/product/${product.slug}`}
        className="position-relative featured-media overflow-hidden d-block"
        aria-label={`Open ${product.name}`}
      >
        <img
          src={
            product.images ||
            "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1600&auto=format&fit=crop"
          }
          alt={product.name}
        />

        <span className="position-absolute top-0 end-0 m-3 chip tag-hot fw-semibold z-2">
          HOT
        </span>

        {product.stock && (
          <span className="position-absolute bottom-0 start-0 m-3 chip tag-stock z-2">
            In Stock
          </span>
        )}
      </Link>

      <div className="d-flex flex-column p-4">
        <h5 className="mb-1">
          <Link
            to={`/product/${product._id}`}
            className="text-decoration-none link-title"
          >
            {product.name}
          </Link>
        </h5>
        <p className="small text-white-50 mb-3">
          Average Rating: {product.averageRating}
        </p>

        <div className="d-flex align-items-baseline gap-2 mb-3">
          <div className="h4 m-0">${product.price.toFixed(2)}</div>
          {product.comparePrice && (
            <del className="text-white-50">${p.comparePrice.toFixed(2)}</del>
          )}
        </div>

        <Button
          onClick={() => dispatch(addToCart(product))}
          bsPrefix="neo"
          className="btn-neo rounded-4 w-100 d-inline-flex align-items-center justify-content-center gap-2 mt-auto"
        >
          <BsCart /> Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default CustomCard;
