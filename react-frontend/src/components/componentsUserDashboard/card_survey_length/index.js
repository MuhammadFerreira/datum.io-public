import { React, useEffect, useState } from 'react';
import UserService from '../../../services/user.services';
import { useParams } from 'react-router-dom';

const SurveyLengthComponent = () => {

    const params = useParams();
    const [surveyInfo, setSurveyInfo] = useState();   
    useEffect(() => {

        const getUsers = async () => {
            try {
                setSurveyInfo(await UserService.getSurvey(params.id));
                console.log(surveyInfo);
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
                                <p className="text-sm mb-0 text-uppercase font-weight-bold">
                                    Survey Duration
                                </p>
                                <h6 className="font-weight-bolder">{surveyInfo?.questions.length} question(s)</h6>                              
                            </div>
                        </div>
                        <div className="col-4 text-end">
                            <div className="icon icon-shape bg-gradient-danger shadow-primary text-center rounded-circle">
                                <i
                                    className="ni ni-time-alarm text-lg opacity-10"
                                    aria-hidden="true" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default SurveyLengthComponent;