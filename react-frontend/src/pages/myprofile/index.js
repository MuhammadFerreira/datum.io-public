import React, { useRef, useState, useEffect } from 'react';
import AuthService from "../../services/auth.service";
import SideNavbar from '../../components/sideNavbar';
import TopNavbar from '../../components/topNavbar';
import UserService from "../../services/user.services";
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import SurveyTags from '../../components/surveyTags';
import { Link } from 'react-router-dom';
import { BallTriangle } from 'react-loading-icons';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const MyProfile = () => {

  require("../../assets/dashboardAssets/css/nucleo-icons.css");
  require("../../assets/dashboardAssets/css/nucleo-svg.css");
  require("../../assets/dashboardAssets/css/dashboard.css");

  let occupation = useRef();
  let gender = useRef();
  let dob = useRef();
  let profilePic = useRef();
  let address = useRef();
  let city = useRef();
  let country = useRef();
  let postalCode = useRef();
  let aboutMe = useRef();

  const [openFailure, setOpenFailure] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [showPage, setShowPage] = useState(false);

  const [sports, setSports] = React.useState(false);
  const [music, setMusic] = React.useState(false);
  const [movies, setMovies] = React.useState(false);
  const [food, setFood] = React.useState(false);
  const [travel, setTravel] = React.useState(false);
  const [fashion, setFashion] = React.useState(false);
  const [technology, setTech] = React.useState(false);
  const [gaming, setGaming] = React.useState(false);
  const [books, setBooks] = React.useState(false);
  const [politics, setPolitics] = React.useState(false);
  const [art, setArt] = React.useState(false);
  const [science, setScience] = React.useState(false);
  const [nature, setNature] = React.useState(false);
  const [animals, setAnimals] = React.useState(false);
  const [health, setHealth] = React.useState(false);
  const [education, setEducation] = React.useState(false);
  const [business, setBusiness] = React.useState(false);
  const [religion, setReligion] = React.useState(false);
  const [fitness, setFitness] = React.useState(false);
  const [philosophy, setPhilosophy] = React.useState(false);
  const [finance, setFinance] = React.useState(false);
  const [law, setLaw] = React.useState(false);
  const [other, setOther] = React.useState(false);
  const [history, setHistory] = React.useState(false);
  const [psychology, setPsychology] = React.useState(false);

  //create a json object with the true values in selected
  let selectedTags = {};
  selectedTags.sports = sports;
  selectedTags.music = music;
  selectedTags.movies = movies;
  selectedTags.food = food;
  selectedTags.travel = travel;
  selectedTags.fashion = fashion;
  selectedTags.technology = technology;
  selectedTags.gaming = gaming;
  selectedTags.books = books;
  selectedTags.politics = politics;
  selectedTags.art = art;
  selectedTags.science = science;
  selectedTags.nature = nature;
  selectedTags.animals = animals;
  selectedTags.health = health;
  selectedTags.education = education;
  selectedTags.business = business;
  selectedTags.religion = religion;
  selectedTags.fitness = fitness;
  selectedTags.philosophy = philosophy;
  selectedTags.finance = finance;
  selectedTags.law = law;
  selectedTags.other = other;
  selectedTags.history = history;
  selectedTags.psychology = psychology;

  //loop through the json object and record the keys of the true values
  let selectedTagsArray = [];
  for (let key in selectedTags) {
    if (selectedTags[key] === true) {
      //make first letter of key uppercase
      let keyUppercase = key.toUpperCase();
      selectedTagsArray.push(keyUppercase);
    }
  }


  console.log(selectedTagsArray);

  //count the number of true values in the json object
  let count = Object.values(selectedTags).filter(Boolean).length;
  console.log(count);

  const [layout, setLayout] = React.useState(undefined);

  useEffect(() => {
    // eslint-disable-next-line
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        setUserInfo(await AuthService.getUserInfo());
      } catch (err) {
        console.error(err);
      }
    };

    getUsers();

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    //check every tag in userInfo.tags and set the corresponding state to true
    if (userInfo.tags?.includes("SPORTS")) {
      setSports(true);
    }
    if (userInfo.tags?.includes("MUSIC")) {
      setMusic(true);
    }
    if (userInfo.tags?.includes("MOVIES")) {
      setMovies(true);
    }
    if (userInfo.tags?.includes("FOOD")) {
      setFood(true);
    }
    if (userInfo.tags?.includes("TRAVEL")) {
      setTravel(true);
    }
    if (userInfo.tags?.includes("FASHION")) {
      setFashion(true);
    }
    if (userInfo.tags?.includes("TECHNOLOGY")) {
      setTech(true);
    }
    if (userInfo.tags?.includes("GAMING")) {
      setGaming(true);
    }
    if (userInfo.tags?.includes("BOOKS")) {
      setBooks(true);
    }
    if (userInfo.tags?.includes("POLITICS")) {
      setPolitics(true);
    }
    if (userInfo.tags?.includes("ART")) {
      setArt(true);
    }
    if (userInfo.tags?.includes("SCIENCE")) {
      setScience(true);
    }
    if (userInfo.tags?.includes("NATURE")) {
      setNature(true);
    }
    if (userInfo.tags?.includes("ANIMALS")) {
      setAnimals(true);
    }
    if (userInfo.tags?.includes("HEALTH")) {
      setHealth(true);
    }
    if (userInfo.tags?.includes("EDUCATION")) {
      setEducation(true);
    }
    if (userInfo.tags?.includes("BUSINESS")) {
      setBusiness(true);
    }
    if (userInfo.tags?.includes("RELIGION")) {
      setReligion(true);
    }
    if (userInfo.tags?.includes("FITNESS")) {
      setFitness(true);
    }
    if (userInfo.tags?.includes("PHILOSOPHY")) {
      setPhilosophy(true);
    }
    if (userInfo.tags?.includes("FINANCE")) {
      setFinance(true);
    }
    if (userInfo.tags?.includes("LAW")) {
      setLaw(true);
    }
    if (userInfo.tags?.includes("OTHER")) {
      setOther(true);
    }
    if (userInfo.tags?.includes("HISTORY")) {
      setHistory(true);
    }
    if (userInfo.tags?.includes("PSYCHOLOGY")) {
      setPsychology(true);
    }
  }, [userInfo]);

  useEffect(() => {
    setTimeout(() => {
      setShowPage(true);
    }, 500);
  }, []);

  async function editInformation() {

    setLoading(true);

    const data = {
      occupation: occupation.current.value,
      gender: gender.current.value,
      dob: dob.current.value,
      profilePic: profilePic.current.value,
      address: address.current.value,
      city: city.current.value,
      country: country.current.value,
      postalCode: postalCode.current.value,
      aboutMe: aboutMe.current.value,
      tags: selectedTagsArray
    };

    try {
      const response = await UserService.updateUserInfo(userInfo.id, data);
      console.log(response);

      if (response) {
        setOpenSuccess(true);
        setLoading(false);
      } else {
        setOpenFailure(true);
        setLoading(false);
      }

      setLoading(false);
    } catch (err) {
      setOpenFailure(true);
      setLoading(false);
      console.error(err);
    }
  }

  return (

    <div>

      <SideNavbar />

      <main className="main-content position-relative border-radius-lg ">

        <TopNavbar />
        <Snackbar open={openFailure} autoHideDuration={6000} onClose={() => setOpenFailure(false)}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center"
          }} style={{marginLeft: "5vw"}}>
          <Alert severity="error">There Was an Error Saving!!</Alert>
        </Snackbar>
        <Snackbar open={openSuccess} autoHideDuration={6000} onClose={() => setOpenSuccess(false)}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center"
          }} style={{marginLeft: "5vw"}}>
          <Alert severity="success">Your Changes Were Saved!</Alert>
        </Snackbar>
        {userInfo && showPage ?
          <>
            <hr className="horizontal dark" />
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
                      <p className="mb-0 font-weight-bold text-lg">
                        {userInfo.userRole}
                      </p>
                      <div className="h-100" style={{ marginTop: "5px" }}>
                        <div className="form-label-group">

                          {selectedTagsArray.map((tag) => (
                            <SurveyTags key={tag} tags={tag} />
                          ))}

                          {count >= 5 ?
                            <Link onClick={() => { setLayout('center'); }}>
                              <SurveyTags tags="Edit" /></Link> :
                            <Link onClick={() => { setLayout('center'); }}>
                              <SurveyTags tags="Add" /></Link>}

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="container-fluid py-4">
              <div className="row">
                <div className="col-md-8" style={{ width: "100vw" }}>
                  <div className="card">
                    <div className="card-header pb-0">
                      <div className="d-flex align-items-center">
                        <h2 className="mb-0" style={{ fontWeight: "900" }}>Edit Profile</h2>
                        <button disabled onClick={editInformation} className="btn btn-primary btn-lg ms-auto">
                          {loading ?
                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" style={{ marginRight: "5px" }}></span>
                            : "Save"}
                        </button>
                      </div>
                    </div>
                    <div className="card-body">
                      <p className="text-lg">User Information</p>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="example-text-input" className="form-control-label">First name</label>
                            <input className="form-control" type="text" defaultValue={userInfo.firstName} disabled />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="example-text-input" className="form-control-label">Last name</label>
                            <input className="form-control" type="text" defaultValue={userInfo.lastName} disabled />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="example-text-input" className="form-control-label">Email Address</label>
                            <input className="form-control" type="email" defaultValue={userInfo.email} disabled />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="example-text-input" className="form-control-label">Occupation</label>
                            <select ref={occupation} class="form-select" id="occupation" defaultValue={userInfo.occupation}>
                              <option value={userInfo.occupation}>{userInfo.occupation ? userInfo.occupation[0] + userInfo.occupation.slice(1).toLowerCase() : userInfo.occupation}</option>
                              <option value="STUDENT">Student</option>
                              <option value="SOFTWARE">Software</option>
                              <option value="UNEMPLOYED">Unemployed</option>
                              <option value="MEDCINE">Medicine</option>
                              <option value="LAW">Law</option>
                              <option value="ENGINEERING">Engineering</option>
                              <option value="RETAIL">Retail</option>
                              <option value="BUISNESS">Business</option>
                              <option value="SOCIOLOGY">Socilogy</option>
                              <option value="PSYCHOLOGY">Psychology</option>
                              <option value="RELIGIOUS">Religious</option>
                              <option value="OTHER">Other</option>
                              <option value="NONE">None</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="example-text-input" className="form-control-label">Gender</label>
                            <select ref={gender} class="form-select" defaultValue={userInfo.gender}>
                              <option value={userInfo.gender}>{userInfo.gender}</option>
                              <option value="FEMALE">Female</option>
                              <option value="MALE">Male</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="example-text-input" className="form-control-label">Date Of Birth</label>
                            <input ref={dob} className="form-control" type="date" defaultValue={userInfo.dob} />
                          </div>
                        </div>
                        <div className="col-md-4" style={{ width: "100vw" }}>
                          <div className="form-group">
                            <label htmlFor="example-text-input" className="form-control-label">Profile Picture URL</label>
                            <input ref={profilePic} className="form-control" type="text" defaultValue={userInfo.userImage} />
                          </div>
                        </div>


                      </div>
                      <hr className="horizontal dark" />
                      <p className="text-lg">Contact Information</p>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label htmlFor="example-text-input" className="form-control-label">Address</label>
                            <input ref={address} className="form-control" type="text" defaultValue={userInfo.address} />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label htmlFor="example-text-input" className="form-control-label">City</label>
                            <input ref={city} className="form-control" type="text" defaultValue={userInfo.city} />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label htmlFor="example-text-input" className="form-control-label">Country</label>
                            <input ref={country} className="form-control" type="text" defaultValue={userInfo.country} />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label htmlFor="example-text-input" className="form-control-label">Postal code</label>
                            <input ref={postalCode} className="form-control" type="text" defaultValue={userInfo.postalCode} />
                          </div>
                        </div>
                      </div>
                      <hr className="horizontal dark" />
                      <p className="text-lg">About me</p>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label htmlFor="example-text-input" className="form-control-label">About me</label>
                            <textarea ref={aboutMe} className="form-control" type="text" defaultValue={userInfo.aboutMe} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Modal open={!!layout} onClose={() => setLayout(undefined)} sx={{ backdropFilter: "blur(1px)", backgroundColor: "rgb(255, 255, 255, 0)" }}>
              <ModalDialog
                aria-labelledby="layout-modal-title"
                aria-describedby="layout-modal-description"
                layout={layout}
                sx={{ width: "50vw", backgroundColor: "#141414", border: "none" }}
              >
                <ModalClose />
                <Typography id="basic-modal-dialog-title" component="h2" textColor="white">
                  Edit Tags
                </Typography>
                <Typography id="layout-modal-description" textColor="white">
                  Please select up to 5 tags.
                </Typography>
                <div className="row d-flex justify-content-center">
                  {(count >= 5 && !sports) ?
                    null : <div className="col-auto justify-content-center">
                      <Link onClick={() => setSports(!sports)}>
                        <SurveyTags tags={"SPORTS"} checked={sports} />
                      </Link>

                    </div>}

                  {(count >= 5 && !music) ?
                    null :
                    <div className="col-auto justify-content-center">
                      <Link onClick={() => setMusic(!music)}>
                        <SurveyTags tags={"MUSIC"} checked={music} />
                      </Link>
                    </div>
                  }
                  {(count >= 5 && !movies) ? null :
                    <div className="col-auto justify-content-center">
                      <Link onClick={() => setMovies(!movies)}>
                        <SurveyTags tags={"MOVIES"} checked={movies} />
                      </Link>
                    </div>
                  }
                  {(count >= 5 && !food) ? null :
                    <div className="col-auto justify-content-center">

                      <Link onClick={() => setFood(!food)}>
                        <SurveyTags tags={"FOOD"} checked={food} />
                      </Link>

                    </div>
                  }
                  {(count >= 5 && !travel) ? null :
                    <div className="col-auto justify-content-center">
                      <Link onClick={() => setTravel(!travel)}>
                        <SurveyTags tags={"TRAVEL"} checked={travel} />
                      </Link>
                    </div>
                  }
                  {(count >= 5 && !fashion) ? null :
                    <div className="col-auto justify-content-center">
                      <Link onClick={() => setFashion(!fashion)}>
                        <SurveyTags tags={"FASHION"} checked={fashion} />
                      </Link>
                    </div>
                  }
                  {(count >= 5 && !technology) ? null :
                    <div className="col-auto justify-content-center">
                      <Link onClick={() => setTech(!technology)}>
                        <SurveyTags tags={"TECHNOLOGY"} checked={technology} />
                      </Link>
                    </div>
                  }
                  {(count >= 5 && !gaming) ? null :
                    <div className="col-auto justify-content-center">
                      <Link onClick={() => setGaming(!gaming)}>
                        <SurveyTags tags={"GAMING"} checked={gaming} />
                      </Link>
                    </div>
                  }
                  {(count >= 5 && !books) ? null :
                    <div className="col-auto justify-content-center">
                      <Link onClick={() => setBooks(!books)}>
                        <SurveyTags tags={"BOOKS"} checked={books} />
                      </Link>
                    </div>
                  }
                  {(count >= 5 && !politics) ? null :
                    <div className="col-auto justify-content-center">
                      <Link onClick={() => setPolitics(!politics)}>
                        <SurveyTags tags={"POLITICS"} checked={politics} />
                      </Link>
                    </div>
                  }
                  {(count >= 5 && !art) ? null :
                    <div className="col-auto justify-content-center">
                      <Link onClick={() => setArt(!art)}>
                        <SurveyTags tags={"ART"} checked={art} />
                      </Link>
                    </div>
                  }
                  {(count >= 5 && !science) ? null :
                    <div className="col-auto justify-content-center">
                      <Link onClick={() => setScience(!science)}>
                        <SurveyTags tags={"SCIENCE"} checked={science} />
                      </Link>
                    </div>
                  }
                  {(count >= 5 && !nature) ? null :
                    <div className="col-auto justify-content-center">
                      <Link onClick={() => setNature(!nature)}>
                        <SurveyTags tags={"NATURE"} checked={nature} />
                      </Link>
                    </div>
                  }
                  {(count >= 5 && !animals) ? null :
                    <div className="col-auto justify-content-center">
                      <Link onClick={() => setAnimals(!animals)}>
                        <SurveyTags tags={"ANIMALS"} checked={animals} />
                      </Link>
                    </div>
                  }
                  {(count >= 5 && !health) ? null :
                    <div className="col-auto justify-content-center">
                      <Link onClick={() => setHealth(!health)}>
                        <SurveyTags tags={"HEALTH"} checked={health} />
                      </Link>
                    </div>
                  }
                  {(count >= 5 && !fitness) ? null :
                    <div className="col-auto justify-content-center">
                      <Link onClick={() => setFitness(!fitness)}>
                        <SurveyTags tags={"FITNESS"} checked={fitness} />
                      </Link>
                    </div>
                  }
                  {(count >= 5 && !education) ? null :
                    <div className="col-auto justify-content-center">
                      <Link onClick={() => setEducation(!education)}>
                        <SurveyTags tags={"EDUCATION"} checked={education} />
                      </Link>
                    </div>
                  }
                  {(count >= 5 && !history) ? null :
                    <div className="col-auto justify-content-center">
                      <Link onClick={() => setHistory(!history)}>
                        <SurveyTags tags={"HISTORY"} checked={history} />
                      </Link>
                    </div>
                  }
                  {(count >= 5 && !religion) ? null :
                    <div className="col-auto justify-content-center">
                      <Link onClick={() => setReligion(!religion)}>
                        <SurveyTags tags={"RELIGION"} checked={religion} />
                      </Link>
                    </div>
                  }
                  {(count >= 5 && !philosophy) ? null :
                    <div className="col-auto justify-content-center">
                      <Link onClick={() => setPhilosophy(!philosophy)}>
                        <SurveyTags tags={"PHILOSOPHY"} checked={philosophy} />
                      </Link>
                    </div>
                  }
                  {(count >= 5 && !psychology) ? null :
                    <div className="col-auto justify-content-center">
                      <Link onClick={() => setPsychology(!psychology)}>
                        <SurveyTags tags={"PSYCHOLOGY"} checked={psychology} />
                      </Link>
                    </div>
                  }
                  {(count >= 5 && !finance) ? null :
                    <div className="col-auto justify-content-center">
                      <Link onClick={() => setFinance(!finance)}>
                        <SurveyTags tags={"FINANCE"} checked={finance} />
                      </Link>
                    </div>
                  }
                  {(count >= 5 && !business) ? null :
                    <div className="col-auto justify-content-center">
                      <Link onClick={() => setBusiness(!business)}>
                        <SurveyTags tags={"BUSINESS"} checked={business} />
                      </Link>
                    </div>
                  }
                  {(count >= 5 && !law) ? null :
                    <div className="col-auto justify-content-center">
                      <Link onClick={() => setLaw(!law)}>
                        <SurveyTags tags={"LAW"} checked={law} />
                      </Link>
                    </div>
                  }
                  {(count >= 5 && !other) ? null :
                    <div className="col-auto justify-content-center">
                      <Link onClick={() => setOther(!other)}>
                        <SurveyTags tags={"OTHER"} checked={other} />
                      </Link>
                    </div>
                  }
                </div>
              </ModalDialog>
            </Modal>
          </>
          :
          <div id="content">
            <div style={{ justifyContent: 'center', textAlign: 'center', marginLeft: '2rem', marginRight: '2rem', marginBottom: "2rem", marginTop: "30vh" }}>
              <BallTriangle />
            </div>
          </div>}
      </main>
    </div>


  );
};


export default MyProfile;