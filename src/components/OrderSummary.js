import React, { useContext, useState, useEffect } from "react";
import { InitializePaystack } from "../config/paystackConfig.js";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useCart } from '../context/CartContext';
import { updateUserData } from "../services/userService.js";
import { saveOrderDetails, sendOrderEmails } from '../services/OrderService.js';
import countryList from 'react-select-country-list';
import { Link } from "react-router-dom";
import { Timestamp } from 'firebase/firestore';
import styles from "../CSS/OrderSummary.module.css";

function OrderSummary() {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const { cartItems, clearCart } = useCart();

  const [productTotal, setProductTotal] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [deliveryCost, setDeliveryCost] = useState(0);
  const [selectedState, setSelectedState] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDetailsSaved, setIsDetailsSaved] = useState(false);

  const [formData, setFormData] = useState({
    firstName: currentUser?.firstName || '',
    lastName: currentUser?.lastName || '',
    email: currentUser?.email || '',
  });

  const [addressData, setAddressData] = useState({
    streetAddress: currentUser?.address?.streetAddress || '',
    city: currentUser?.address?.city || '',
    country: currentUser?.address?.country || '',
  });

  const [countries] = useState(countryList().getData());

  // State groups for Nigeria
  const stateGroups = {
     NC: ["Benue", "Kogi", "Nasarawa", "Niger", "Plateau", "Abuja (FCT)"],
     NE: ["Adamawa", "Bauchi", "Borno", "Gombe", "Taraba", "Yobe"],
     NW: ["Kaduna", "Katsina", "Kano", "Kebbi", "Sokoto", "Jigawa", "Zamfara"],
     SE: ["Abia", "Anambra", "Ebonyi", "Enugu", "Imo"],
     SS: ["Akwa Ibom", "Bayelsa", "Cross River", "Delta", "Edo", "Rivers"],
     SW: ["Ekiti", "Lagos", "Ogun", "Ondo", "Osun", "Oyo"],
     DD: ["Kwara"]
  };

  const deliveryCosts = {
     NC: 5000,
     NE: 5500,
     NW: 6000,
     SE: 6500,
     SS: 5002,
     SW: 3000,
     DD: 1500,
  };
  
 // Calculate totals for products in the cart
  const calculateTotal = () => {
    const calculatedProductTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const calculatedTotalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    setProductTotal(calculatedProductTotal);
    setTotalQuantity(calculatedTotalQuantity);
};

// Calculate delivery cost based on location and product total
const calculateDeliveryCost = () => {
  if (addressData.country === "Nigeria") {
    if (productTotal >= 50000) {
      setDeliveryCost(0);
    } else {
      // Determine the delivery cost based on the state group
      const group = Object.keys(stateGroups).find(key =>
        stateGroups[key].includes(selectedState)
      );
      setDeliveryCost(group ? deliveryCosts[group] : 0); // Default cost if no group found
    }
  } else {
    setDeliveryCost(productTotal >= 150000 ? 0 : 20000);
  }
};

// Effect to update product totals whenever cart items change
useEffect(() => {
  calculateTotal(); // eslint-disable-next-line
}, [cartItems]);

// Effect to update delivery cost whenever productTotal, country, or state changes
useEffect(() => {
  calculateDeliveryCost(); // eslint-disable-next-line
}, [productTotal, addressData.country, selectedState]);

