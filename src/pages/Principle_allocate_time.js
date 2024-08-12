import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import CommonApi from '../commonApi';

function Principle_allocate_time() {
    let [data,setData]=useState([]);
 
    // show principle assign  class routins
let fetchClassDetail=async()=>{
    try{
        console.log('anm')
        let res=await fetch(CommonApi.allClassAssignPrinciple.url,{
         method:CommonApi.allClassAssignPrinciple.method,
         credentials:'include'
 
       })
  let result=await res.json();
  if(result.success){
  setData(result.data || [])
  }
 
     }
     catch(e){
  
 console.log('data not get not authorize')
     }
   }
 useEffect(()=>{
    fetchClassDetail();
   },[])


  return (
    <div className="overflow-x-auto mt-[120px] shadow-lg rounded-lg mx-10 w-[100vw] min-h-[95vh]">
       <div className='flex items-center justify-center mx-4 mt-[2rem] flex-wrap '>
{data?.map((val,i)=>{
    return (
        <div key={i} className='flex p-[2rem] w-[200px] h-[200px] flex-col items-start shadow-xl bg-slate-200 m-[3rem] rounded-lg'>
<a className='text-[1.5rem] font-semibold py-2 '>Teacher Name:{val.teacherName}</a>
<a className='text-[1.5rem] font-semibold py-1 '>Phone No: {val.mobileNo}</a>
<a className='text-[1.5rem] font-semibold '>Start Time:{val.start}</a>
<a className='text-[1.5rem] font-semibold py-1'>End Time:{val.end}</a>
<a className='text-[1.5rem] font-semibold pb-2'>Day:{val.day}</a>
         
            </div>
    )
})}
      </div> 
    </div>
  )
}

export default Principle_allocate_time
