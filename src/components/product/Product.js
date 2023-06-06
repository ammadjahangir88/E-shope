import React,{useEffect, useState} from 'react'
import ProductFilter from './ProductFilter/ProductFilter'
import ProductList from './productList/ProductList'
import styles from "./Product.module.scss";
import { useDispatch, useSelector } from 'react-redux';
import { GET_PRICE_RANGE, selectProducts, STORE_PRODUCTS } from '../../redux/slice/productSlice';
import useFetchCollection from '../../customHooks/useFetchCollection';
import spinnerImg from "../../assets/spinner.jpg";

const Product = () => {
    const {data,isLoading} =useFetchCollection("products")
    const products =useSelector(selectProducts)

    const dispatch = useDispatch()

    useEffect(()=>{
      console.log(data,"jkjd")
            dispatch(
              
            STORE_PRODUCTS({

              products : data,
            }));

            dispatch(GET_PRICE_RANGE({
              products:data
            }))

    },[dispatch,data])
  return (
    <section>
      <div className={`container ${styles.product}`}>
        <aside className={styles.filter}>
        {isLoading ? null : <ProductFilter />}


        </aside>
        <div className={styles.content}>
        {isLoading ? (
            <img
              src={spinnerImg}
              alt="Loading.."
              style={{ width: "50px" }}
              className="--center-all"
            />
          ) : (
            <ProductList products={products} />
          )}

        

        </div>

      </div>
     
    </section>
  )
}

export default Product