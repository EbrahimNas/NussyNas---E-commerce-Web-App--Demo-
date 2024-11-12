import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext.js';
import { updateUserData } from "../services/userService.js";
import countryList from 'react-select-country-list';
import Header from './Header.js';
import Footer from './Footer.js';
import QuickNavigation from './QuickNavigation.js';
import styles from "../CSS/UserDetails.module.css";

function UserDetails() {
  const { currentUser } = useContext(AuthContext);

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

  // Save User Details to Firestore
  const saveUserDetails = async () => {
    try {
      await updateUserData(currentUser.uid, formData);
      alert('User details updated successfully!');
    } catch (error) {
      console.error("Error updating user details:", error);
      alert('Failed to update user details.');
    }
  };

  // Save Address Data to Firestore
  const saveAddress = async () => {
    try {
      await updateUserData(currentUser.uid, {
        address: {
          streetAddress: addressData.streetAddress,
          city: addressData.city,
          country: addressData.country,
        },
      });
      alert('Address updated successfully!');
    } catch (error) {
      console.error("Error updating address:", error);
      alert('Failed to update address.');
    }
  };

  return (
    <div className={styles.mainUserDetails}>
        <Header />

        <div className={styles.UserDetails}>
            <div className={styles.UserDetailsContainer}>
              <QuickNavigation />

              <div className={styles.pageTitle}>
                <h2> ≫ My Details ≪ </h2>
              </div>
              
              {/* User Details Form */}
              <form className={styles.forms}>
                  <h3>Details</h3>

                  <label>First Name:</label>
                  <input
                     type="text"
                     name="firstName"
                     value={formData.firstName}
                     onChange={handleInputChange}
                  />

                  <label>Last Name:</label>
                  <input
                     type="text"
                     name="lastName"
                     value={formData.lastName}
                     onChange={handleInputChange}
                  />

                  <label>Email:</label>
                  <input
                     type="email"
                     name="email"
                     value={formData.email}
                     onChange={handleInputChange}
                     disabled // Email can be displayed but not editable
                  />

                  <button type="button" onClick={saveUserDetails}>
                      Save Details
                  </button>
               </form>

               {/* Address Form */}
               <form className={styles.forms}>
                  <h3>Address</h3>

                  {/* Street Address Input */}
                  <label>Street Address:</label>
                  <input
                     type="text"
                     name="streetAddress"
                     value={addressData.streetAddress || ''}
                     onChange={handleAddressChange}
                  />

                  {/* City/Province Input */}
                  <label>City/Province:</label>
                  <input
                     type="text"
                     name="city"
                     value={addressData.city || ''}
                     onChange={handleAddressChange}
                  />

                  {/* Country Dropdown */}
                  <label>Country:</label>
                  <select
                      name="country"
                      value={addressData.country || ''}
                      onChange={handleAddressChange}
                      >

                      <option value="">Select Country</option>
                      {countries.map((country) => (
                         <option key={country.value} value={country.label}>
                              {country.label}
                            </option>
                       ))}
                  </select>

                  <button type="button" onClick={saveAddress}>
                      Save Address
                  </button>
               </form>


            </div>
        </div>

        <Footer />
    </div>
  );
};

export default UserDetails;