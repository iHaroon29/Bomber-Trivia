import React, { createContext, useState } from 'react';
import StartPage from './components/StartPage/StartPage';
import JeopardyPage from './components/JeopardyPage/JeopardyPage';

export const QuizDataContext = createContext('');

export default function App() {
  const [quizData, setQuizData] = useState('');

  return (
    <QuizDataContext.Provider value={quizData}>
      <StartPage setQuizData={setQuizData} />
      <JeopardyPage />
    </QuizDataContext.Provider>
  );
}