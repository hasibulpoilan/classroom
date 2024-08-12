import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
 // import imgtObase64 from '../imgConvert/imgt0base64';
import { toast } from 'react-toastify';
import CommonApi from '../commonApi';

function Signin() {
let navigate=useNavigate();

let [data,setData]=useState({name:"",email:"",password:"",cpassword:"",role:"Principal"})

let value,name;
let handelChange=(e)=>{
    name=e.target.name;
    value=e.target.value;
    // extra dydefault field addd below
    setData({...data,[name]:value});
      }
       console.log(data)

 
 
 let handelsignup= async(e)=>{
   try{ 
   e.preventDefault();
   if(data.name=='' || data.email=='' || data.password=='password' || data.cpassword=='' || data.password!=data.cpassword){
    throw new Error('fill the input field');
   }
    console.log(CommonApi.signupUrl.url)
    let res= await fetch(CommonApi.signupUrl.url,{
      method:CommonApi.signupUrl.method,
      headers:{
         'Content-Type':'application/json'
      },
      body:JSON.stringify(data)
    })
    console.log(res)
let result= await res.json()
console.log(result)

  if(result.success){
    toast.success('reg sucesful in fronteneed');
    navigate('/login');
}

 else{
  toast.error('reg not sucesful in fronteneed');
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
        <form method='POST' action='/signup' onSubmit={handelsignup} className='flex   flex-col px-3 py-4'>
 {/* <img src={data.profilepic || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBrGPJ2q7Abf54iQOe8H_w11p07aS1mN11YXa9AJTfO3i_mPSSu3P5sR-VGxruGswg5s8&usqp=CAU' } className='text-center w-[7vw] h-[7vw] rounded-full self-center' name='profilepic' alt=""  value={data.profilepic} onChange={handelUplodPic}/> */}
  {/* <input type="file" accept="image/*"  className='text-center w-[7vw] h-[7vw] rounded-full self-center' name='profilepic'    onChange={handleUploadPic} /> */}
 <h1 className='text-center text-[4.5vw] md:text-[3.2vw] font-bold'>SIGN UP</h1>
  <label htmlFor="" className='text-start'>Name:</label>
<input type='text' name='name' alt="" className='py-[.5vw] mb-3 border-[.5px] border-black rounded-lg' value={data.name} onChange={handelChange}/>
 <label htmlFor="" className='text-start  '>Email:</label>

<input type='email' name='email' alt="" className='py-[.5vw] mb-3 border-[.5px] border-black rounded-lg' value={data.email} onChange={handelChange}/>
 <label htmlFor="" className='text-start '>Password:</label>

<input type='password' className='py-[.5vw] mb-3 border-[.5px] border-black rounded-lg' name='password' alt=""  value={data.password} onChange={handelChange}/>
 
  <label htmlFor="" className='text-start '>ConfirmPassword:</label>

<input  type='password' name='cpassword' alt="" className='py-[.5vw] mb-3 border-[.5px] border-black  rounded-lg'  value={data.cpassword} onChange={handelChange}/>
{/* <label htmlFor="" className='text-start '>SignUp As:</label>
<select required name="role" id="role" className='py-[.5vw] mb-3 border-[.5px] border-black  rounded-lg' onChange={handelChange}>
<option value=" ">--Option--</option>
<option value="Student">Student</option>
<option value="Teacher">Teacher</option>
</select> */}
 
 <button type='submit' className='rounded-full text-center self-center px-3 my-3 py-1 bg-red-500 text-white'>SignUp</button>
    <div className='flex items-center mb-2'> 
     <a className='font-semibold  '>Already have Accout?</a>
     <Link to='/login' className='text-blue-600'>Login</Link> 
      </div> 

        </form>
     </center>
  )
}

export default Signin