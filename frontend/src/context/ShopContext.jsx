import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

function ShopContextProvider({ children }) {
    const currency = "₹";
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItem] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState(localStorage.getItem("token") || ""); // ✅ Initialize from localStorage
    const navigate = useNavigate();

    // ✅ Store token in localStorage on login
    const saveToken = (newToken) => {
        setToken(newToken);
        localStorage.setItem("token", newToken);
    };

    // ✅ Logout function to clear token
    const logout = () => {
        setToken("");
        localStorage.removeItem("token");
        setCartItem({}); // Clear cart on logout
    };

    // ✅ Fetch products list
    const getProductsData = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/product/list`);
            if (response.data.success) {
                setProducts(response.data.products);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to load products");
        }
    };

    // ✅ Fetch user cart
    const getUserCart = async () => {
        if (!token) return; // Skip if no token

        try {
            const response = await axios.post(
                `${backendUrl}/api/cart/get`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.success) {
                setCartItem(response.data.cartData || {});
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error fetching cart:", error);
            toast.error(error.response?.data?.message || "Failed to fetch cart");
        }
    };

    // ✅ Load products on mount
    useEffect(() => {
        getProductsData();
    }, []);

    // ✅ Load cart when token is set
    useEffect(() => {
        if (token) {
            getUserCart();
        }
    }, [token]); // ✅ Run when token changes

    // ✅ Add to cart
    const addToCart = async (itemId, colour) => {
        if (!colour) {
            toast.error("Select Product colour");
            return;
        }

        let cartData = structuredClone(cartItems);
        cartData[itemId] = cartData[itemId] || {};
        cartData[itemId][colour] = (cartData[itemId][colour] || 0) + 1;
        setCartItem(cartData);

        if (token) {
            try {
                await axios.post(
                    `${backendUrl}/api/cart/add`,
                    { itemId, colour },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    };

    // ✅ Update quantity
    const updateQuantity = async (itemId, colour, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][colour] = quantity;
        setCartItem(cartData);

        if (token) {
            try {
                await axios.post(
                    `${backendUrl}/api/cart/update`,
                    { itemId, colour, quantity },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    };

    // ✅ Get total cart count
    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                totalCount += cartItems[items][item] || 0;
            }
        }
        return totalCount;
    };

    // ✅ Get total cart amount
    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            if (!itemInfo) continue;

            for (const item in cartItems[items]) {
                totalAmount += itemInfo.price * (cartItems[items][item] || 0);
            }
        }
        return totalAmount;
    };

    // ✅ Context value
    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        setCartItem,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        backendUrl,
        setToken: saveToken, // ✅ Ensure token is stored in localStorage
        token,
        logout, // ✅ Provide logout function
    };

    return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export default ShopContextProvider;
