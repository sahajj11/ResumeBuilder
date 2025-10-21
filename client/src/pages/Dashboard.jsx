import React, { useEffect, useState } from 'react'
import  { FilePenLineIcon, PencilIcon, PlusIcon, TrashIcon, UploadCloud, UploadCloudIcon, XIcon } from "lucide-react"
import  { useNavigate } from "react-router-dom"

const Dashboard = () => {

  const [allResumes,setAllResumes]=useState([]) 
  const color=["#9333ea","#d97706"]
  const [showCreateResume,setShowCreateResume]=useState(false)
  const [showUploadResume,setShowUploadResume]=useState(false) 
  const [title,setTitle]=useState('')
  const [resume,setResume]=useState(null)
  const [editResumeId,setEditResumeId]=useState('')
  

  const navigate=useNavigate()
  
  const dummyData=[{
      title:"my_res",
      updateAt:7-8-98,
      _id:"jfbufhifhi"
  }]

  const createResume=async(event)=>{
    event.preventDefault()
    setShowCreateResume(false)
    navigate(`/app/builder/gfu`)

  }

  const uploadResume=async(event)=>{
    event.preventDefault()
    setShowUploadResume(false)
    navigate(`/app/builder/gfu`)

  }

  const editTitle=async(event)=>{
    event.preventDefault()
  }

  const deleteResume=async(resumeId)=>{
    const confirm=window.confirm("Are you sure you want to delete this resume?")

    if(confirm){
      setAllResumes(prev=>prev.filter(resume=> resume._id !== resumeId))
    }
  }

  const loadResumes=async()=>{
    setAllResumes(dummyData)
  }

  useEffect(()=>{
    loadResumes()
  },[])

  return (
    <div>
      <div className='max-w-7xl mx-auto px-4 py-8'>
        <p className='text-2xl text-transparent sm:hidden font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text'>Welcome , John Doe</p>
        
        <div className='flex gap-4'>
          <button onClick={()=>setShowCreateResume(true)} className='w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer'>
            <PlusIcon className='size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-indigo-300 to-indigo-500 text-white rounded-full' />
            <p className='text-sm group-hover:text-indigo-600 transition-all duration-300'>Create Resume</p>
          </button>

          <button onClick={()=>setShowUploadResume(true)} className='w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-purple-500 hover:shadow-lg transition-all duration-300 cursor-pointer'>
            <UploadCloudIcon className='size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-purple-300 to-purple-500 text-white rounded-full' />
            <p className='text-sm group-hover:text-indigo-600 transition-all duration-300'>Upload Existing</p>
          </button>

        </div>

        <hr className='border-slate-300 my-6 sm:w-[305px]' />

        <div className='grid grid-cols-2 sm:flex flex-wrap gap-4'>
          {allResumes.map((resume,index)=>{
            const baseColor=color[index % color.length]
            return (
              <button onClick={()=>navigate(`/app/builder/${resume._id}`)} key={index} className='relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer' style={{background:`linear-gradient(135deg,${baseColor}10,${baseColor}40)`,borderColor:baseColor+40}}>

                <FilePenLineIcon className='size-7 group-hover:scale-105 transition-all ' style={{color:baseColor}}/>
                <p className='text-sm group-hover:scale-105 transition-all px-2 text-center' style={{color:baseColor}}>{resume.title}</p>
                <p className='absolute bottom-1 text-[-11px] text-slate-400 group hover:text-slate-500 transition-all duration-300 px-2 text-center' style={{color:baseColor + '90'}}>Updated on {new Date(resume.updateAt).toLocaleDateString()}</p>
                <div onClick={e=>e.stopPropagation()} className='absolute top-1 right-1 group-hover:flex items-center hidden'>
                  <TrashIcon onClick={()=>deleteResume(resume._id)} className='size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors'/>
                  <PencilIcon  onClick={()=>{setEditResumeId(resume._id) ; setTitle(resume.title)}} className='size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors'/>
                </div>

              </button>
            )


})}


        </div>


       {showCreateResume && (
        <form onSubmit={createResume} onClick={()=>setShowCreateResume(false)} className='fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center'>
          <div onClick={e=>e.stopPropagation()} className='relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6'>
            <h2 className='text-xl font-bold mb-4'>Create Resume</h2>
            <input onChange={(e)=>setTitle(e.target.value)} value={title} className='w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600' type='text' placeholder='Enter Resume Title' required />

            <button className='w-full py-2  bg-green-600  text-white rounded transition-color'>Create Resume</button>

            <XIcon  className='absolute top-4 right-4 text-slate-400 cursor-pointer transition-colors' onClick={()=>{
              setShowCreateResume(false) ; setTitle('') ;
            }}/>
          </div>
        </form>
       )}




       {showUploadResume && (

        <form onSubmit={uploadResume} onClick={()=>setShowUploadResume(false)} className='fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center'>
          <div onClick={e=>e.stopPropagation()} className='relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6'>
            <h2 className='text-xl font-bold mb-4'>Upload Resume</h2>
            <input onChange={(e)=>setTitle(e.target.value)} value={title} className='w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600' type='text' placeholder='Enter Resume Title' required />

            <div>
              <label htmlFor='resume-input' className='block text-sm text-slate-700'>Select Resume File
                <div className='flex flex-col border-dashed rounded-md p-4 py-10 my-4 hover:border-green-400 cursor-pointer transition-colors items-center border-slate-400 justify-center gap-2 border group text-slate-400  '>
                  {resume ? (<p className='text-green-700'>{resume.name}</p>) : (
                    <>
                     <UploadCloud  className='size-14 stroke-1'/>
                     <p>Upload Resume</p>
                    </>
                  )}

                </div>
              </label>
              <input type='file' id='resume-input' accept='.pdf' hidden onChange={(e)=>setResume(e.target.files[0])} />
            </div>

            <button className='w-full py-2  bg-green-600  text-white rounded transition-color'>Upload Resume</button>

            <XIcon  className='absolute top-4 right-4 text-slate-400 cursor-pointer transition-colors' onClick={()=>{
              setShowUploadResume(false) ; setTitle('') ;
            }}/>
          </div>
        </form>

       )}


        {editResumeId && (
        <form onSubmit={editTitle} onClick={()=>setEditResumeId('')} className='fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center'>
          <div onClick={e=>e.stopPropagation()} className='relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6'>
            <h2 className='text-xl font-bold mb-4'>Edit Resume Title</h2>
            <input onChange={(e)=>setTitle(e.target.value)} value={title} className='w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600' type='text' placeholder='Enter Resume Title' required />

            <button className='w-full py-2  bg-green-600  text-white rounded transition-color'>Update</button>

            <XIcon  className='absolute top-4 right-4 text-slate-400 cursor-pointer transition-colors' onClick={()=>{
              setEditResumeId('') ; setTitle('') ;
            }}/>
          </div>
        </form>
       )}




      </div>
    </div>
  )
}

export default Dashboard