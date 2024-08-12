import React, { useEffect, useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import CommonApi from '../commonApi';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function EditClassDetail({onClose,editclassId}) {
  let [data, setData] = useState({
    teacherName: '',
    mobileNo: '',
    start: '',
    end: '',
    day: '',
    
  });

  let name,value;
let handelchangeInput=(e)=>{
name=e.target.name;
value=e.target.value;
setData({...data,[name]:value});
}

 let fetchClassDetail=async()=>{
        try{
             let res=await fetch(CommonApi.ClassDetail.url+'/'+`${editclassId}`,{
             method:CommonApi.ClassDetail.method,
             credentials:'include'
     
           })
      let result=await res.json();
      if(result.success){
      setData(result.data || []);
      console.log(data,'from edit')
      }
     
         }
         catch(e){
      
     console.log('data not get not authorize')
         }
       }
     useEffect(()=>{
      fetchClassDetail();
       },[])

      //  update and add detail
     let EditClassDetail=async(e)=>{
        try{
          
          console.log(editclassId)
          e.preventDefault();
            let res=await fetch(CommonApi.classDetilsEdit.url+'/'+`${editclassId}`,{
             method:CommonApi.classDetilsEdit.method,
             credentials:'include',
             headers:{
                'Content-Type':'application/json'
             },  body:
                JSON.stringify(data)

     
           })
      let result=await res.json();
       if(result.success){
         fetchClassDetail();
 toast.success('class detail add successfully');
         // console.log(result.data)
        // onClose();
       }
     
         }
         catch(e){
      
            toast.error('class  detail not add successfully')
        }
       }
    
// delete class detail from rotin
let DeleteClassDetail=async(id)=>{
  try{
     let res=await fetch(CommonApi.DeleteClasss.url+'/'+`${id}`,{
    method:CommonApi.DeleteClasss.method,
    credentials:'include'

  })
let result=await res.json();
 
if(result.success){
toast.success('delete successfull')}
fetchClassDetail();
onClose();
}
catch(e){

  toast.error('delete not successfull')}
}


       
 
  return (
    <div className=' absolute w-[100vw]  top-[11.2rem]  left-0 h-[100vh] bg-slate-200  bg-opacity-40  flex justify-center items-center '>
    <div className='bg-white rounded absolute top-[11vw] left-[15vw] md:left-[30vw] p-4  w-[70%] h-[30%] md:h-[37%] md:w-[40%] z-10 overflow-y-auto' style={{backgroundColor:'white !important'}}>
       <div className='flex items-center justify-between px-2'>
       <div className='w-[100%]'>
       <h1 className='text-lg font-semibold text-[2.2vw] text-blue-600 self-center text-center'>Add Student Detail</h1> 
       </div>
 <div className='text-2xl' onClick={onClose}><RxCross2/></div>

       </div>
       <form action="" className='mx-[10%]'>
       <div className='flex flex-col items-start '> 
           <label htmlFor='teacherName' className='text-2xl my-1'>Teacher Name:</label>
           <input type="text" id="teacherName"   placeholder='enter brendname Name'   name='teacherName'   className='py-1.5 rounded-lg border-[3px] w-[100%] border-black' value={data.teacherName}  onChange={handelchangeInput}  />
             
            </div>
            <div className='flex flex-col items-start '> 
           <label htmlFor='mobileNo' className='text-2xl my-1'>Teacher MobileNo:</label>
           <input type="text" id="mobileNo"   placeholder='enter brendname Name'   name='mobileNo'   className='py-1.5 rounded-lg border-[3px] w-[100%] border-black' value={data.mobileNo}  onChange={handelchangeInput}  />
             
            </div> 
            <div className='flex flex-col items-start  '> 
           <label htmlFor='start' className='text-2xl my-1'>Start Time:</label>
           <input type="text" id="start" placeholder='enter brendname Name' name='start' className='py-1.5 rounded-lg border-[3px] w-[100%] border-black' value={data.start} onChange={handelchangeInput}/>
           </div>
           
            <div className='flex flex-col items-start '> 
           <label htmlFor='end' className='text-2xl my-1'>Emd Time:</label>
           <input type="text" id="end" placeholder='enter brendname Name' name='end' className='py-1.5 rounded-lg border-[3px] w-[100%] border-black' value={data.end} onChange={handelchangeInput}/>
             
            </div>

 

           <div className='flex flex-col items-start '> 
           <label htmlFor='day' className='text-2xl my-1'>Day:</label>
           <select   className='py-1.5 rounded-lg border-[3px] w-[100%] border-black' name='day' value={data.day} onChange={handelchangeInput}>
           <option value="">----opttions----</option>
           <option value="Mon">Monday</option>
           <option value="Tus">Thusday</option>
           <option value="Wed">Wednesday</option>
           <option value="Thus">Thusday</option>
           <option value="Fri">Friday</option>
           <option value="Sat">saterday</option>
            </select>
            </div>

           <button type='submit' className='px-4 w-[100%] py-1.5 bg-blue-500 text-white self-center rounded-full my-3 text-center'  onClick={EditClassDetail}>Edit class Data</button> 
       </form>
      <div className='flex items-center justify-end mr-[10%]'>
        <button type='submit' className='px-4 py-1.5 bg-red-500 text-white self-center rounded-full my-3 text-center'  onClick={()=>DeleteClassDetail(data?._id)}>Delete class Data</button> 
</div> 
</div>
 
</div>
  )
}

export default EditClassDetail
