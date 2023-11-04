import React,{useState,useContext,useRef} from 'react'
import workContext from '../context/works/workContext';

const UpdateWork = (props) => {
    const {work}=props;
    const context=useContext(workContext);
    const {editWork,getWorks}=context;

    const [ework, seteWork] = useState(work);

    const submit=(e)=>{ 
        e.preventDefault();
        console.log(work)
        // console.log(eid);
        // console.log(edesc);
        // editWork(eid,etitle,edesc,etag);
        getWorks();   
        refClose.current.click();
    }

    const ref=useRef(null);
    const refClose=useRef(null);
    const updateWork=()=>{
        console.log(work);
        ref.current.click();
        // seteWork({ ...ework, [e.target.id]: e.target.value });
        // seteId(work._id);
        // seteTitle(work.title);
        // seteDesc(work.description);
        // seteTag(work.tag);

    }
    const onchange = (e) => {
      seteWork({ ...ework, [e.target.id]: e.target.value });
    }

  return (
    <div>
      <i className="fa-solid fa-file-pen  mx-2" onClick={()=>{updateWork()}}></i>

      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">

            <form className='my-3' onSubmit={submit}>
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit task</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div className="modal-body">
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label" >Title</label>
                <input type="text" className="form-control" value={ework.title} onChange={onchange} id="title" name="title"/>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label">Descryption</label>
                <textarea className="form-control" value={ework.description} onChange={onchange} id="description" name='description' rows="3"></textarea>
              </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label" >Tag</label>
                <input type="text" className="form-control" value={ework.tag} onChange={onchange} id="tag" name="tag"/>
              </div>
            </div>

            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="submit" className="btn btn-primary">Update Task</button>
            </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  )
}
export default UpdateWork