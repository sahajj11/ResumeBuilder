import ai from "../configs/ai.js";
import Resume from "../models/Resume.js";

//controller for enhancing professional summary
export const enhanceProfessionalSummary = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({ message: "missing field" });
    }

    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are an expert in resume writing.Your task is to enhance the professional summary of a resume.The summary should be 1-2 sentences also highlighting key skills,careers and objectives.Make it ATS friendly and only return text.",
        },
        {
          role: "user",
          content: userContent,
        },
      ],
    });

    const enhancedContent = response.choices[0].message.content;
    return res.status(200).json({ enhancedContent });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

//contoller for enhancing job description
export const enhanceJobDescription = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({ message: "missing field" });
    }

    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are an expert in resume writing.Your task is to enhance the job description of a resume.The job description should be 1-2 sentences also highlighting key responsibilities and acheivements.Use actiuon words and quantifiaable results where possible.Make it ats friendly and return only text",
        },
        {
          role: "user",
          content: userContent,
        },
      ],
    });

    const enhancedContent = response.choices[0].message.content;
    return res.status(200).json({ enhancedContent });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};


//controller for uploading resume to database
export const uploadResume = async (req, res) => {
  console.log("BODY:", req.body);
console.log("USER ID:", req.userId);

  try {
    const { resumeText,title } = req.body;
    const userId=req.userId

    if (!resumeText) {
      return res.status(400).json({ message: "missing field" });
    }

    const systemPrompt="You are an expert AI agent to extract data from resume"

    const userPrompt=`extract data from this resume:${resumeText}
    
    Provide data in the folowing json format with no additional text before or after :

    {
    professional_summary:{type:String,default:""},
    skills:[{type:String}],
    personal_info:{
        image:{type:String,default:''},
        full_name:{type:String,default:''},
        profession:{type:String,default:''},
        email:{type:String,default:''},
        phone:{type:String,default:''},
        location:{type:String,default:''},
        linkedin:{type:String,default:''},
        website:{type:String,default:''}
    },
    experience:[
        {
            company:{type:String},
            position:{type:String},
            start_date:{type:String},
            end_date:{type:String},
            is_current:{type:Boolean},
            description:{type:String},

        }
    ],
    project:[
        {
            name:{type:String},
            type:{type:String},
            description:{type:String},

        }
    ],
    education:[
        {
            institution:{type:String},
            degree:{type:String},
            field:{type:String},
            graduation_date:{type:String},
            gpa:{type:String},

        }
    ],
    }
    
    `

    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content:
            systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      response_format:{type:'json-object'}
    });

    const extractedData = response.choices[0].message.content;
    const parsedData=JSON.parse(extractedData)
    const newResume=await Resume.create({userId,title,...parsedData})
    res.json({resumeId:newResume._id})

  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};