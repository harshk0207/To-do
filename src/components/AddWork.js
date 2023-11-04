import React, {useContext,useState} from 'react'
import workContext from '../context/works/workContext';

const AddWork = () => {
    const context=useContext(workContext);
    const {addWork,showAlert}=context;
    
    
    const [title,setTitle]=useState("");
    const [desc,setDesc]=useState("");
    const [tag,setTag]=useState("");
    const [dueDate,setdueDate]=useState(null);
    const [priority,setPriority]=useState("0");


    const submit=async (e)=>{
      e.preventDefault();
      console.log(dueDate);
      console.log(priority);
      if(!title||!desc||dueDate===null){
         alert("Please fill all required fields");
      }
      else{
        addWork(title,desc,tag,dueDate,priority);
        showAlert("Task Added Succesfully","success");
      }
      setTitle("");
      setDesc("");
      setTag("");
      setdueDate("");
      setPriority("0");
    }
  return (
    <div className='container my-3' style={{overflow: 'scroll',height:"550px"}}>
      <h2>NEW TASK</h2>
       <form className='my-3' onSubmit={submit}>
       <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label" >Title*</label>
          <input type="text" className="form-control" value={title} onChange={e=> setTitle(e.target.value)} id="title"/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">Description*</label>
          <textarea className="form-control" value={desc} onChange={e=> setDesc(e.target.value)} id="desc" rows="6"></textarea>
        </div>
       <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label" >Tag</label>
          <input type="text" className="form-control" value={tag} onChange={e=> setTag(e.target.value)} id="tag"/>
        </div>
       <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label" >Due Date*</label>
          <input type="date" className="form-control" value={dueDate} onChange={e=> setdueDate(e.target.value)} id="dueDate"/>
        </div>
       <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label" >Priority*</label>
          <select class="form-select" aria-label="Default select example" onChange={e=> setPriority(e.target.value)} name="priority">
            <option value="0">Low</option>
            <option value="1">Medium</option>
            <option value="2">High</option>
          </select>
        </div>
        <div className="d-grid gap-2" href="/profile">
          <button className="btn btn-primary" type="submit">Submit</button>
        </div>
       </form>
    </div>
  )
}

export default AddWork
