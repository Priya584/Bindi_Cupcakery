"use client";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { removeFromCart } from "@/store/slices/cart-slice";
import { Button } from "../ui/button";

export default function CartPage() {
    const [totalAmount, setTotalAmount] = useState(0);
    const [loading, setLoading] = useState(false);
    const { cart } = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {
        setTotalAmount(cart?.cartItems.reduce((acc, curr) => acc + curr?.Price, 0) || 0);
    }, [cart?.cartItems]);

    const handleRemoveFromCart = (itemId) => {
        dispatch(removeFromCart(itemId));
    };

    const handleOrder = async () => {
        if (!cart?.cartItems.length) {
            alert("Cart is empty!");
            return;
        }
    
        setLoading(true);
    
        const orderDetails = cart.cartItems.map(item => ({
            title: item.Item,
            price: item.Price
        }));
        const upiId = "priyabhanderi2@okaxis";
    
        try {
            // Generate QR Code
            const qrResponse = await fetch("/api/generate-qr", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: totalAmount, upiId }),
            }).then(res => res.json());
    
            // Send Order & QR via WhatsApp
            await fetch("/api/send-whatsapp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ orderDetails, qrCode: qrResponse.qrCode }),
            });
    
            alert("Order sent to business owner!");
        } catch (error) {
            console.error("Error processing order:", error);
            alert("Failed to place order. Try again!");
        }
    
        setLoading(false);
    };
    

    if (!cart.cartItems.length) {
        return <h1 className="text-4xl font-bold p-10">Cart is empty</h1>;
    }

    return (
        <div className="bg-white py-4">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-extrabold text-[#333]"> Cart</h2>
                <div className="overflow-y-auto ">
                    <table className="mt-12 w-full border-collapse divide-y">
                        <thead className="whitespace-nowrap text-left">
                            <tr>
                            <th className="text-base text-gray-700 p-4">Category</th>
                                <th className="text-base text-gray-700 p-4">Item</th>
                                <th>Price</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody className="whitespace-nowrap text-left divide-y">
                            {cart?.cartItems.map(item => (
                                <tr key={item._id}>
                                    <td className="py-5 px-4">
                                        <div className="flex items-center gap-6 w-max">
                                            
                                            <div>
                                                <p className="text-lg font-bold text-black">{item?.Category}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-5 px-4">
                                        <div className="flex items-center gap-6 w-max">
                                            
                                            <div>
                                                <p className="text-lg font-bold text-black">{item?.Item}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-5 px-4">
                                        <p className="font-semibold">{item?.Price} ₹</p>
                                    </td>
                                    <td className="py-5 px-4">
                                    <Button onClick={() => handleRemoveFromCart(item?._id)}>Remove</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td></td>
                                <td className="py-7 px-4">
                                    <p className="text-xl font-bold">Total: <span>{totalAmount} ₹</span></p>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <button
                    onClick={handleOrder}
                    disabled={loading}
                    className="bg-blue-500 text-white px-4 py-2 mt-4"
                >
                    {loading ? "Processing..." : "Place Order & Pay"}
                </button>
            </div>
        </div>
    );
}
