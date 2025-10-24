import { Plus, Sparkles, X } from 'lucide-react'
import React, { useState } from 'react'

const SkillsForm = ({ data , onChange}) => {

    const [newSkill,setNewSkill]=useState("")

    const addSkill=()=>{
        if(newSkill.trim() && !data.includes(newSkill.trim())){
            onChange([...data,newSkill.trim()])
            setNewSkill("")
        }
    }

    const removeSkill=(index)=>{
        const updated=data.filter((_,i)=>i!==index) 
        onChange(data.filter((_,i)=>i!==index))

    }

    const handleKeyPress=(e)=>{
        if(e.key === "Enter"){
            e.preventDefault()
            addSkill()
        }
    }
  return (
    <div className='space-y-4'>
        <div>
            <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>Skills</h3>
            <p className='text-sm text-gray-500'>Add your technical and soft skills.</p>
        </div>

        <div className='flex gap-2'>
            <input onKeyDown={handleKeyPress} value={newSkill} onChange={(e)=>setNewSkill(e.target.value)} type='text' placeholder='Enter a skill' className='flex-1 px-3 py-2 text-sm' />
            <button onClick={addSkill} disabled={!newSkill.trim} className='flex items-center transition-colors disabled:cursor-not-allowed disabled:opacity-50  gap-2 px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg '>
                <Plus className='size-4' />
            </button>
        </div>

        {data.length > 0 ? (
            <div className='flex flex-wrap gap-2'>
                {data.map((skill,index)=>(
                    <span className='flex rounded-full text-sm items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-blue-800'>
                        {skill}
                        <button className='ml-1 hover:bg-blue-200 rounded-full p-0.5 transition-colors ' onClick={()=>removeSkill(index)}>
                            <X className='w-3 h-3' />
                        </button>
                    </span>
                ))}

            </div>
        ):(
            <div className='text-center py-6 text-gray-500'>
                <Sparkles className='w-10 h-10 mx-auto mb-2 text-gray-300' />
                <p className=''>No skills added yet.</p>
                <p className='text-sm'>Add technical and soft skills above.</p>
            </div>
        )}

      
      
    </div>
  )
}

export default SkillsForm
