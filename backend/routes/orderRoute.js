import express from 'express';
import { placeOrder, placeOrderRazorpay, verifyPayment, allOrders, userOrders, updateStatus, deleteOrder, getOrderStatus } from "../controller/orderController.js";
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js';

const orderRouter = express.Router();

// Admin Features
orderRouter.post('/list', adminAuth, allOrders);
orderRouter.post('/status', adminAuth, updateStatus);
orderRouter.get("/orders", allOrders);
orderRouter.put("/orders/update-status", updateStatus);
orderRouter.delete("/orders/delete/:orderId", deleteOrder);


// Payment Features
orderRouter.post('/place', authUser, placeOrder);
orderRouter.post('/razorpay', authUser, placeOrderRazorpay);
orderRouter.post('/verify-payment', authUser, verifyPayment);

// User Feature
orderRouter.post('/userorders', authUser, userOrders);
orderRouter.get('/orders/status/:orderId',getOrderStatus);

export default orderRouter;
