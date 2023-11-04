import React,{useState,useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import workContext from '../context/works/workContext';

const Signup = () => {
   const [credentials,setCredentials]=useState({name:"",email:"",password:"",cpassword:""});
    let navigate=useNavigate();

    const context=useContext(workContext);
    const {showAlert}=context;

    const handleSubmit= async (e)=>{
        e.preventDefault();
        const {name,email,password,cpassword}=credentials;
        if(password!==cpassword){
          return showAlert("Passwords do not match","danger");
        }
        const response = await fetch("http://localhost:5000/api/users", {
            method:"POST", 
            headers: {
            'Content-Type': 'application/json',
            }, 
            body: JSON.stringify({name,email,password})
        });
        const json=await response.json();   
        console.log(json.token);
        if(json.success){
          localStorage.setItem("token",json.token);
          showAlert("Signed up successfully","success")
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
      <h2 className="my-3" style={{margin:"auto",width:"50%",fontFamily:"Brush Script"}}>Start Your journey</h2>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
            <label htmlFor="exampleInputName1" className="form-label">Name</label>
            <input type="name" className="form-control" value={credentials.name} onChange={onChange} id="name" name="name"/>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp"/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" value={credentials.password} onChange={onChange} id="password" name="password"/>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" value={credentials.cpassword} onChange={onChange} id="cpassword" name="cpassword"/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default Signup
