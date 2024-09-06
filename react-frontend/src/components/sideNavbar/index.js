import React  from 'react';
import { useLocation, Link } from 'react-router-dom';
import { XContext } from '../../App';
import { useContext } from 'react';


const SideNavbar = () => {
  require("../../assets/dashboardAssets/css/nucleo-icons.css");
  require("../../assets/dashboardAssets/css/nucleo-svg.css");
  require("../../assets/dashboardAssets/css/dashboard.css");

  const location = useLocation();
  const { setX } = useContext(XContext);


  let dashboardClass = location.pathname.includes("dashboard") ? "nav-link active" : "nav-link";
  let searchSurvey = location.pathname.includes("search") ? "nav-link active" : "nav-link";
  let myProfile = location.pathname.includes("myprofile") ? "nav-link active" : "nav-link";
  let leaderboard = location.pathname.includes("leaderboard") ? "nav-link active" : "nav-link";
  let create_survey = location.pathname.includes("create/survey") ? "nav-link active" : "nav-link";
  let completed_surveys = location.pathname.includes("completed") ? "nav-link active" : "nav-link";
  let participating_surveys = location.pathname.includes("participating") ? "nav-link active" : "nav-link";
  let created_surveys = location.pathname.includes("created") ? "nav-link active" : "nav-link";

  window.onresize = window.onload = function () {
    if (window.innerWidth <= 1200) {
      setX(false);
    } else {
      setX(true);
    }
  };

  const onNav = () => {
    if (window.innerWidth <= 1200) {
      setX(false);
    } else {
      setX(true);
    }
  };

  const Image = React.memo(function Image() {
    return <><img src="/./assets/img/Datum.io%20(2).png" style={{ height: '100px', marginRight: '-25px' }} /><span style={{ fontSize: '25px', fontWeight: 700 }}>datum.io</span></>;
  });

  return (
    <XContext.Consumer>
      {({ x }) => {
        if (x) {
          return (
            <aside className="sidenav bg-greyish navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-4" id="sidenav-main" style={{ zIndex: "999" }}>
              <div className="sidenav-header">
                <i className="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav" />
                <a href="/" style={{ color: "white" }}>
                  <Image />
                </a >
              </div>
              <hr className="horizontal dark mt-0" />
              <div className="w-auto " id="sidenav-collapse-main">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <a onClick={onNav} className={dashboardClass} href="/user/dashboard">
                      <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                        <i className="ni ni-tv-2 text-magenta text-sm opacity-10" />
                      </div>
                      <span className="nav-link-text ms-1">Dashboard</span>
                    </a >
                  </li>
                  <li className="nav-item">
                    <Link onClick={onNav} className={myProfile} to="/user/myprofile">
                      <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                        <i className="ni ni-single-02 text-sm opacity-10" style={{ color: "yellow" }} />
                      </div>
                      <span className="nav-link-text ms-1 ">My Profile</span>
                    </Link >
                  </li>
                  <li className="nav-item">
                    <Link onClick={onNav} className={leaderboard} to="/user/leaderboard">
                      <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                        <i className="ni ni-trophy text-info text-sm opacity-10" />
                      </div>
                      <span className="nav-link-text ms-1">Leaderboard</span>
                    </Link>
                  </li><li className="nav-item ">
                    <Link onClick={onNav} className="nav-link disabled" to="#">
                      <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                        <i className="ni ni-basket text-sm opacity-10" style={{ color: "#cd53f5" }} />
                      </div>
                      <span className="nav-link-text ms-1" style={{ color: "grey" }}>Trophy Store</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link onClick={onNav} className={searchSurvey} to="/user/search">
                      <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                        <i className="ni ni-spaceship text-success text-sm opacity-10" />
                      </div>
                      <span className="nav-link-text ms-1">Search for New Surveys</span>
                    </Link >
                  </li>
                  <li className="nav-item">
                    <Link onClick={onNav} className={participating_surveys} to="/user/participating/studies">
                      <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                        <i className="ni ni-planet text-sm opacity-10" style={{ color: "#ff00a6" }} />
                      </div>
                      <span className="nav-link-text ms-1">My Survey List</span>
                    </Link >
                  </li><li className="nav-item">
                    <Link onClick={onNav} className={created_surveys} to="/user/created/studies">
                      <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                        <i className="ni ni-paper-diploma text-sm opacity-10" style={{ color: "yellow" }} />
                      </div>
                      <span className="nav-link-text ms-1">Created Surveys</span>
                    </Link >
                  </li><li className="nav-item">
                    <Link onClick={onNav} className={completed_surveys} to="/user/completed/studies">
                      <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                        <i className="ni ni-folder-17 text-sm opacity-10" style={{ color: "#26ff00" }} />
                      </div>
                      <span className="nav-link-text ms-1">Completed Surveys</span>
                    </Link >
                  </li><li className="nav-item">
                    <Link onClick={onNav} className={create_survey} to="/user/create/survey">
                      <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                        <i className="ni ni-ruler-pencil text-warning text-sm opacity-10" />
                      </div>
                      <span className="nav-link-text ms-1">Create a New Survey</span>
                    </Link >
                  </li>
                </ul>
              </div>
              <div className="sidenav-footer mx-3 ">
              </div>
            </aside>);
        }

        else {
          return null;
        }

      }}
    </XContext.Consumer>
  );


};



export default SideNavbar;