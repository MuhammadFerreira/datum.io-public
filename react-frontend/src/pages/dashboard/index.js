import React, { useState } from 'react';
import SideNavbar from '../../components/sideNavbar';
import TopNavbar from '../../components/topNavbar';
import SurveyComponent from '../../components/componentsUserDashboard/surveyComponent';
import NewsComponent from '../../components/componentsUserDashboard/newsComponent';
import NewSurveyComponent from '../../components/componentsUserDashboard/newSurveyComponent';
import ActiveSurveyComponent from '../../components/componentsUserDashboard/activeSurveyComponent';
import TotalSurveyComponent from '../../components/componentsUserDashboard/totalSurveyComponent';
import CreatedSurveys from '../../components/componentsUserDashboard/table_created_surveys';
import OptionsComponent from '../../components/componentsUserDashboard/table_options';
import TagsComponents from '../../components/componentsUserDashboard/tagsComponents';
import RecentActivityComponent from '../../components/componentsUserDashboard/table_recent_activities';
import MyPointsComponent from '../../components/componentsUserDashboard/card_user_points';
import ParticipatingSurveyComponent from '../../components/componentsUserDashboard/totalParticipatingSurveys';
import UserRankComponent from '../../components/componentsUserDashboard/userRankComponent';
import "./Modal.css";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const Dashboard = (type) => {

  require("../../assets/dashboardAssets/css/nucleo-icons.css");
  require("../../assets/dashboardAssets/css/nucleo-svg.css");
  require("../../assets/dashboardAssets/css/dashboard.css");

  const [prompt, setPrompt] = useState(true);

  //after 7 seconds, prompt is set to false
  setTimeout(() => {
    setPrompt(false);
  }, 7000);


  const [openModal, setOpenModal] = useState(false);
  const handleClose = () => setOpenModal(false);

  let components = [];
  let topComponents = [];
  let midComponents = [];
  let bottomComponents = [];

  components = [
    <ParticipatingSurveyComponent key={1} />,
    <ActiveSurveyComponent key={2} />,
    <UserRankComponent key={3} />,
    <TotalSurveyComponent key={4} />,
    <MyPointsComponent key={5} />,
    <RecentActivityComponent key={8} />,
    <SurveyComponent key={7} />,
    <CreatedSurveys key={6} />,
    <NewSurveyComponent key={9} />,
    <TagsComponents key={10} />,
    <OptionsComponent key={11} />,
    <NewsComponent key={12} />,
  ];

  topComponents = [
    {
      size: '1', // size represents the space it takes up on the page
      componentName: 'Total Participating Surveys',
    },
    {
      size: '1',
      componentName: 'Active Survey',
    },
    {
      size: '1',
      componentName: 'Total Survey',
    },
    {
      size: '1',
      componentName: 'My Points',
    },
    {
      size: '1',
      componentName: 'User Rank',
    },
  ];

  midComponents = [
    {
      size: '4', // size represents the space it takes up on the page
      componentName: 'Participating Surveys',
    },
    {
      size: '4', // size represents the space it takes up on the page
      componentName: 'My Created Surveys',
    },
    {
      size: '4',
      componentName: 'Latest News',
    },
  ];


  bottomComponents = [
    {
      size: '3', // size represents the space it takes up on the page
      componentName: 'New Surveys',
    },
    {
      size: '3',
      componentName: 'Top Tags',
    },
    {
      size: '3',
      componentName: 'Other Options',
    },
    {
      size: '3',
      componentName: 'Recent Activity',
    },
  ];

  let currentSetup = JSON.parse(localStorage.getItem(type.type));

  for (let setup of currentSetup) {
    setup.component = components[setup.componentId];
  }

  let newSetup = {
    top_first: '',
    top_second: '',
    top_third: '',
    top_fourth: '',
    mid_left: '',
    mid_right: '',
    bottom_left: '',
    bottom_right: '',
  };

  // Temporary Solution for hard coded TagComponent
  const bottomComponentsWithoutTags = bottomComponents.filter((component) => component.componentName !== 'Top Tags');
  const midComponentsWithoutNews = midComponents.filter(component => component.componentName !== 'Latest News');

  let handleChange = (data) => {
    let newComp = JSON.parse(data.target.value);
    newSetup[newComp.position] = newComp.name;
    console.log(newSetup);
  };

  const changeData = () => {
    for (const key in newSetup) {
      let compName = `${newSetup[key]}`;
      for (let setup of currentSetup) {
        if (setup.position == `${key}`) {
          if (compName == 'Total Participating Survey') {
            setup.componentId = 0;
          }
          else if (compName == 'Active Survey') {
            setup.componentId = 1;
          }
          else if (compName == 'Total Survey') {
            setup.componentId = 2;
          }
          else if (compName == 'My Points') {
            setup.componentId = 3;
          }
          else if (compName == 'User Rank') {
            setup.componentId = 4;
          }
          else if (compName == 'My Created Surveys') {
            setup.componentId = 5;
          }
          else if (compName == 'Participating Surveys') {
            setup.componentId = 6;
          }
          else if (compName == 'Latest News') {
            setup.componentId = 7;
          }
          else if (compName == 'New Surveys') {
            setup.componentId = 8;
          }
          else if (compName == 'Top Tags') {
            setup.componentId = 9;
          }
          else if (compName == 'Other Options') {
            setup.componentId = 10;
          }
          else if (compName == 'Recent Activity') {
            setup.componentId = 11;
          }
        }
        delete setup['component'];
      }
    }
    localStorage.setItem(type.type, JSON.stringify(currentSetup));
    window.location.reload(true);
  };


  function getCompName(componentId) {
    let componentName = "demo";

    if (componentId == 0) {
      componentName = "Total Participating Survey";
    }
    else if (componentId == 1) {
      componentName = "Active Survey";
    }
    else if (componentId == 2) {
      componentName = "Total Survey";
    }
    else if (componentId == 3) {
      componentName = "My Points";
    }
    else if (componentId == 4) {
      componentName = "User Rank";
    }
    else if (componentId == 5) {
      componentName = "Participating Surveys";
    }
    else if (componentId == 6) {
      componentName = "My Created Surveys";
    }
    else if (componentId == 7) {
      componentName = "Latest News";
    }
    else if (componentId == 8) {
      componentName = "New Surveys";
    }
    else if (componentId == 9) {
      componentName = "Top Tags";
    }
    else if (componentId == 10) {
      componentName = "Other Options";
    }
    else if (componentId == 11) {
      componentName = "Recent Activity";
    }

    return componentName;
  }

  return (
    <div>
      <div>
        <title>
          Dashboard
        </title>
        <SideNavbar />
        <main className="main-content position-relative border-radius-lg ">
          {openModal &&

            <div className="modalBackground" style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 999 }}>
              <div className="modalContainer" style={{ backgroundColor: "black", width: "60%", boxShadow: "0 0 10px grey" }}>
                <div className="title">
                  <h1>Edit Dashboard View</h1>
                </div>
                <div className="body"></div>

                <div class="row">
                  <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4" style={{ height: "120px" }}>
                    <div class="card h-100">
                      <div class="card-body p-3">
                        <div class="row">
                          <div class="col-12 d-flex justify-content-center" style={{ marginTop: "7%" }}>

                            <select onChange={handleChange}>
                              <option disabled selected value style={{ textAlign: "center" }}> {getCompName(currentSetup[0].componentId)}</option>
                              {topComponents.map((component) => (
                                <option value={JSON.stringify({ position: 'top_first', name: component.componentName })} key={component.componentName}>
                                  {component.componentName}
                                </option>
                              ))}
                            </select>

                          </div>
                          <div class="col-4 text-end">
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4" style={{ height: "120px" }}>
                    <div class="card h-100">
                      <div class="card-body p-3">
                        <div class="row">
                          <div class="col-12 d-flex justify-content-center" style={{ marginTop: "7%" }}>

                            <select onChange={handleChange} >
                              <option disabled selected value style={{ textAlign: "center" }}> {getCompName(currentSetup[1].componentId)} </option>
                              {topComponents.map((component) => <option key={component.componentName} value={JSON.stringify({ position: 'top_second', name: component.componentName })}>{component.componentName}</option>)}
                            </select>

                          </div>
                          <div class="col-4 text-end">
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4" style={{ height: "120px" }}>
                    <div class="card h-100">
                      <div class="card-body p-3">
                        <div class="row">
                          <div class="col-12 d-flex justify-content-center" style={{ marginTop: "7%" }}>

                            <select onChange={handleChange} >
                              <option disabled selected value style={{ textAlign: "center" }}> {getCompName(currentSetup[2].componentId)} </option>
                              {topComponents.map((component) => <option key={component.componentName} value={JSON.stringify({ position: 'top_third', name: component.componentName })}>{component.componentName}</option>)}
                            </select>

                          </div>
                          <div class="col-4 text-end">
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4" style={{ height: "120px" }}>
                    <div class="card h-100">
                      <div class="card-body p-3">
                        <div class="row">
                          <div class="col-12 d-flex justify-content-center" style={{ marginTop: "7%" }}>

                            <select onChange={handleChange} >
                              <option disabled selected value style={{ textAlign: "center" }}> {getCompName(currentSetup[3].componentId)} </option>
                              {topComponents.map((component) => <option key={component.componentName} value={JSON.stringify({ position: 'top_fourth', name: component.componentName })}>{component.componentName}</option>)}
                            </select>

                          </div>
                          <div class="col-4 text-end">
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row" style={{ marginTop: "20px" }}>
                  <div class="col-xl-6 col-md-6 col-sm-12 mb-4" style={{ height: "250px" }}>
                    <div class="card h-100">
                      <div class="card-body p-3">
                        <div class="row">
                          <div class="col-12 d-flex justify-content-center" style={{ marginTop: "85px" }}>

                            <select onChange={handleChange} >
                              <option disabled selected value style={{ textAlign: "center" }}> {getCompName(currentSetup[4].componentId)} </option>
                              {midComponentsWithoutNews.map((component) => <option key={component.componentName} value={JSON.stringify({ position: 'mid_left', name: component.componentName })}>{component.componentName}</option>)}
                            </select>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-xl-6 col-md-6 col-sm-12 mb-4 overflow-auto" style={{ height: "250px" }}>
                    <div class="card h-100">
                      <div class="card-body p-3">
                        <div class="row">
                          <div class="col-12 d-flex justify-content-center" style={{ marginTop: "85px" }}>

                            <select onChange={handleChange} >
                              <option disabled selected value style={{ textAlign: "center" }}> {getCompName(currentSetup[5].componentId)} </option>
                              {midComponents.map((component) => <option key={component.componentName} value={JSON.stringify({ position: 'mid_right', name: component.componentName })}>{component.componentName}</option>)}
                            </select>

                          </div>
                          <div class="col-4 text-end">
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row" style={{ marginTop: "0px" }}>
                  <div class="col-xl-6 col-md-6 col-sm-12 mb-4" style={{ height: "250px" }}>
                    <div class="card h-100">
                      <div class="card-body p-3">
                        <div class="row">
                          <div class="col-12 d-flex justify-content-center" style={{ marginTop: "85px" }}>

                            <select onChange={handleChange}>
                              <option disabled selected value style={{ textAlign: "center" }}> {getCompName(currentSetup[6].componentId)} </option>
                              {bottomComponentsWithoutTags.map((component) => <option value={JSON.stringify({ position: 'bottom_left', name: component.componentName })}>{component.componentName}</option>)}
                            </select>

                          </div>
                          <div class="col-4 text-end">
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-xl-6 col-md-6 col-sm-12 mb-4" style={{ height: "250px" }}>
                    <div class="card h-100">
                      <div class="card-body p-3">
                        <div class="row">
                          <div class="col-12 d-flex justify-content-center" style={{ marginTop: "85px" }}>

                            <select onChange={handleChange} >
                              <option disabled selected value style={{ textAlign: "center" }}> {getCompName(currentSetup[7].componentId)}</option>
                              {bottomComponentsWithoutTags.map((component) => <option value={JSON.stringify({ position: 'bottom_right', name: component.componentName })}>{component.componentName}</option>)}
                            </select>

                          </div>
                          <div class="col-4 text-end">
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="footer" style={{ marginTop: "0px" }}>
                  <button className="cancelBtn" onClick={handleClose}>Cancel</button>
                  <button onClick={changeData}>Save</button>
                </div>
              </div>
            </div>
          }
          <TopNavbar />
          <Snackbar open={prompt}
            autoHideDuration={6000}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center"
            }} style={{ marginLeft: "5vw" }}>
            <Alert severity="warning" style={{ fontSize: "17px", fontWeigth: "bolder" }}>Actions Requiring Writing To Database have been Disabled in Demo!</Alert>
          </Snackbar>

          <div className="container-fluid py-4" style={{ marginTop: "-50px" }}>
            <div className="row">
              <div className="container-fluid py-4">
                <div className="row">
                  {currentSetup?.map((component) => {
                    if (component.position == 'top_first') {
                      return component.component;
                    }
                    else if (component.position == 'top_second') {
                      return component.component;
                    }
                    else if (component.position == 'top_third') {
                      return component.component;
                    }
                    else if (component.position == 'top_fourth') {
                      return component.component;
                    }
                    else {
                      return null;
                    }
                  })}
                </div>
                <div className="row mt-4">
                  {currentSetup?.map((component) => {
                    if (component.position == 'mid_left') {
                      return component.component;
                    }
                    else if (component.position == 'mid_right') {
                      return component.component;
                    }
                    else {
                      return null;
                    }
                  })}
                </div>
                <div className="row mt-4">
                  {currentSetup?.map((component) => {
                    if (component.position == 'bottom_left') {
                      return component.component;
                    }
                    else if (component.position == 'bottom_right') {
                      return component.component;
                    }
                    else {
                      return null;
                    }
                  })}
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;