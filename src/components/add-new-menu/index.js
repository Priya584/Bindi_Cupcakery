"use client"

import { Button } from "../ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,

} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Fragment, useState } from "react"


import React from 'react'



export const AddNewMenu = ({ openMenuDialog, setOpenMenuDialog, loading, MenuFormData, setMenuFormData, handleSaveMenuData, currentEditedMenuId, setCurrentEditedMenuId }) => {
    return (
        <Fragment>
            <div>
                <Button onClick={() => { setOpenMenuDialog(true) }}>Add New Item</Button>

            </div>


            <Dialog open={openMenuDialog} onOpenChange={() => {
                setOpenMenuDialog(false);
                setCurrentEditedMenuId(null);
                setMenuFormData({
                    Category : "",
                    Item:"",
                    Price:"",
                    Description : ""
                })
            }}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{currentEditedMenuId ? "Edit Item" : "Add New Item"}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="Title" className="text-center">
                                Category
                            </Label>
                            <Input
                                name="Category"
                                placeholder="Enter Category of Item"
                                value={MenuFormData?.Category || ""}
                                onChange={(e) => setMenuFormData({
                                    ...MenuFormData, Category: e.target.value
                                })
                                }
                                id="Category"
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="Title" className="text-center">
                                Item
                            </Label>
                            <Input
                                name="Item"
                                placeholder="Enter name of Item"
                                value={MenuFormData?.Item || ""}
                                onChange={(e) => setMenuFormData({
                                    ...MenuFormData, Item: e.target.value
                                })
                                }
                                id="Item"
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="Title" className="text-center">
                                Price
                            </Label>
                            <Input
                                name="Price"
                                placeholder="Enter Price of Item"
                                value={MenuFormData?.Price || ""}
                                onChange={(e) => setMenuFormData({
                                    ...MenuFormData, Price: e.target.value
                                })
                                }
                                id="Price"
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="desc" className="text-right">
                                Description
                            </Label>
                            <Input
                                id="desc"
                                name="Description"
                                value={MenuFormData?.Description || ""}
                                placeholder=""
                                onChange={(e) => setMenuFormData({
                                    ...MenuFormData, Description: e.target.value
                                })
                                }
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" onClick={handleSaveMenuData}>
                            {
                                loading ? "Saving Changes" : "Save Changes"
                            }

                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Fragment>
    )
}
