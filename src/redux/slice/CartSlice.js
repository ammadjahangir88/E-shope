import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';

const initialState = {
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
    previousURL: "",

}

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_TO_CART(state,action){
        
        const productIndex=state.cartItems.findIndex((item)=> item.id === action.payload.id)

        if (productIndex >=0)
        {
            //Item Already exists in the cart
            //Increase the cart Quantity
            state.cartItems[productIndex].cartQuantity +=1;
            toast.info(`${action.payload.name}  increased by 1`,{position: "top-left"})

        }
        else{
             //Item doesn't exists in the cart
             //Add Item to the cart
             const tempProduct = {...action.payload, cartQuantity:1}
             state.cartItems.push(tempProduct)
             toast.success(`${action.payload.name}  Added to Cart`,{position: "top-left"})

        }
        // save Cart to local Storage
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems))

    },
    DECREASE_CART(state,action){
        const productIndex=state.cartItems.findIndex((item)=> item.id === action.payload.id)

        if (state.cartItems[productIndex].cartQuantity >1){
            state.cartItems[productIndex].cartQuantity -=1
            toast.info(`${action.payload.name}  decreased by 1`,{position: "top-left"})

        }
        else{
            const newCartItem = state.cartItems.filter(
                (item) => item.id !== action.payload.id
              );
        
              state.cartItems = newCartItem;
            toast.success(`${action.payload.name}  Removed to Cart`,{position: "top-left"})
            
        }
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

    },
    CLEAR_CART(state, action) {
        state.cartItems = [];
        toast.info(`Cart cleared`, {
          position: "top-left",
        });
  
        localStorage.setItem("cartItems", JSON.stringify([]));
      },
      REMOVE_FROM_CART(state, action) {
        const newCartItem = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );
  
        state.cartItems = newCartItem;
        toast.success(`${action.payload.name} removed from cart`, {
          position: "top-left",
        });
  
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      },
      CALCULATE_SUBTOTAL(state,action){
        const array=[]
        state.cartItems.map((item)=>{
            const {price,cartQuantity}=item
            const cartItemAmount =price* cartQuantity
            return array.push(cartItemAmount)

        })
        const totalAmount =array.reduce((a,b)=>{
            return a+b
        })
        state.cartTotalAmount=totalAmount

      }
      ,CALCULATE_TOTAL_QUANTITY(state,action){
        const array = [];
        state.cartItems.map((item) => {
          const { cartQuantity } = item;
          const quantity = cartQuantity;
          return array.push(quantity);
        });
        const totalQuantity = array.reduce((a, b) => {
          return a + b;
        }, 0);
        state.cartTotalQuantity = totalQuantity;
      },
      SAVE_URL(state, action) {
        console.log(action.payload);
        state.previousURL = action.payload;
      },
  }
});

export const {ADD_TO_CART, DECREASE_CART,CLEAR_CART, REMOVE_FROM_CART ,CALCULATE_SUBTOTAL,CALCULATE_TOTAL_QUANTITY,SAVE_URL} = CartSlice.actions


export  const selectCartItems =(state)=> state.cart.cartItems

export  const selectCartTotalQuantity =(state)=> state.cart.cartTotalQuantity


export  const selectCartTotalAmount =(state)=> state.cart.cartTotalAmount

export  const selectPreviousURL= (state)=>state.cart.previousURL;

export default CartSlice.reducer