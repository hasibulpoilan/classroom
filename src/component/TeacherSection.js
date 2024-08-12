import React, { useEffect, useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import CommonApi from '../commonApi';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
 
function TeacherSection({onClose,teacherId,fetchAllTeachert}) {
  console.log(teacherId)
    let user=useSelector(state=>state.users.user);
      let [data, setData] = useState({
        quilification: '',
        mobileNo: 0,
        experience: '',
        
      }); 

      if(teacherId===undefined){
        teacherId=user?._id;
      }
       
let name,value;
let handelchangeInput=(e)=>{
name=e.target.name;
value=e.target.value;
setData({...data,[name]:value});
}

 

let fetchTeacherDetail=async()=>{
    try{
         let res=await fetch(CommonApi.SingleTeacherEdit.url+'/'+`${teacherId}`,{
         method:CommonApi.SingleTeacherEdit.method,
         credentials:'include'
 
       })
  let result=await res.json();
  if(result.success){
  setData(result.data.teacher || [])
  }
 
     }
     catch(e){
  
 console.log('data not get not authorize')
     }
   }
 useEffect(()=>{
    fetchTeacherDetail();
   },[])

// teacter detail add and update
     let TeacherDetailUpdate=async(e)=>{
        try{
             e.preventDefault();
            console.log(CommonApi.SingleTeacher.url+'/'+`${teacherId}`)
            let res=await fetch(CommonApi.SingleTeacher.url+'/'+`${teacherId}`,{
             method:CommonApi.SingleTeacher.method,
             credentials:'include',
             headers:{
                'Content-Type':'application/json'
             },  body:
                JSON.stringify(data)

     
           })
      let result=await res.json();
       if(result.success){
       toast.success('teacher detail add successfully');
       fetchTeacherDetail();
 if(fetchAllTeachert){
  fetchAllTeachert();
}
        }
     
         }
         catch(e){
      
            toast.error('teacher  detail not add successfully')
        }
       }
    
     
// console.log(data);


// deltete teacher detail
let TeacherDetailDelete=async(id)=>{
  try{
    let res=await fetch(CommonApi.DeleteStudent.url+'/'+`${id}`,{
    method:CommonApi.DeleteStudent.method,
    credentials:'include'

  })
let result=await res.json();
if(result.success){
toast.success('delete successfull')}
fetchAllTeachert();
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
       <h1 className='text-lg font-semibold text-[2.2vw] text-blue-600 self-center text-center mt-4'>Add Teacher Detail</h1> 
       </div>
 <div className='text-2xl' onClick={onClose}><RxCross2/></div>

       </div>

       <form action="" className='mx-[10%]'>
        <div className='flex flex-col items-start '> 
           <label htmlFor='name' className='text-2xl my-1'>Name:</label>
           <input type="text" id="name" readOnly placeholder='enter brendname Name'   name='name'   className='py-1.5 rounded-lg border-[3px] w-[100%] border-black' value={user?.name}    />
             
            </div> 
            <div className='flex flex-col items-start  '> 
           <label htmlFor='quilification' className='text-2xl my-1'>Quilification:</label>
           <input type="text" id="quilification" placeholder='enter brendname Name' name='quilification' className='py-1.5 rounded-lg border-[3px] w-[100%] border-black' value={data.quilification} onChange={handelchangeInput}/>
           </div>
           
            <div className='flex flex-col items-start '> 
           <label htmlFor='experience' className='text-2xl my-1'>Experience:</label>
           <input type="text" id="experience" placeholder='enter brendname Name' name='experience' className='py-1.5 rounded-lg border-[3px] w-[100%] border-black' value={data.experience} onChange={handelchangeInput}/>
             
            </div>

 

           <div className='flex flex-col items-start '> 
           <label htmlFor='mobileNo' className='text-2xl my-1'>Teacher Phone:</label>
           <input type="text" id="mobileNo" placeholder='enter product Name' className='py-1.5 rounded-lg border-[3px] w-[100%] border-black' name='mobileNo' value={data.mobileNo} onChange={handelchangeInput}/>
            </div>

              
           <button type='submit' className='px-4 w-[100%] py-1.5 bg-blue-500 text-white self-center rounded-full my-3 text-center'  onClick={TeacherDetailUpdate}>Add Teacher Data</button> 
       </form>
       {user?.role == 'Principal'? (
  <div className='w-[90%] flex items-center justify-end self-end '>
    <button type='submit' className='px-4  py-1.5 bg-red-500 text-white self-center rounded-full my-3 text-center' onClick={()=>TeacherDetailDelete(teacherId)}>
      remove Teacher Data
    </button> 
  </div>
) : null}

</div>
 
</div>
  )
}

export default TeacherSection
 