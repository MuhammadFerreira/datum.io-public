import axios from "axios";
import Cookies from 'js-cookie';
import AuthService from "./auth.service";

const API_URL = process.env.REACT_APP_API_BASE_URL+`/api`;

const getSurveys = async (id) => {

  AuthService.refreshToken();
  const user = JSON.parse(Cookies.get("user"));
  let header = null;
  if (user && user.access_token) {
    header = 
    {
        headers : { "Authorization": "Bearer " + user.access_token } 
    };
  }

  return (await axios.get(API_URL + "/surveys/"+id, header)).data;
};

const getActiveSurveyCount = async () => {

  AuthService.refreshToken();
  const user = JSON.parse(Cookies.get("user"));
  let header = null;
  if (user && user.access_token) {
    header = 
    {
        headers : { "Authorization": "Bearer " + user.access_token }
    };
  }
 
  return (await axios.get(API_URL + "/count/active/surveys", header)).data;
};

const getSurveyCount = async () => {

  AuthService.refreshToken();
  const user = JSON.parse(Cookies.get("user"));
  let header = null;
  if (user && user.access_token) {
    header = 
    {
        headers : { "Authorization": "Bearer " + user.access_token }
    };
  }

  return (await axios.get(API_URL + "/count/surveys", header)).data;
};

const getSurvey = async (id) => {
  AuthService.refreshToken();
  const user = JSON.parse(Cookies.get("user"));
  let header = null;
  if (user && user.access_token) {
    header = 
    {
        headers : { "Authorization": "Bearer " + user.access_token }
    };
  }
  

  return (await axios.get(API_URL + "/survey/"+id, header)).data;
};

const getUserInfo = async (id) => {

  AuthService.refreshToken();
  const user = JSON.parse(Cookies.get("user"));
  let header = null;
  if (user && user.access_token) {
    header = 
    {
        headers : { "Authorization": "Bearer " + user.access_token }
    };
  }

  return (await axios.get(API_URL + "/user/"+id, header)).data;
};

const getUserRankInfo = async (id) => {

  AuthService.refreshToken();
  const user = JSON.parse(Cookies.get("user"));
  let header = null;
  if (user && user.access_token) {
    header = 
    {
        headers : { "Authorization": "Bearer " + user.access_token }
    };
  }

  return (await axios.get(API_URL + "/user/rank/"+id, header)).data;
};


const getParticipatedSurveys = async (id) => {
  AuthService.refreshToken();
  const user = JSON.parse(Cookies.get("user"));
  let header = null;
  if (user && user.access_token) {
    header = 
    {
        headers : { "Authorization": "Bearer " + user.access_token }
    };
  }

  return (await axios.get(API_URL + "/surveys/participated/"+id, header)).data;
};

const getCompletedSurveys = async (id) => {
  AuthService.refreshToken();
  const user = JSON.parse(Cookies.get("user"));
  let header = null;
  if (user && user.access_token) {
    header = 
    {
        headers : { "Authorization": "Bearer " + user.access_token }
    };
  }

  return (await axios.get(API_URL + "/surveys/completed/"+id, header)).data;
};

const getSurveyParticipants = async (id) => {
  AuthService.refreshToken();
  const user = JSON.parse(Cookies.get("user"));
  let header = null;
  if (user && user.access_token) {
    header = 
    {
        headers : { "Authorization": "Bearer " + user.access_token }
    };
  }

  return (await axios.get(API_URL + "/participants/"+id, header)).data;
};

const getCreatedSurveys = async (id) => {
  AuthService.refreshToken();
  const user = JSON.parse(Cookies.get("user"));
  let header = null;
  if (user && user.access_token) {
    header = 
    {
        headers : { "Authorization": "Bearer " + user.access_token }
    };
  }

  return (await axios.get(API_URL + "/surveys/created/"+id, header)).data;
};

const getAnswers = async (surveyId, userId) => {
  AuthService.refreshToken();
  const user = JSON.parse(Cookies.get("user"));
  let header = null;
  if (user && user.access_token) {
    header = 
    {
        headers : { "Authorization": "Bearer " + user.access_token }
    };
  }

  return (await axios.get(API_URL + "/get/answers/"+surveyId+"/"+userId, header)).data;
};


const getNotifications = async (surveyId) => {
  AuthService.refreshToken();
  const user = JSON.parse(Cookies.get("user"));
  let header = null;
  if (user && user.access_token) {
    header = 
    {
        headers : { "Authorization": "Bearer " + user.access_token }
    };
  }

  return (await axios.get(API_URL + "/survey/get/notification/"+surveyId, header)).data;
};



const getTop30UserPoints = async () => {

  AuthService.refreshToken();
  const user = JSON.parse(Cookies.get("user"));
  let header = null;
  if (user && user.access_token) {
    header = 
    {
        headers : { "Authorization": "Bearer " + user.access_token }
    };
  }

  return (await axios.get(API_URL + "/get/top30Users", header)).data;
};

const userService = {
  getSurveys,
  getUserInfo,
  getSurvey,
  getParticipatedSurveys,
  getSurveyParticipants,
  getCompletedSurveys,
  getCreatedSurveys,
  getActiveSurveyCount,
  getSurveyCount,
  getAnswers,
  getNotifications,
  getTop30UserPoints, 
  getUserRankInfo,
};

export default userService;