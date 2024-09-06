import React, { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import SideNavbar from '../../components/sideNavbar';
import TopNavbar from '../../components/topNavbar';
import userService from '../../services/user.services';
import SurveyTags from '../../components/surveyTags';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Textarea from '@mui/joy/Textarea';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import { Grid } from '@mui/material';
import { CssVarsProvider } from '@mui/joy/styles';

const Profile = () => {

  require("../../assets/dashboardAssets/css/nucleo-icons.css");
  require("../../assets/dashboardAssets/css/nucleo-svg.css");
  require("../../assets/dashboardAssets/css/dashboard.css");

  //Open - Close States for participate modal
  const [userInfo, setUserInfo] = useState();

  // //Set default values for survey to avoid true error
  const params = useParams();
  const [open, setOpen] = React.useState(false);

  const [text, setText] = React.useState('');
  const addEmoji = (emoji) => () => setText(`${text}${emoji}`);

  const [createdSurveys, setCreatedSurveys] = useState([]);

  useEffect(() => {

    const getUser = async () => {
      try {
        setCreatedSurveys(await userService.getCreatedSurveys(params.id));
        console.log("These are the surveys " + createdSurveys);
        setUserInfo(await userService.getUserInfo(params.id));
      } catch (err) {
        console.error(err);
      }
    };

    getUser();
  }, []);


  //Set default values for survey to avoid true error
  const [survey, setSurvey] = React.useState({
    id: '',
    title: '',
    description: '',
    duration: '',
    numParticipants: '',
    reward: '',
    surveyImage: '',
    creator: ''
  });

  const [openSurvey, setOpenSurvey] = useState(false);

  const handleClickOpen = survey => () => {
    setOpenSurvey(true);
    setSurvey(survey);
  };

  const handleClose = () => {
    setOpenSurvey(false);
  };

  console.log(userInfo);

  return (

    <div>
      <CssVarsProvider defaultMode='dark' />
      <SideNavbar />

      <main className="main-content position-relative border-radius-lg ">

        <TopNavbar />
        {userInfo &&
          <div>

            <div className="card shadow-lg mx-4">
              <div className="card-body p-3">
                <div className="row gx-4">
                  <div className="col-auto">
                    <div className="avatar avatar-xxl position-relative">
                      <img src={userInfo.userImage} alt="profile_image" className="w-100 border-radius-lg shadow-sm" />
                    </div>
                  </div>
                  <div className="col-auto my-auto">
                    <div className="h-100">
                      <h2 className="mb-1">
                        {userInfo.firstName} {userInfo.lastName}
                      </h2>
                      <p className="mb-0 font-weight-bold text-sm">
                        {userInfo.userRole}
                      </p>
                      <div className="h-100" style={{ marginTop: "5px" }}>
                        <div className="form-label-group">
                          {userInfo.tag1 ? <SurveyTags tags={userInfo.tag1} /> : null}&nbsp;
                          {userInfo.tag2 ? <SurveyTags tags={userInfo.tag2} /> : null}&nbsp;
                          {userInfo.tag3 ? <SurveyTags tags={userInfo.tag3} /> : null}&nbsp;
                          {userInfo.tag4 ? <SurveyTags tags={userInfo.tag4} /> : null}&nbsp;
                          {userInfo.tag5 ? <SurveyTags tags={userInfo.tag5} /> : null}&nbsp;
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 my-sm-auto ms-sm-auto me-sm-0 mx-auto mt-3">
                    <div className="card-header pb-0">
                      <div className="d-flex align-items-center">
                        <button className="btn btn-secondary btn-lg ms-auto" onClick={() => setOpen(true)}>Message</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="container-fluid py-4">
              <div className="row">
                <div className="card">
                  <div className="card-header pb-0">
                    <div className="d-flex align-items-center">
                      <h2 className="mb-0" style={{ fontWeight: "900" }}>User Information</h2>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="example-text-input" className="form-control-label" style={{ fontSize: '20px' }}>Email Address</label>
                          <p className="mb-0 font-weight-bold text-sm" >
                            <span style={{ fontSize: '15px' }}>{userInfo.email}</span>
                          </p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="example-text-input" className="form-control-label" style={{ fontSize: '20px' }}>Occupation</label>
                          <p className="mb-0 font-weight-bold text-sm" >
                            <span style={{ fontSize: '15px' }}> {userInfo.occupation}</span>
                          </p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="example-text-input" className="form-control-label" style={{ fontSize: '20px' }}>Gender</label>
                          <p className="mb-0 font-weight-bold text-sm">
                            <span style={{ fontSize: '15px' }}>{userInfo.gender}</span>
                          </p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="example-text-input" className="form-control-label" style={{ fontSize: '20px' }}>Date Of Birth</label>
                          <p className="mb-0 font-weight-bold text-sm">
                            <span style={{ fontSize: '15px' }} n>{userInfo.dob}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <hr className="horizontal dark" />
                    <div className="d-flex align-items-center">
                      <h2 className="mb-0" style={{ fontWeight: "600", fontSize: '30px' }}>About Me</h2>
                    </div>
                    <hr className="horizontal dark" />
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <p className="d-flex align-items-center">
                            <span style={{ fontSize: '15px' }}>{userInfo.aboutMe}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12 mt-4">
                  <div className="card mb-4">
                    <div className="card-header pb-0 p-3">
                      <h6 className="mb-1">Preview Surveys</h6>
                    </div>
                    <div className="card-body p-3">
                      <div className="row">
                        <Grid container rowSpacing={4} columnSpacing={{ xs: 2, sm: 2, md: 2 }}>
                          {createdSurveys.slice(0, 3).map((survey) => (
                            <Grid key={survey.id} item xs={12} sm={6} md={4}>
                              <a onClick={handleClickOpen(survey)}>
                                <Card sx={{
                                  minHeight: 350, backgroundColor: '#141414', ':hover': {
                                    cursor: 'pointer',
                                    WebkitTransform: 'scale(1.02)',
                                    WebkitTransition: 'transform 0.1s ease-in-out'
                                  }
                                }}
                                >
                                  <CardCover>
                                    <img
                                      src={survey.surveyImage}
                                      srcSet="../../assets/img/Datum.io2.png 2x"
                                      true="lazy"
                                      alt=""
                                      style={{border: "5px solid black"}}

                                    />
                                  </CardCover>
                                  <CardCover
                                    sx={{
                                      outline: 'solid',
                                      outlineWidth: '1px 1px 1px 1px',
                                      outlineColor: 'black',
                                      backgroundColor: "transparent",
                                      background:
                                        'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 500px), linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0) 300px)',
                                    }}
                                  />
                                  <CardContent sx={{ justifyContent: 'flex-start', textAlign: "center", float: "right", marginRight: "0", marginLeft: "auto" }}>

                                  </CardContent>
                                  <CardContent sx={{ justifyContent: 'flex-end', textAlign: "left" }}>
                                    <Typography level="h2" fontSize="lg" textColor="#fff" mb={1}>
                                      {survey.title}
                                    </Typography>
                                    <Typography
                                      textColor="neutral.300"
                                    >
                                      {survey.description}

                                    </Typography>
                                    <Typography level="h2" fontSize="lg" textColor="#fff" mb={1}>
                                      <p className="mb-0 font-weight-bold text-sm" style={{ paddingTop: "8px" }}>
                                        {survey.tag1 ? <SurveyTags tags={survey.tag1} /> : null}&nbsp;
                                        {survey.tag2 ? <SurveyTags tags={survey.tag2} /> : null}&nbsp;
                                        {survey.tag3 ? <SurveyTags tags={survey.tag3} /> : null}&nbsp;
                                      </p>
                                    </Typography>
                                  </CardContent>
                                </Card>
                              </a>
                            </Grid>
                          ))
                          }
                        </Grid>
                        <div className="col-xl-3 col-md-6 mb-xl-0 mb-4">
                          <div className="card h-100 card-plain card-survey">
                            <div className="card-body d-flex flex-column justify-content-center text-center">
                              <a href="javascript:;">
                                <i className="fa fa-arrow text-secondary mb-3" />
                                <Link to={`/user/search/` + userInfo.firstName + " " + userInfo.lastName} className="btn btn-primary shadow" role="button" style={{ marginRight: '10px' }}>View All Surveys</Link>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Modal open={open} onClose={() => setOpen(false)} defaultMode="dark" sx={{ backdropFilter: "blur(1px)", backgroundColor: "rgb(255, 255, 255, 0)" }}  >
              <ModalDialog
                aria-labelledby="basic-modal-dialog-title"
                aria-describedby="basic-modal-dialog-description"
                sx={{ width: "50vw", backgroundColor: "#141414", border: "none" }}
              >
                <Typography id="basic-modal-dialog-title" component="h2" textColor="white">
                  Messgage {userInfo.firstName} {userInfo.lastName}
                </Typography>
                <Typography id="basic-modal-dialog-description" textColor="white">
                  Fill in the following inputs
                </Typography>
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                  }}
                >
                  <Stack spacing={2}>
                    <FormControl>
                      <FormLabel sx={{ color: "white" }}>Subject</FormLabel>
                      <Input placeholder="Type in here…" sx={{ backgroundColor: "#1b1b1b", border: "none", color: "white" }} autoFocus required />
                    </FormControl>
                    <FormControl>
                      <FormLabel sx={{ color: "white" }}>Message</FormLabel>
                      <Textarea
                        placeholder="Type in here…"
                        value={text}
                        minRows={2}
                        maxRows={4}
                        sx={{ backgroundColor: "#1b1b1b", border: "none", color: "white" }}
                        startDecorator={
                          <Box sx={{ display: 'flex', gap: 0.5 }}>
                            <IconButton variant="outlined" color="neutral" onClick={addEmoji('👍')}>
                              👍
                            </IconButton>
                            <IconButton variant="outlined" color="neutral" onClick={addEmoji('🐱‍👤')}>
                              🐱‍👤
                            </IconButton>
                            <IconButton variant="outlined" color="neutral" onClick={addEmoji('😊')}>
                              😊
                            </IconButton>
                            <IconButton variant="outlined" color="neutral" onClick={addEmoji('❤')}>
                              ❤
                            </IconButton>
                            <IconButton variant="outlined" color="neutral" onClick={addEmoji('😎')}>
                              😎
                            </IconButton>
                            <IconButton variant="outlined" color="neutral" onClick={addEmoji('🙌')}>
                              🙌
                            </IconButton>
                          </Box>
                        }
                        endDecorator={
                          <Typography level="body3" sx={{ ml: 'auto' }}>
                            {text.length} character(s)
                          </Typography>
                        }
                      />
                    </FormControl>
                      <Button type="submit" disabled>
                        <span class=" spinner-border-sm" role="status" aria-hidden="true">Send</span>
                      </Button> 

                  </Stack>
                </form>
              </ModalDialog>
            </Modal>
            <Modal
              fullScreen
              open={openSurvey}
              survey={survey}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              fullWidth
              outline="0"
              sx={{
                display: 'flex', justifyContent: 'center', alignItems: 'center', '&.Mui-selected': {
                  outline: 'none',
                }
              }}
              style={{ backdropFilter: "blur(1px)", focus: "none", outline: "black" }}
            >
              {survey &&

                <div className="card shadow-lg mx-4 sticky-sm-top" style={{ marginBottom: "20px", paddingTop: "15px" }}>
                  <div className="card-body p-3">
                    <div className="row">
                      <div className="col-auto">
                        <div className="row">
                          <div className="col-auto">
                            <div className="avatar avatar-xxl position-relative">
                              <img src={survey.surveyImage} alt="profile_image" className="w-100 border-radius-lg shadow-sm" />
                            </div>
                          </div>
                          <div className="col-auto my-auto">
                            <div className="h-100">
                              <div className='row'>
                                <div className='col'>
                                  <h2 className="mb-1">
                                    {survey.title}&nbsp;

                                  </h2>
                                </div>
                              </div>
                              <div className='row'>
                                <div className='col'>
                                  <p className="mb-0 font-weight-bold text-sm">
                                    {survey.tag1 ? <SurveyTags tags={survey.tag1} /> : null}&nbsp;
                                    {survey.tag2 ? <SurveyTags tags={survey.tag2} /> : null}&nbsp;
                                    {survey.tag3 ? <SurveyTags tags={survey.tag3} /> : null}&nbsp;
                                  </p>
                                </div>
                              </div>



                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6 my-sm-auto ms-sm-auto me-sm-0 mx-auto mt-3">
                        <div className="row">
                          <div className="col-auto" style={{ marginLeft: "40px" }}>
                            <div className="d-flex px-2 py-1 w-25">
                              <div>
                                <span className="avatar" to={`/user/profile/${survey.creatorId}`}>
                                  <img src={survey.profilePicCreator} alt="team5" className="avatar avatar-m me-3 rounded-circle" />
                                  <div className="d-flex flex-column justify-content-center my-auto">
                                    <h6 className="mb-0 text-mb">{survey.creator}</h6>
                                  </div>
                                </span>
                              </div>

                            </div>
                          </div>
                        </div>
                      </div>



                    </div>
                    <hr className="horizontal dark" />


                    <div className="row">
                      <div className="col">
                        <div className="card" style={{ backgroundColor: "black", height: "100%" }}>
                          <div className="card-header pb-0">
                            <div className="d-flex align-items-center">
                              <h2 className="mb-0" style={{ fontWeight: "900" }}>Overview</h2>
                            </div>
                          </div>
                          <div className="card-body">
                            <div className="row">
                              <div className="form-group">
                                <label htmlFor="example-text-input" className="form-control-label">Description</label>
                                <br />
                                {survey.description}
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label htmlFor="example-text-input" className="form-control-label">Number of Questions</label>
                                  <br />
                                  {survey.duration} question(s)
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label htmlFor="example-text-input" className="form-control-label">Number of Participants</label>
                                  <br />
                                  {survey.numParticipants} participant(s)
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label htmlFor="example-text-input" className="form-control-label">Points</label>
                                  <br />
                                  {survey.reward} point(s)
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label htmlFor="example-text-input" className="form-control-label">Days Left</label>
                                  <br />
                                  10 day(s) left
                                </div>
                              </div>
                            </div>
                            <hr className="horizontal dark" />
                            <hr className="horizontal dark" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr className="horizontal dark" />
                    <hr className="horizontal dark" />
                    <div className="row">
                    </div>
                    <div className="row">
                      <div className="col" style={{ display: "flex", justifyContent: "center" }}>
                        <button className="btn btn-danger btn-lg" style={{ alignContent: "center", justifyContent: "center" }} onClick={handleClose}>
                          Close
                        </button>
                      </div>
                    </div>

                  </div>

                </div>

              }
            </Modal>

          </div>

        }

      </main>
    </div>


  );
};


export default Profile;