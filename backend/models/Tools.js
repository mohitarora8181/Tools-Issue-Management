import mongoose from "mongoose";

const ToolSchema = new mongoose.Schema({
    name:{
        type:String,
        required:["Please provide tool name"]
    },
    category:{
        type:String,
        required:["Please provide category"]
    },
    image:String
})

export const Tools = mongoose.model("tools",ToolSchema);