export const protectRoute = (req,res,next)=>{
    res.status(200).json({
        success:true,
        data:"You got access to private data in this route"
    })
}