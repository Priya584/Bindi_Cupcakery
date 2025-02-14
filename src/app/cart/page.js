
import Cart from "@/components/cart";
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";




export default async function CartPage() {
  const user = await currentUser();


  if (!user) {
    redirect("/");
  }

 

  return (
    
    <Cart/>
  )
}
