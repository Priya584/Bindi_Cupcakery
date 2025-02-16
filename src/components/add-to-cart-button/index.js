"use client";

import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "@/store/slices/cart-slice";

export default function AddToCardButton({ productItem }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  // Use `_id` from MongoDB to check if the item is in the cart
  const isInCart = cartItems.some((item) => item._id === productItem._id);

  const handleCartToggle = () => {
    if (isInCart) {
      dispatch(removeFromCart(productItem._id));
    } else {
      dispatch(addToCart(productItem));
    }
  };

  return (
    <button
      onClick={handleCartToggle}
      className={`bg-[#C99E63] text-[#3D2C20] px-3 py-1 rounded-lg shadow-md text-sm hover:bg-[#3a2720] hover:text-[#C99E63]
      } text-white font-bold`}
    >
      {isInCart ? "Remove" : "Add"}
    </button>
  //   <button className="bg-[#C99E63] text-[#3D2C20] px-3 py-1 rounded-lg shadow-md text-sm hover:bg-[#3a2720] hover:text-[#C99E63]">
  //   Add to Cart
  // </button>
  );
}
