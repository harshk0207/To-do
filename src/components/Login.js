import React,{useState,useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import workContext from '../context/works/workContext';
const Login = () => {
    const [credentials,setCredentials]=useState({email:"",password:""});
    let navigate=useNavigate();

    const context=useContext(workContext);
    const {showAlert}=context;

    const handleSubmit= async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth", {
            method:"POST", 
            headers: {
            'Content-Type': 'application/json',
            }, 
            body: JSON.stringify({email:credentials.email,password:credentials.password})
        });
        const json=await response.json();   
        if(json.success){
          localStorage.setItem("token",json.token);
          showAlert("Logged in successfully","success")
          navigate("/");
        }
        else{
          showAlert(json.error,"danger")
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
  return (
    <div className="container my-4">
      <h2 className="my-3" style={{margin:"auto",width:"50%",fontFamily:"Brush Script"}}>Please Login to continue</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp"/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" value={credentials.password} onChange={onChange} id="password" name="password"/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Login
