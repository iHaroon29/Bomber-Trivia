import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import StartPage from './components/StartPage/StartPage'
import JeopardyPage from './components/JeopardyPage/JeopardyPage'
import QuizPage from './components/QuizPage/QuizPage'
import { GlobalPlayerContext, QuizDataContext } from './utils/app_context'

export default function App() {
  const [quizData, setQuizData] = useState('')
  const [playerScore, setPlayerScore] = useState(0)
  const [bombs, setBombs] = useState(0)
  const [mysteryBoxes, setMysteryBoxes] = useState(0)
  const [bombDiffusers, setBombDiffusers] = useState(0)
  return (
    <BrowserRouter>
      <GlobalPlayerContext.Provider
        value={{ playerScore, bombs, mysteryBoxes, bombDiffusers }}
      >
        <QuizDataContext.Provider value={quizData}>
          <Routes>
            <Route path='/' element={<StartPage setQuizData={setQuizData} />} />
            <Route
              path='/jeopardy'
              element={<JeopardyPage setBombs={setBombs} />}
            />
            <Route
              path='/quiz'
              element={
                <QuizPage
                  setPlayerScore={setPlayerScore}
                  setBombDiffusers={setBombDiffusers}
                />
              }
            />
          </Routes>
        </QuizDataContext.Provider>
      </GlobalPlayerContext.Provider>
    </BrowserRouter>
  )
}
