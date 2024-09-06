import React, { useState, useEffect } from 'react';
import SideNavbar from '../../components/sideNavbar';
import TopNavbar from '../../components/topNavbar';
import UserService from "../../services/user.services";
import { BallTriangle } from 'react-loading-icons';
import { useParams, Link } from "react-router-dom";
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
import Snackbar from '@mui/material/Snackbar';
import SurveyActiveParticipantComponent from '../../components/componentsUserDashboard/card_active_participants';
import SurveyRewardComponent from '../../components/componentsUserDashboard/card_survey_reward';
import SurveyCompletionComponent from '../../components/componentsUserDashboard/card_survey_completion';
import SurveyLengthComponent from '../../components/componentsUserDashboard/card_survey_length';

const ResearchUserList = () => {

  require("../../assets/dashboardAssets/css/nucleo-icons.css");
  require("../../assets/dashboardAssets/css/nucleo-svg.css");
  require("../../assets/dashboardAssets/css/dashboard.css");


  // //Set default values for survey to avoid loading error
  const [allParticipants, setAllParticipants] = useState();
  const [survey, setSurvey] = useState([]);
  const params = useParams();
  const [open, setOpen] = React.useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  const [text, setText] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [email, setEmail] = React.useState('');
  const addEmoji = (emoji) => () => setText(`${text}${emoji}`);

  useEffect(() => {

    const getParticipants = async () => {
      try {
        const link = window.location.href;
        const id = link.split('/').pop(-1);
        console.log("ID: ", id);
        setSurvey(await UserService.getSurvey(params.id));
        setAllParticipants(await UserService.getSurveyParticipants(id));


      } catch (err) {
        console.error("hereee");
        console.error(err);
      }
    };

    getParticipants();
  }, []);



  let getValueSubject = (event) => {
    setMessage(event.target.value);
  };

  let getValueMessage = (event) => {
    setText(event.target.value);
  };

  let getValueEmail = (event) => {
    setEmail(event.target.value);
  };



  const addUser = async () => {

    setSending(true);
    try {
      await UserService.creatorSendInvite(survey.id, email, message, text);
      setOpenAdd(false);
    } catch (err) {
      console.error(err);
    }
    setSending(false);
  };


  const listOfPaticipants = allParticipants;


  return (
    <div>

      <div>
        <SideNavbar />

        <main className="main-content position-relative border-radius-lg ">

          <TopNavbar />
          {listOfPaticipants ? (
            <><><><div className="d-flex flex-column" id="content-wrapper">
              <div id="content" style={{ background: '#000000', transform: 'perspective(0px)' }}>
                <div className="container-fluid py-3">
                  <div className="card shadow-lg" style={{ marginBottom: "20px", marginTop: "10px" }}>
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
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <SurveyActiveParticipantComponent />
                    <SurveyRewardComponent />
                    <SurveyCompletionComponent />
                    <SurveyLengthComponent />
                  </div>
                  <div className="row mt-4" style={{ marginBottom: "10vh" }}>
                    <div className="col-lg-12 mb-lg-0 mb-4">
                      <div className="card">
                        <div className="card-header pb-0">
                          <div className="row">
                            <div className="col-lg-6 col-7">
                              <h3>List of Survey Participants</h3>
                              <p className="text-sm mb-0">
                                <i className="fa fa-check text-info" aria-hidden="true" />
                                <span className="font-weight-bold ms-1">{listOfPaticipants ? listOfPaticipants.length : ""} NEW Participants</span> this week!
                              </p>
                            </div>
                            <div className="col-lg-6 col-5 my-auto text-end">
                              <div className="dropdown float-lg-end pe-4">
                                <Link className="cursor-pointer" id="dropdownTable" data-bs-toggle="dropdown" aria-expanded="false">
                                  <i className="fa fa-ellipsis-v text-secondary" />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="card-body px-0 pb-2">
                          <div className="table-responsive">
                            <table className="table align-items-center justify-content-center mb-0" >
                              <thead>
                                <tr className=''>
                                  <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-10">Name</th>
                                  <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-10 ps-1">Occupation</th>
                                  <th className="text-center text-uppercase text-secondary text-sm font-weight-bolder opacity-10">Status</th>
                                  <th className="text-center text-uppercase text-secondary text-sm font-weight-bolder opacity-10">Country</th>
                                  <th className="text-center text-uppercase text-secondary text-sm font-weight-bolder opacity-10">Gender</th>
                                  <th className="text-center text-uppercase text-secondary text-sm font-weight-bolder opacity-10" style={{ paddingRight: "4.5rem" }}>Completion</th>
                                  <th className="text-center text-uppercase text-secondary text-sm font-weight-bolder opacity-10"></th>
                                </tr>
                              </thead>
                              <tbody>
                                {listOfPaticipants?.map((participant) => (
                                  <tr key={participant.id}>
                                    <td className=''>
                                      <Link to={`/user/profile/${participant.id}`}>
                                        <div className="d-flex px-2 py-1 w-25">
                                          &nbsp;&nbsp;&nbsp;
                                          <div>
                                            <div className="avatar avatar-sm me-3 rounded-circle">
                                              <img src={participant.profilePic ? participant.profilePic : "../../assets/img/Datum.io%20(2).png"} alt="" style={{ maxHeight: "50px", minHeight: "50px", minWidth: "50px", maxWidth: "50px" }} />
                                            </div>
                                          </div>
                                          <div className="d-flex flex-column justify-content-center my-auto">
                                            <h6 className="mb-0 text-mb">{participant.firstName + " " + participant.lastName}</h6>
                                          </div>
                                        </div>
                                      </Link>
                                    </td>
                                    <td className=''>
                                      <div className="avatar-group mt-2 mb-0">
                                        <span className="font-weight-bold align-middle text-center text-mb">{participant.occupation.charAt(0).toUpperCase() + participant.occupation.slice(1).toLowerCase()}</span>
                                      </div>
                                    </td>
                                    <td className="avatar-group mt-2 text-center">
                                      <span className="font-weight-bold align-middle text-left text-mb">{participant.enabled == '1' ? 'Inactive' : 'Active'}</span>
                                    </td>
                                    <td className="avatar-group mt-2 text-center">
                                      <span className="font-weight-bold text-mb">{participant.country}</span>
                                    </td>
                                    <td className="avatar-group mt-2 text-center">
                                      <span className="font-weight-bold text-mb">{participant.gender.charAt(0).toUpperCase()}</span>
                                    </td>
                                    <td className="align-middle">
                                      <div className="progress-wrapper w-40 mx-auto">
                                        <div className="progress-info">
                                          <div className="progress-percentage" style={{ marginBottom: "1px" }}>
                                            <span className="text-xs font-weight-bold">{participant.percentCompleted} %</span>
                                          </div>
                                        </div>
                                        <div className="progress">
                                          {participant.percentCompleted >= 80 ?
                                            <div className="progress-bar bg-gradient-success" role="progressbar" aria-valuenow={0} aria-valuemin={0} aria-valuemax={100} style={{ width: participant.percentCompleted + '%' }} />
                                            : participant.percentCompleted >= 50 ?
                                              <div className="progress-bar bg-gradient-warning" role="progressbar" aria-valuenow={0} aria-valuemin={0} aria-valuemax={100} style={{ width: participant.percentCompleted + '%' }} />
                                              : <div className="progress-bar bg-gradient-danger" role="progressbar" aria-valuenow={0} aria-valuemin={0} aria-valuemax={100} style={{ width: participant.percentCompleted + '%' }} />
                                          }
                                        </div>
                                      </div>
                                    </td>
                                    <td className="avatar-group mt-2 text-center">
                                      <div className="">
                                        <Link to={`/user/review/survey/${params.id}/${participant.id}`} className="btn btn-primary shadow" role="button" style={{ marginRight: '10px' }}>View</Link>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
              <Modal open={open} onClose={() => setOpen(false)} defaultMode="dark" sx={{ backdropFilter: "blur(1px)", backgroundColor: "rgb(255, 255, 255, 0)" }}>
                <ModalDialog
                  aria-labelledby="basic-modal-dialog-title"
                  aria-describedby="basic-modal-dialog-description"
                  sx={{ width: "50vw", backgroundColor: "#141414", border: "none" }}
                >
                  <Typography id="basic-modal-dialog-title" component="h2" textColor="white">
                    Messgage Participants of {survey.title}
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
                        <Input onChange={getValueSubject} placeholder="Type in here…" sx={{ backgroundColor: "#1b1b1b", border: "none", color: "white" }} autoFocus required />
                      </FormControl>
                      <FormControl>
                        <FormLabel sx={{ color: "white" }}>Message</FormLabel>
                        <Textarea
                          placeholder="Type in here…"
                          onChange={getValueMessage}
                          value={text}
                          minRows={2}
                          maxRows={4}
                          sx={{ backgroundColor: "#1b1b1b", border: "none", color: "white" }}
                          startDecorator={<Box sx={{ display: 'flex', gap: 0.5 }}>
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
                          </Box>}
                          endDecorator={<Typography level="body3" sx={{ ml: 'auto' }}>
                            {text.length} character(s)
                          </Typography>} />
                      </FormControl>
                      <Button type="submit" disabled>
                        <span class="spinner-border-sm" role="status" aria-hidden="true">Submit</span>
                      </Button>
                    </Stack>
                  </form>
                </ModalDialog>
              </Modal>
            </>
              <Modal open={openAdd} onClose={() => setOpenAdd(false)} defaultMode="dark" sx={{ backdropFilter: "blur(1px)", backgroundColor: "rgb(255, 255, 255, 0)" }}>
                <ModalDialog
                  aria-labelledby="basic-modal-dialog-title"
                  aria-describedby="basic-modal-dialog-description"
                  sx={{ width: "50vw", backgroundColor: "#141414", border: "none" }}
                >
                  <Typography id="basic-modal-dialog-title" component="h2" textColor="white">
                    Add a New Participant to {survey.title}
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
                        <FormLabel sx={{ color: "white" }}>User Email</FormLabel>
                        <Input onChange={getValueEmail} placeholder="Email" sx={{ backgroundColor: "#1b1b1b", border: "none", color: "white" }} autoFocus required />
                      </FormControl>
                      <FormControl>
                        <FormLabel sx={{ color: "white" }}>Subject</FormLabel>
                        <Input onChange={getValueSubject} placeholder="Type in here…" sx={{ backgroundColor: "#1b1b1b", border: "none", color: "white" }} autoFocus required />
                      </FormControl>
                      <FormControl>
                        <FormLabel sx={{ color: "white" }}>Message</FormLabel>
                        <Textarea
                          placeholder="Type in here…"
                          onChange={getValueMessage}
                          value={text}
                          minRows={2}
                          maxRows={4}
                          sx={{ backgroundColor: "#1b1b1b", border: "none", color: "white" }}
                          startDecorator={<Box sx={{ display: 'flex', gap: 0.5 }}>
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
                          </Box>}
                          endDecorator={<Typography level="body3" sx={{ ml: 'auto' }}>
                            {text.length} character(s)
                          </Typography>} />
                      </FormControl>
                      {sending ?
                        <Button type="submit" disabled>
                          <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        </Button> :
                        <Button type="submit" disabled={true} onClick={() => { addUser(); }}>
                          Submit
                        </Button>}

                    </Stack>
                  </form>
                </ModalDialog>
              </Modal>
              <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                open={true}
                sx={{ marginRight: "10px" }}
              >
                <div className="col">
                  <div className="row gx-4" style={{ paddingTop: "0px" }}>
                    <div className="card-header pb-0" style={{ paddingTop: "0px" }}>
                      <div className="d-flex align-items-center">
                        <button className="btn btn-secondary btn ms-auto" onClick={() => setOpenAdd(true)} style={{ width: "150px", height: "50px", marginRight: "10px" }}>
                          <span>Add Participant</span>
                        </button>
                        <button className="btn btn-primary btn ms-auto" onClick={() => setOpen(true)} style={{ width: "200px", height: "50px" }}>
                          <span>Message Participants</span>
                        </button>
                      </div>
                    </div>

                  </div>
                </div>

              </Snackbar></></>
          )
            :
            <div id="content">
              <div style={{ justifyContent: 'center', textAlign: 'center', marginLeft: '2rem', marginRight: '2rem', marginBottom: "2rem", marginTop: "30vh" }}>
                <BallTriangle />
              </div>
            </div>
          }

        </main>
      </div>

    </div >
  );
};

export default ResearchUserList;