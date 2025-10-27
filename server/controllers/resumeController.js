import imageKit from "../configs/imageKit.js"
import Resume from "../models/Resume.js"
import fs from "fs"

//controller for creating a new resume
export const createResume=async(req,res)=>{
    try{
        const userId=req.userId
        const {title}=req.body

        const newResume=await Resume.create({userId,title})
        return res.status(201).json({message:'resume created succesfully',newResume} )

    }catch(err){
        return res.status(400).json({message:err.message})
    }
}

//controller for deleting resume
export const deleteResume=async(req,res)=>{
    try{
        const userId=req.userId
        const {resumeId}=req.params

       const newResume=await Resume.findOneAndDelete({userId,_id:resumeId})
        return res.status(200).json({message:'resume deleted succesfully'} ,newResume)

    }catch(err){
        return res.status(400).json({message:err.message})
    }
} 


//get user resume by id
export const getResumeById=async(req,res)=>{
    try{
        const userId=req.userId
        const {resumeId}=req.params

        const resume=await Resume.findOne({userId,_id:resumeId})

        resume.__v=undefined
        resume.createdAt=undefined
        resume.updatedAt=undefined
        return res.status(200).json({resume})

    }catch(err){
        return res.status(400).json({message:err.message})
    }
}

//get resume by id public
export const getPublicResumeById=async(req,res)=>{
    try{
        
        const {resumeId}=req.params

        const resume=await Resume.findOne({public : true, _id:resumeId})

      
        return res.status(200).json({resume})

    }catch(err){
        return res.status(400).json({message:err.message})
    }
}

//controller for updating a resume
export const updateResume=async(req,res)=>{
    try{
        const userId=req.userId
        const {resumeId,resumeData}=req.body
        const image=req.file

        let resumeDataCopy;
        if(typeof resumeData==='string'){
            resumeDataCopy=await JSON.parse(resumeData)
        }else{
            resumeDataCopy=structuredClone(resumeData)
        }

        if(image){
            const imageBuffer=fs.createReadStream(image.path)
            const response = await imageKit.files.upload({
            file: imageBuffer,
            fileName: 'resume.png',
            folder:'user-resumes',
            transformation:{
                pre:'w-300,h-300,fo-face,z-0.75' 
            }


          });

          resumeData.personal_info.image=response.url
        }
        const resume=await Resume.findByIdAndUpdate({userId,_id:resumeId},resumeDataCopy,{new:true})

      
        return res.status(200).json({message:"saved succesfully",resume})

    }catch(err){
        return res.status(400).json({message:err.message})
    }
}