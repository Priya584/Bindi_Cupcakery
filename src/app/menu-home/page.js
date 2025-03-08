export const dynamic = "force-dynamic";
import MenuOverviewHome from "@/components/menu-overview-home"



async function fetchListOfMenuItems() {
  try {
    const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/get-menu`, {
      method: "GET",
      cache: "no-store"
    })

    const result = await apiResponse.json()
    return result?.data
  } catch (error) {
    throw new Error(error)
  }
}

export default async function MenuHome() {

  const menuList = await fetchListOfMenuItems();

  return (
    <MenuOverviewHome menuList={menuList} />

  )
}
