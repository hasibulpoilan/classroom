import React, { useState } from 'react';
import EditStudentDetail from './EditClassDetail';
import StudentSection from './StudentSection';

const StudentTable = ({ data ,fetchAllStudenDetail}) => {
  let [studentId,setStudntId]=useState('');
  let [showStudentDetail,setshowStudentDetail]=useState(false);

  let handelIdpass=(id)=>{
setStudntId(id);
setshowStudentDetail(true)
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-800 text-white uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Sl No</th>
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Class</th>
            <th className="py-3 px-6 text-left">Roll No</th>
            <th className="py-3 px-6 text-left">Mobile No</th>
            <th className="py-3 px-6 text-left">Edit</th>
           </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {data?.map((value, index) => (
            <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">{index + 1}</td>
              <td className="py-3 px-6 text-left">{value.name}</td>
              <td className="py-3 px-6 text-left">{value?.student?.Class}</td>
              <td className="py-3 px-6 text-left">{value?.student?.roll}</td>
              <td className="py-3 px-6 text-left">{value?.student?.phone}</td>
              <td className="py-3 px-6 text-left">
                <button className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600" onClick={()=>handelIdpass(value?._id)}>Edit</button>
              </td>
             </tr>
          ))}
        </tbody>
      </table>

      {showStudentDetail?<StudentSection onClose={()=>setshowStudentDetail(false)} fetchAllStudenDetail={fetchAllStudenDetail}  studentId={studentId}/> :null}
    </div>
  );
};

export default StudentTable;
