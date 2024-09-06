import { React, useEffect, useState } from 'react';
import userService from "../../../services/user.services";
import { Link } from 'react-router-dom';

const TotalSurveyComponent = () => {

    const [surveyCount, setSurveyCount] = useState();

    useEffect(() => {

        const getUsers = async () => {
            try {
                setSurveyCount(await userService.getSurveyCount());
            } catch (err) {
                console.error(err);
            }
        };

        getUsers();
    }, []);

    return (
        <div className="col-xl-3 col-sm-6 mb-xl-0 mb-2">
            <div className="card hover">
                <div className="card-body p-3">
                    <div className="row">
                        <div className="col-8">
                            <div className="numbers">
                                <p className="text-sm mb-0 text-uppercase font-weight-bold">Surveys Completed</p>
                                <h5 className="font-weight-bolder">
                                    {surveyCount ? surveyCount :
                                        <div id="content">
                                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" style={{ color: "#B7C9E2" }}></span>
                                        </div>}
                                </h5>
                                <p className="mb-0">
                                        <Link to="/user/completed/studies" style={{ textDecoration: 'none' }}><span className="text-warning font-weight-bolder">
                                            Click here
                                        </span></Link>{" "}
                                        for more details
                                    </p>
                            </div>
                        </div>
                        <div className="col-4 text-end">
                            <div className="icon icon-shape bg-gradient-warning shadow-warning text-center rounded-circle">
                                <i className="ni ni-folder-17 text-lg opacity-10" aria-hidden="true" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TotalSurveyComponent;