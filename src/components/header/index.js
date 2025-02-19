"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Grand_Hotel, Quicksand } from "next/font/google";
import { UserButton } from "@clerk/nextjs";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

// Load fonts
const grandHotel = Grand_Hotel({ subsets: ["latin"], weight: "400" });
const quicksand = Quicksand({ subsets: ["latin"], weight: ["400", "600"] });

export default function Header({ user }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 950);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const role = user?.publicMetadata?.role ?? undefined;

  const leftMenu = [
    { label: "Home", path: "/", show: role === "admin", index: 1 },
    { label: "Menu", path: "/dashboard", show: true, index: 7 },
    { label: "Specials", path: "/specials", show: true, index: 8 },
  ];

  const rightMenu = [
    { label: "Admin", path: "/admin-dashboard", show: role === "admin", index: 2 },
    { label: "Reviews", path: "/reviews-home", show: role !== "admin", index: 5 },
    { label: "Reviews", path: "/reviews-admin", show: role === "admin", index: 6 },
    { label: "Cart", path: "/cart", show: user, index: 3 },
    { label: "Login", path: "/sign-in", show: !user, index: 4 },
  ];

  return (
    <header
      className={`fixed w-full top-0 z-[100] shadow-lg py-3 px-5 flex items-center justify-between 
              ${isMobile ? "bg-transparent" : "bg-[#fffde7]/95"}`}
    >
      {isMobile ? (
        <>
          {/* Mobile View: Menu Button on Left */}
          <div className="absolute left-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button className="bg-white">
                  <Menu className="w-6 h-6 text-black" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="bg-[#fffde7] p-6 z-[200] fixed top-0 left-0 w-screen h-screen"
              >
                <SheetHeader>
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                </SheetHeader>

                <nav className="flex flex-col space-y-14 items-center">
                  {/* Left Menu Items in Sheet */}
                  <p className="text-lg font-bold text-black">Nevigate with ease</p>
                  {leftMenu.map(
                    (item) =>
                      item.show && (
                        <StyledLink key={item.index} href={item.path} isMobile={true} >

                          {item.label}
                        </StyledLink>
                      )
                  )}


                  {/* Right Menu Items in Sheet */}
                  {rightMenu.map(
                    (item) =>
                      item.show && (
                        <StyledLink key={item.index} href={item.path} isMobile={true} >

                          {item.label}
                        </StyledLink>
                      )
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* Mobile View: Logo in Center */}
          <div className="flex-1 flex justify-center">
            <Link href="/">
              <img
                src="/img/logo.jpg"
                alt="Logo"
                className="w-[130px] h-[45px] object-contain"
              />
            </Link>
          </div>

        </>
      ) : (
        // Desktop View: Navigation Layout
        <nav className="container mx-auto flex items-center justify-center w-full">
          {/* Left Menu */}
          <div className="flex items-center gap-6">
            {leftMenu.map(
              (item) =>
                item.show && (
                  <StyledLink key={item.index} href={item.path} isMobile={false} >
                    {item.label}
                  </StyledLink>
                )
            )}
          </div>

          <Link href="/">
            <img
              src="/img/logo.jpg"
              alt="Logo"
              className="w-[130px] h-[45px] object-contain mx-16"
            />
          </Link>


          {/* Right Menu */}
          <div className="flex items-center gap-6">
            {rightMenu.map(
              (item) =>
                item.show && (
                  <StyledLink key={item.index} href={item.path} isMobile={false} >
                    {item.label}
                  </StyledLink>
                )
            )}
          </div>
        </nav>
      )}

      <UserButton afterSignOutUrl="/" />
    </header>
  );
}

function StyledLink({ href, children, isMobile }) {
  return (
    <Link
      href={href}
      className={`text-center px-4 py-2 text-black font-bold 
                  rounded-lg hover:scale-105 hover:shadow-[0_10px_20px_rgba(1,1,1,_0.7)]
                  ${quicksand.className} transition-all duration-300
                  ${isMobile ? "w-full block" : "w-[100px]"}`}
    >
      {children}
    </Link>
  );
}
