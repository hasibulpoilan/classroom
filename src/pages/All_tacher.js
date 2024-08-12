import React, { useContext, useEffect, useState } from 'react'
import CommonApi from '../commonApi';
import { context } from '../App';
import Table from '../component/Table';
 import TeacherTable from '../component/TeacherTable';

function All_tacher() {
    let [data,setData]=useState([]);
    let {fetchAuthDeail}=useContext(context);
        let fetchAllTeachert=async()=>{
            try{
                let res=await fetch(CommonApi.AllTeacher.url,{
                 method:CommonApi.AllTeacher.method,
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
          fetchAllTeachert();
            fetchAuthDeail();
          },[])
         
          console.log(data)
         
  return (
    <div className='mt-[120px] mr-[2vw] ml-[2vw]  '>
      <TeacherTable data={data} fetchAllTeachert={fetchAllTeachert} />
    </div>
  )
}

export default All_tacher
