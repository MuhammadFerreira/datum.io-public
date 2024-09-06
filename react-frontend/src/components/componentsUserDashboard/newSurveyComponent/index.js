import { React, useEffect, useState } from 'react';
import UserService from "../../../services/user.services";
import AuthService from '../../../services/auth.service';
import { BallTriangle } from 'react-loading-icons';

const NewSurveyComponent = () => {

  const [surveys, setSurvey] = useState();

  useEffect(() => {

    const getSurveys = async () => {
      try {
        const userInfo = await AuthService.getUserInfo();
        setSurvey(await UserService.getSurveys(userInfo.id));
        console.log(surveys);
      } catch (err) {
        console.error(err);
      }
    };

    getSurveys();
  }, []);

  return (
    <div className="col-lg-6 mb-lg-0 mb-4" >
      <div className="card ">
        <a href="/user/search">
          <div className="card-header pb-0 p-3" style={{ marginBottom: '30px' }}>
            <div className="d-flex justify-content-between">
              <h6 className="mb-2">Surveys that might interest you!</h6>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table align-items-center " style={{ marginBottom: '0px', overflow: 'hidden' }}>
              <tbody>
                {surveys ? surveys?.slice(0, 4).map((survey) => (
                  <tr>
                    <td>
                      <div className="d-flex px-2 py-1">
                        <div>
                          <img src={survey.surveyImage} className="avatar avatar-sm me-3" alt="xd" style={{ maxHeight: "50px", minHeight: "50px", minWidth: "50px", maxWidth: "50px" }} />
                        </div>
                        <div className="d-flex flex-column justify-content-center my-auto">
                          <h5 className="font-weight-bold text-mb text-wrap" style={{ fontSize: "0.9rem" }}>{survey.title}</h5>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="text-center">
                        <p className="text-xs font-weight-bold mb-0">Creator:</p>
                        <h6 className="text-sm mb-0">{survey.creator}</h6>
                      </div>
                    </td>
                    <td>
                      <div className="text-center">
                        <p className="text-xs font-weight-bold mb-0">Participants:</p>
                        <h6 className="text-sm mb-0">{survey.numParticipants}</h6>
                      </div>
                    </td>
                  </tr>
                )) :
                <div id="content">
                <div style={{ justifyContent: 'center', textAlign: 'center',  padding:"10vh"}}>
                    <BallTriangle />
                </div>
            </div>}
              </tbody>
            </table>
          </div>
        </a>
      </div>
    </div>
  );
};

export default NewSurveyComponent;