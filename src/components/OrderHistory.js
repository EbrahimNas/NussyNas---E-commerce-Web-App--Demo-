import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext.js';
import { fetchUserOrders } from '../services/OrderService.js';
import Header from './Header.js';
import Footer from './Footer.js';
import styles from "../CSS/OrderHistory.module.css";

const OrderHistory = () => {
    const { currentUser } = useContext(AuthContext);

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const getOrders = async () => {
            if (currentUser) {
                const userOrders = await fetchUserOrders(currentUser.uid);
                setOrders(userOrders);
                setLoading(false);
            } else {
                // Handle case when no user is logged in
                console.log("No user logged in");
            }
        };
        getOrders();
    }, [currentUser]); // Re-fetch orders when the currentUser changes

    if (loading) {
        return <div>Loading orders...</div>;
    }

    return (

        <div className={styles.mainOrderHistory}>
            <Header />

            <div className={styles.orderHistory}>
                <div className={styles.orderHistoryContainer}>

                  <div className={styles.pageTitle}>
                      <h2> ≫ Order History ≪ </h2>
                  </div>

                   {orders.length === 0 ? (
                      <p>No orders found.</p>
                     ) : (
                
                      <div>
                          {orders.map((order) => {
                              console.log(order); // Log the full order data to inspect it
                              const orderDate = order.orderDate?.toDate ? order.orderDate.toDate() : null;
                              return (
                                  <div key={order.id} className={styles.orderDetails}>
                                      <h3>Order #{order.id}</h3>
                                      <p> Order Date: {orderDate ? orderDate.toLocaleDateString() : 'N/A'}</p>

                                      
                                        {order.items.map((item, index) => (
                                            <div key={index} className={styles.itemDetails}>
                                                
                                                <div className={styles.productImageContainer}>
                                                    <img src={item.imageUrl} alt={item.name} className={styles.productImage} />
                                                </div>

                                                <div>
                                                    <p>Product: {item.name}</p>
                                                    <p>Quantity: {item.quantity}</p>
                                                    <p>Size: {item.size}</p>
                                                    <p>Price: {` NGN ${item.price.toLocaleString()}`}</p>
                                                </div>
                                            </div>
                                        ))}
                                        <p>Total: {` NGN ${order.totalAmount.toLocaleString()}`}</p>
                                   </div>
                                );
                           })}
                       </div>
                   )}
               </div>
           </div>
           <Footer />
        </div>
    );
};

export default OrderHistory;


