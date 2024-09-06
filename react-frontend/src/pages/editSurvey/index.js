import React, { useState, useEffect } from 'react';
import SideNavbar from '../../components/sideNavbar';
import TopNavbar from '../../components/topNavbar';
import Box from '@mui/material/Box';
import userService from '../../services/user.services';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';
import SurveyTags from '../../components/surveyTags';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Input from '@mui/joy/Input';
import Textarea from '@mui/joy/Textarea';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import Checkbox from '@mui/joy/Checkbox';
import Slider from '@mui/joy/Slider';
import { CssVarsProvider } from '@mui/joy/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Calendar from 'react-calendar';
import styled from "styled-components";
import 'react-calendar/dist/Calendar.css';
import Snackbar from '@mui/material/Snackbar';
import validator from "validator";
import { BallTriangle } from 'react-loading-icons';
import MuiAlert from '@mui/material/Alert';
import AuthService from "../../services/auth.service";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const EditSurvey = (type) => {

  const url = window.location.href;

  const params = useParams();
  const [survey, setSurvey] = useState([]);
  const navigate = useNavigate();
  const [isImport, setIsImport] = useState(false);
  const [openImage, setOpenImage] = React.useState(false);
  const [openDate, setOpenDate] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const [userInfo, setUserInfo] = useState({});
  const [date, setDate] = useState(new Date());
  const [validDate, setValidDate] = useState();
  const [available, setAvailable] = useState(false);
  const [showPage, setShowPage] = useState(false);
  const [openFailure, setOpenFailure] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);


  const validateDate = () => {
    if (date < new Date()) {
      console.log("invalid date");
      return false;
    } else {
      setValidDate(date.setHours(23, 59, 59, 999));
      setOpenDate(false);
      return true;
    }
  };

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


  //count the number of true values in the json object
  let count = Object.values(selectedTags).filter(Boolean).length;

  const [layout, setLayout] = React.useState(undefined);

  useEffect(() => {

    const controller = new AbortController();

    setSurvey([]);

    const getUsers = async () => {
      try {
        setUserInfo(await AuthService.getUserInfo());
      } catch (err) {
        console.error(err);
      }
    };

    const getSurveyInformation = async () => {
      try {

        let surveyInfo = await userService.getSurvey(params.id);
        let surveyQuestions = [];
        setSurvey(surveyInfo);

        //loop through surveyInfo.questions
        //for each question, create a new question object
        //push the question object to the questions array
        //set the questions array to the state
        for (let i = 0; i < surveyInfo.questions.length; i++) {

          console.log(surveyInfo.questions[i]);

          let questionObject = {
            question: surveyInfo.questions[i].question,
            type: surveyInfo.questions[i].questionType.toLowerCase()
          };

          if (surveyInfo.questions[i].questionType === "SCALE") {
            questionObject.type = "linear";
          }

          if (surveyInfo.questions[i].questionType === "MCQ") {
            questionObject.options = surveyInfo.questions[i].options;
          }

          if (surveyInfo.questions[i].questionType === "TEXT") {
            questionObject.type = "textbox";
          }

          surveyQuestions.push(questionObject);
        }

        setQuestionList(surveyQuestions);
        setImage(surveyInfo.surveyImage);
        setTitle(surveyInfo.title);
        setDescription(surveyInfo.description);
        setValidDate(surveyInfo.dueDate);
        setAvailable(surveyInfo.isSurveyActive);



      } catch (err) {
        console.error(err);
      }


    };

    getUsers();

    if (type.type === "edit") {
      getSurveyInformation();
    } else {
      setQuestionList([]);
      setImage("");
      setTitle("");
      setDescription("");
      setValidDate("");
      setAvailable("");
      setSports(false);
      setMusic(false);
      setMovies(false);
      setFood(false);
      setTravel(false);
      setFashion(false);
      setTech(false);
      setGaming(false);
      setBooks(false);
      setPolitics(false);
      setArt(false);
      setScience(false);
      setNature(false);
      setAnimals(false);
      setHealth(false);
      setEducation(false);
      setBusiness(false);
      setReligion(false);
      setFitness(false);
      setPhilosophy(false);
      setFinance(false);
      setLaw(false);
      setOther(false);
      setHistory(false);
      setPsychology(false);

    }

    return () => {
      controller.abort();
    };
  }, [url]);

  useEffect(() => {
    //check every tag in survey?.tags and set the corresponding state to true
    if (survey?.tags?.includes("SPORTS")) {
      setSports(true);
    }
    if (survey?.tags?.includes("MUSIC")) {
      setMusic(true);
    }
    if (survey?.tags?.includes("MOVIES")) {
      setMovies(true);
    }
    if (survey?.tags?.includes("FOOD")) {
      setFood(true);
    }
    if (survey?.tags?.includes("TRAVEL")) {
      setTravel(true);
    }
    if (survey?.tags?.includes("FASHION")) {
      setFashion(true);
    }
    if (survey?.tags?.includes("TECHNOLOGY")) {
      setTech(true);
    }
    if (survey?.tags?.includes("GAMING")) {
      setGaming(true);
    }
    if (survey?.tags?.includes("BOOKS")) {
      setBooks(true);
    }
    if (survey?.tags?.includes("POLITICS")) {
      setPolitics(true);
    }
    if (survey?.tags?.includes("ART")) {
      setArt(true);
    }
    if (survey?.tags?.includes("SCIENCE")) {
      setScience(true);
    }
    if (survey?.tags?.includes("NATURE")) {
      setNature(true);
    }
    if (survey?.tags?.includes("ANIMALS")) {
      setAnimals(true);
    }
    if (survey?.tags?.includes("HEALTH")) {
      setHealth(true);
    }
    if (survey?.tags?.includes("EDUCATION")) {
      setEducation(true);
    }
    if (survey?.tags?.includes("BUSINESS")) {
      setBusiness(true);
    }
    if (survey?.tags?.includes("RELIGION")) {
      setReligion(true);
    }
    if (survey?.tags?.includes("FITNESS")) {
      setFitness(true);
    }
    if (survey?.tags?.includes("PHILOSOPHY")) {
      setPhilosophy(true);
    }
    if (survey?.tags?.includes("FINANCE")) {
      setFinance(true);
    }
    if (survey?.tags?.includes("LAW")) {
      setLaw(true);
    }
    if (survey?.tags?.includes("OTHER")) {
      setOther(true);
    }
    if (survey?.tags?.includes("HISTORY")) {
      setHistory(true);
    }
    if (survey?.tags?.includes("PSYCHOLOGY")) {
      setPsychology(true);
    }
  }, [survey]);

  useEffect(() => {
    setTimeout(() => {
      setShowPage(true);
    }, 250);
  }, []);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function editSurvey() {

    setSaving(true);

    if (!title || !description || questionList.length == 0 || !image || !validDate) {
      console.log("Please fill all the fields");
      setErrorMessage("Please fill all the fields!");
      setOpenFailure(true);
      setSaving(false);
      return;
    }

    if (title.length > 50 || description.length > 200) {
      console.log("Title or description is too long");
      setErrorMessage("Title or description is too long!");
      setOpenFailure(true);
      setSaving(false);
      return;
    }


    try {
      setSaving(false);
      setOpenSuccess(true);


    } catch (err) {
      console.error(err);
      setErrorMessage("Unexpected error occured!");
      setOpenFailure(true);
      setSaving(false);
    }
  }

  async function createSurvey() {

    setSaving(true);

    if (!googleURL || !title || !description || !image || !validDate) {

      console.log("Please fill all the fields");
      setErrorMessage("Please fill all the fields");
      setOpenFailure(true);
      setSaving(false);
      return;
    }

    if (title.length > 50 || description.length > 200) {
      setErrorMessage("Title or description is too long");
      setOpenFailure(true);
      console.log(errorMessage);
      setSaving(false);
      return;
    }

    const data = {
      surveyType: "Google Form",
      link: googleURL,
      title: title,
      dueDate: new Date(validDate),
      description: description,
      surveyImage: image,
      user: userInfo.id,
      tags: selectedTagsArray,
      active: available
    };

    try {
      const response = await userService.createSurvey(data);
      if (!response) {
        setErrorMessage("Unexpected error!");
        setOpenFailure(true);
        setSaving(false);
        return;
      }
      console.log(response);
      setSaving(false);
      navigate("/user/created/studies");
    } catch (err) {
      console.error(err);
      setSaving(false);
    }
  }

  async function createSurveyDefault() {

    setSaving(true);

    if (!title || !description || questionList.length == 0 || !image || !validDate) {
      console.log("Please fill all the fields");
      setErrorMessage("Please fill all the fields!");
      setOpenFailure(true);
      setSaving(false);
      return;
    }

    if (title.length > 50 || description.length > 200) {
      setErrorMessage("Title or description is too long!");
      setOpenFailure(true);
      setSaving(false);
      return;
    }

    const data = {
      surveyType: "default",
      title: title,
      link: "",
      description: description,
      surveyImage: image,
      user: userInfo.id,
      questionList: questionList,
      tags: selectedTagsArray,
      dueDate: new Date(validDate),
      active: available
    };

    try {
      const response = await userService.createSurvey(data);
      if (!response) {
        setErrorMessage("Unexpected error!");
        setOpenFailure(true);
        setSaving(false);
        return;
      }
      setSaving(false);
      navigate("/user/created/studies");

    } catch (err) {
      console.error(err);
      setErrorMessage("There was an error creating the survey!");
      setOpenFailure(true);
      setSaving(false);
    }
  }

  const [selectedOption, setSelectedOption] = useState("MCQs");
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const [questionList, setQuestionList] = useState([]);
  const [image, setImage] = useState(null);
  const [imageTemp, setImageTemp] = useState(null);
  const [saving, setSaving] = useState(false);
  const [googleURL, setGoogleURL] = useState('');
  const [errorMessage, setErrorMessage] = useState("");
  const [isToggled, setIsToggled] = useState(false);

  const handleAddURL = (e) => {

    e.preventDefault();
    if (validator.isURL(googleURL)) {
      setIsToggled(true);
    } else {
      setErrorMessage("Please enter a valid URL");
      setIsToggled(false);
    }
  };

  const handleImageChange = () => {

    setImage(imageTemp);
  };

  const handleImageChangeTemp = (e) => {
    setImageTemp(e.target.value);
  };

  //handling dynamic question list
  const handleAddQuestion = () => {
    if (selectedOption === "MCQs") {
      console.log("Adding MCQ type question");
      //add current question to the list
      const values = [...questionList];
      values.push({ question: '' });
      setQuestionList(values);
      setQuestionList([
        ...questionList,
        {
          type: "mcq",
          question: "",
          options: ["", "", "", ""],
        },
      ]);
    } else if (selectedOption === "Linear Scale") {
      console.log("Adding Linear Scale type question");
      //add current question to the list
      const values = [...questionList];
      values.push({ question: '' });
      setQuestionList(values);
      setQuestionList([
        ...questionList,
        {
          type: "linear",
          question: "",
        },
      ]);
    } else if (selectedOption === "Textbox answer") {
      console.log("Adding Textbox answer type question");
      //add current question to the list
      const values = [...questionList];
      values.push({ question: '' });
      setQuestionList(values);
      setQuestionList([
        ...questionList,
        {
          type: "textbox",
          question: "",
        },
      ]
      );

    } else {
      console.log("Please select a question type");
    }
  };

  const handleQuestionRemove = (index) => {
    const list = [...questionList];
    list.splice(index, 1); //remove the question at the index
    setQuestionList(list);
  };

  const handleQuestionChange = (index, event) => {
    const values = [...questionList];
    values[index].question = event.target.value;
    setQuestionList(values);
  };

  const handleOptionChange = (questionIndex, optionIndex, event) => {
    const values = [...questionList];
    values[questionIndex].options[optionIndex] = event.target.value;
    setQuestionList(values);
  };

  //Adding more options to MCQ
  const handleOptionAdd = (index) => {
    const newQuestionList = [...questionList];
    const question = newQuestionList[index];
    const newOptions = [...question.options, ""];
    if (newOptions.length <= 7) {
      newQuestionList[index] = { ...question, options: newOptions };
      setQuestionList(newQuestionList);
    }
  };

  //Removing options from MCQ
  const handleOptionRemove = (questionIndex, optionIndex) => {
    const newQuestionList = [...questionList];
    const question = newQuestionList[questionIndex];
    const newOptions = [...question.options.slice(0, optionIndex), ...question.options.slice(optionIndex + 1)];
    newQuestionList[questionIndex] = { ...question, options: newOptions };
    setQuestionList(newQuestionList);
  };

  /* eslint-disable */
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
          <Alert severity="error">{errorMessage}</Alert>
        </Snackbar>
        <Snackbar open={openSuccess} autoHideDuration={6000} onClose={() => setOpenSuccess(false)}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center"
          }} style={{ marginLeft: "5vw" }}>
          <Alert severity="success">Changes Were Saved!</Alert>
        </Snackbar>
        <section style={{marginTop: "30px"}}>
          {questionList && survey && showPage ?
            <div className="container">
              <div className="row gx-4">
                <div className="card">
                  <div className="card-body p-3">
                    <div className="row gx-4">
                      <div className="col-auto " style={{ justifyContent: "center" }}>
                        <div className="avatar avatar-xxl position-relative align-middle">
                          <Link onClick={() => setOpenImage(true)}>
                            {image ?
                              <img src={image} alt="profile_image" className="w-100 border-radius-lg shadow-sm" /> :
                              <SurveyTags tags="AddImage" />
                            }
                          </Link>

                        </div>
                      </div>
                      <div className="col">
                        <div className='row-auto'>
                          <Input
                            color="neutral"
                            placeholder="Add a title..."
                            size="lg"
                            variant="plain"
                            onChange={(e) => { setTitle(e.target.value) }}
                            value={title}
                            defaultValue={title}
                            required="required"
                            style={{ backgroundColor: "#1b1b1b", border: "none", outline: "none", height: "50px", outlineStyle: 'none', color: "white", fontSize: "30px", fontWeight: "bold", width: "100%" }}
                            inputProps={{ maxLength: 12 }}
                            className='text-wrap'
                          />
                        </div>
                        <div className='row-auto'>
                          <Box
                            sx={{
                              py: 2,
                              display: 'grid',
                              gap: 2,
                              alignItems: 'center',
                              flexWrap: 'wrap',
                            }}
                          >
                            <Textarea onChange={(e) => { setDescription(e.target.value) }} name="Plain" placeholder="Type a description…" value={description} variant="plain" style={{ backgroundColor: "#1b1b1b", border: "none", outline: "none", outlineStyle: 'none', color: "white", width: "100%" }} required="required" inputProps={{ maxLength: 12 }} />
                          </Box>
                          <div className="h-100" style={{ marginTop: "5px" }}>
                            <div className="form-label-group">

                              {selectedTagsArray.map((tag) => (
                                <SurveyTags key={tag} tags={tag} />
                              ))}

                              {count >= 3 ?
                                <Link onClick={() => { setLayout('center'); }}>
                                  <SurveyTags tags="Edit" /></Link> :
                                <Link onClick={() => { setLayout('center'); }}>
                                  <SurveyTags tags="Add" /></Link>}

                            </div>
                          </div>
                          <div className="h-100" style={{ marginTop: "5px" }}>
                            <div className="form-label-group">
                              <Link onClick={() => { setOpenDate(true); }}>
                                {!validDate ?
                                  <SurveyTags tags="DueDate" />
                                  :
                                  <SurveyTags tags="validDate" date={new Date(validDate).toLocaleDateString()} />
                                }
                              </Link>
                              {available ?
                                <Link onClick={() => { setAvailable(false) }}>
                                  <SurveyTags tags="active" />
                                </Link>
                                :
                                <Link onClick={() => { setAvailable(true) }}>
                                  <SurveyTags tags="inactive" />
                                </Link>
                              }
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row gx-4">
                <div className="card" style={{ backgroundColor: "transparent", color: "white" }}>
                  <div className="card-body p-3">
                    <div className="row gx-4">
                      <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
                        <Tabs textColor="white" value={index} onChange={(event, value) => setIndex(value)} aria-label="Basic tabs" defaultValue={0} sx={{
                          borderRadius: 'lg', backgroundColor: "transparent", '&.Mui-selected': {
                            color: 'red',
                          },
                        }}>
                          <CssVarsProvider defaultMode='dark' />
                          {type.type === "create" &&
                            <TabList inkBarStyle={{ background: 'blue' }} TabIndicatorProps="cyan" sx={{ backgroundColor: "#141414", padding: '8px' }} variant="blue" color="neutral">
                              <Tab onClick={() => setIsImport(false)} >
                                Create Survey</Tab>
                              <Tab onClick={() => setIsImport(true)}>
                                Import Survey</Tab>
                            </TabList>
                          }
                          <TabPanel value={0} sx={{ p: 2 }}>
                            <div className="row d-flex justify-content-center">
                              <div className="col-md-6 col-xl-4" style={{ width: '100%', marginBottom: '700px' }}>
                                <div className="card" style={{ background: 'rgba(0,0,0,0)', width: 'auto' }}>
                                  <div className="card sticky-top" style={{ backgroundColor: "transparent" }}>
                                    <div className="card-body p-3">
                                      <Tabs className='sticky-top' aria-label="Icon tabs" variant="scrollable" defaultValue={0} sx={{ borderRadius: 'lg' }}>
                                        <TabList sx={{ backgroundColor: "#141414", color: "white", textColor: "white", padding: '8px' }}>
                                          <Tab orientation="vertical" onClick={() => handleOptionSelect("MCQs")}>

                                            MCQ
                                          </Tab>
                                          <Tab orientation="vertical" onClick={() => handleOptionSelect("Linear Scale")}>

                                            Scale
                                          </Tab>
                                          <Tab orientation="vertical" onClick={() => handleOptionSelect("Textbox answer")}>

                                            Text
                                          </Tab>
                                          <div className="align-middle" style={{ justifyContent: "center", marginTop: "7px", marginLeft: "15px" }}>
                                            <Link onClick={handleAddQuestion}>
                                              <SurveyTags tags="Add" />
                                            </Link>
                                          </div>
                                        </TabList>
                                      </Tabs>
                                    </div>
                                  </div>
                                  <div className="card-body d-flex flex-column align-items-center">
                                    <div style={{ width: "100%" }}>
                                      {/* Map each question in the questionList  */}
                                      {questionList?.map((question, index) => {
                                        if (question.type === "textbox") {
                                          return (
                                            <div key={question.id} className="questions" style={{ background: "#141414", marginBottom: "20px", paddingTop: "30px", paddingBottom: "15px", paddingLeft: "30px", paddingRight: "30px", borderRadius: "10px" }}>
                                              <h6 style={{ color: "#79afff", marginBottom: "25px", fontSize: "20px" }}>Question {index + 1}</h6>
                                              <Input
                                                id={`questionName${index}`}
                                                color="neutral"
                                                placeholder="Add a Title..."
                                                onChange={(event) => handleQuestionChange(index, event)}
                                                defaultValue={question.question}
                                                size="lg"
                                                variant="plain"
                                                required="required"
                                                style={{ backgroundColor: "#1b1b1b", border: "none", outline: "none", outlineStyle: 'none', color: "white", width: "100%", marginBottom: "20px" }}
                                              />
                                              {questionList.length > 1 &&
                                                <button className="btn btn-danger btn-sm" type="button"
                                                  onClick={() => handleQuestionRemove(index)}>Delete
                                                </button>
                                              }
                                            </div>
                                          );
                                        }
                                        else if (question.type === "mcq") {
                                          return (
                                            <div key={question.id} style={{ background: "#141414", marginBottom: "20px", paddingTop: "30px", paddingBottom: "15px", paddingLeft: "30px", paddingRight: "30px", borderRadius: "10px" }} >
                                              <h6 style={{ color: "#79afff", marginBottom: "25px", fontSize: "20px" }}>Question {index + 1}</h6>

                                              <Input
                                                id={`questionName${index}`}
                                                color="neutral"
                                                placeholder="Add a Title..."
                                                onChange={(event) => handleQuestionChange(index, event)}
                                                size="lg"
                                                variant="plain"
                                                defaultValue={question.question}
                                                required="required"
                                                style={{ backgroundColor: "#1b1b1b", border: "none", outline: "none", outlineStyle: 'none', color: "white", width: "100%", marginBottom: "5px" }}
                                              />
                                              <br />
                                              {question?.options?.map((option, optionIndex) => (
                                                <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                                                  <Checkbox
                                                    id={`option${optionIndex}`}
                                                    name={`options${optionIndex}`}
                                                    value={option.text}
                                                    onChange={(e) => handleOptionSelect(e)}
                                                    style={{ marginRight: "10px" }}
                                                  />

                                                  <Input
                                                    id={`questionName${index}`}
                                                    color="neutral"
                                                    placeholder={`Option ${optionIndex + 1}`}
                                                    onChange={(e) => handleOptionChange(index, optionIndex, e)}
                                                    value={option.text}
                                                    defaultValue={option}
                                                    size="lg"
                                                    variant="plain"
                                                    required="required"
                                                    style={{ backgroundColor: "#1b1b1b", border: "none", outline: "none", outlineStyle: 'none', color: "white", width: "100%", marginBottom: "5px" }}
                                                  />
                                                  {optionIndex > 1 && (
                                                    <button
                                                      type="button"
                                                      className="btn btn-danger btn-sm"
                                                      onClick={() => handleOptionRemove(index, optionIndex)}
                                                      style={{ marginTop: "15px", marginLeft: "7px", marginRight: "auto", display: "block", height: "auto" }}
                                                    >
                                                      x
                                                    </button>
                                                  )}
                                                </div>

                                              ))}
                                              <button
                                                type="button"
                                                className="btn btn-primary btn-sm"
                                                onClick={() => handleOptionAdd(index)}
                                                style={{ marginBottom: "10px", marginTop: "10px" }}
                                              >
                                                Add option
                                              </button>
                                              {questionList.length > 1 && (
                                                <button
                                                  className="btn btn-danger btn-sm"
                                                  type="button"
                                                  style={{ marginBottom: "10px", marginRight: "34px", paddingLeft: "7px", marginLeft: "10px", marginTop: "10px", paddingRight: "10px" }}
                                                  onClick={() => handleQuestionRemove(index)}
                                                >
                                                  Delete
                                                </button>
                                              )}
                                            </div>
                                          );
                                        }
                                        else if (question.type === "linear") {
                                          return (
                                            <div key={question.id} style={{ background: "#141414", marginBottom: "20px", paddingTop: "30px", paddingBottom: "15px", paddingLeft: "30px", paddingRight: "30px", borderRadius: "10px" }}>
                                              <h6 style={{ color: "#79afff", marginBottom: "25px", fontSize: "20px" }}>Question {index + 1}</h6>

                                              <Input
                                                id={`questionName${index}`}
                                                color="neutral"
                                                placeholder="Add a Title..."
                                                onChange={(event) => handleQuestionChange(index, event)}
                                                defaultValue={question.question}
                                                size="lg"
                                                variant="plain"
                                                required="required"
                                                style={{ backgroundColor: "#1b1b1b", border: "none", outline: "none", outlineStyle: 'none', color: "white", width: "100%", marginBottom: "35px" }}
                                              />

                                              <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }} >
                                                <Slider
                                                  disabled={false}
                                                  marks
                                                  size="lg"
                                                  valueLabelDisplay="on"
                                                  sx={{ width: "95%" }}
                                                  max={10}
                                                  defaultValue={5}
                                                />
                                              </div>
                                              {questionList.length > 1 && (
                                                <button
                                                  className="btn btn-danger btn-sm"
                                                  type="button"
                                                  style={{
                                                    marginTop: "35px",
                                                  }}
                                                  onClick={() => handleQuestionRemove(index)}
                                                >
                                                  Delete
                                                </button>
                                              )}
                                            </div>
                                          );
                                        }
                                        else return null
                                      })}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </TabPanel>
                          <TabPanel value={1} sx={{ p: 2 }}>

                            {/* Display iframe */}
                            <Input
                              color="neutral"
                              placeholder="Add Google Form Link..."
                              onChange={(e) => setGoogleURL(e.target.value)}
                              size="lg"
                              variant="plain"
                              required="required"
                              style={{ backgroundColor: "#1b1b1b", border: "none", outline: "none", outlineStyle: 'none', color: "white", width: "100%", marginBottom: "5px" }}
                              endDecorator={<Button onClick={(e) => handleAddURL(e)}>View</Button>}
                            />

                            {/* Display IFrame  */}
                            {isToggled &&

                              <iframe src={googleURL}
                                width="100%" height="520" frameborder="0" marginheight="0" marginwidth="0" overflow="hidden" style={{ borderRadius: "10px", marginTop: "20px" }}
                              >
                                Loading…
                              </iframe>
                            }

                          </TabPanel>
                        </Tabs>
                      </Box>
                    </div>
                  </div>
                </div >
              </div >

              <Modal
                open={openImage}
                onClose={() => setOpenImage(false)} sx={{ backdropFilter: "blur(1px)", backgroundColor: "rgb(255, 255, 255, 0)" }}>

                <ModalDialog>
                  <ModalClose />
                  <Typography sx={{ marginBottom: "10px" }}>Link To Image</Typography>
                  <Input
                    color="neutral"
                    placeholder="Add Image Link..."
                    onChange={(e) => handleImageChangeTemp(e)}
                    size="lg"
                    variant="plain"
                    required="required"
                    style={{ backgroundColor: "#1b1b1b", border: "none", outline: "none", outlineStyle: 'none', color: "white", width: "100%", marginBottom: "5px" }}
                    endDecorator={<Button onClick={(e) => handleImageChange()}>Add</Button>}
                  />
                </ModalDialog>
              </Modal>

              <Modal
                open={openDate}
                onClose={() => setOpenDate(false)} sx={{ backdropFilter: "blur(1px)", backgroundColor: "rgb(255, 255, 255, 0)", color: "white" }}
              >

                <ModalDialog>
                  <ModalClose />
                  <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <CalendarCSS>
                      <Calendar onChange={setDate} value={date} />
                    </CalendarCSS>
                  </LocalizationProvider>
                  <Button onClick={() => validateDate()}>Add</Button>
                </ModalDialog>
              </Modal>

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
                    Please select up to 3 tags.
                  </Typography>
                  <div className="row d-flex justify-content-center">
                    {(count >= 3 && !sports) ?
                      null : <div className="col-auto justify-content-center">
                        <Link onClick={() => setSports(!sports)}>
                          <SurveyTags tags={"SPORTS"} checked={sports} />
                        </Link>

                      </div>}

                    {(count >= 3 && !music) ?
                      null :
                      <div className="col-auto justify-content-center">
                        <Link onClick={() => setMusic(!music)}>
                          <SurveyTags tags={"MUSIC"} checked={music} />
                        </Link>
                      </div>
                    }
                    {(count >= 3 && !movies) ? null :
                      <div className="col-auto justify-content-center">
                        <Link onClick={() => setMovies(!movies)}>
                          <SurveyTags tags={"MOVIES"} checked={movies} />
                        </Link>
                      </div>
                    }
                    {(count >= 3 && !food) ? null :
                      <div className="col-auto justify-content-center">

                        <Link onClick={() => setFood(!food)}>
                          <SurveyTags tags={"FOOD"} checked={food} />
                        </Link>

                      </div>
                    }
                    {(count >= 3 && !travel) ? null :
                      <div className="col-auto justify-content-center">
                        <Link onClick={() => setTravel(!travel)}>
                          <SurveyTags tags={"TRAVEL"} checked={travel} />
                        </Link>
                      </div>
                    }
                    {(count >= 3 && !fashion) ? null :
                      <div className="col-auto justify-content-center">
                        <Link onClick={() => setFashion(!fashion)}>
                          <SurveyTags tags={"FASHION"} checked={fashion} />
                        </Link>
                      </div>
                    }
                    {(count >= 3 && !technology) ? null :
                      <div className="col-auto justify-content-center">
                        <Link onClick={() => setTech(!technology)}>
                          <SurveyTags tags={"TECHNOLOGY"} checked={technology} />
                        </Link>
                      </div>
                    }
                    {(count >= 3 && !gaming) ? null :
                      <div className="col-auto justify-content-center">
                        <Link onClick={() => setGaming(!gaming)}>
                          <SurveyTags tags={"GAMING"} checked={gaming} />
                        </Link>
                      </div>
                    }
                    {(count >= 3 && !books) ? null :
                      <div className="col-auto justify-content-center">
                        <Link onClick={() => setBooks(!books)}>
                          <SurveyTags tags={"BOOKS"} checked={books} />
                        </Link>
                      </div>
                    }
                    {(count >= 3 && !politics) ? null :
                      <div className="col-auto justify-content-center">
                        <Link onClick={() => setPolitics(!politics)}>
                          <SurveyTags tags={"POLITICS"} checked={politics} />
                        </Link>
                      </div>
                    }
                    {(count >= 3 && !art) ? null :
                      <div className="col-auto justify-content-center">
                        <Link onClick={() => setArt(!art)}>
                          <SurveyTags tags={"ART"} checked={art} />
                        </Link>
                      </div>
                    }
                    {(count >= 3 && !science) ? null :
                      <div className="col-auto justify-content-center">
                        <Link onClick={() => setScience(!science)}>
                          <SurveyTags tags={"SCIENCE"} checked={science} />
                        </Link>
                      </div>
                    }
                    {(count >= 3 && !nature) ? null :
                      <div className="col-auto justify-content-center">
                        <Link onClick={() => setNature(!nature)}>
                          <SurveyTags tags={"NATURE"} checked={nature} />
                        </Link>
                      </div>
                    }
                    {(count >= 3 && !animals) ? null :
                      <div className="col-auto justify-content-center">
                        <Link onClick={() => setAnimals(!animals)}>
                          <SurveyTags tags={"ANIMALS"} checked={animals} />
                        </Link>
                      </div>
                    }
                    {(count >= 3 && !health) ? null :
                      <div className="col-auto justify-content-center">
                        <Link onClick={() => setHealth(!health)}>
                          <SurveyTags tags={"HEALTH"} checked={health} />
                        </Link>
                      </div>
                    }
                    {(count >= 3 && !fitness) ? null :
                      <div className="col-auto justify-content-center">
                        <Link onClick={() => setFitness(!fitness)}>
                          <SurveyTags tags={"FITNESS"} checked={fitness} />
                        </Link>
                      </div>
                    }
                    {(count >= 3 && !education) ? null :
                      <div className="col-auto justify-content-center">
                        <Link onClick={() => setEducation(!education)}>
                          <SurveyTags tags={"EDUCATION"} checked={education} />
                        </Link>
                      </div>
                    }
                    {(count >= 3 && !history) ? null :
                      <div className="col-auto justify-content-center">
                        <Link onClick={() => setHistory(!history)}>
                          <SurveyTags tags={"HISTORY"} checked={history} />
                        </Link>
                      </div>
                    }
                    {(count >= 3 && !religion) ? null :
                      <div className="col-auto justify-content-center">
                        <Link onClick={() => setReligion(!religion)}>
                          <SurveyTags tags={"RELIGION"} checked={religion} />
                        </Link>
                      </div>
                    }
                    {(count >= 3 && !philosophy) ? null :
                      <div className="col-auto justify-content-center">
                        <Link onClick={() => setPhilosophy(!philosophy)}>
                          <SurveyTags tags={"PHILOSOPHY"} checked={philosophy} />
                        </Link>
                      </div>
                    }
                    {(count >= 3 && !psychology) ? null :
                      <div className="col-auto justify-content-center">
                        <Link onClick={() => setPsychology(!psychology)}>
                          <SurveyTags tags={"PSYCHOLOGY"} checked={psychology} />
                        </Link>
                      </div>
                    }
                    {(count >= 3 && !finance) ? null :
                      <div className="col-auto justify-content-center">
                        <Link onClick={() => setFinance(!finance)}>
                          <SurveyTags tags={"FINANCE"} checked={finance} />
                        </Link>
                      </div>
                    }
                    {(count >= 3 && !business) ? null :
                      <div className="col-auto justify-content-center">
                        <Link onClick={() => setBusiness(!business)}>
                          <SurveyTags tags={"BUSINESS"} checked={business} />
                        </Link>
                      </div>
                    }
                    {(count >= 3 && !law) ? null :
                      <div className="col-auto justify-content-center">
                        <Link onClick={() => setLaw(!law)}>
                          <SurveyTags tags={"LAW"} checked={law} />
                        </Link>
                      </div>
                    }
                    {(count >= 3 && !other) ? null :
                      <div className="col-auto justify-content-center">
                        <Link onClick={() => setOther(!other)}>
                          <SurveyTags tags={"OTHER"} checked={other} />
                        </Link>
                      </div>
                    }
                  </div>
                </ModalDialog>
              </Modal>
              
              <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                open={true}
              >
                {type.type == "edit" ?
                  <div className="col">
                    <div className="row gx-4" style={{ paddingTop: "0px" }}>
                      <div className="card-header pb-0" style={{ paddingTop: "0px" }}>
                        <div className="d-flex align-items-end">
                          <>
                            {!saving ? (
                              <button disabled className="btn btn-primary btn ms-auto" style={{ width: "150px", height: "50px" }} onClick={() => editSurvey()}>
                                <span>Save</span>
                              </button>
                            ) :
                              (
                                <button style={{ width: "150px", height: "50px" }} className="btn btn-primary btn ms-auto" disabled>
                                  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" style={{ marginRight: "5px" }}></span>
                                  Saving...
                                </button>
                              )
                            }
                          </>
                        </div>
                      </div>

                    </div>
                  </div> :
                  <div className="d-flex align-items-end flex-column" style={{marginBottom: "10px"}}>
                    <div className="row" style={{ paddingTop: "0px", display: "flex" }}>
                        <div className="d-flex align-items-end">
                            {isImport ?

                              (saving ? <SurveyTags tags="loading" /> :
                                <Link onClick={createSurvey}>
                                  <SurveyTags tags="Create" />
                                </Link>) :
                              (saving ? <SurveyTags tags="loading" /> :
                                <Link onClick={createSurveyDefault}>
                                  <SurveyTags tags="Create" />
                                </Link>)
                            }
                        </div>
                    </div>
                  </div>
                }
              </Snackbar>
            </div > :
            <div id="content">
              <div style={{ justifyContent: 'center', textAlign: 'center', marginLeft: '2rem', marginRight: '2rem', marginBottom: "2rem", marginTop: "30vh" }}>
                <BallTriangle />
              </div>
            </div>}
        </section >
      </main >
    </div >
  ); /* eslint-enable */
};

