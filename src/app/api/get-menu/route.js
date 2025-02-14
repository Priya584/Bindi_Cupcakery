import connectToDB from "@/database";
import { NextResponse } from "next/server";
import Menu from "@/models/menu";



export async function GET() {
    try {
        await connectToDB();
        const extractAllMenusFromDB = await Menu.find({});
        
        if (extractAllMenusFromDB) {
            return NextResponse.json({
                success : true,
                data : extractAllMenusFromDB
            })
            
        }
        else{
            return NextResponse.json({
                success : false,
                message : "Something went wrong! Please try again later"
            })
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success : false,
            message : "Something went wrong! Please try again later"
        })
    }
}