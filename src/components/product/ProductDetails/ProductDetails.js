import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { doc, getDoc } from "firebase/firestore";
import { db, storage } from "../../../firebase/config";
import { toast } from 'react-toastify';
import styles from './ProductDetails.module.scss'
import spinnerImg from "../../../assets/spinner.jpg";

const ProductDetails = () => {
  const { id } = useParams()
  // const isCartAdded = cartItems.findIndex((cart) => {
  //   return cart.id === id;
  // });
  const [product, setProduct] = useState(null)
  useEffect(() => {
    getProduct()
  }, [])

  const getProduct = async () => {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      const obj = {
        id: id,
        ...docSnap.data()
      }
      setProduct(obj)
    } else {
      // docSnap.data() will be undefined in this case
      toast.error("Product Not found")
    }

  }
  return (
    <section>
      <div className={`container ${styles.product}`}>
        <h2>Product Details</h2>
        <div>
          <Link to="/#products">&larr; Back to Products</Link>
        </div>
        {product === null ? (
          <img src={spinnerImg} alt='Loading' style={{width: "50px"}} />

        ) : (
          <>
            <div className={styles.details}>
              <div className={styles.img}>
                <img src={product.imageURL} alt={product.name} />
              </div>
              <div className={styles.content}>
                <h3>{product.name}</h3>
                <p className={styles.price}>{`$${product.price}`}</p>
                <p>{product.desc}</p>
                <p>
                  <b>SKU</b> {product.id}
                </p>
                <p>
                  <b>Brand</b> {product.brand}
                </p>
                <div className={styles.count}>
                  <button className='--btn'>-</button>
                  <p>
                    <b>1</b>
                  </p>
                  <button className='--btn'>+</button>

                </div>
                <button
                  className="--btn --btn-danger"
                 
                >
                  ADD TO CART
                </button>
              
              </div>

            </div>
          </>
        )}

      </div>
    </section>
  )
}

export default ProductDetails