import { User } from "../models/User.js"
import ErrorResponse from "../utils/errorResponse.js";
import crypto from "crypto"


export const register = async (req, res, next) => {
    const { name, email, password } = req.body;

    try {
        const user = await User.create({ name, email, password });
        res.status(200).json({
            success: true,
            token: user.getSignedToken()
        })
    } catch (error) {
        next(error)
    }
}

export const login = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorResponse("Please provide email and password", 400))
    }
    try {
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return next(new ErrorResponse("User not found", 401));
        }

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return next(new ErrorResponse("Invalid credentials", 404));
        }

        res.status(200).json({
            success: true,
            token: user.getSignedToken()
        })

    } catch (error) {
        next(error)
    }
}

export const forgotPassword = async (req, res, next) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return next(new ErrorResponse("Email not found", 404));
        }

        const resetToken = user.getResetToken();
        await user.save();


        const resetUrl = `http://localhost:3500/passwordreset/${resetToken}`;
        const message = `
        <h1>You have requested new password RESET</h1>
        <p>Please send to this link to reset this password</p>
        <a href=${resetUrl} clicktracking-"off">${resetUrl}</a>
        `
        try {
            
        } catch (error) {
            
        }
    } catch (error) {
        return next(new ErrorResponse(error.message, 404));
    }
}

export const resetPassword = async (req, res, next) => {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.resettoken).digest("hex")

    try{
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire:{
                $gt:Date.now()
            }
        })
        if(!user){
            return next(new ErrorResponse("Invalid reset request",400));
        }

        user.password = req.body.password
        user.resetPasswordExpire = undefined
        user.resetPasswordtoken = undefined

        await user.save();

        res.status(200).json({
            success:true,
            message:"Password reset successfully"
        })

    }catch(error){
        return next(new ErrorResponse("Invalid reset request",400));
    }
}