// Update totalAmount based on productTotal and deliveryCost values
useEffect(() => {
  setTotalAmount(productTotal + deliveryCost);
}, [productTotal, deliveryCost]);


  // Validate Form
  useEffect(() => {
     validateForm(); // eslint-disable-next-line
  }, [formData, addressData, selectedState]);

  const validateForm = () => {
     const isUserDetailsComplete = formData.firstName && formData.lastName && formData.email;
     const isAddressComplete = addressData.streetAddress && addressData.city && addressData.country;

     if (addressData.country === "Nigeria") {
       setIsFormValid(isUserDetailsComplete && isAddressComplete && selectedState);
     } else {
       setIsFormValid(isUserDetailsComplete && isAddressComplete);
     }
  };

  // Handle changes in User Details form
  const handleInputChange = (e) => {
     const { name, value } = e.target;
     setFormData({ ...formData, [name]: value });
  };

  // Handle changes in Address form
  const handleAddressChange = (e) => {
     const { name, value } = e.target;
     setAddressData({ ...addressData, [name]: value });
  };

  // Handle state selection for Nigerian address
  const handleStateChange = (e) => {
     setSelectedState(e.target.value);
  };

   // Combined submit handler
   const handleFormSubmit = async (e) => {
      e.preventDefault(); // Prevent default form submission behavior
      try {
          await updateUserData(currentUser.uid, formData); // Save user details
          await updateUserData(currentUser.uid, { // Save address data
            address: {
              streetAddress: addressData.streetAddress,
              city: addressData.city,
              country: addressData.country,
            },
        });
        setIsDetailsSaved(true);
        alert('User details and address updated successfully!');
      } catch (error) {
        console.error("Error updating user details or address:", error);
        alert('Failed to update user details or address.');
    }
  };

  // Success and close handlers for Paystack
  const handlePaymentSuccess = async (response) => {

    const orderData = {
      userId: currentUser.uid,
      items: cartItems,
      totalAmount: totalAmount,
      email: formData.email,
      fullName: `${formData.firstName} ${formData.lastName}`,
      currency: 'NGN',
      transactionId: response.reference,
      status: 'completed',
      orderDate: Timestamp.fromDate(new Date()),
      address: {
        streetAddress: addressData.streetAddress,
        city: addressData.city,
        country: addressData.country
      }
   };

    // Save the order details to Firestore
    await saveOrderDetails(orderData);

    // Send confirmation emails
    await sendOrderEmails(orderData);
    
    await clearCart();
    alert("Payment successful! Your order has been placed.");
  };

  const handlePaymentClose = () => {
    console.log("Payment closed.");
    alert("Payment was not completed.");
  };

  // Function to handle order submit
  const handleOrderSubmit = async (e) => {
    e.preventDefault();
  
    if (!isFormValid || !isDetailsSaved) {
      alert("Please fill out all fields and save your details to proceed.");
      return;
    }
  
    // Set loading state to true
    setIsLoading(true);
  
    try {
      // Pass the necessary data to InitializePaystack
      InitializePaystack(
        totalAmount,
        formData.email,
        `${formData.firstName} ${formData.lastName}`,
        (paymentResponse) => {
          // Handle the success callback for payment
          handlePaymentSuccess(paymentResponse);

          // After payment success, navigate to the order confirmation page
          navigate('/orderConfirmation', { state: { paymentResponse } });
          
        },
        handlePaymentClose
      );
    } catch (error) {
      console.error("Error initializing Paystack:", error);
      alert("There was an issue with processing your payment. Please try again.");
    } finally {
      // Reset loading state after attempting to initialize Paystack
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.mainOrderSummary}>

        <div className={styles.orderSummary}>
            <div className={styles.orderSummaryContainer}>

              <div className={styles.pageTitle}>
                 <Link to="/"><img src='/otherResources/images/NussyXnas-brand-logoBX.png' alt='NussyNas logo'/></Link>
                 <h2> ≫ Order Summary ≪ </h2>
              </div>

              <div className={styles.summaryDetails}>
                 {cartItems.map((item) => (
                     <div key={`${item.id}-${item.size}`} className={styles.productItem}>
                          <img src={item.imageUrl} alt={item.name} className={styles.productImage} />

                          <div className={styles.productItemDetails}>
                              <p>{item.name}</p>
                              <p>Quantity: {` X${item.quantity}`}</p>
                              <p>Price: {` NGN ${item.price.toLocaleString()}`}</p>
                              <p>Size: {item.size}</p>
                          </div>
                     </div> 
                  ))}
              </div>

              <div className={styles.orderInfo}>
                {/* Combined User Details and Address Form */}
                <form className={styles.forms} onSubmit={handleFormSubmit}>
                      <h3>Details</h3>

                      <label>First Name:</label>
                      <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} />

                      <label>Last Name:</label>
                      <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} />

                      <label>Email:</label>
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange} disabled />

                      <h3>Address</h3>

                      <label>Street Address:</label>
                      <input  type="text" name="streetAddress" value={addressData.streetAddress || ''} onChange={handleAddressChange} />

                      <label>City/Province:</label>
                      <input type="text" name="city" value={addressData.city || ''} onChange={handleAddressChange}  />

                      <label>Country:</label>
                      <select name="country" value={addressData.country || ''} onChange={handleAddressChange} >
                          <option value="">Select Country</option>
                          {countries.map((country) => (
                              <option key={country.value} value={country.label}>
                                  {country.label}
                              </option>
                           ))}
                      </select>

                      {addressData.country === "Nigeria" && (
                          <>
                              <label>State:</label>
                              <select value={selectedState} onChange={handleStateChange}>
                                  <option value="">Select State</option>
                                  {Object.values(stateGroups).flat().map(state => (
                                      <option key={state} value={state}>{state}</option>
                                  ))}
                              </select>
                          </>
                       )}

                       <button type="submit">Save Details and Address</button>
                </form>

                <div className={styles.totalSummary}>
                  <p>Num of Items: {` X${totalQuantity}`}</p>
                  <p>Items Total: {`NGN ${productTotal.toLocaleString()}`}</p>
                  <p>Delivery: {`NGN ${deliveryCost.toLocaleString()}`}</p>
                  <p><strong>Total: {`NGN ${totalAmount.toLocaleString()}`}</strong></p>

                  <button onClick={handleOrderSubmit} className={styles.payButton}>{isLoading ? 'Processing Payment...' : 'Proceed to Pay'}</button>
                </div>
              </div>
              

            </div>
        </div>

    </div>
  );
}

export default OrderSummary;