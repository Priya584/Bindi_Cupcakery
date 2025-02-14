


"use client"

import { useEffect, useState } from "react"
import { AddNewMenu } from "../add-new-menu"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"


const initialMenuFormData = {
    Category : "",
    Item:"",
    Price:"",
    Description : ""
}

export default function MenuOverview({ menuList }) {
  const [openMenuDialog, setOpenMenuDialog] = useState(false)
  const [loading, setLoading] = useState(false)
  const [MenuFormData, setMenuFormData] = useState(initialMenuFormData)
  const [currentEditedMenuId, setCurrentEditedMenuId] = useState(null)

  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router])

  async function handleSaveMenuData() {
    try {
      setLoading(true)
      const apiResponse = currentEditedMenuId !== null ? 
      await fetch(`/api/update-menu?id=${currentEditedMenuId}`,
        {
          method : "PUT",
          body : JSON.stringify(MenuFormData)
        }
      )
      : await fetch('/api/add-menu',
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(MenuFormData)
        }
      );

      const result = await apiResponse.json();
      if (result?.success) {
        setMenuFormData(initialMenuFormData);
        setOpenMenuDialog(false);
        router.refresh();
      }
      console.log(result);
    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
      setMenuFormData(initialMenuFormData);
      setCurrentEditedMenuId(null)
    }
  }

  async function handleDeleteByMenuId(getCurrentId) {
    try {
      const apiResponse = await fetch(`/api/delete-menu?id=${getCurrentId}`, {
        method: "DELETE"
      })
      const result = await apiResponse.json()

      if (result?.success) {
        router.refresh()
        console.log(result);
      }

    } catch (error) {
      console.log(error);
    }
  }

 function handleUpdateByMenuId(MenuItem) {
    setCurrentEditedMenuId(MenuItem._id)
    setMenuFormData({
      Category : MenuItem.Category,
      Item : MenuItem.Item,
      Price : MenuItem.Price,
      Description : MenuItem.Description,
    })
    setOpenMenuDialog(true)
   
  }

  console.log(currentEditedMenuId);
  
  return (
    <div className="min-h-screen p-6 flex flex-col gap-10 bg-yellow-100">
      <AddNewMenu openMenuDialog={openMenuDialog} setOpenMenuDialog={setOpenMenuDialog} loading={loading} setLoading={setLoading} MenuFormData={MenuFormData} setMenuFormData={setMenuFormData} handleSaveMenuData={handleSaveMenuData} currentEditedMenuId={currentEditedMenuId} setCurrentEditedMenuId={setCurrentEditedMenuId} />

      <div className="grid mr-9 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6 gap-9">
        {menuList && menuList.length > 0 ?
          menuList.map((item, index) => {
            return (
              <Card key={index} className="pt-5 px-3">
                <CardContent>
                  <CardHeader>
                    <CardTitle className="mb-5">Category : {item?.Category}</CardTitle>
                    <CardTitle className="mb-5">Item : {item?.Item}</CardTitle>
                    <CardTitle className="mb-5">Price : {item?.Price}</CardTitle>
                    <CardDescription>Description : {item?.Description}</CardDescription>
                  </CardHeader>

                  <div className="flex px-7 mt-6 gap-9 items-center">
                    <Button onClick={() => handleUpdateByMenuId(item)}>Edit</Button>
                    <Button onClick={() => handleDeleteByMenuId(item._id)}>Delete</Button>
                  </div>
                </CardContent>
              </Card>
            )
          })
          : <Label className="text-6xl font-extrabold">No Item Found ! Please Add One</Label>
        }
      </div>
    </div>
  )
}