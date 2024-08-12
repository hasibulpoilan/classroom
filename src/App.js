 import React, { createContext, useEffect, useState } from 'react'
import Nav from './component/Nav'
import { Outlet } from 'react-router-dom'
import CommonApi from './commonApi';
import { useDispatch } from 'react-redux';
import { UserDetail } from './redux/userSlice';
import PrincipleDashBoard from './component/PrincipleDashBoard';
let context=createContext();

 function App() {
  let [userDetail,setuserDetail]=useState({});
 let dispatch=useDispatch();

  let fetchAuthDeail=async()=>{
    try{
       let res=await fetch(CommonApi.authData.url,{
        method:CommonApi.authData.method,
        credentials:'include'

      })
 let result=await res.json();
 if(result.success){
 dispatch(UserDetail(result.data));
 setuserDetail(result.data || {})
 }

    }
    catch(e){
      dispatch(UserDetail(null));

console.log('data not get not authorize')
    }
  }
useEffect(()=>{
fetchAuthDeail();
 },[])


   return (
     <context.Provider value={{fetchAuthDeail,userDetail}} >
      <Nav fetchAuthDeail={fetchAuthDeail}/>
       <Outlet/>
      </context.Provider>
   )
 }
 
 export default App
 export {context}
 