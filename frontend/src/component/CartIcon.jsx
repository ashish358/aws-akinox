// import React, { useContext, useState } from "react";
import React, { useContext, useState } from "react"; // Only import once
import { ShoppingBag } from "lucide-react";

const CartIcon = () => {
  return <ShoppingBag className="cursor-pointer sm:h-6 sm:w-6 h-5 w-5 mb-1" />;
};

export default CartIcon;
