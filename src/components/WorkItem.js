import React from 'react'
import UpdateWork from './UpdateWork';
import {useState} from 'react';
const WorkItem = (props) => {
  const {work,onDelete,updateWork,editWork,showAlert}=props;
  const [isDone,setDone]=useState(work.isDone);


  let spanClass;
  let spanText;
  if (work.priority === "0") {
    spanClass = 'success';
    spanText='Low'
  } else if (work.priority === "1") {
    spanClass = 'warning';
    spanText='Medium'
  } else if (work.priority === "2") {
    spanClass = 'danger';
    spanText='High'
  }

  const handleClick=(e)=>{
    console.log("changed");
    setDone(!isDone); // toggle the done state
    editWork(work._id, work.title, work.description, work.tag,work.dueDate,work.priority,!isDone); // call editWork with the updated done state
    showAlert("Updated Task successfully", "success");
    console.log(work);
  }

  return (
    <div>
      <div className="card my-5">
        <div className="card-body">
            <div className="d-flex align-items-center">
            <h5 className="card-title px-2 py-2" style={{color:"white",backgroundColor:"#5b686b",borderRadius:8,textAlign:"center",width:"100%"}}>{work.title}</h5>
            <i className="fa-solid fa-trash-can mx-2" onClick={()=>{onDelete(work)}}></i>
            {/* <UpdateWork work={work}/> */}
            <i className="fa-solid fa-file-pen  mx-2" onClick={()=>{updateWork(work)}}></i>
            <div class="form-check form-check-inline">
            <input type="checkbox" className="form-check-input mx-2" checked={isDone} onChange={handleClick} />
              <label class="form-check-label" for="inlineCheckbox1">Done</label>
            </div>
            </div>
            <p className="card-text">{work.description}</p>
            <p className="card-text"><strong>Tag</strong>&emsp;{work.tag}</p>
            <p className="card-text"><strong>Due Date</strong>&emsp;{work.dueDate.slice(0,10)}</p>
            {/* if piorirty is 0 then span succcess */}
            {/* if piorirty is 1 then span  warning*/}
            {/* if piorirty is 2 then span danger */}

            <strong>Priority</strong>&emsp;<span class={`badge text-bg-${spanClass}`}>{spanText}</span>
        </div>
      </div>
    </div>
  )
}

export default WorkItem
