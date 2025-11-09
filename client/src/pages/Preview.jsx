import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { dummyData } from '../assets/data'
import { ArrowLeftIcon, Loader } from 'lucide-react'
import ResumePreview from '../components/ResumePreview'
import api from '../configs/api'

const Preview = () => {

  const {resumeId}=useParams()
  const [isLoading,setIsLoading]=useState(true)

  const [resumeData,setResumeData]=useState(null)

  const loadResume=async()=>{
    try{
      const {data}=await api.get('/api/resumes/public/' + resumeId)
      setResumeData(data.resume)
    }catch(err){
      console.log(err)
    }finally{
      setIsLoading(false)
    }
  }

  useEffect(()=>{
    loadResume()
  },[])

  return resumeData ? (
    <div className='bg-slate-400'>
      <div className='max-w-3xl mx-auto py-10'>
        <ResumePreview data={resumeData} template={resumeData.template} accentColor={resumeData.accentColor} classes='py-4 bg-white' />
      </div>
    </div>
  ) : (
    <div>
      {isLoading ? <Loader /> : (
        <div className='flex flex-col items-center justify-center h-screen'>
          <p className='text-center text-6xl text-slate-400 font-medium '>Resume not found</p>
          <a href='/' className='mt-6 bg-green-600 text-white rounded-full px-6 h-9 flex items-center cursor-pointer'>
            <ArrowLeftIcon className='mr-2 size-4' />
            go to home page
          </a>
        </div>
      )}
    </div>
  )
}

export default Preview

// vadodara
// Software Engineer
// https://www.linkedin.com/in/sahaj-rajput
// https://sahaj-rajput.vercel.app/
// Software Engineer skilled in full-stack development, building scalable web applications, and delivering clean, efficient solutions. Passionate about problem-solving and continuously learning new technologies.
// Developed and maintained full-stack web applications using modern JavaScript frameworks, improving performance and user experience. Collaborated with cross-functional teams to deliver scalable, production-ready features.
//Built a dynamic resume builder that allows users to create, edit, and download professional resumes using customizable templates. Implemented intuitive UI and efficient data handling for a smooth user experience.
//Sahaj_Resume