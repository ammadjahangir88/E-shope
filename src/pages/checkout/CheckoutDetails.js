
import React, { useState } from 'react'
import Card from '../../components/card/Card'
import styles from './CheckoutDetails.module.scss'
import { CountryDropdown } from 'react-country-region-selector'
import { SAVE_BILLING_ADDRESS, SAVE_SHIPPING_ADDRESS } from '../../redux/slice/CheckoutSlice'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const initialAddressState = {
    name: "",
    line1: '',
    line2: '',
    city: '',
    state: '',
    postal_code: '',
    country: '',
}


const CheckoutDetails = () => {
  const dispatch=useDispatch()
    const navigate=useNavigate()
    const [shippingAddress, setShippingAddress] = useState({ ...initialAddressState })
    const [billingAddress, setBillingAddress] = useState({ ...initialAddressState })

  const handleShipping = (e) => {
    const { name, value } = e.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value,
    });
  };

  const handleBilling = (e) => {
    const { name, value } = e.target;
    setBillingAddress({
      ...billingAddress,
      [name]: value,
    });
  };
    const handleSubmit = (e) => {
        e.preventDefault()

        dispatch(SAVE_SHIPPING_ADDRESS(shippingAddress))
        dispatch(SAVE_BILLING_ADDRESS(billingAddress))
        navigate("/checkout")

    }
    return (
        <section>
            <div className={`container ${styles.checkout}`}>
                <h2>Checkout Details</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <Card cardClass={styles.card}>
                            <h3>Shipping Address</h3>
                            <label>Recepient Name  </label>
                            <input type='text'
                                required
                                placeholder="receipient Name"
                                name="name"
                                value={shippingAddress.name}
                                onChange={(e) => handleShipping(e)}

                            />
                            <label>Address Line 1  </label>
                            <input type='text'
                                required
                                placeholder="Address Line 1"
                                name="line1"
                                value={shippingAddress.line1}
                                onChange={(e) => handleShipping(e)}

                            />
                            <label>Address Line 2  </label>
                            <input type='text'
                                required
                                placeholder="Address Line 2"
                                name="line2"
                                value={shippingAddress.line2}
                                onChange={(e) => handleShipping(e)}

                            />
                            <label>City</label>
                            <input type='text'
                                required
                                placeholder="City"
                                name="city"
                                value={shippingAddress.city}
                                onChange={(e) => handleShipping(e)}

                            />
                            <label>State</label>
                            <input type='text'
                                required
                                placeholder="State"
                                name="state"
                                value={shippingAddress.state}
                                onChange={(e) => handleShipping(e)}

                            />
                            <label>postal_code</label>
                            <input type='text'
                                required
                                placeholder="Postal code"
                                name="postal_code"
                                value={shippingAddress.postal_code}
                                onChange={(e) => handleShipping(e)}

                            />
                            <CountryDropdown
                                className={styles.select}
                                valueType='short'
                                value={shippingAddress.country}

                                onChange={(val) => handleShipping({
                                    target: {
                                        name: "country",
                                        value: val
                                    }
                                })}

                            />
                            <label>Phone</label>
                            <input type='text'
                                required
                                placeholder="Phone"
                                name="phone"
                                value={shippingAddress.phone}
                                onChange={(e) => handleShipping(e)}

                            />
                        </Card>
                        {/* billingAddress */}
                        <Card cardClass={styles.card}>
                            <h3>Billing Address</h3>
                            <label>Name  </label>
                            <input type='text'
                                required
                                placeholder="receipient Name"
                                name="name"
                                value={billingAddress.name}
                                onChange={(e) => handleBilling(e)}

                            />
                            <label>Address Line 1  </label>
                            <input type='text'
                                required
                                placeholder="Address Line 1"
                                name="line1"
                                value={billingAddress.line1}
                                onChange={(e) => handleBilling(e)}

                            />
                            <label>Address Line 2  </label>
                            <input type='text'
                                required
                                placeholder="Address Line 2"
                                name="line2"
                                value={billingAddress.line2}
                                onChange={(e) => handleBilling(e)}

                            />
                            <label>City</label>
                            <input type='text'
                                required
                                placeholder="City"
                                name="city"
                                value={shippingAddress.city}
                                onChange={(e) => handleBilling(e)}

                            />
                            <label>State</label>
                            <input type='text'
                                required
                                placeholder="State"
                                name="state"
                                value={shippingAddress.state}
                                onChange={(e) => handleBilling(e)}

                            />
                            <label>postal_code</label>
                            <input type='text'
                                required
                                placeholder="Postal code"
                                name="postal_code"
                                value={billingAddress.postal_code}
                                onChange={(e) => handleBilling(e)}

                            />
                            <CountryDropdown
                                className={styles.select}
                                valueType='short'
                                value={billingAddress.country}

                                onChange={(val) => handleShipping({
                                    target: {
                                        name: "country",
                                        value: val
                                    }
                                })}

                            />
                            <label>Phone</label>
                            <input type='text'
                                required
                                placeholder="Phone"
                                name="phone"
                                value={billingAddress.phone}
                                onChange={(e) => handleBilling(e)}

                            />
                        </Card>
                        <button type='submit' className='--btn --btn-primary'>Proceed To Checkout</button>
                    </div>

                </form>
            </div>

        </section>
    )
}

export default CheckoutDetails