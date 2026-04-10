import React, { useState, useContext } from 'react';
import Title from '../component/Title';
import CartTotal from '../component/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const { navigate, backendUrl, cartItems, colour, setCartItem, token, getCartAmount, delivery_fee, products } = useContext(ShopContext);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData(data => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];
  
      for (const productId in cartItems) {
        for (const selectedColour in cartItems[productId]) {
          if (cartItems[productId][selectedColour] > 0) {
            orderItems.push({
              productId,  // Ensure the correct field is passed
              quantity: cartItems[productId][selectedColour], // Get correct quantity
              colour: selectedColour // Add colour if required
            });
          }
        }
      }
  
      const orderData = {
        address: formData,
        items: orderItems, // Now contains productId and quantity
        amount: getCartAmount() + delivery_fee,
      };
  
      switch (method) {
        case 'cod':
          const response = await axios.post(
            backendUrl + '/api/order/place',
            orderData,
            { headers: { Authorization: `Bearer ${token}` } }
          );
  
          if (response.data.success) {
            setCartItem({});
            navigate('/orders');
          } else {
            toast.error(response.data.message || 'Order placement failed');
          }
          break;
  
        case 'razorpay':
          const { data } = await axios.post(
            backendUrl + '/api/order/razorpay',
            { amount: orderData.amount },
            { headers: { Authorization: `Bearer ${token}` } }
          );
  
          if (data.success) {
            const options = {
              key: "rzp_test_x2sm0CSbyNE72h",
              amount: data.order.amount,
              currency: "INR",
              name: "Akinox Website",
              description: "Order Payment",
              order_id: data.order.id,
              handler: async function (response) {
                const verifyRes = await axios.post(
                  backendUrl + "/api/order/verify-payment",
                  {
                    order_id: data.order.id,
                    payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                    userId: token,
                    items: orderItems,
                    amount: orderData.amount,
                    address: formData,
                  },
                  { headers: { Authorization: `Bearer ${token}` } }
                );
  
                if (verifyRes.data.success) {
                  setCartItem({});
                  navigate("/orders");
                  toast.success("Payment Successful");
                } else {
                  toast.error("Payment Verification Failed");
                }
              },
              theme: { color: "#3399cc" },
            };
  
            if (typeof window.Razorpay === "undefined") {
              toast.error("Razorpay SDK failed to load. Please check your internet connection.");
              return;
            }
            const razorpay = new window.Razorpay(options);
            razorpay.open();
          } else {
            toast.error("Error initiating payment");
          }
          break;
  
        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "An error occurred while placing the order");
    }
  };
  

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* Left side */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='First Name' type="text" />
          <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Last Name' type="text" />
        </div>
        <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Enter Your Email' type="email" />
        <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Street' type="text" />
        <div className='flex gap-3'>
          <input onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='City' type="text" />
          <input onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='State' type="text" />
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='zipcode' type="text" />
          <input required onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Country' type="text" />
        </div>
        <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Phone' type="number" />
      </div>

      {/* Right side */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>
        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          {/* PAYMENT METHOD */}
          <div className='flex gap-3 flex-col lg:flex-col'>

            <div onClick={() => setMethod('razorpay')} className='h-12 flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`w-4 h-4 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`} />
              <img className='h-20 w-auto mx-4' src={assets.razorpaylogo} alt="Razorpay Logo" />
            </div>

            <div onClick={() => setMethod('cod')} className='h-12 flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`w-4 h-4 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`} />
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
            
            <div className='w-full text-end mt-8'>
              <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
