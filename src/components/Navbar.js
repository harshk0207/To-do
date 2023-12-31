import React from 'react'
import { Link ,useLocation,useNavigate} from "react-router-dom";

const Navbar = () => {
    const navigate=useNavigate();
    let location = useLocation();
    const handleLogout=()=>{
        localStorage.removeItem('token');
        navigate('/login')
    }
    return (
        <div>
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="#">To-Do</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span> 
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about">About</Link>
                            </li>    
                        </ul>
                        <ul className="navbar-nav mx-2 ms-auto">
                        {!localStorage.getItem('token')?
                        <div>
                        <Link type="button" to="/login" className="btn btn-primary mx-2">Login</Link>
                        <Link type="button" to="/signup" className="btn btn-primary mx-2">Signup</Link> 
                        </div>
                        :<div> 
                        <button onClick={handleLogout} className="btn btn-primary">Logout</button>
                        <Link type="button" to="/changePassword" className="btn btn-primary mx-2">Change Password</Link>
                        </div>}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar

