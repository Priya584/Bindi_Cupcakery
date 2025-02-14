import connectToDB from "@/database";
import Menu from "@/models/menu";
import Joi from "joi";
import { NextResponse } from "next/server";

const AddNewMenu = Joi.object({
    Category : Joi.string().required(),
    Item : Joi.string().required(),
    Price : Joi.number().required(),
    Description : Joi.string().required()
})




export async function POST(req){
    try {
        await connectToDB();
        const extractMenuData = await req.json();
        const {Category,Item,Price , Description} = extractMenuData;
         
        const {error} = AddNewMenu.validate({
            Category,Item,Price , Description
        })

        if (error) {
            return NextResponse.json({
                success : false,
                message : error.details[0].message
            })
        }
       
            const newlyCreateMenuItem = await Menu.create(extractMenuData);
            if (newlyCreateMenuItem) {
                return NextResponse.json({
                    success : true,
                    message : "Menu added successfully"
                })
            }else{
                return NextResponse.json({
                    success : false,
                    message : "Something went wrong..."
                })
            }
        

    }catch (error) {
        console.log(error);
        return NextResponse.json({
            success : false,
            message : "Something went wrong ! Please try again"
        } )
    }
}