import React, { useState, useEffect } from 'react';
import UserService from '../../../services/user.services';
import AuthService from '../../../services/auth.service';
import { Link } from 'react-router-dom';

const UrgentSurveyComponent = () => {

    const [surveyCount, setSurveyCount] = useState();

    useEffect(() => {
        const getSurvey = async () => {
            try {
                const userInfo = await AuthService.getUserInfo();
                setSurveyCount(await UserService.getParticipatedSurveys(userInfo.id));
            } catch (err) {
                console.error(err);
            }
        };
        getSurvey();
    }, []);

    return (
        <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">

            <div className="card hover">
                
                    <div className="card-body p-3">
                        <div className="row">
                            <div className="col-8">
                                <div className="numbers">
                                    <p className="text-sm mb-0 text-uppercase font-weight-bold">
                                        Participating Surveys
                                    </p>
                                    <h5 className="font-weight-bolder">{surveyCount ? surveyCount?.length :
                                        <div id="content">
                                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" style={{ color: "grey" }}></span>
                                        </div>}</h5>
                                    <p className="mb-0">
                                        <Link to="/user/participating/studies" style={{ textDecoration: 'none' }}><span className="text-primary font-weight-bolder">
                                            Click here
                                        </span></Link>{" "}
                                        for more details
                                    </p>
                                </div>
                            </div>
                            <div className="col-4 text-end">
                                <div className="icon icon-shape bg-gradient-primary shadow-primary text-center rounded-circle">
                                    <i className="fa fa-exclamation-circle" aria-hidden="true" />
                                </div>
                            </div>
                        </div>
                    </div>
                
            </div>

        </div>
    );
};
export default UrgentSurveyComponent;