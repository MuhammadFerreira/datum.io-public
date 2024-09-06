import { React, useEffect, useState } from 'react';
import UserService from "../../../services/user.services";
import AuthService from '../../../services/auth.service';
import { Link } from 'react-router-dom';
import { BallTriangle } from 'react-loading-icons';


const TableCreatedSurveys = () => {

    const [surveys, setSurvey] = useState();

    useEffect(() => {

        const getSurveys = async () => {
            try {
                const userInfo = await AuthService.getUserInfo();
                setSurvey(await UserService.getCreatedSurveys(userInfo.id));
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
                            <h4>Created Surveys</h4>
                            <p className="text-sm mb-0">
                                <i className="fa fa-check text-info" aria-hidden="true" />
                                <span className="font-weight-bold ms-1">30 active</span> this month
                            </p>
                        </div>
                        <div className="col-lg-6 col-5 my-auto text-end">
                            <div className="dropdown float-lg-end pe-4">
                                <a className="cursor-pointer" id="dropdownTable" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="fa fa-ellipsis-v text-secondary" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-body px-0 pb-2" style={{ height: 'auto', padding: "40px" }}>
                    <div className="table-responsive">
                        <table className="table align-items-center mb-0" style={{ marginBottom: 0, overflow: 'hidden' }}>

                            <tbody >
                                {surveys ? surveys.slice(0, 5).map((survey) => (
                                    <tr>
                                        <td>
                                            <div className="d-flex px-2 py-1">
                                                <div>
                                                    <img src={survey.surveyImage} className="avatar avatar-sm me-3" alt="xd" style={{ maxHeight: "50px", minHeight: "50px", minWidth: "50px", maxWidth: "50px" }} />
                                                </div>
                                                <div className="d-flex flex-column justify-content-center my-auto">
                                                    <h5 className="font-weight-bold text-mb text-wrap" style={{ fontSize: "1rem" }}>{survey.title}</h5>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="align-middle text-center">
                                            <p class="text-xs font-weight-bold mb-0">Participants:</p>
                                            <span className="font-weight-bold text-white" style={{ fontSize: "15px" }}>{survey.numParticipants}</span>
                                        </td>
                                        <td className="align-middle text-center">
                                            <p class="text-xs font-weight-bold mb-0">Reward:</p>
                                            <span className="font-weight-bold text-white" style={{ fontSize: "15px" }}>{survey.reward}</span>
                                        </td>
                                        <td className="avatar-group mt-2 text-center">
                                            <span className="font-weight-bold text-white" ><Link to={`/user/created/studies`} className="btn btn-primary shadow" role="button" style={{ marginRight: "10px" }}>View</Link></span>
                                        </td>
                                    </tr>
                                )) :
                                    <div id="content">
                                        <div style={{ justifyContent: 'center', textAlign: 'center',  padding:"13.3vh"}}>
                                            <BallTriangle />
                                        </div>
                                    </div>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default TableCreatedSurveys;