/* global PaystackPop */

export const InitializePaystack = (amount, email, name, onSuccessCallback, onCloseCallback) => {
  if (typeof PaystackPop !== 'undefined') {
    try {
      const handler = PaystackPop.setup({
        // paystack setup
      });

      handler.openIframe();
    } catch (error) {
      console.error("Error initializing Paystack payment:", error);
      alert("An error occurred while initializing the payment. Please try again.");
    }
  } else {
    console.error("Paystack script not loaded.");
    alert("Payment could not be initialized. Please refresh the page and try again.");
  }
};