const CalendarCSS = styled.div`

margin-top: 30px;
margin-bottom: 30px;

.react-calendar { 
  max-width: 100%;
  background-color: #09090d;
  color: #222;
  border-radius: 8px;
  box-shadow: none;
  font-family: Open Sans, Helvetica, sans-serif;
  line-height: 1.125em;
  outline: none;
  border: none;
 }
 .react-calendar__navigation button {
  color: white;
  font-size: 20px;
  min-width: 44px;
  background: #09090d;
  margin-top: 8px;
 }
 .react-calendar__navigation button:enabled:hover,
 .react-calendar__navigation button:enabled:focus {
  background-color: #09090d;
 }
 .react-calendar__navigation button[disabled] {
  background-color: none;
 }
 abbr[title] {
  text-decoration: none;
 }
 /* .react-calendar__month-view__days__day--weekend {
  color: #d10000;
 } */
 .react-calendar__tile:enabled:hover,
 .react-calendar__tile:enabled:focus {
  background: blue;
  color: white;
  border-radius: 6px;
 }
 .react-calendar__tile--now {
  background: blue;
  border-radius: 6px;
  font-weight: bold;
  color: white;
 }
 .react-calendar__tile--now:enabled:hover,
 .react-calendar__tile--now:enabled:focus {
  background: #6f48eb33;
  border-radius: 6px;
  font-weight: bold;
  color: #6f48eb;
 }
 .react-calendar__tile--hasActive:enabled:hover,
 .react-calendar__tile--hasActive:enabled:focus {
  background: none;
  
 }
 .react-calendar__tile--active {
  background: orange;
  border-radius: 6px;
  font-weight: bold;
  color: white;
 }
 .react-calendar__tile--active:enabled:hover,
 .react-calendar__tile--active:enabled:focus {
  background: #6f48eb;
  color: white;
 }
 .react-calendar--selectRange .react-calendar__tile--hover {
  background-color: #f8f8fa;
  color: black;
 }
 .react-calendar__tile--range {
  background: #f8f8fa;
  color: #6f48eb;
  border-radius: 0;
 }
 .react-calendar__tile--rangeStart {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  background: #6f48eb;
  color: white;
 }
 .react-calendar__tile--rangeEnd {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  background: #6f48eb;
  color: white;
 }

`;


export default EditSurvey;