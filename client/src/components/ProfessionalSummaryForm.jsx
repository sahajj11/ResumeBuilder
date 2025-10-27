import { Loader2, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import toast from 'react-hot-toast'

const ProfessionalSummaryForm = ({data , onChange , setResumeData}) => {

    const {token}=useSelector(state=>state.auth)
    const [isGenerating,setIsGenerating]=useState(false)

    const generateSumary=async()=>{
        try{
            setIsGenerating(true)
            const prompt=`enhance my professional summary "${data}`;
            const response=await await api.post('/api/ai/enhance-pro-sum',{userContent:prompt},{headers:{Authorization:token}})
            setResumeData(prev=>({...prev,professional_summary:response.data.enhancedContent}))
        }catch(error){
            toast.error(error.message)
        }
        finally{
            setIsGenerating(false)
        }
    }
  return (
    <div className='space-y-4'>
        <div className='flex items-center justify-between'>
            <div>
                <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>Professional Summary</h3>
                <p className='text-sm text-gray-500'>Add summary for your resume here</p>
            </div>
            <button disabled={isGenerating} onClick={generateSumary} className='flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50'>
                {isGenerating ? (<Loader2 className='size-4 animate-spin' />) : (<Sparkles className='size-4' />)}
                
                {isGenerating ? "Enhancing..." : "AI Enhance"}
            </button>

        </div>

        <div className='mt-6'>
            <textarea placeholder='Write a compelling summary that highlights your key strength and career objectives ....' value={data || ""} onChange={(e)=>onChange(e.target.value)} rows={7}  className='w-full p-3 px-4 mt-2 border text-sm  border-gray-300 rounded-lg focus:ring outline-none transition-colors resize-none  focus:ring-blue-500 focus:border-blue-500  ' />
        </div>
      
    </div>
  )
}

export default ProfessionalSummaryForm