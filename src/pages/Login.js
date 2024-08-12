import React, { useContext, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
 // import imgtObase64 from '../imgConvert/imgt0base64';
import { toast } from 'react-toastify';
 import CommonApi from '../commonApi';
import { context } from '../App';

function Login() {
let navigate=useNavigate();
let {fetchAuthDeail}=useContext(context)
 // AuthUserDetail function define App.js call from login.js which is pass through context api
// let {AuthUserDetail,fetchAddCartCount}=useContext(Context);

 let [data,setData]=useState({ email:"",password:""})

let value,name;
let handelChange=(e)=>{
    name=e.target.name;
    value=e.target.value;
    setData({...data,[name]:value});
 }

// sin in post 
 let handelsignup= async(e)=>{
   try{ 
   e.preventDefault();
   if(  data.email=='' || data.password=='password' ){
    throw new Error('fill the input field');
   }
    let res= await fetch(CommonApi.loginUrl.url,{
      method:CommonApi.loginUrl.method,
      headers:{
         'Content-Type':'application/json',
      },   
    //   use in login to store jwt and logout not neccery
     credentials:"include",

      body:JSON.stringify(data)
    })
let result= await res.json()
  if(result.success){
    fetchAuthDeail();
    toast.success('Login sucesful in fronteneed');
    navigate('/');
  }

 else{
  toast.error('Email or password not match');
navigate('/signup')
}
   }
 catch(e){
   navigate('/signup')
   toast.error('reg not sucesful in fronteneed');

 console.log('reg not success in frontened',e)
 }
}

 
 return (
    <center className='mt-[13vw] md:mt-[10vw] mx-[10vw] md:mx-[25vw] lg:mx-[30vw] px-3 py-4 shadow-2xl rounded-lg'>
        <form method='POST' action='/login' onSubmit={handelsignup} className='flex   flex-col px-3 py-4'>
        <h1 className='text-center text-[4.5vw] md:text-[3.2vw] font-bold'>LOGIN</h1>

   <label htmlFor="" className='text-start  '>Email:</label>

<input type='email' name='email' alt="" className='py-[.5vw] mb-3 border-[.5px] border-black rounded-lg' value={data.email} onChange={handelChange}/>
<label htmlFor="" className='text-start '>Password:</label>

<input type='password' className='py-[.5vw] mb-3 border-[.5px] border-black rounded-lg' name='password' alt=""  value={data.password} onChange={handelChange}/>
 

  <button type='submit' className='rounded-full text-center self-center px-3 my-3 py-1 bg-red-500 text-white'>Login</button>
    <div className='flex items-center mb-2'> 
     <a className='font-semibold  '>Do not have Accout?</a>
     <Link to='/signup' className='text-blue-600'>SignUp</Link> 
      </div> 

        </form>
     </center>
  )
}

export default Login