import React, { useEffect, useState } from 'react'
import AddClassDetail from '../component/AddClassDetail';
import CommonApi from '../commonApi';
import { FaPen } from "react-icons/fa";
import EditClassDetail from '../component/EditClassDetail';

function CreateClass() {
    let [showAddRotin,setAddRotin]=useState(false);
let [data,setData]=useState();
let [editclassId,setEditclassId]=useState('');
let [showeditclass,setshoweditclass]=useState(false);


    // show all class routins
let fetchClassDetail=async()=>{
    try{
        let res=await fetch(CommonApi.allClass.url,{
         method:CommonApi.allClass.method,
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

// edit class details
let handelEditclass=(id,e)=>{
     setEditclassId(id);
     setshoweditclass(true);
}



  return (
    <div className='mt-[120px]   ml-[2vw] mr-[2vw]'>
      <div className='flex items-center justify-between mx-4 py-4 shadow-lg bg-slate-200 px-4'>
<a className='text-[2rem] font-semibold text-red-500 '>Create Class Routin</a>
      <button className='font-semibold py-[.7rem] px-[2.8rem] bg-blue-500 text-white rounded-lg' onClick={()=>setAddRotin(true)}>Add Class</button>
      </div>
{showAddRotin?<AddClassDetail onClose={()=>setAddRotin(false)} fetchClassDetail={fetchClassDetail}/> :null}
      <div className='flex items-center justify-center mx-4 mt-[2rem] flex-wrap '>
{data?.map((val,i)=>{
    return (
        <div key={i} className='flex p-[2rem] w-[200px] h-[200px] flex-col items-start shadow-xl bg-slate-200 m-[3rem] rounded-lg'>
<a className='text-[1.5rem] font-semibold py-2 '>Teacher Name:{val.teacherName}</a>
<a className='text-[1.5rem] font-semibold py-1 '>Phone No: {val.mobileNo}</a>
<a className='text-[1.5rem] font-semibold '>Start Time:{val.start}</a>
<a className='text-[1.5rem] font-semibold py-1'>End Time:{val.end}</a>
<a className='text-[1.5rem] font-semibold pb-2'>Day:{val.day}</a>
<button className='ml-[150px] flex  w-[20px] h-[20px] rounded-full items-center justify-center' onClick={()=>handelEditclass(val._id)}><FaPen className='text-1xl'/></button>
        
            </div>
    )
})}
      </div>

{showeditclass?<EditClassDetail editclassId={editclassId }  onClose={()=>setshoweditclass(false)}/> :null}

    </div>
  )
}

export default CreateClass
