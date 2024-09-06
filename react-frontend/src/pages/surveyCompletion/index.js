import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import SideNavbar from '../../components/sideNavbar';
import TopNavbar from '../../components/topNavbar';
import userService from '../../services/user.services';
import AuthService from "../../services/auth.service";
import Dialog from '@mui/material/Dialog';
import SurveyTags from '../../components/surveyTags';
import { BallTriangle } from 'react-loading-icons';
import Slider from '@mui/joy/Slider';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CompleteSurvey = () => {

  require("../../assets/dashboardAssets/css/nucleo-icons.css");
  require("../../assets/dashboardAssets/css/nucleo-svg.css");
  require("../../assets/dashboardAssets/css/dashboard.css");

  //questionList is the current question and setQuestionList is the function to update the questionList
  //use passed in id to get the survey from the database
  const params = useParams();
  const [survey, setSurvey] = useState();
  const [answers, setAnswers] = useState();
  const [reset, setReset] = useState(false);
  const [openFailure, setOpenFailure] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  //Open - Close States for participate modal
  const [modalOpen, setModalOpen] = React.useState(false);

  const closeModal = () => {
    setModalOpen(false);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  useEffect(() => {


    const getSurveyInformation = async () => {
      try {

        const id = await AuthService.getUserInfo();
        setAnswers(await userService.getAnswers(params.id, id.id));
        setSurvey(await userService.getSurvey(params.id));

        console.log(survey);

      } catch (err) {
        console.error(err);
      }
    };

    getSurveyInformation();


  }, []);

  //function that runs every time user clicks on the screen 
  //this function will save the answers to the database


  return (

    <div style={{/*background: 'url("design.jpg")', */backgroundPosition: '0', background: 'rgb(0,0,0)', width: 'auto', position: 'relative' }}>
      <SideNavbar />

      <main className="main-content position-relative border-radius-lg ">

        <TopNavbar />
        <Snackbar open={openFailure} autoHideDuration={6000} onClose={() => setOpenFailure(false)}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center"
          }} style={{ marginLeft: "5vw" }}>
          <Alert severity="error">There Was An Error!</Alert>
        </Snackbar>
        <Snackbar open={openSuccess} autoHideDuration={6000} onClose={() => setOpenSuccess(false)}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center"
          }} style={{ marginLeft: "5vw" }}>
          <Alert severity="success">Answers Were Saved!</Alert>
        </Snackbar>
        {survey ? (<section style={{ height: '100vh', marginTop: '10px' }}>
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
                        <div id={question.id} className="d-flex justify-content-between question-id">
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
                                  <input className="form-check-input answer-input" type="radio" name={question.id} id={index} value={option} checked={!reset ? (answers ? (answers.find(answer => answer.questionId === question.id && answer.answer === option) ? "checked" : null) : null) : null} onClick={() => setReset(true)} />
                                  <label className="d-flex justify-content-between" htmlFor={index}>
                                    <h6 >{option}</h6>
                                  </label>
                                </div>))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>) : question.questionType === "SCALE" ? (
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "20px" }} >
                        <Slider
                          disabled={false}
                          className="answer-input"
                          marks
                          size="lg"
                          valueLabelDisplay="on"
                          sx={{ width: "95%" }}
                          max={10}
                          defaultValue={
                            answers
                              ? (answers.find(answer => answer.questionId === question.id)
                                ? answers.find(answer => answer.questionId === question.id).answer
                                : null)
                              : null
                          }
                        />
                      </div>
                    ) : (
                    <div className="row gx-5" style={{ paddingRight: "25px", paddingLeft: "25px" }}>
                      <div className="col-lg-12 col-md-12">
                        <div className="form-group">
                          <label htmlFor="example-text-input" className="form-control-label">Answer</label>
                          <textarea className="answer-input form-control" type="text" name={question.id} defaultValue={answers ? (answers.find(answer => answer.questionId === question.id) ? answers.find(answer => answer.questionId === question.id).answer : null) : null} />
                        </div>
                      </div>
                    </div>
                  )
                  }
                </div>
              </div>

            ))}


            <Dialog
              open={modalOpen}
              onClose={closeModal}
              aria-labelledby="participate-dialog-title"
              aria-describedby="participate-dialog-description"
              PaperProps={{
                style: {
                  backgroundColor: "transparent",
                  boxShadow: "none"
                },
              }}
            >
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
                      </div>
                    </div>
                  </div>
                  <div className="row gx-4" style={{ marginTop: "40px" }}>
                    <h5 style={{ textAlign: "center" }}>Do you want to submit your answers?</h5>
                  </div>
                  <div className="row gx-4 align-items-center justify-content-center" style={{ marginTop: "40px", position: "center" }}>
                    <div className="col-auto">
                      <div className="d-flex align-items-center">
                        <button className="btn btn-primary btn ms-auto" disabled>Yes</button>
                      </div>
                    </div>
                    <div className="col-auto">
                      <div className="d-flex align-items-center">
                        <button className="btn btn-danger btn ms-auto" onClick={closeModal}>No</button>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </Dialog>
          </div>
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            open={true}
            sx={{ marginRight: "10px" }}
          >
            <div className="col">
              <div className="row gx-4">
                <div className="card-header pb-0">
                  <div className="d-flex align-items-center">
                    <button disabled className="btn btn-secondary btn ms-auto" style={{ width: "150px", height: "50px" }}>Save Answers</button>
                  </div>
                </div>

              </div>
              <div className="row gx-4" style={{ paddingTop: "0px" }}>
                <div className="card-header pb-0" style={{ paddingTop: "0px" }}>
                  <div className="d-flex align-items-center">
                    <button className="btn btn-primary btn ms-auto" style={{ width: "150px", height: "50px" }} onClick={openModal}>
                      <span>Submit Survey</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </Snackbar>
        </section>)
          : (<div id="content">
            <div style={{ justifyContent: 'center', textAlign: 'center', marginLeft: '2rem', marginRight: '2rem', marginBottom: "2rem", marginTop: "30vh" }}>
              <BallTriangle />
            </div>
          </div>)}

      </main>
    </div>
  );   /* eslint-enable */

};



export default CompleteSurvey;
