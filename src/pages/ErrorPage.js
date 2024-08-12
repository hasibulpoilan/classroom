import React from 'react'
import { useNavigate } from 'react-router-dom'

function ErrorPage() {
      let navigate=useNavigate();
return (
    <div className='flex items-center justify-center min-h-[100vh]'>
      
      <div className='flex items-center justify-center flex-col'>
        <h1 className='text-red-500 font-semibold text-[2.2rem]'>Error Page Page Not found</h1>
   <button className='px-[2rem] py-[1rem] rounded-lg mt-4 bg-blue-600 text-white font-medium' onClick={()=>navigate('/')}>Return Home</button>
   </div>
    </div>
  )
}

export default ErrorPage
