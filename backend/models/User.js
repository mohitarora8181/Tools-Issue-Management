import mongoose from "mongoose"
import bycrypt from "bcrypt"
import jwt from "jsonwebtoken"
import crypto from "crypto"

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        // required: [true,"Please provide a username"]
    },
    email: {
        type: String,
        required: [true, "Please provide a user email"],
        unique: true,
        match: [
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide valid email"
        ]
    },
    password: {
        type: String,
        requires: [true, "Please provide password"],
        minlength: 6,
        select: false
    },
    resetPasswordtoken: String,
    resetPasswordExpire: Date
})


UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    const salt = await bycrypt.genSalt(10);
    this.password = await bycrypt.hash(this.password, salt);
    next();
})

UserSchema.methods.matchPassword = async function (password) {
    return await bycrypt.compare(password, this.password);
}

UserSchema.methods.getSignedToken = function () {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE })
}

UserSchema.methods.getResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.resetPasswordtoken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now() + 10 * (60 * 1000)
    return resetToken
}

export const User = mongoose.model("users", UserSchema);