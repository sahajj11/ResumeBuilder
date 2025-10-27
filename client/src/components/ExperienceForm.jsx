import { Briefcase, Loader2, Plus, Sparkles, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import toast from 'react-hot-toast'

const ExperienceForm = ({data , onChange}) => {

    const {token}=useSelector(state=>state.auth)
    const [generatingIndex,setGeneratingIndex]=useState(-1)

    const generateDescription=async(index)=>{

        setGeneratingIndex(index)
        const experience=data[index]
        const prompt=`enhance this job description ${experience.description} for the  position of ${experience.position} at ${experience.company}`


        try{
            
            const {data}=await await api.post('/api/ai/enhance-job-des',{userContent:prompt},{headers:{Authorization:token}})
            updateExperience(index,"description",data.enhancedContent)
        }catch(error){
            toast.error(error.message)
        }
        finally{
            setGeneratingIndex(-1)
        }
    }

    const addExperience = ()=>{
        const newExperience={
            company:"",
            position:"",
            start_date:"",
            end_date:"",
            description:"",
            is_current:false
        };

        onChange([...data,newExperience])
    }

    const removeExperience=(index)=>{
        const updated=data.filter((_,i)=>i!==index)
        onChange(updated)

    }

    const updateExperience=(index , field , value)=>{
        const updated=[...data]
        updated[index]={...updated[index],[field]:value}
        onChange(updated)

    }




  return (
    <div className='space-y-6'>
      
         <div className='flex items-center justify-between'>
            <div>
                <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>Professional Experience</h3>
                <p className='text-sm text-gray-500'>Add your job experience</p>
            </div>
            <button onClick={addExperience} className='flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors '>
                <Plus className='size-4' />
                Add Experience
            </button>

        </div>

      {data.length === 0 ?(
        <div className='text-center py-8 text-gray-500'>
            <Briefcase className='w-12 h-12 mx-auto mb-3'/>
            <p>No experience added yet.</p>
            <p className='text-sm'>Click "Add Experience" to get started.</p>
        </div>
      ):(
        <div className='space-y-4'>
            {data.map((experience , index)=>(
                <div key={index} className='p-4 border border-gray-200 rounded-lg space-y-3'>
                    <div className='flex justify-between items-start'>
                        <h4>Experience #{index + 1}</h4>
                        <button onClick={()=>removeExperience(index)} className='text-red-500 hover:text-red-700 transition-colors'>
                            <Trash2 className='size-4 ' />
                        </button> 

                    </div>

                    <div className='grid md:grid-cols-2 gap-3'>
                        <input type='text' placeholder='Company Name' className='px-3 py-2 text-sm rounded-lg' value={experience.company || ""} onChange={(e)=>updateExperience(index,"company",e.target.value)} /> 
                        <input type='text' placeholder='Job Title' className='px-3 py-2 text-sm rounded-lg' value={experience.position || ""} onChange={(e)=>updateExperience(index,"position",e.target.value)} /> 
                        <input type='month'  className='px-3 py-2 text-sm rounded-lg' value={experience.start_date || ""} onChange={(e)=>updateExperience(index,"start_date",e.target.value)} />
                        <input type='month'  disabled={experience.is_current} className='px-3 py-2 text-sm rounded-lg disabled:bg-gray-100' value={experience.end_date || ""} onChange={(e)=>updateExperience(index,"end_date",e.target.value)} /> 
                        
                    </div>

                    <label className='flex items-center gap-2'>
                        <input className='rounded border-gray-300 text-blue-600 focus:ring-blue-500' onChange={(e)=>updateExperience(index , "is_current" , e.target.checked ? true : false)} type='checkbox' checked={experience.is_current || false} />
                        <span className='text-sm text-gray-700'>Currently working here</span>
                    </label>

                    <div className='space-y-2'>
                        <div className='flex items-center justify-between'>
                            <label className='text-sm font-medium text-gray-700'>Job Description</label>
                            <button disabled={generatingIndex === index || !experience.position || !experience.company} onClick={()=>generateDescription(index)} className='flex items-center gap-1 px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded transition-colors disabled:opacity-50'>
                                {generatingIndex === index ? (<Loader2 className='size-4 animate-spin' />) : (<Sparkles className='size-4' />)} 
                                Enhance with AI
                            </button>
                        </div>

                        <textarea rows={4} placeholder='Describe your key responsibilities and acheivements..' className='w-full text-sm px-3 py-2 rounded-lg resize-none' value={experience.description || ""} onChange={(e)=>updateExperience(index,"description",e.target.value)} />

                    </div>

                </div>
            ))}

        </div>
      )}
    </div>
  )
}

export default ExperienceForm