
import connectToDB from "@/database";
import Menu from "@/models/menu";
import { NextResponse } from "next/server";



export async function DELETE(req) {
    try {
        await connectToDB()
        
        const {searchParams} = new URL(req.url)
        
        const getCurrentMenuId = searchParams.get("id")

        if (!getCurrentMenuId) {
            return NextResponse.json({
                success : false,
                message : "Menu id is required"
            })
        }

        const deleteMenuById = await Menu.findByIdAndDelete(getCurrentMenuId)

        if (deleteMenuById) {
            return NextResponse.json({
                success: true,
                message : "Menu is deleted successfully"
            })
        }else{
            return NextResponse.json({
                success : false,
                message : "Something went wrong !! Please try again"
            })
        }
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success : false,
            message : "Something went wrong !! Please try again"
        })
    }
}