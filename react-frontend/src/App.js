import Home from './pages/home';
import Error from './pages/error';
import { Route, Routes } from 'react-router-dom';

import { AnimatePresence } from 'framer-motion';
import Dashboard from './pages/dashboard';
import ResearchUserList from './pages/researchUserList';
import CompleteSurvey from './pages/surveyCompletion';
import SurveyReview from './pages/surveyReview';
import EditSurvey from './pages/editSurvey';

import Search from './pages/search';
import SearchParticipating from './pages/searchParticipating';
import SearchCreatedPage from './pages/searchCreated';
import SearchCompleted from './pages/searchCompleted';
import Profile from './pages/profile';
import MyProfile from './pages/myprofile';
import Leaderboard from './pages/leaderboard';

import React, { useState, useEffect, useMemo } from 'react';

export const XContext = React.createContext(null);


export default function App() {

  //state hook to track visibility
  const [x, setX] = useState(true);

  useEffect(() => {
    window.onload = () => {
      if (window.innerWidth <= 1200) {
        setX(false);
      }
    };
  });

  const obj = useMemo(() => ({ x, setX }), [x]);

  return (
    <AnimatePresence exitBeforeEnter>
      <XContext.Provider value={obj}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/complete/survey/:id" element={<CompleteSurvey />} />
          <Route path="/user/create/survey" element={<EditSurvey type="create" />} />
          <Route path="/user/dashboard" element={<Dashboard type="userConfig" />} />
          <Route path="/user/search" element={<Search />} />
          <Route path="/user/search/:profileName" element={<Search />} />
          <Route path="/user/myprofile" element={<MyProfile />} />
          <Route path="/user/profile/:id" element={<Profile />} />
          <Route path="/user/participating/studies" element={<SearchParticipating />} />
          <Route path="/user/created/studies/participants/:id" element={<ResearchUserList />} />
          <Route path="/user/created/studies" element={<SearchCreatedPage />} />
          <Route path="/user/created/studies/edit/:id" element={<EditSurvey type="edit" />} />
          <Route path="/user/completed/studies" element={<SearchCompleted />} />
          <Route path="/user/review/survey/:id" element={<SurveyReview />} />
          <Route path="/user/review/survey/:id/:user" element={<SurveyReview />} />
          <Route path="/user/leaderboard" element={<Leaderboard />} />
          <Route path="/error" element={<Error />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      </XContext.Provider>
    </AnimatePresence>
  );
}