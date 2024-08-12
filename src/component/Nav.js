import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
 import CommonApi from '../commonApi';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { UserDetail } from '../redux/userSlice';
import PrincipleDashBoard from './PrincipleDashBoard';
import TeacherDashBoard from './TeacherDashBoard';
import StudentDashBoard from './StudentDashBoard';
import TeacherSection from './TeacherSection';
import StudentSection from './StudentSection';
import EditStudentDetail from './EditClassDetail';

function Nav({fetchAuthDeail}) {
  let navigate=useNavigate();
  let [showTeacherSection,setTeacherSection]=useState(false);
  let [showStudentSection,setshowStudentSection]=useState(false);
   
   let [dashBoard,setDashBoard]=useState(false);
   let dispatch=useDispatch();
  let userData=useSelector(state=>state.users.user);
   // console.log(contextData.userDetail)
  
  let handelLogout=async()=>{
    try{
      let res=await fetch(CommonApi.logout.url,{
        method:CommonApi.logout.method,
        credentials:'include'

      })
 let result=await res.json();
 if(result.success){
 dispatch(UserDetail(null));
 fetchAuthDeail();
 navigate('/login')
 toast.success('logout success',{position:'top-center'})
  }

    }
    catch(e){
      toast.success('logout success',e.message,{position:'top-center'})

    }

  }  


// teacher section update
let handelTeacherSection=()=>{
  setTeacherSection(true);
  setshowStudentSection(true);
 }

  
  return (
    <div className='flex px-4 items-center justify-between shadow-md bg-slate-200 fixed top-0 w-[100vw] py-[30px]'>
      <Link to='/' className='text-[2.2rem] font-bold text-red-500'>College</Link>
      <div className='flex items-center gap-3 md:gap-8'>
      {userData?.email?userData?.role==="Teacher"?<a className='text-[1.7rem] font-semibold text-blue-500 cursor-pointer' onClick={ ()=> setTeacherSection(true)}>Teacher's Section</a>:null:null}
      
      {showTeacherSection &&  userData?.role==="Teacher" ?
      <TeacherSection onClose={()=>setTeacherSection(false)}/>
      :null}

      {userData?.email?userData?.role==="Student"?<a className='text-[1.7rem] font-semibold text-blue-500 cursor-pointer' onClick={( )=> setshowStudentSection(true)}>Student's Section</a>:null:null}
      {showStudentSection && userData?.role==="Student"?<StudentSection onClose={()=>setshowStudentSection(false)}/>:null}

      {dashBoard?(userData?.role=="Principal"?<PrincipleDashBoard onClose={()=>setDashBoard(false)} user={userData} handelLogout={handelLogout} />:null):null}
      {dashBoard?(userData?.role=="Teacher"?<TeacherDashBoard onClose={()=>setDashBoard(false)} user={userData} handelLogout={handelLogout} />:null):null}
      {dashBoard?(userData?.role=="Student"?<StudentDashBoard onClose={()=>setDashBoard(false)} user={userData} handelLogout={handelLogout} />:null):null}
    
      {userData?.email?<div className='  bg-blue-600 w-[3rem] h-[3rem] flex items-center justify-center rounded-full cursor-pointer' onClick={()=>setDashBoard(true)}><a className='text-[1.7rem] font-semibold text-white'>{userData.name[0]}</a></div>:null}
      {!userData?.email?<Link to='/login'>  <button className='text-[1.2rem] py-[.5rem] px-[1rem] bg-blue-500 font-semibold text-white rounded-full'>Login</button></Link>:null}
      {userData?.email?  <button className='text-[1.2rem] py-[.5rem] px-[1rem] bg-red-500 font-semibold text-white rounded-full'  onClick={handelLogout}>Logout</button> :null}

      </div>
    </div>
  )
}

export default Nav
