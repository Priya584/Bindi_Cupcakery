import { UserButton } from "@clerk/nextjs";
import Link from "next/link";


export default function Header({ user }) {
    const role = user?.publicMetadata?.role ?? undefined;
    const menuItems = [
        {
            label: "Home",
            path: "/",
            show: true,
            index: 1
        },
        {
            label: "Admin",
            path: "/admin-dashboard",
            show: (role === "admin"),
            index: 2
        },
        {
            label: "Cart",
            path: "/cart",
            show: user,
            indes: 3
        },
        {
            label: "Login",
            path: "/sign-in",
            show: !user,
            index: 4
        },
        {
            label: "Reviews-User",
            path: "/reviews-home",
            show: user,
            indes: 5
        },
        {
            label: "Reviews-Admin",
            path: "/reviews-admin",
            show: (role === "admin"),
            indes: 6
        },
    ]

    return <div>
        <nav className="flex">
            {menuItems.map((item, index) =>
                item.show ? (
                    <div key={index} className="mx-6"> 
                        <Link href={item.path}>{item.label}</Link>
                    </div>
                ) : null
            )}
            <UserButton afterSignOutUrl="/"></UserButton>
        </nav>

    </div>
}