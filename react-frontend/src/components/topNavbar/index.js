import React, { useEffect, useState, useContext } from 'react';

import { XContext } from '../../App';
import AuthService from "../../services/auth.service";
import { Link } from 'react-router-dom';


const TopNavbar = () => {

  const { x, setX } = useContext(XContext);
  const [userInfo, setUserInfo] = useState({});


  useEffect(() => {
    // eslint-disable-next-line
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        setUserInfo(await AuthService.getUserInfo());
        console.log(userInfo);


      } catch (err) {
        console.error(err);
      }
    };

    getUsers();

    return () => {
      controller.abort();
    };
  }, []);

  const handleClick = () => {
    setX(!x); // close the navbar
  };

  require("../../assets/dashboardAssets/css/nucleo-icons.css");
  require("../../assets/dashboardAssets/css/nucleo-svg.css");
  require("../../assets/dashboardAssets/css/dashboard.css");

  let page = "";
  let pageTitle = "";

  if (location.pathname.includes("dashboard")) {
    page = "Dashboard";
    pageTitle = "Welcome Back!";
  }
  else if (location.pathname.includes("search")) {
    page = "Search";
    pageTitle = "Search for New Surveys";
  }
  else if (location.pathname.includes("completed/studies")) {
    page = "My Surveys";
    pageTitle = "Completed Surveys";
  }
  else if (location.pathname.includes("created/studies/edit")) {
    page = "My Surveys";
    pageTitle = "Edit Surveys";
  }
  else if (location.pathname.includes("created/studies")) {
    page = "My Surveys";
    pageTitle = "Created Surveys";
  }

  else if (location.pathname.includes("participating/studies")) {
    page = "My Surveys";
    pageTitle = "Participating Surveys";
  }
  else if (location.pathname.includes("myprofile")) {
    page = "My Profile";
    pageTitle = "My Profile";
  }
  else if (location.pathname.includes("user/profile")) {
    page = "View Profile";
    pageTitle = "View Profile";
  }
  else if (location.pathname.includes("user/create/survey")) {
    page = "Create / Survey";
    pageTitle = "Create a New Survey";
  }
  else if (location.pathname.includes("user/complete/survey")) {
    page = "User / Complete / Survey";
    pageTitle = "Complete Survey";
  }
  else if (location.pathname.includes("user/leaderboard")) {
    page = "User";
    pageTitle = "Leaderboard";
  }
  else if (location.pathname.includes("user/review")) {
    page = "User";
    pageTitle = "Review Survey Submission";
  }

  return (

    <div>

      {/* Navbar */}
      <nav className="navbar navbar-main navbar-expand px-0 mx-4 shadow-none border-radius-xl " id="navbarBlur" data-scroll="false">
        <div className="container-fluid py-1 px-3">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
              <li className="breadcrumb-item text-sm"><a className="opacity-5 text-white" href="javascript:;">Demo</a></li>
              <li className="breadcrumb-item text-sm text-white active" aria-current="page">{page}</li>
            </ol>
            <h2 className="font-weight-bolder text-white mb-0">{pageTitle}</h2>
          </nav>
          <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar" >
            <ul className="navbar-nav  justify-content-end ms-md-auto pe-md-3 d-flex align-items-center">
              <li className="nav-item d-xl-none pe-2 d-flex align-items-center">
                <a href="javascript:;" className="nav-link text-white p-0" id="iconNavbarSidenav" onClick={handleClick} style={{ paddingBottom: "-100px", marginLeft: "10px" }}>
                  <Link onClick={handleClick} className="btn btn-primary shadow" role="button">Menu</Link>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* End Navbar */}
    </div>
  );
};

export default TopNavbar;