import User from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import Resume from "../models/Resume.js"

const generateToken=(userId)=>{
    const token=jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:'7d'})
    return token
}

//controller for user registration
export const registerUser=async(req,res)=>{
    try{
        const {name,email,password}=req.body

        if(!name || !email || !password){
            res.status(400).json({message:"Missing required fields"})
        }

        const user=await User.findOne({email})
        if(user){
            res.status(400).json({message:"User already exists"})
        }

        const hashedPassword=await bcrypt.hash(password,10)

        const newUser=await User.create({name , email ,password:hashedPassword})

        const token=generateToken(newUser._id)
        newUser.password=undefined

        return res.status(201).json({message:'User created succesfully'},token,newUser)

    }catch(err){
        return res.status(400).json({message:err.message})
    }
}

//controller for user login
export const loginUser=async(req,res)=>{
    try{
        const {email,password}=req.body

       

        const user=await User.findOne({email})
        if(!user){
            res.status(400).json({message:"Invalid email or password"})
        }

        if(!user.comparePassword(password)){
            res.status(400).json({message:"Invalid email or password"})
        }

        const token=generateToken(user._id)
        user.password=undefined

        return res.status(200).json({message:'Login succesfully',token,user})

    }catch(err){
        return res.status(400).json({message:err.message})
    }
}


//controller to get user by id
export const getUserById=async(req,res)=>{
    try{
        const userId=req.userId

        const user=await User.findById(userId)
        if(!user){
            return res.status(404).json({message:"User not found"})
        }

        user.password=undefined
        return res.status(200).json({user})

    }catch(err){
        return res.status(400).json({message:err.message})
    }
}


//controller for getting user resume
export const getUserResume=async(req,res)=>{
    try{
        const userId=req.userId

        const resumes=await Resume.find({userId})
        return res.status(200).json({resumes})


    }catch(err){
        return res.status(400).json({message:err.message})
    }
}