import React, { useEffect, useState } from 'react';
import UserService from '../../../services/user.services';
import { useParams } from 'react-router-dom';

const SurveyCompletionComponent = () => {

    const params = useParams();
    const [surveyCompletion, setSurveyCompletion] = React.useState("");
    const [listOfParticipants, setAllParticipants] = useState([]);
    let percentTotal = 0;

    useEffect(() => {
        const getUsers = async () => {
          try {
            const participants = await UserService.getSurveyParticipants(params.id);
            setAllParticipants(participants);
          } catch (err) {
            console.error(err);
          }
        };
      
        getUsers();
      }, []);
      
      useEffect(() => {
        if (listOfParticipants.length > 0) {
          percentTotal = listOfParticipants.reduce(
            (total, participant) => total + participant.percentCompleted,
            0
          );
          setSurveyCompletion(percentTotal / listOfParticipants.length);
        }
      }, [listOfParticipants]);


    return (
        <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <div className="card hover">
                <div className="card-body p-3">
                    <div className="row">
                        <div className="col-8">
                            <div className="numbers">
                                <p className="text-sm mb-0 text-uppercase font-weight-bold">
                                    Survey Completion
                                </p>
                                <h5 className="font-weight-bolder">{surveyCompletion ? surveyCompletion: 0}%</h5>
                            </div>
                        </div>
                        <div className="col-4 text-end">
                            <div className="icon icon-shape bg-gradient-success shadow-primary text-center rounded-circle">
                                <i
                                    className="ni ni-chart-bar-32 text-lg opacity-10"
                                    aria-hidden="true" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default SurveyCompletionComponent;