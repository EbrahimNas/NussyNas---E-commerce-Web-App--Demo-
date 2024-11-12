import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";
import styles from "../CSS/OrderConfirmation.module.css";

const OrderConfirmation = () => {
  const location = useLocation();
  const { paymentResponse } = location.state || {};  // Get payment response from state

  if (!paymentResponse) {
    return <p>No payment details available.</p>;
  }

  return (
    <div>
        <div className={styles.orderConfirmation}>
            <div className={styles.orderConfirmationContainer}>

              <div className={styles.pageTitle}>
                 <Link to="/"><img src='/otherResources/images/NussyXnas-brand-logoBX.png' alt='NussyNas logo'/></Link>
                 <h2> ≫ Order Confirmation ≪ </h2>
              </div>

              <div className={styles.orderConfirmationDetails}>
                  <h1>Payment Successful!</h1>
                  <p>Payment Reference: {paymentResponse.reference}</p>
                  <p>Click <a href="/">here</a> to go home</p>
              </div>
            </div>
        </div>
    </div>
  );
};

export default OrderConfirmation;
