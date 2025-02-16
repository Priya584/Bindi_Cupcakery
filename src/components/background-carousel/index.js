"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

const images = [
  "/img/2.jpg",
  "/img/1.1.jpg",
  "/img/3.jpg",
  "/img/home.jpg",
  "/img/4.jpg",
  "/img/home1.jpg",
  "/img/home2.jpg",
  "/img/5.jpg"
]

export default function BackgroundCarousel() {
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="fixed inset-0 -z-10">
      {images.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImage ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={src || "/placeholder.svg"}
            alt={`Background ${index + 1}`}
            fill
            className="object-cover"
            priority={index === 0}
          />
          
          <div className="absolute inset-0 bg-black opacity-65 pointer-events-none"/>
        </div>
      ))}
    </div>
  )
}

