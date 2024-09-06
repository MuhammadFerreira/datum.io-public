import React, {useState} from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {

  require("../../assets/dashboardAssets/css/nucleo-icons.css");
  require("../../assets/dashboardAssets/css/nucleo-svg.css");
  require("../../assets/dashboardAssets/css/dashboard.css");

  const [isCollapsed, setIsCollapsed] = useState(true);

  const collapse = () => {
    setIsCollapsed(!isCollapsed);

  };

  return (
    <div style={{ display: "flex", background: 'transparent', border: 0 }}>
      <nav className="navbar navbar-dark navbar-expand-lg sticky-top navbar-shrink py-3" id="mainNav" style={{ background: 'transparent', border: 0, width: "100%", marginBottom: "1vh", boxShadow: "none" }}>
        <div className="container">

          <div style={{ width: "15vw" }}>
            <Link className="navbar-brand d-flex align-items-center" to="/"><img src="../../assets/img/Datum.io%20(2).png" height="auto" style={{ width: "5vw", minWidth: "100px" }} /><h4 className="fw-bold text-white"><strong>datum.io</strong></h4></Link>
          </div><h4>
          <button onClick={collapse} className="navbar-toggler ms-auto" type="button" data-bs-target="#navcol-1" aria-controls="navcol-1" style={{outline: "none", outlineColor: "black", border: "0"}}>
            <i className="fa-solid fa-bars" />
          </button></h4>
          <div className={`collapse navbar-collapse pull-center justify-content-center ${!isCollapsed ? "collapse show" : ""}`}>
            <ul className="navbar-nav mx-auto" style={{ textAlign: "center" }}>
              <div className="d-lg-none">
                <li className="nav-item"><a className="btn btn-primary shadow" role="button" href="https://github.com/HamzahSheikh/demo-datum.io" target="_blank">GitHub</a></li>
                <li className="nav-item"><a className="btn btn-secondary shadow" role="button" href="https://drive.google.com/file/d/1dWGf5BkdpLyCr9IBWnFkdbajuKIjNxYc/view?usp=drive_link" target="_blank">Documentation</a></li>
                <li className="nav-item"><a className="btn btn-primary shadow" role="button" href="https://hamzahsheikh.com" target="_blank">My Portfolio</a></li>
                <li className="nav-item"><a className="btn btn-warning shadow" role="button" href="https://rb.gy/q6l5oy" target="_blank">Other</a></li>
              </div>
            </ul>
            <div className="d-flex flex-row-reverse">
              <div className="d-none d-lg-block">
                <a style={{marginRight: "20px", backgroundColor: "#9e4cd9"}} className="btn btn-primary shadow" role="button" href="https://github.com/HamzahSheikh/demo-datum.io" target="_blank">GitHub</a>
                <a style={{marginRight: "20px"}} className="btn btn-secondary shadow" role="button" href="https://drive.google.com/file/d/1dWGf5BkdpLyCr9IBWnFkdbajuKIjNxYc/view?usp=drive_link" target="_blank">Documentation</a>
                <a className="btn btn-primary shadow" role="button" href="https://hamzahsheikh.com" style={{marginRight: "20px"}} target="_blank">My Portfolio</a>
                <a className="btn btn-warning shadow" role="button" href="https://rb.gy/q6l5oy" target="_blank">Other</a>
              </div>
            </div>
          </div>
        </div>
      </nav>


    </div>



  );
};

export default Navbar;