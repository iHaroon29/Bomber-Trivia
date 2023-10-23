import React, { createContext, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import StartPage from './components/StartPage/StartPage';
import JeopardyPage from './components/JeopardyPage/JeopardyPage';

export const QuizDataContext = createContext('');

export default function App() {
  const [quizData, setQuizData] = useState('');

  return (
    <BrowserRouter>
      <QuizDataContext.Provider value={quizData}>
        <Routes>
          <Route path="/" element={<StartPage setQuizData={setQuizData} />} />
          <Route path="/jeopardy" element={<JeopardyPage />} />
        </Routes>
      </QuizDataContext.Provider>
    </BrowserRouter>
  );
}
