import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useFetchCollection from '../../../customHooks/useFetchCollection'
import { selectEmail, selectUserID } from '../../../redux/slice/AuthSlice'
import { selectOrderHistory, STORE_ORDERS } from '../../../redux/slice/OrderSlice'
import Loader from '../../loader/Loader'

import styles from './Orders.module.scss'
const Orders = () => {
  const {data,isLoading}=useFetchCollection("orders")
  const orders=useSelector(selectOrderHistory)
  const userID=useSelector(selectUserID)

  const dispatch=useDispatch()
  const navigate=useNavigate()
 useEffect(()=>{

  dispatch(STORE_ORDERS(data))

 },[dispatch,data])
 const handleClick= (id)=>{
  navigate(`/admin/order-details/${id}`)

 }

  return (
   <section>
    <div className={styles.order} >
      <h2>Your Order  History</h2>
      <p>Open an order to leave a <b>Change Order Status</b></p>
      <br />
      <>
      {isLoading && Loader}
      <div className={styles.table}>
        {orders.length === 0 ? (
          <p>No Order Found</p>
        ): (
          <table>
            <thead>
              <tr>
                <th>s/n</th>
                <th>Date</th>
                <th>Order Id</th>
                <th>Order Amount</th>
                <th>Order status</th>
                
              </tr>
            </thead>
            <tbody>
              {orders.map((order,index)=>{
                const {id,orderDate,orderTime,orderAmount,orderStatus}=order
                return(
                  <tr key={id} onClick={()=>handleClick(id)}>

                    <td>{index +1}</td>
                    <td>{orderDate} at {orderTime}</td>
                    <td>{id}</td>
                    <td>{"$"}{orderAmount}</td>
                    <td><p className={orderStatus !=='Delivered'? `${styles.pending}`: `${styles.delivered}`}>
                      {orderStatus}
                      </p>
                      </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}

      </div>
      </>

    </div>
   </section>
  )
}

export default Orders