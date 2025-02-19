"use client";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { removeFromCart } from "@/store/slices/cart-slice";
import { Button } from "../ui/button";
import Image from 'next/image';
import { Dancing_Script, Playfair_Display, Nunito } from "next/font/google";
import { Typewriter } from "react-simple-typewriter";
import { Prata, Poppins } from "next/font/google";

// Load fonts
const prata = Prata({ subsets: ["latin"], weight: "400" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600"] });


const dancingScript = Dancing_Script({ subsets: ["latin"], weight: ["400", "700"] });
const playfairDisplay = Playfair_Display({ subsets: ["latin"], weight: ["400", "700"] });
const nunito = Nunito({ subsets: ["latin"], weight: ["300", "600"] });

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
        return (
            <div
                className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center px-4 backdrop-blur-lg "
                style={{
                    backgroundImage: "url('/img/emptycartfinal.png')",
                    backgroundAttachment: "fixed",
                    backgroundSize: "cover",
                    backgroundPosition: "left",
                }}
            >
                <h1 className={`text-4xl md:text-6xl lg:text-7xl mb-8 mt-[-40px] relative ${prata.className}`} style={{ color: "#f5f5dc" }}>
                        <Typewriter
                          words={["Your Cart is Empty😒!"]}
                          loop={1}
                          cursor
                          typeSpeed={100}
                          deleteSpeed={50}
                        />
                      </h1>
            </div>
        );
    }

    return (
        <div
            className="relative min-h-screen flex flex-col items-center justify-center"
        >
            {/* <div className="absolute inset-0 w-full h-full bg-fixed bg-cover bg-center backdrop:blur-lg" style={{ backgroundImage: "url('/img/ucart3.jpg')" }}>

            </div> */}
            <div className="fixed inset-0 -z-10">
                    <Image
                      src="/img/ucart3.jpg"
                      alt="Background"
                      layout="fill"
                      objectFit="cover"
                      className="backdrop:blur-lg"
                    />
                  </div>

            <div className="relative py-4 px-8 bg-white/30 backdrop-blur-lg rounded-xl shadow-xl border border-white/50 mt-28 mb-14">
                <h2 className={`text-3xl md:text-5xl text-[#D2B48C] text-center drop-shadow-lg ${dancingScript.className}`}>My Cart</h2>
            </div>

            <div className="bg-[#3E2723] bg-opacity-90 p-8 rounded-xl shadow-2xl text-white overflow-auto w-full sm:max-w-3xl border border-[#D2B48C] z-30">
                {cart?.cartItems.length > 0 ? (
                    <table className="w-full text-center border-collapse">
                        <thead>
                            <tr className="text-[#D2B48C] border-b border-[#D2B48C] text-lg">
                                <th className="p-3">Sr. No</th>
                                <th className="p-3">Category</th>
                                <th className="p-3">Item</th>
                                <th className="p-3">Price</th>
                                <th className="p-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.cartItems.map((item, index) => (
                                <tr key={item._id} className="text-[#ede6d9] border-b border-gray-600">
                                    <td className="p-3">{index + 1}</td>
                                    <td className="p-3">{item.Category}</td>
                                    <td className="p-3">
                                        {item.Item && typeof item.Item === "object" && Object.keys(item.Item).length > 0 ? (
                                            <>
                                                {item.Item.desserts && (
                                                    <div><strong>Desserts:</strong> {item.Item.desserts.join(", ") || "None"}</div>
                                                )}
                                                {item.Item.dips && (
                                                    <div><strong>Dips:</strong> {item.Item.dips.join(", ") || "None"}</div>
                                                )}
                                            </>
                                        ) : (
                                            item.Item // Directly show `item.Item` if it doesn’t have `desserts` or `dips`
                                        )}
                                    </td>

                                    <td className="p-3 text-lg">{item.Price} ₹</td>
                                    <td className="p-3">
                                        <Button
                                            onClick={() => handleRemoveFromCart(item._id)}
                                            className="bg-[#A05135] text-[#ede6d9] px-3 py-1 rounded hover:bg-[#ede6d9] hover:text-[#a05135]"
                                        >
                                            Remove
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-center text-xl">Your cart is empty</p>
                )}

                <div className="mt-5 text-lg font-semibold text-right">
                    Total: <span className="text-[#B9986C]">{totalAmount} ₹</span>
                </div>
                <button
                    onClick={handleOrder}
                    disabled={loading}
                    className="mt-5 w-full bg-[#D2B48C] text-[#3E2723] hover:bg-[#B9986C] border-[#3E2723] border-4 text-lg py-2 rounded-lg"
                >
                    {loading ? "Processing..." : "Place Order & Pay"}
                </button>

                <div className="flex flex-col space-y-9 md:flex-row items-center justify-between bg-[#ede6d9] p-6 mt-10 rounded-xl shadow-lg border border-[#D2B48C] w-full max-w-3xl">
                    <div className="flex-1 flex justify-center md:justify-start">
                        <img src="/img/qr.jpg" alt="WhatsApp QR" className="w-48 h-48 rounded-md shadow-lg" />
                    </div>
                    <div className="flex-1">
                        <p className="text-[#3E2723] text-center md:text-left">
                            Scan QR and send the message on WhatsApp to receive confirmation of your order.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
