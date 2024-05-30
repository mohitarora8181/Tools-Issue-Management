import { Tools } from "../models/Tools.js";
import { IssueTool } from "../models/Issues.js"
import ErrorResponse from "../utils/errorResponse.js";

export const getAllTools = async (req, res, next) => {
    try {
        const tools = await Tools.find({});
        res.status(200).json({
            success: true,
            tools
        })
    } catch (error) {
        return next(new ErrorResponse("Invalid request", 404));
    }
}

export const getSingle = async (req, res, next) => {
    const { id } = req.body
    if (!id) {
        return next(new ErrorResponse("Please provide ID", 400));
    }
    try {
        const tool = await Tools.findById(id);
        res.status(200).json({
            success: true,
            tool
        })
    } catch (error) {
        return next(new ErrorResponse("Invalid request", 404));
    }
}

export const addTool = async (req, res, next) => {
    const { name, category, image } = req.body;
    if (!name || !category) {
        return next(new ErrorResponse("Please add with all required fields", 400));
    }
    try {
        const tool = await Tools.create({
            name, category, image: image || "https://scalebranding.com/wp-content/uploads/2021/02/63.-X-Tools-logo.jpg"
        })

        res.status(200).json({
            success: true,
            message: "Tool created successfully"
        })

    } catch (error) {
        return next(new ErrorResponse("Invalid request , Try Again", 404));
    }
}

export const deleteTool = async (req, res, next) => {
    const { id } = req.body;
    try {
        const tool = await Tools.deleteOne({ _id: id })

        res.status(200).json({
            success: true,
            message: "Deleted successfully"
        })

    } catch (error) {
        return next(new ErrorResponse("Invalid request , Try Again", 404));
    }
}


export const issueTool = async (req, res, next) => {
    const { mechanicName, phone, period, toolInfo } = req.body;
    try {
        const issueTool = await IssueTool.create({ mechanicName, phone, period, toolInfo }).then(() => {
            res.status(201).json({
                success: true,
                message: "Tool issued successfully"
            })
        })

    } catch (error) {
        return next(new ErrorResponse("Invalid request , Try Again", 404));
    }
}


export const getPreviousIssues = async (req, res, next) => {
    try {
        const issues = await IssueTool.find({});
        res.status(200).json({
            success: true,
            issues
        })
    } catch (error) {
        return next(new ErrorResponse("Invalid request", 404));
    }
}


export const changeStatus = async (req, res, next) => {
    const {id} = req.body
    try {
        const issues = await IssueTool.findByIdAndUpdate({_id:id},{status:"returned"});
        res.status(200).json({
            success: true,
            issues
        })
    } catch (error) {
        return next(new ErrorResponse("Invalid request", 404));
    }
}