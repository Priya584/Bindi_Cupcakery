"use client"

import { useEffect, useState } from "react"
import { AddNewMenu } from "../add-new-menu"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Image from "next/image";
import { Dancing_Script, Playfair_Display, Nunito } from "next/font/google";
import { Image as ImageIcon } from "lucide-react";

// Load fonts
const dancingScript = Dancing_Script({ subsets: ["latin"], weight: ["400", "700"] });
const playfairDisplay = Playfair_Display({ subsets: ["latin"], weight: ["400", "700"] });
const nunito = Nunito({ subsets: ["latin"], weight: ["600"] });

const initialMenuFormData = {
  Category: "",
  Item: "",
  Price: "",
  Description: "",
  Pic: "",
}

export default function MenuOverview({ menuList }) {
  const [openMenuDialog, setOpenMenuDialog] = useState(false)
  const [loading, setLoading] = useState(false)
  const [MenuFormData, setMenuFormData] = useState(initialMenuFormData)
  const [currentEditedMenuId, setCurrentEditedMenuId] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState("") // Stores selected category
  const [newCategory, setNewCategory] = useState("") // Stores new category input

  const router = useRouter()

  useEffect(() => {
    router.refresh()
  }, [router])

  // Extract unique categories from menuList
  const categories = [...new Set(menuList.map(item => item.Category))]

  async function handleSaveMenuData() {
    try {
      setLoading(true)
      const apiResponse = currentEditedMenuId !== null
        ? await fetch(`/api/update-menu?id=${currentEditedMenuId}`, {
          method: "PUT",
          body: JSON.stringify(MenuFormData),
        })
        : await fetch('/api/add-menu', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(MenuFormData),
        })

      const result = await apiResponse.json()
      if (result?.success) {
        setMenuFormData(initialMenuFormData)
        setOpenMenuDialog(false)
        router.refresh()
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
      setMenuFormData(initialMenuFormData)
      setCurrentEditedMenuId(null)
    }
  }

  async function handleDeleteByMenuId(getCurrentId) {
    try {
      const apiResponse = await fetch(`/api/delete-menu?id=${getCurrentId}`, {
        method: "DELETE",
      })
      const result = await apiResponse.json()

      if (result?.success) {
        router.refresh()
      }
    } catch (error) {
      console.log(error)
    }
  }

  function handleUpdateByMenuId(MenuItem) {
    setCurrentEditedMenuId(MenuItem._id)
    setMenuFormData({
      Category: MenuItem.Category,
      Item: MenuItem.Item,
      Price: MenuItem.Price,
      Description: MenuItem.Description,
      Pic: MenuItem.Pic,
    })
    setOpenMenuDialog(true)
  }

  // Filter menu items based on selected category
  const filteredMenu = selectedCategory
    ? menuList.filter(item => item.Category === selectedCategory)
    : menuList

  return (
    <div className={`relative min-h-screen flex flex-col items-center text-white ${nunito.className}`}>
      {/* Category Bar */}
      <Image
        src="/img/menuu.jpg"
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 blur-md"
      />
      <div className="relative z-10 w-full max-w-4xl p-6 mt-20">
        <div className="flex justify-center mb-6">
          <div className="py-4 px-8 bg-white/20 backdrop-blur-xl rounded-xl shadow-xl border border-white/30">
            <h1 className={`text-3xl md:text-4xl text-[#D2B48C] text-center ${dancingScript.className}`}>
              Admin Dashboard
            </h1>
          </div>
        </div>




        <div className="flex items-center gap-4 rounded-lg shadow mb-4">
          {categories.map((category, index) => (
            <Button
              key={index}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={
                category === selectedCategory
                  ? "bg-[#ede6d9] text-[#24160e] border-[#24160e] hover:bg-[#d4c3a5] hover:text-[#000000]"
                  : "bg-[#24160e] text-[#ede6d9] hover:bg-[#3b2a1f] hover:text-[#ffffff]"
              }
            >
              {category}
            </Button>
          ))}

          {/* Input to Add New Category */}
          <Input
            placeholder="New Category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className={`px-2 py-1 rounded bg-[#000000] text-[#ffffff] ${nunito.className}`}
          />
          <Button
            className="bg-[#ede6d9] text-[#24160e] hover:bg-[#d4c3a5] border-[#24160e]"
            onClick={() => {
              if (newCategory && !categories.includes(newCategory)) {
                setSelectedCategory(newCategory)
                setNewCategory("")
              }
            }}
          >
            Add
          </Button>
        </div>

        {/* Show "Add New Item" button only if a category is selected */}
        {selectedCategory && (
          <AddNewMenu
            openMenuDialog={openMenuDialog}
            setOpenMenuDialog={setOpenMenuDialog}
            loading={loading}
            setLoading={setLoading}
            MenuFormData={{ ...MenuFormData, Category: selectedCategory }} // Auto-set category
            setMenuFormData={setMenuFormData}
            handleSaveMenuData={handleSaveMenuData}
            currentEditedMenuId={currentEditedMenuId}
            setCurrentEditedMenuId={setCurrentEditedMenuId}
          />
        )}


        {/* Menu Items Grid */}
        {/* Show Table only if there are items */}
        {filteredMenu.length > 0 ? (
          <Table className="bg-[#3D2B1F] text-white w-full rounded-md overflow-hidden">
            <TableHeader className={`bg-[#24160e] text-[#ede6d9] hover:bg-[#3b2a1f] hover:text-[#ffffff] ${playfairDisplay.className}`}>
              <TableRow>
                <TableHead className="p-3 text-[#D2B48C] text-center">Sr. No.</TableHead>
                <TableHead className="text-[#D2B48C] text-center">Category</TableHead>
                <TableHead className="text-[#D2B48C] text-center">Item</TableHead>
                <TableHead className="text-[#D2B48C] text-center">Price</TableHead>
                <TableHead className="text-[#D2B48C] text-center">Photo</TableHead>
                <TableHead className="text-[#D2B48C] text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className={nunito.className}>
              {filteredMenu.map((item, index) => (
                <TableRow key={item._id} className="border-b border-[#D2B48C] bg-[#cbb799] text-[#3d211a]">
                  <TableCell className="text-center">{index + 1}</TableCell>
                  <TableCell className="text-center">{item.Category}</TableCell>
                  <TableCell className="text-center">{item.Item}</TableCell>
                  <TableCell className="text-center">₹{item.Price}</TableCell>
                  <TableCell className="flex flex-col items-center justify-center text-center">
                    {item.Pic ? (
                      <>
                        <a href={item.Pic} target="_blank" rel="noopener noreferrer">
                          <ImageIcon
                            src={item.photo}
                            alt={item.item}
                            width={40}
                            height={40}
                            className="w-6 h-6 mt-2 text-[#24160e]"
                          />
                        </a>
                      </>
                    ) : (
                      <ImageIcon className="w-8 h-8 text-[#24160e]" />
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    <Button className="bg-[#24160e] text-[#ede6d9] hover:bg-[#3b2a1f] hover:text-[#ffffff] mr-2" onClick={() => handleUpdateByMenuId(item)}>Edit</Button>
                    <Button className="bg-[#a05135] text-white" onClick={() => handleDeleteByMenuId(item._id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center mt-6">
            <Label className="text-3xl font-extrabold text-white">No Item Found! Please Add One</Label>
          </div>
        )}

        {/* <div className="grid mr-9 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6 gap-9">
          {filteredMenu.length > 0 ? (
            filteredMenu.map((item, index) => (
              <Card key={index} className="pt-5 px-3">
                <CardContent>
                  <CardHeader>
                    <CardTitle className="mb-5">Category : {item?.Category}</CardTitle>
                    <CardTitle className="mb-5">Item : {item?.Item}</CardTitle>
                    <CardTitle className="mb-5">Price : {item?.Price}</CardTitle>
                    <CardDescription>Description : {item?.Description}</CardDescription>
                    <CardDescription>Click here : <a href={item?.Pic} className="text-blue-500 underline">Link</a></CardDescription>
                  </CardHeader>

                  <div className="flex px-7 mt-6 gap-9 items-center">
                    <Button onClick={() => handleUpdateByMenuId(item)}>Edit</Button>
                    <Button onClick={() => handleDeleteByMenuId(item._id)}>Delete</Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Label className="text-6xl font-extrabold">No Item Found! Please Add One</Label>
          )}
        </div> */}
      </div>

    </div>
  )
}
