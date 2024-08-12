import React, { useEffect, useState } from 'react'
import CommonApi from '../commonApi';

function See_otherStudent() {
    let [data,setData]=useState([]);

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
       },[])
     
  
    return (
        <div className="overflow-x-auto mt-[120px] shadow-lg rounded-lg mx-10">
        <table className="min-w-full bg-gray-900 text-white">
          <thead>
            <tr className="bg-gray-800 text-white uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-center">Sl No</th>
              <th className="py-3 px-6 text-center">Name</th>
              <th className="py-3 px-6 text-center">Class</th>
              <th className="py-3 px-6 text-center">Roll No</th>
              <th className="py-3 px-6 text-center">Mobile No</th>
            </tr>
          </thead>
          <tbody className="text-gray-300 text-sm font-light">
            {data?.map((value, index) => (
              <tr
                key={index}
                className="border-b border-gray-700 hover:bg-gray-700  "
              >
                <td className="py-3 px-6 text-center whitespace-nowrap">{index + 1}</td>
                <td className="py-3 px-6 text-center">{value.name}</td>
                <td className="py-3 px-6 text-center">{value?.student?.Class}</td>
                <td className="py-3 px-6 text-center">{value?.student?.roll}</td>
                <td className="py-3 px-6 text-center">{value?.student?.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    )
}
export default See_otherStudent
