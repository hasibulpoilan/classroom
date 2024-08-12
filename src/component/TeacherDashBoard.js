import React from 'react'
import { RxCross2 } from "react-icons/rx";
import { Link } from 'react-router-dom';
import { CiLogout } from "react-icons/ci";

function TeacherDashBoard({user,onClose,handelLogout}) {
    
  return (
    <div className=' '> 
    <div className='h-[95vh] absolute w-[280px]    mt-[51px]   left-0 bg-[#edfcf5]' > 
     <div className='flex items-center justify-between'>
       <a className=' text-[2.8rem] md:text-[2vw] text-red-500  ml-[1rem] font-bold'>Teacher</a>
           <div className='flex justify-end mr-[..5rem]   ' onClick={onClose}><RxCross2 className='text-5xl'/></div>
 </div> 
     <div className=' w-[100%]'>
 
       {user?
      <div   className='flex justify-center flex-col mb-2'>
       <a className='font-semibold  text-center text-[2.8rem] md:text-[2.3vw] text-blue-400'>{user.name}</a>
       <a className='font-semibold text-center text-[2.8rem] md:text-[2vw]'>{user.role}</a>
       </div>
       :      <a className='font-semibold text-[3vw]  md:text-[2.3vw]'>User</a>
 }
 
  <div className='flex justify-start items-start flex-col pl-3'>
  <Link to='/all-student' className=' text-[2.3rem] md:text-[1.7vw] text-blue-500 py-2 pl-1'>All Sutdent </Link>
  <Link to='/show-Principle-allocateTime' className='text-[2.3rem] md:text-[1.7vw] text-blue-500 py-2 pl-1'> Assign class</Link>

 <Link to='/create' className='text-[2.3rem] md:text-[1.7vw] text-blue-500 py-2 pl-1'> Create Time-Table</Link>
 
  <div className='flex items-center py-2 justify-center fixed bottom-3 left-1'>
 <div>
   <CiLogout className='text-5xl font-semibold ml-2'/></div> 
 <Link  className='text-[2.3rem] md:text-[1.7vw] text-red-500  pl-2 ' onClick={handelLogout}>Logout</Link>
 </div>
 
 </div> 
 
     </div>
     </div>
     </div>
  )
}

export default TeacherDashBoard
