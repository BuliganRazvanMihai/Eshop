import React, { useEffect } from "react";
import Product from "../components/Product";
import MessageBox from "../components/MessageBox";
import LoadingBox from "../components/LoadingBox";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../features/product/productSlice";

export default function HomeScreen() {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.product);
  const { isLoading, isError, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div>
      {isLoading ? (
        <LoadingBox></LoadingBox>
      ) : isError ? (
        <MessageBox variant='danger'>{isError}</MessageBox>
      ) : (
        <div className='row center'>
          {products.map((product) => (
            <Product key={product._id} product={product}></Product>
          ))}
        </div>
      )}
    </div>
  );
}
