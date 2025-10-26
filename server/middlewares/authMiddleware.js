import jwt from "jsonwebtoken"

const protect=async(req,resizeBy,next)=>{
    const token=req.headers.authorization

    if(!token){
        return res.status(401).json({message:"Unauthorized"})
    }

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        req.userId=decoded.userId
        next()

    }catch(err){
        return res.status(401).json({message:"Unauthorized"})

    }
}

export default protect