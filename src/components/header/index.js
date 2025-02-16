import Link from "next/link";
import { Grand_Hotel, Quicksand } from "next/font/google";
import { UserButton } from "@clerk/nextjs";

// Load fonts
const grandHotel = Grand_Hotel({ subsets: ["latin"], weight: "400" });
const quicksand = Quicksand({ subsets: ["latin"], weight: ["400", "600"] });

export default function Header({ user }) {
  const role = user?.publicMetadata?.role ?? undefined;

  const leftMenu = [
    { label: "Home", path: "/", show: true, index: 1 },
    { label: "Menu", path: "/dashboard", show: true, index: 7 },
    { label: "Admin", path: "/admin-dashboard", show: role === "admin", index: 2 },
];

const rightMenu = [
    { label: "Cart", path: "/cart", show: user, index: 3 },
    { label: "Reviews", path: "/reviews-home", show: role !== "admin", index: 5 },
    { label: "Reviews", path: "/reviews-admin", show: role === "admin", index: 6 },
    { label: "Specials", path: "/specials", show: true, index: 8 },
    { label: "Login", path: "/sign-in", show: !user, index: 4 },
  ];

  return (
    <header className="fixed w-full top-0 z-[100] bg-darkBrown/50 backdrop-blur-lg shadow-lg py-4 px-5 flex">
      <nav className="container mx-auto px-4 flex items-center justify-center">
        {/* Left Menu */}
        <div className="flex items-center gap-6">
          {leftMenu.map((item) =>
            item.show ? (
              <StyledLink key={item.index} href={item.path}>
                {item.label}
              </StyledLink>
            ) : null
          )}
        </div>

        {/* Logo in the Center */}
        <Link href="/" className="flex-shrink-0 px-16">
          <img src="/img/logo.jpg" alt="Logo" className="w-[130px] h-[45px] object-contain" />
        </Link>

        {/* Right Menu + UserButton */}
        <div className="flex items-center gap-6">
          {rightMenu.map((item) =>
            item.show ? (
              <StyledLink key={item.index} href={item.path}>
                {item.label}
              </StyledLink>
            ) : null
          )}
        </div>
      </nav>
        <UserButton afterSignOutUrl="/" />
    </header>
  );
}

function StyledLink({ href, children }) {
  return (
    <Link
      href={href}
      className={`w-[100px] text-center px-3 py-1.5 border border-white/30 text-[#FED8A6] rounded-lg
                 backdrop-blur-xl bg-white/20 hover:bg-[#B39977] hover:text-white
                 ${quicksand.className} transition-all duration-300 shadow-md`}
    >
      {children}
    </Link>
  );
}
