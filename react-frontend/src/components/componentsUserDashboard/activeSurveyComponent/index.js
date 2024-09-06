import { React, useEffect, useState } from 'react';
import userService from "../../../services/user.services";
import { Link } from "react-router-dom";

const ActiveSurveyComponent = () => {

  const [activeSurveyCount, setActiveSurveyCount] = useState();

  useEffect(() => {

    const getUsers = async () => {
      try {
        setActiveSurveyCount(await userService.getActiveSurveyCount());
        const valueOfUsers = await userService.getUserCountLastNineMonths();

        console.log(valueOfUsers);

      } catch (err) {
        console.error(err);
      }
    };

    getUsers();
  }, []);


  return (
    <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
      <div className="card hover">
        <div className="card-body p-3">
          <div className="row">
            <div className="col-8">
              <div className="numbers">
                <p className="text-sm mb-0 text-uppercase font-weight-bold">Active Surveys</p>
                <h5 className="font-weight-bolder">
                  {activeSurveyCount ? activeSurveyCount :
                    <div id="content">
                      <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" style={{ color: "grey" }}></span>
                    </div>}
                </h5>
                <p className="mb-0">
                  <Link to="/user/search" style={{ textDecoration: 'none' }}><span style={{ color: "#02E3B6" }} className="font-weight-bolder">
                    Click here
                  </span></Link>{" "}
                  for more details
                </p>
              </div>
            </div>
            <div className="col-4 text-end">
              <div className="icon icon-shape bg-gradient-success shadow-success text-center rounded-circle">
                <i className="ni ni-paper-diploma text-lg opacity-10" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveSurveyComponent;