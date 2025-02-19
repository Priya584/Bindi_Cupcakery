"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import AddToCardButton from "../add-to-cart-button";
import { motion, AnimatePresence } from "framer-motion";
import { Gift } from "lucide-react";
import { Playfair_Display, Poppins } from "next/font/google";

const playfair = Playfair_Display({ weight: "700", subsets: ["latin"] });
const poppins = Poppins({ weight: "400", subsets: ["latin"] });

const desserts = [
    "Churros",
    "Mini Donut",
    "Mini Red Velvet Muffins",
    "Vanilla Bites",
    "Brownie Bites",
];
const dips = ["Hazelnut", "Dark Chocolate", "Cream Cheese", "Strawberry", "Milk Chocolate"];

export default function DessertBox() {
    const [boxSize, setBoxSize] = useState(null);
    const [selectedDesserts, setSelectedDesserts] = useState([]);
    const [selectedDips, setSelectedDips] = useState([]);
    const [showBox, setShowBox] = useState(false);

    // Constraints based on selected box size
    const maxDesserts = boxSize === "large" ? 4 : 2;
    const maxDips = boxSize === "large" ? 3 : 2;

    const handleSelectDessert = (dessert) => {
        if (selectedDesserts.includes(dessert)) {
            setSelectedDesserts(selectedDesserts.filter(d => d !== dessert));
        } else if (selectedDesserts.length < maxDesserts) {
            setSelectedDesserts([...selectedDesserts, dessert]);
        }
    };

    const handleSelectDip = (dip) => {
        if (selectedDips.includes(dip)) {
            setSelectedDips(selectedDips.filter(d => d !== dip));
        } else if (selectedDips.length < maxDips) {
            setSelectedDips([...selectedDips, dip]);
        }
    };

    // Constructing product item with _id
    const productItem = {
        _id: Date.now().toString(), // Temporary unique ID
        Category: `Customized ${boxSize?.toUpperCase()} Dessert Box`,
        Item: { desserts: selectedDesserts, dips: selectedDips },
        Price: boxSize === "large" ? 499 : 299,
    };

    return (
        <div className="bg-[] min-h-screen flex flex-col justify-center items-center p-6">
            {/* Gift Button */}
            <motion.button
                className="flex animate-bounce items-center gap-3 bg-[#e1d0b7] text-[#3d211A] px-6 py-3 rounded-lg shadow-md text-lg font-medium hover:bg-[#baa89c] transition-all"
                onClick={() => setShowBox(!showBox)}
            >
                <motion.div
                    className="text-[#3d211a]"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <Gift size={24} className="text-[#3d211a]" />
                </motion.div>
                Click here to make your own dessert box
            </motion.button>

            {/* Dessert Box */}
            <AnimatePresence mode="wait">
                {showBox && (
                    <motion.div
                        className="bg-[#e7dbca] p-6 rounded-xl border-2 border-[#baa89c] shadow-lg max-w-2xl w-full text-center mt-6"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                    >
                        <motion.h2
                            className={`${playfair.className} text-2xl font-bold text-[#3d211a] mb-4`}
                        >
                            Select Your Dessert Box
                        </motion.h2>

                        {/* Box Size Selection */}
                        <motion.div className="flex flex-col sm:flex-row justify-center gap-4 mb-4">
                            <label className="flex items-center cursor-pointer text-[#3d211a]">
                                <input
                                    type="radio"
                                    value="large"
                                    checked={boxSize === "large"}
                                    onChange={() => setBoxSize("large")}
                                    className="mr-2"
                                />
                                Large Box (4 Desserts, 3 Dips)
                            </label>
                            <label className="flex items-center cursor-pointer text-[#3d211a]">
                                <input
                                    type="radio"
                                    value="small"
                                    checked={boxSize === "small"}
                                    onChange={() => setBoxSize("small")}
                                    className="mr-2"
                                />
                                Small Box (2 Desserts, 2 Dips)
                            </label>
                        </motion.div>

                        {/* Desserts & Dips */}
                        <motion.div className="flex flex-col gap-6">
                            {/* Desserts */}
                            <div>
                                <h3 className={`${poppins.className} text-lg font-medium text-[#3d211a]`}>
                                    Select Desserts (Max: {maxDesserts})
                                </h3>
                                <div className="flex flex-wrap justify-center gap-2 mb-4">
                                    {desserts.map((dessert) => (
                                        <motion.label
                                            key={dessert}
                                            className="px-5 py-3 bg-[#4E342E] text-[#f5f2ee] rounded-md cursor-pointer flex items-center gap-2"
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={selectedDesserts.includes(dessert)}
                                                onChange={() => handleSelectDessert(dessert)}
                                                className="accent-[#baa89c]"
                                            />
                                            {dessert}
                                        </motion.label>
                                    ))}
                                </div>
                            </div>

                            {/* Dips */}
                            <div>
                                <h3 className={`${poppins.className} text-lg font-medium text-[#3d211a]`}>
                                    Select Dips (Max: {maxDips})
                                </h3>
                                <div className="flex flex-wrap justify-center gap-2 mb-4">
                                    {dips.map((dip) => (
                                        <motion.label
                                            key={dip}
                                            className="px-5 py-3 bg-[#4E342E] text-[#f5f2ee] rounded-md cursor-pointer flex items-center gap-2"
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={selectedDips.includes(dip)}
                                                onChange={() => handleSelectDip(dip)}
                                                className="accent-[#baa89c]"
                                            />
                                            {dip}
                                        </motion.label>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Add to Cart Button */}
                        <motion.div className="mt-6">
                            <AddToCardButton productItem={productItem} />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
