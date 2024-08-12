import React, { useContext, useEffect, useState } from 'react'
import CommonApi from '../commonApi';
import { context } from '../App';
 import StudentTable from '../component/Table';

function All_Student() {
    let [data,setData]=useState([]);
let {fetchAuthDeail}=useContext(context);
    let fetchAllStudenDetail=async()=>{
        try{
            let res=await fetch(CommonApi.AllStudents.url,{
             method:CommonApi.AllStudents.method,
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
        fetchAllStudenDetail();
        fetchAuthDeail();
      },[])
     
    //   console.log(data)
     
  return (
    <div className='mt-[120px] mr-[2vw] ml-[2vw]   '>
      <StudentTable data={data} fetchAllStudenDetail={fetchAllStudenDetail} />
      </div>
  )
}

export default All_Student
