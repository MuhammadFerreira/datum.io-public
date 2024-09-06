import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import SideNavbar from '../../components/sideNavbar';
import TopNavbar from '../../components/topNavbar';
import userService from '../../services/user.services';
import AuthService from "../../services/auth.service";
import SurveyTags from '../../components/surveyTags';
import BallTriangle from 'react-loading-icons/dist/esm/components/ball-triangle';

const SurveyReview = () => {

  require("../../assets/dashboardAssets/css/nucleo-icons.css");
  require("../../assets/dashboardAssets/css/nucleo-svg.css");
  require("../../assets/dashboardAssets/css/dashboard.css");

  //questionList is the current question and setQuestionList is the function to update the questionList
  //use passed in id to get the survey from the database
  const params = useParams();
  const [survey, setSurvey] = useState();
  const [answers, setAnswers] = useState();


  useEffect(() => {
    const getSurveyInformation = async () => {
      try {
        if(params.user)
        {
          console.log("1. JERE");
          setAnswers(await userService.getAnswers(params.id, params.user));
        }
        else
        {
          console.log("2. JERE");
          const id = await AuthService.getUserInfo();
          setAnswers(await userService.getAnswers(params.id, id.id));
        }

        
        setSurvey(await userService.getSurvey(params.id));

        console.log(survey);

      } catch (err) {
        console.error(err);
      }
    };

    getSurveyInformation();
  }, []);

  // loading animation while retrieving necessary data
  if (!survey) {
    return <div>
                <SideNavbar />
                    <main className="main-content position-relative border-radius-lg ">
                        <TopNavbar />
                        <div id="content">
                            <div style={{ justifyContent: 'center', textAlign: 'center', marginLeft: '2rem', marginRight: '2rem', marginBottom: "2rem", marginTop: "30vh" }}>
                                <BallTriangle />
                            </div>
                        </div>
                    </main>
            </div>;
  }

  /* eslint-disable */
  return (
      <div style={{/*background: 'url("design.jpg")', */backgroundPosition: '0', background: 'rgb(0,0,0)', width: 'auto', position: 'relative' }}>
        <SideNavbar />
        <main className="main-content position-relative border-radius-lg ">
          <TopNavbar />
          <section style={{ height: '100vh', marginTop: '10px' }}>
            <div className="container">
              <div className="card shadow-lg mx-4 sticky-sm-top" style={{ marginBottom: "20px", marginTop: "10px" }}>
                <div className="card-body p-3">
                  <div className="row gx-4">
                    <div className="col-auto">
                      <div className="avatar avatar-xxl position-relative">
                        <img src={survey.surveyImage} alt="profile_image" className="w-100 border-radius-lg shadow-sm" />
                      </div>
                    </div>
                    <div className="col-auto my-auto">
                      <div className="h-100">
                        <h2 className="mb-1">
                          {survey.title}
                        </h2>
                        <p className="mb-0 font-weight-bold text-sm">
                          {survey.description}
                        </p>
                        <p className="mb-0 font-weight-bold text-sm">
                          Total Points: {survey.reward}
                        </p>
                        <div className="h-100" style={{ marginTop: "5px" }}>
                          <div className="form-label-group">

                            {survey.tag1 ? <SurveyTags tags={survey.tag1} /> : null}&nbsp;
                            {survey.tag2 ? <SurveyTags tags={survey.tag2} /> : null}&nbsp;
                            {survey.tag3 ? <SurveyTags tags={survey.tag3} /> : null}&nbsp;

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {survey.questions.map((question, index) => (
                <div className="card shadow-lg mx-4" style={{ marginTop: "10px" }} key={question.id}>
                  <div className="card-body p-3">
                    <div className="row gx-4">
                      <div className="col-lg-12 col-md-12">
                        <div className="card-header pb-0">
                          <div className="d-flex justify-content-between">
                            <h5 style={{ color: "#79afff" }}>Question {index + 1}</h5>
                            <h5 className="text-end" style={{ color: "white" }}>{question.points} point(s)</h5>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row gx-4">
                      <div className="col-lg-12 col-md-12">
                        <div className="card-header pb-0">
                          <div className="d-flex justify-content-between">
                            <h6 >{question.question}</h6>
                          </div>
                        </div>
                      </div>
                    </div>
                    {question.questionType === "MCQ" ? (
                      <div className="row gx-4">
                        <div className="col-lg-12 col-md-12">
                          <div className="card-header pb-0">
                            <div className="d-flex justify-content-between">
                              <div className="form-check">
                                {question.options.map((option, index) => (
                                  <div key={option}>
                                    <input disabled className="form-check-input answer-input" type="radio" name={question.id} id={index} value={option} checked={answers ? (answers.find(answer => answer.questionId === question.id && answer.answer === option) ? "checked" : null) : null} />
                                    <label className="d-flex justify-content-between" htmlFor={index}>
                                      <h6 >{option}</h6>
                                    </label>
                                  </div>))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>) : (
                      <div className="row gx-5" style={{ paddingRight: "25px", paddingLeft: "25px" }}>
                        <div className="col-lg-12 col-md-12">
                          <div className="form-group">
                            <label htmlFor="example-text-input" className="form-control-label">Answer</label>
                            <textarea disabled className="answer-input form-control" type="text" name={question.id} defaultValue={answers ? (answers.find(answer => answer.questionId === question.id) ? answers.find(answer => answer.questionId === question.id).answer : null) : null} />
                          </div>
                        </div>
                      </div>
                    )
                    }
                  </div>
                </div>
              ))}
            </div>

          </section>
        </main>
      </div>
  );   
};



export default SurveyReview;
