import { React, useEffect, useState } from 'react';
import UserService from "../../../services/user.services";
import AuthService from '../../../services/auth.service';

const SurveyComponent = () => {

    const [surveys, setSurvey] = useState();

    useEffect(() => {

        const getSurveys = async () => {
            try {
                const userInfo = await AuthService.getUserInfo();
                setSurvey(await UserService.getParticipatedSurveys(userInfo.id));
                console.log(surveys);
            } catch (err) {
                console.error(err);
            }
        };

        getSurveys();
    }, []);

    return (
        <div className="col-lg-6 mb-lg-0 mb-4">
            <div className="card">
                <div className="card-header pb-0">
                    <div className="row">
                        <div className="col-lg-6 col-7">
                            <h6>Participating Surveys</h6>
                            <p className="text-sm mb-0">
                                <i className="fa fa-check text-info" aria-hidden="true" />
                                <span className="font-weight-bold ms-1">30 done</span> this month
                            </p>
                        </div>
                        <div className="col-lg-6 col-5 my-auto text-end">
                            <div className="dropdown float-lg-end pe-4">
                                <a className="cursor-pointer" id="dropdownTable" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="fa fa-ellipsis-v text-secondary" />
                                </a>
                                <ul className="dropdown-menu px-2 py-3 ms-sm-n4 ms-n5" aria-labelledby="dropdownTable" style={{ marginTop: "40px" }}>
                                    <li><a className="dropdown-item border-radius-md" href="javascript:;">Action</a></li>
                                    <li><a className="dropdown-item border-radius-md" href="javascript:;">Another action</a></li>
                                    <li><a className="dropdown-item border-radius-md" href="javascript:;">Something else here</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-body px-0 pb-2" style={{ height: '450px'}}>
                    <div className="table-responsive">
                        <table className="table align-items-center mb-0" style={{ overflow: 'hidden' }}>
                            <thead>
                                <tr>
                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Title</th>
                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-center">Reward</th>
                                    <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Nb Participants</th>
                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Top Tag</th>
                                </tr>
                            </thead>
                            <tbody>
                                {surveys?surveys?.slice(0, 6).map((survey) => (
                                    <tr>
                                        <td>
                                            <div className="d-flex px-2 py-1">
                                                <div>
                                                    <img src={survey.surveyImage} className="avatar avatar-sm me-3" alt="xd" />
                                                </div>
                                                <div className="d-flex flex-column justify-content-center">
                                                    <h6 className="mb-0 text-sm">{survey.title}</h6>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="align-middle text-center text-sm">
                                            <span class="text-xs font-weight-bold">{survey.reward} pts</span>
                                        </td>
                                        <td className="align-middle text-center text-sm">
                                            <span className="text-xs font-weight-bold">{survey.numParticipants}</span>
                                        </td>
                                        <td className="align-middle">
                                        <span className="text-xs font-weight-bold">{survey.tag1}</span>
                                        </td>
                                    </tr>
                                )):
                                <div id="content">
                                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" style={{marginTop:"100px",marginLeft:"350px", height:"100px", width:"100px" }}></span>
                                </div>}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SurveyComponent;