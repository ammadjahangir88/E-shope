import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ADD_TO_CART, CALCULATE_SUBTOTAL, CALCULATE_TOTAL_QUANTITY, CLEAR_CART, DECREASE_CART, REMOVE_FROM_CART, SAVE_URL, selectCartItems, selectCartTotalAmount, selectCartTotalQuantity } from '../../redux/slice/CartSlice';
import styles from "./Cart.module.scss";
import {FaTrashAlt}  from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom';
import Card from '../../components/card/Card';
import { selectIsLoggedIN } from '../../redux/slice/AuthSlice';

const Cart = () => {
  const cartItems = useSelector(selectCartItems)
  const cartTotalAmount =useSelector(selectCartTotalAmount)
  const cartTotalQuantity =useSelector(selectCartTotalQuantity)
  const dispatch=useDispatch()
  const isLoggedIn =useSelector(selectIsLoggedIN)

  const navigate=useNavigate()

  useEffect(()=>{
    dispatch(CALCULATE_SUBTOTAL())
  },[dispatch,cartItems])
  const increaseCart=(cart)=>{
    dispatch(ADD_TO_CART(cart));
    dispatch(CALCULATE_TOTAL_QUANTITY());
 

  }
  const decreaseCart=(cart)=>{
    dispatch(DECREASE_CART(cart))
    dispatch(CALCULATE_TOTAL_QUANTITY());
   
  }
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
  const clearCart=()=>{
  
      dispatch(CLEAR_CART())
      dispatch(CALCULATE_TOTAL_QUANTITY());

  }
  const removeFromCart = (cart) => {
    dispatch(REMOVE_FROM_CART(cart));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };
  const url = window.location.href;

  const checkout = () => {
    if (isLoggedIn) {
      navigate("/checkout-details");
    } else {
      dispatch(SAVE_URL(url));
      navigate("/login");
    }
  };
  return (
    <section>
      <div className={`container ${styles.table}`}>
        <h2>Shopping Cart</h2>
        {cartItems.length ===0 ?  (
          <>
          <p>Your cart is currently empty</p>
          <br />
          <div>
            <Link to="/">&larr; Continue Shopping</Link>


          </div>
          </>

        ):(
          <>
          <table>
            <thead>
              <tr>
                <th>S/n</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
              </tr>

            </thead>
            <tbody>
              {
                cartItems.map((cart,index)=>{
                  console.log(cart,"Akdjjd")
                  const {id,name,price,imageURL,cartQuantity}= cart;
                  return (
                    <tr key={id}>
                      <td>{index+1}</td>
                      <td>
                        <p><b>{name}</b></p>

                        <img src={imageURL} alt={name} style={{width: "100px"}}/>
                      </td>
                      <td>{price}</td>
                      <td>
                        <div className={styles.count}>
                          <button className='--btn' onClick={()=> decreaseCart(cart)}>-</button>
                          <p>
                            <b>{cartQuantity}</b>
                          </p>
                          <button className='--btn' onClick={()=> increaseCart(cart)}>+</button>

                        </div>
                      </td>
                      <td>{(price*cartQuantity).toFixed(2)}</td>
                       <td className={styles.icons}><FaTrashAlt size={19} color="red"  onClick={() => removeFromCart(cart)}/></td>

                    </tr>
                  )

                })
              }

            </tbody>
          </table>
          <div className={styles.summary}>
            <button className='--btn --btn-danger' onClick={clearCart}>Clear Cart</button>

            <div className={styles.checkout}>
              <div>
              <Link to="/products">&larr; Continue shopping</Link>
              </div>
              <br />
              <Card cardClass={styles.card}>

                <p>{`$${cartTotalAmount.toFixed(2)}`}</p>

                <div className={styles.text}>
                  <h4>Sub Total: </h4>
                  <h3>{`$${cartTotalAmount.toFixed(2)}`}</h3>


                </div>
                <p>Tax and shipping calculated at checkout</p>
                <button className='--btn --btn-primary --btn-block' onClick={checkout}>Checkout</button>

              </Card>

            </div>
          </div>
          </>
        )}

      </div>
      
    </section>
  )
}

export default Cart