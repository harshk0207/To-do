import React,{useContext} from 'react'
import workContext from '../context/works/workContext';

const Alert = () => {
  const context=useContext(workContext);
  const {alert}=context;
  const capitalize=(word)=>{
    if(word==="danger"){
      word="error";
    } 
    let lower=word.toLowerCase();
    return lower.charAt(0).toUpperCase()+lower.slice(1);
  }
  return (
  <div style={{height:'50px',marginTop:"56px"}}>
   {alert&&
      <div className={`alert alert-${alert.type} alert-dismissible fade show`}role="alert">
        <strong>{capitalize(alert.type)}</strong> {alert.msg}
      </div>}
    </div>
  );
}

export default Alert
