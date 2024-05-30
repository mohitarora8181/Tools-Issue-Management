import ErrorResponse from "../utils/errorResponse.js"

export const errorHandles = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    if (err.code === 11000) {
        const message = "Duplicate Feild Value Entered"
        error = new ErrorResponse(message, 400);
    }

    if (err.name === "ValidationError") {
        const message = Object.values(err.errors).map((val) => val.message);
        error = new ErrorResponse(message, 400);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || "Internal Server Error"
    })
}