import React,{useContext,useState} from 'react'
import {useNavigate} from "react-router-dom";
import workContext from '../context/works/workContext';
const ChangePassword = () => {
    const context=useContext(workContext);
    const {showAlert}=context;
    const navigate=useNavigate();
    
    const [passwords,setPasswords]=useState({oldpass:"",newpass:"",cnewpass:""})
    const handleSubmit= async (e)=>{
        e.preventDefault();  
        if(passwords.newpass!==passwords.cnewpass){
            return showAlert("New Passwords do not match","danger");
        }
        const response = await fetch(`http://localhost:5000/api/users/changePassword`, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token':localStorage.getItem('token')
            },
            body: JSON.stringify({oldPassword:passwords.oldpass,newPassword:passwords.newpass})
        });
      
        const json=await response.json();
        if(json.success){
          showAlert("Password Changed successfully","success")
          navigate("/");
        }
        else{
          showAlert(json.error,"danger")
        }
    }
    const onChange = (e)=>{
        setPasswords({...passwords, [e.target.name]: e.target.value})
    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 mt-4">
            <label htmlFor="exampleInputPassword1" className="form-label">Old Password</label>
            <input type="password" className="form-control" name="oldpass" id="oldpass" value={passwords.oldpass} onChange={onChange}/>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputPassword2" className="form-label">New Password</label>
            <input type="password" className="form-control" name="newpass" id="newpass" value={passwords.newpass} onChange={onChange}/>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputPassword3" className="form-label">Confirm New Password</label>
            <input type="password" className="form-control" name="cnewpass" id="cnewpass" value={passwords.cnewpass} onChange={onChange}/>
        </div>
        <button type="submit" className="btn btn-primary">Change</button>
      </form>
    </div>
  )
}

export default ChangePassword
