import MenuOverview from "@/components/menu-overview"
import { currentUser } from "@clerk/nextjs/server"


async function fetchListOfMenuItems() {
  try {
    const apiResponse = await fetch("http://localhost:3000/api/get-menu", {
      method: "GET",
      cache: "no-store"
    })

    const result = await apiResponse.json()
    return result?.data
  } catch (error) {
    throw new Error(error)
  }
}

export default async function Menu() {
  const user = await currentUser();
  const role = user?.publicMetadata?.role ?? undefined;


  if (role !== "admin") {
    redirect("/");
  }

  const menuList = await fetchListOfMenuItems();

  return (
    <MenuOverview menuList={menuList} />

  )
}
