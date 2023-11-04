import WorkContext from "./workContext";
import {useState} from 'react';

const WorkState=(props)=>{
    const host="http://localhost:5000";  
    const [works,setWorks]=useState([]);
    
    const getWorks=async ()=>{
        const response = await fetch(`${host}/api/works/getWorks`, {
            method: 'GET', 
            headers: {
              'Content-Type': 'application/json',
              'x-auth-token':localStorage.getItem('token')
            },
        });
        const json=await response.json(); 
        setWorks(json); 
    }
    const addWork=async (title,description,tag,dueDate,priority)=>{
        var body={title,description,tag,dueDate,priority}
        if(tag==="") body={title,description,dueDate,priority};

        const response = await fetch(`${host}/api/works/addWork`, {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
              'x-auth-token':localStorage.getItem('token')
            },
            body: JSON.stringify(body)
        });
        const json= await response.json();
        setWorks([...works,json]);
    }
        
    const onDelete=async (work)=>{
        setWorks(works.filter((e)=>{
            return e!==work;
        }));
        showAlert("Deleted Task succesfully","success");
        const response = await fetch(`${host}/api/works/deleteWork/${work._id}`, {
            method: 'DELETE', 
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token':localStorage.getItem('token')
            }
        });
        await response.json();
    }

    const editWork=async (id,title,description,tag,dueDate,priority,isDone)=>{
        var body={title,description,tag,dueDate,priority,isDone}
        if(tag==="") body={title,description,dueDate,priority,isDone};
        console.log(body)
        console.log("I AM  HERE")
        const response = await fetch(`${host}/api/works/updateWork/${id}`, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token':localStorage.getItem('token')
            },
            body: JSON.stringify(body)
        });
        await response.json(); 
        console.log("I AM  HERE TOO")
        for(let i=0;i<works.length;i++){
            if(works[i]._id===id){
                works[i].title=title;
                works[i].description=description;
                if(tag==="") works[i].tag="General";
                else works[i].tag=tag;
                works[i].isDone=isDone;
            }
        }
    }
    
    const [alert,setAlert]=useState(null);
    const showAlert=(msg,type)=>{
        setAlert({msg,type});
        setTimeout(()=>{
            setAlert(null);
        },2000);
    }

    const [user,setUser]=useState({});
    const getUser=async ()=>{
        const response = await fetch(`${host}/api/users/me`, {
            method: 'GET', 
            headers: {
            'Content-Type': 'application/json',
            'x-auth-token':localStorage.getItem('token')
            }
        });
        const json=await response.json();
        setUser(json);
    }
    return(
        <WorkContext.Provider value={{works,addWork,onDelete,getWorks,editWork,alert,showAlert,getUser,user}}>
            {props.children}
        </WorkContext.Provider>
    )
}

export default WorkState;

