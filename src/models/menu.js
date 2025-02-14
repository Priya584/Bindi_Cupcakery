
import { required } from "joi";
import mongoose from "mongoose";

const MenuSchema = new mongoose.Schema({
    Category:{
        type : String,
        required : true
    },
    Item: {
        type : String,
        required : true
    },
    Price: {
        type : Number,
        required : true
    },
    Description:{
        type : String,
        required : true
    }

})

const Menu = mongoose.models.Menu || mongoose.model('Menu', MenuSchema)

export default Menu;