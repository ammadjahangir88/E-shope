import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { selectCartItems, selectCartTotalAmount } from "../../redux/slice/CartSlice";
import { selectEmail } from "../../redux/slice/AuthSlice";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);




const CheckoutForm = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [message,setMessage]=useState("Initialixing checkout")
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };
  return (
    <div>CheckoutForm</div>
  )
}

export default CheckoutForm