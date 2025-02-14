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
      className={`px-4 py-2 ${
        isInCart ? "bg-red-500" : "bg-blue-500"
      } text-white font-bold`}
    >
      {isInCart ? "Remove from Cart" : "Add to Cart"}
    </button>
  );
}
