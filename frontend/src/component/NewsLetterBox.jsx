import React, { useState } from "react";
import axios from "axios";

const NewsLetterBox = () => {
  const [phone, setPhone] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post("http://localhost:5000/api/send-sms", {
            phone: "+918485051501",  // Ensure correct format
        });
        console.log(response.data);
    } catch (error) {
        console.error("Error sending SMS:", error.response?.data || error.message);
    }
};

  return (
    <div className="text-center">
      {isSubscribed ? (
        <p className="text-xl font-medium text-green-600">🎉 Thank you! You will get 20% off on your first purchase! 🎁</p>
      ) : (
        <>
          <p className="text-2xl font-medium text-gray-800">SUBSCRIBE NOW</p>
          <p className="text-gray-400 mt-3">Subscribe now and enjoy 20% off on your first purchase! ⏳✨</p>
          <form onSubmit={onSubmitHandler} className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3">
            <input
              className="w-full sm:flex-1 outline-none p-2"
              type="text"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <button type="submit" className="bg-black text-white text-xs px-10 py-4" disabled={loading}>
              {loading ? "SUBSCRIBING..." : "SUBSCRIBE"}
            </button>
          </form>
          {error && <p className="text-red-500">{error}</p>}
        </>
      )}
    </div>
  );
};

export default NewsLetterBox;
