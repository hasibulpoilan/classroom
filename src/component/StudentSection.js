import React, { useEffect, useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import CommonApi from '../commonApi';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
 
function StudentSection({onClose,fetchAllStudenDetail,studentId}) {
   
    let user=useSelector(state=>state.users.user);
      let [data, setData] = useState({
        Class: '',
        roll: '',
        phone: '',
        
      }); 

if(studentId==undefined){
  studentId=user?._id;
}
 
let name,value;
let handelchangeInput=(e)=>{
name=e.target.name;
value=e.target.value;
setData({...data,[name]:value});
}

let fetchStudentDetail=async()=>{
    try{
        let res=await fetch(CommonApi.SingleStudents.url+'/'+`${studentId}`,{
         method:CommonApi.SingleStudents.method,
         credentials:'include'
 
       })
  let result=await res.json();
  if(result.success){
  setData(result.data.student || [])
  }
 
     }
     catch(e){
  
 console.log('data not get not authorize')
     }
   }
 useEffect(()=>{
    fetchStudentDetail();
   },[])

// teacter detail add and update
     let StudentDetailUpdate=async(e)=>{
        try{
              e.preventDefault();
            let res=await fetch(CommonApi.SingleStudentsEdit.url+'/'+`${studentId}`,{
             method:CommonApi.SingleStudentsEdit.method,
             credentials:'include',
             headers:{
                'Content-Type':'application/json'
             },  body:
                JSON.stringify(data)

     
           })
      let result=await res.json();
      if(result.success){
        toast.success('student detail add successfully');
        if(fetchAllStudenDetail){
          fetchAllStudenDetail();
          }
          fetchStudentDetail();
        // console.log(result.data)
        // onClose();
       }
     
         }
         catch(e){
      
            toast.error('student  detail not add successfully')
        }
       }
    
     
// console.log(data);

// deltete student detail
let StudentDetailDelete=async(id)=>{
  try{
    let res=await fetch(CommonApi.DeleteStudent.url+'/'+`${id}`,{
    method:CommonApi.DeleteStudent.method,
    credentials:'include'

  })
let result=await res.json();
if(result.success){
toast.success('delete successfull')}
fetchAllStudenDetail();
onClose();
}
catch(e){

  toast.success('delete not successfull')}
}




  return (
    <div className=' absolute w-[100vw]  top-[11.2rem]  left-0 h-[100vh] bg-slate-200  bg-opacity-40  flex justify-center items-center z-50'>
    <div className='bg-white rounded absolute top-[11vw] left-[15vw] md:left-[30vw] p-4  w-[70%] h-[30%] md:h-[40%] md:w-[40%] z-10 overflow-y-auto' style={{backgroundColor:'white !important'}}>
       <div className='flex items-center justify-between px-2'>
       <div className='w-[100%]'>
       <h1 className='text-lg font-semibold text-[2.2vw] text-blue-600 self-center text-center mt-4'>Add Student Detail</h1> 
       </div>
 <div className='text-2xl' onClick={onClose}><RxCross2/></div>

       </div>

       <form action="" className='mx-[10%]'>
        <div className='flex flex-col items-start '> 
           <label htmlFor='name' className='text-2xl my-1'>Name:</label>
           <input type="text" id="name" readOnly placeholder='enter brendname Name'   name='name'   className='py-1.5 rounded-lg border-[3px] w-[100%] border-black' value={user?.name}    />
             
            </div> 
            <div className='flex flex-col items-start  '> 
           <label htmlFor='Class' className='text-2xl my-1'>Class:</label>
           <input type="text" id="Class" placeholder='enter brendname Name' name='Class' className='py-1.5 rounded-lg border-[3px] w-[100%] border-black' value={data.Class} onChange={handelchangeInput}/>
           </div>
           
            <div className='flex flex-col items-start '> 
           <label htmlFor='Roll' className='text-2xl my-1'>Roll:</label>
           <input type="text" id="Roll" placeholder='enter brendname Name' name='roll' className='py-1.5 rounded-lg border-[3px] w-[100%] border-black' value={data.roll} onChange={handelchangeInput}/>
             
            </div>

 

           <div className='flex flex-col items-start '> 
           <label htmlFor='phone' className='text-2xl my-1'>Student Phone:</label>
           <input type="text" id="phone" placeholder='enter product Name' className='py-1.5 rounded-lg border-[3px] w-[100%] border-black' name='phone' value={data.phone} onChange={handelchangeInput}/>
            </div>

           <button type='submit' className='px-4 w-[100%] py-1.5 bg-blue-500 text-white self-center rounded-full my-3 text-center'  onClick={StudentDetailUpdate}>Add Student Data</button> 
       </form>
       {user?.role == 'Principal' || user?.role == 'Teacher' ? (
  <div className='w-[90%] flex items-center justify-end self-end '>
    <button type='submit' className='px-4  py-1.5 bg-red-500 text-white self-center rounded-full my-3 text-center' onClick={()=>StudentDetailDelete(studentId)}>
      remove Student Data
    </button> 
  </div>
) : null}

</div>
 
</div>
  )
}

export default StudentSection
 