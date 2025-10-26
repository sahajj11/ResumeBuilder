import mongoose from "mongoose"

const connectDb=async()=>{
    try{
        await mongoose.connect(process.env.MONG0DB_URI)
        console.log("db connected")
    }catch(err){
        console.log(err)
    }
}

export default connectDb