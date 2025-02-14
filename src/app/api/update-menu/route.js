import connectToDB from "@/database";
import { NextResponse } from "next/server";
import Joi from "joi";
import Menu from "@/models/menu";

const EditMenu = Joi.object({
    Category: Joi.string().required(),
    Item: Joi.string().required(),
    Price: Joi.number().required(),
    Description: Joi.string().required()
})


export async function PUT(req) {
    try {
        await connectToDB();
        const { searchParams } = new URL(req.url)
        const getCurrentMenuId = searchParams.get("id")

        if (!getCurrentMenuId) {
            return NextResponse.json({
                success: false,
                message: "Menu id is not found"
            })
        }

        const { Category,Item,Price , Description } = await req.json()

        const { error } = EditMenu.validate({
            Category,Item,Price , Description
        });

        if (error) {
            return NextResponse.json({
                success: false,
                message: error.details[0].message,
            })
        }

        const updateMenuById = await Menu.findByIdAndUpdate(
            {
                _id: getCurrentMenuId,
            },
            { Category,Item,Price , Description },
            { new: true }
        )

        if (updateMenuById) {
            return NextResponse.json({
                success: true,
                message: "Menu is successfully updated"
            })
        } else {
            return NextResponse.json({
                success: false,
                message: "Something went wrong ! Please try again"
            })
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong ! Please try again"
        })
    }
}