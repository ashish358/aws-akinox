import userModel from "../model/userModel.js";

// 🛒 Add product to cart
const addToCart = async (req, res) => {
    try {
        const { userId, itemId, colour } = req.body;

        // Fetch user data
        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {}; // Initialize if undefined

        // Update cartData structure
        if (!cartData[itemId]) {
            cartData[itemId] = {};
        }
        cartData[itemId][colour] = (cartData[itemId][colour] || 0) + 1;

        // Save updated cart data
        await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });

        res.json({ success: true, message: "Added to cart" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// 🛒 Update cart quantity
const updateCart = async (req, res) => {
    try {
        const { userId, itemId, colour, quantity } = req.body;

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {}; // Ensure it's an object

        if (!cartData[itemId]) {
            return res.status(400).json({ success: false, message: "Item not found in cart" });
        }

        if (quantity <= 0) {
            delete cartData[itemId][colour]; // Remove if quantity is 0
            if (Object.keys(cartData[itemId]).length === 0) {
                delete cartData[itemId]; // Remove item if no colors remain
            }
        } else {
            cartData[itemId][colour] = quantity;
        }

        await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });

        res.json({ success: true, message: "Cart updated" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// 🛒 Get user cart
const getUserCart = async (req, res) => {
    try {
        const { userId } = req.body;

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, cartData: userData.cartData || {} });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export { addToCart, updateCart, getUserCart };
