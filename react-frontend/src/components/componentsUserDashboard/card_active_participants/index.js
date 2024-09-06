import { React, useEffect, useState } from 'react';
import UserService from '../../../services/user.services';
import { useParams } from 'react-router-dom';

const SurveyActiveParticipantComponent = () => {

    const params = useParams();
    const [surveyInfo, setSurveyInfo] = useState();   
    useEffect(() => {

        const getUsers = async () => {
            try {
                setSurveyInfo(await UserService.getSurveyParticipants(params.id));
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
                                    Total Participants
                                </p>
                                <h5 className="font-weight-bolder">{surveyInfo?.length}</h5>
                            </div>
                        </div>
                        <div className="col-4 text-end">
                            <div className="icon icon-shape bg-gradient-primary shadow-primary text-center rounded-circle">
                                <i
                                    className="ni ni-circle-08 text-lg opacity-10"
                                    aria-hidden="true" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default SurveyActiveParticipantComponent;