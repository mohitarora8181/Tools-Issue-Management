import mongoose from "mongoose";

const IssueSchema = new mongoose.Schema({
    mechanicName: {
        type: String,
        required: ["Please provide mechanic name"]
    },
    phone: {
        type: String,
        required: ["Please provide mechanic mobile number "]
    },
    period: {
        type: String,
        required: ["Please provide period"]
    },
    toolInfo: {
        type: Object,
        required: ["Please provide toolInfo"]
    },
    issuedAt:Date,
    status:String
})
 
IssueSchema.pre("save",function (){
    this.issuedAt = Date.now();
    this.status = "issued"
})

export const IssueTool = mongoose.model("issues", IssueSchema);