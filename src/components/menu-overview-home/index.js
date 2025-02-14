


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
import AddToCardButton from "../add-to-cart-button"



export default function MenuOverviewHome({ menuList }) {

  const router = useRouter();
  

  useEffect(() => {
    router.refresh();
  }, [router])

  
  
  
  return (
    <div className="min-h-screen p-6 flex flex-col gap-10 bg-yellow-100">
      
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
                  <AddToCardButton productItem={item}/>
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