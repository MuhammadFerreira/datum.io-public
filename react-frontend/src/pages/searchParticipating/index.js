import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Modal from '@mui/joy/Modal';
import SideNavbar from '../../components/sideNavbar';
import TopNavbar from '../../components/topNavbar';
import UserService from "../../services/user.services";
import AuthService from "../../services/auth.service";
import { BallTriangle } from 'react-loading-icons';
import SurveyTags from '../../components/surveyTags';
import { Link, useParams } from 'react-router-dom';
import Input from '@mui/joy/Input';
import { CssVarsProvider } from '@mui/joy/styles';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function SearchParticipating() {

    require("../../assets/dashboardAssets/css/nucleo-icons.css");
    require("../../assets/dashboardAssets/css/nucleo-svg.css");
    require("../../assets/dashboardAssets/css/dashboard.css");

    //Open - Close States for more info Modal
    const [open, setOpen] = React.useState(false);
    const [openFailure, setOpenFailure] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);

    //Set default values for survey to avoid loading error
    const [allSurveys, setAllSurvey] = useState();

    const { profileName } = useParams();

    //State for retrieving search query
    const [query, setQuery] = React.useState("");

    useEffect(() => {

        setAllSurvey(null);
        const getSurveys = async () => {
            try {
                if (profileName != null) {
                    setQuery(profileName);
                }
                const id = await AuthService.getUserInfo();
                setAllSurvey(await UserService.getParticipatedSurveys(id.id));
            } catch (err) {
                console.error(err);
            }
        };

        getSurveys();
    }, []);

    //Set default values for survey to avoid loading error
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



    const handleClickOpen = survey => () => {
        setOpen(true);
        setSurvey(survey);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const listOfSurveys = allSurveys;

    return (

        <div>
            <SideNavbar />

            <main className="main-content position-relative border-radius-lg ">


                <TopNavbar />
                <Snackbar open={openFailure} autoHideDuration={6000} onClose={() => setOpenFailure(false)}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "center"
                    }} style={{ marginLeft: "5vw" }}>
                    <Alert severity="error">Unable to Withdraw at this time!!</Alert>
                </Snackbar>
                <Snackbar open={openSuccess} autoHideDuration={6000} onClose={() => setOpenSuccess(false)}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "center"
                    }} style={{ marginLeft: "5vw" }}>
                    <Alert severity="success">You have withdrawn from <b>{survey.title}</b></Alert>
                </Snackbar>

                <div className="d-flex flex-column" id="content-wrapper" style={{ backgroundColor: "transparent" }}>

                    <div id="content">
                        <CssVarsProvider defaultMode='dark' />

                        <div style={{ justifyContent: 'center', textAlign: 'center', marginLeft: '2rem', marginRight: '2rem', marginBottom: "2rem" }}>

                            <div class="d-flex align-items-center justify-content-center" style={{ marginBottom: "30px", marginTop: "20px" }}>
                                <div className="input-group">
                                    <Input type="text" defaultValue={profileName} onChange={e => setQuery(e.target.value)} className="form-control" placeholder="Search For Surveys" style={{ backgroundColor: "#1B1B1B", border: "none", outline: "none", height: "50px", outlineStyle: 'none', color: "white" }} />
                                </div>
                            </div>
                            {listOfSurveys ? listOfSurveys.length > 0 ?
                                <Grid container rowSpacing={4} columnSpacing={{ xs: 2, sm: 2, md: 2 }}>
                                    {listOfSurveys.filter((survey) =>
                                        (survey.title?.toLowerCase() + survey.description?.toLowerCase() + survey.tag1?.toLowerCase() + survey.tag2?.toLowerCase() + survey.tag3?.toLowerCase() + survey.creator?.toLowerCase()).includes(query?.toLowerCase())
                                    ).map((survey) => (
                                        <Grid item xs={12} sm={6} md={4} key={survey.id}>
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
                                                            loading="lazy"
                                                            alt=""
                                                            style={{ border: "5px solid black" }}

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
                                </Grid> : <div style={{ justifyContent: 'center', textAlign: 'center', marginLeft: '2rem', marginRight: '2rem', marginBottom: "2rem", marginTop: "30vh" }}>
                                    <h1 style={{ color: "white" }}>Hmm... there seems to be no surveys!</h1>
                                </div> :
                                <div id="content">
                                    <div style={{ justifyContent: 'center', textAlign: 'center', marginLeft: '2rem', marginRight: '2rem', marginBottom: "2rem", marginTop: "30vh" }}>
                                        <BallTriangle />
                                    </div>
                                </div>

                            }
                        </div>
                    </div>

                    <Modal
                        open={open}
                        survey={survey}
                        onClose={handleClose}
                        disableAutoFocus={true}
                        outline="0"
                        sx={{
                            display: 'flex', justifyContent: 'center', alignItems: 'center', '&.Mui-selected': {
                                outline: 'none',
                            }
                        }}
                        style={{ focus: "", outline: "black", overflow: "scroll", flexFlow: "row wrap" }}
                    >


                        {survey &&

                            <div className="card shadow-lg mx-4 sticky-sm-top removeoutline" style={{ marginBottom: "20px", paddingTop: "15px", marginTop: "20px", minWidth: "60vw" }}>
                                <div className="row" style={{ justifyContent: "right", marginTop: "20px" }}>
                                    <div className="col-auto">
                                        <div className="d-flex px-2 py-1 w-25">
                                            <a onClick={handleClose} style={{ color: 'white' }}>
                                                <button className="btn btn-danger" style={{ alignContent: "center", justifyContent: "center" }}>
                                                    X
                                                </button>
                                            </a>
                                        </div>
                                    </div>
                                </div>
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
                                        <div className="row" style={{ justifyContent: "left", marginTop: "20px" }}>
                                            <div className="col-auto" style={{ marginLeft: "40px" }}>
                                                <div className="d-flex px-2 py-1 w-25">
                                                    <div>
                                                        <Link className="avatar" to={`/user/profile/${survey.creatorId}`}>
                                                            <img src={survey.profilePicCreator} alt="team5" className="avatar avatar-m me-3 rounded-circle" />
                                                            <div className="d-flex flex-column justify-content-center my-auto">
                                                                <h6 className="mb-0 text-mb">{survey.creator}</h6>
                                                            </div>
                                                        </Link>
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
                                    <><div className="row">
                                        <div className="col" style={{ display: "flex", justifyContent: "center" }}>
                                            <Link to={`/user/complete/survey/${survey.id}`}>
                                                <button className="btn btn-primary btn-lg" style={{ alignContent: "center", justifyContent: "center" }}>
                                                    Complete
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                        <div className="row">
                                            <div className="col" style={{ display: "flex", justifyContent: "center" }}>
                                                <button disabled className="btn btn-danger btn-lg" style={{ alignContent: "center", justifyContent: "center" }}>
                                                    Withdraw
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                </div>

                            </div>

                        }
                    </Modal>


                </div>
            </main>
        </div>



    );
}
export default SearchParticipating;