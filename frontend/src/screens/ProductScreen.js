import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { detailsProduct } from "../features/product/productSlice";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Rating from "../components/Rating";

export default function ProductScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const params = useParams();
  const productId = params.id;

  const [qty, setQty] = useState(1);

  const productList = useSelector((state) => state.product);
  const { isLoading, isError, product } = productList;

  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);

  const addToCartHandler = () => {
    navigate(`/cart/${productId}?qty=${qty}`);
  };

  return (
    <div>
      {isLoading ? (
        <LoadingBox></LoadingBox>
      ) : isError ? (
        <MessageBox variant='danger'>{isError}</MessageBox>
      ) : (
        <div className='row top'>
          <div className='col-2'>
            <img
              className='medium'
              src={product.image}
              alt={product.name}
            ></img>
          </div>
          <div className='col-1'>
            <ul>
              <li>
                <h1>{product.name}</h1>
              </li>
              <li>
                <Rating
                  rating={product.rating}
                  numReviews={product.numReviews}
                ></Rating>
              </li>
              <li>Price : {product.price} lei</li>
              <li>
                <p>{product.description}</p>
              </li>
            </ul>
          </div>
          <div className='col-1'>
            <div className='card card-body'>
              <ul>
                <li>
                  <div className='row'>
                    <div>Price</div>
                    <div className='price'>${product.price}</div>
                  </div>
                </li>
                <li>
                  <div className='row'>
                    <div>Status</div>
                    <div>
                      {product.countInStock > 0 ? (
                        <span className='success'>In Stock</span>
                      ) : (
                        <span className='danger'>Unavailable</span>
                      )}
                    </div>
                  </div>
                </li>
                {product.countInStock > 0 && (
                  <>
                    <li>
                      <div className='row'>
                        <div>Qty</div>
                        <div>
                          <select
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                      </div>
                    </li>
                    <li>
                      <button
                        onClick={addToCartHandler}
                        className='primary block'
                      >
                        Add to Cart
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
