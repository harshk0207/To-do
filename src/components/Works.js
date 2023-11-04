import React,{useContext,useEffect,useRef,useState} from 'react';
import workContext from '../context/works/workContext';
import WorkItem from './WorkItem';
import { useNavigate } from 'react-router-dom';
// import { useEffect } from 'react';

const Works = () => {
  const context=useContext(workContext);
  const navigate=useNavigate();
  const {works,onDelete,getWorks,editWork,showAlert,getUser,user}=context;

  useEffect(()=>{
    if(localStorage.getItem('token')){
        getUser();
        getWorks();
    }
    else{
        navigate('/login')
    }
    // eslint-disable-next-line
  },[])

  const ref = useRef(null);
  const refClose = useRef(null);
  const [work, setWork] = useState({id: "", etitle: "", edescription: "", etag: ""});
  const [allWorks, setAllWorks] = useState(works);

  const updateWork = (work) => {
      ref.current.click();
      setWork({id: work._id, etitle: work.title, edescription: work.description, etag:work.tag})
  }
    
    const handleClick = (e)=>{ 
        if(!work.etitle||! work.edescription||!work.etag){
            alert("Please fill all the fields");
        }
        else {
        editWork(work.id, work.etitle, work.edescription, work.etag);
        getWorks();  
        showAlert("Updated Task succesfully","success");
        }
      refClose.current.click();
  }

  const sortByPriority = () => {
    const sortedWorks = [...allWorks].sort((a, b) => b.priority-a.priority);
    setAllWorks(sortedWorks);
  };

  const sortByDueDate = () => {
    const sortedWorks = [...allWorks].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    setAllWorks(sortedWorks);
  };

  const onChange = (e)=>{
      setWork({...work, [e.target.name]: e.target.value})
  }

  useEffect(() => {
      setAllWorks(works);
  }, [works]);

  return (
    <div className='container mx-5 my-3'>
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Work</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={work.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={work.edescription} onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={work.etag} onChange={onChange} />
                                </div>
 
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button  onClick={handleClick} type="button" className="btn btn-primary">Update Work</button>
                        </div>
                    </div>
                </div>
            </div>
      <div style={{ overflow: 'scroll', height: '550px' }}>
      <h2>{`${user.name}'s   `} tasks</h2>
      <div className="container" style={{display:"flex"}}>
      <h5><button type="button" class="btn btn-info" onClick={sortByPriority}>Sort by Priority</button></h5>
      <h5><button type="button" class="btn btn-info mx-3" onClick={sortByDueDate}>Sort by Due Date</button></h5>
      </div>
      {allWorks.length===0 && "Sorry you have no new tasks :("}
      {allWorks.map((work)=>{
        return <WorkItem  key={work._id} work={work} onDelete={onDelete} updateWork={updateWork} editWork={editWork}/>;
      })} 
      </div>
    </div>
  )
}

export default Works
