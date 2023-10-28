import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import StartPage from './components/StartPage/StartPage'
import JeopardyPage from './components/JeopardyPage/JeopardyPage'
import QuizPage from './components/QuizPage/QuizPage'
import {
  GlobalPlayerContext,
  QuizDataContext,
  AuthContext,
} from './utils/app_context'

import { Protected, Redirect } from './utils/router_utils'

export default function App() {
  const [quizData, setQuizData] = useState('')
  const [playerScore, setPlayerScore] = useState(0)
  const [bombs, setBombs] = useState(0)
  const [mysteryBoxes, setMysteryBoxes] = useState(0)
  const [bombDiffusers, setBombDiffusers] = useState(0)
  const [bombIndexes, setBombIndexes] = useState([])
  const [mysteryBoxesIndexes, setMysteryBoxesIndexes] = useState([])
  const [auth, setAuth] = useState(false)

  return (
    <BrowserRouter>
      <GlobalPlayerContext.Provider
        value={{
          playerScore,
          setPlayerScore,
          bombs,
          setBombs,
          mysteryBoxes,
          bombDiffusers,
          bombIndexes,
          setBombIndexes,
          mysteryBoxesIndexes,
        }}
      >
        <AuthContext.Provider value={auth}>
          <QuizDataContext.Provider value={quizData}>
            <Routes>
              <Route
                path='/'
                element={
                  <StartPage setQuizData={setQuizData} setAuth={setAuth} />
                }
              />
              <Route element={<Protected />}>
                <Route
                  path='/jeopardy'
                  element={
                    <JeopardyPage
                      setBombs={setBombs}
                      setBombIndexes={setBombIndexes}
                      setMysteryBoxes={setMysteryBoxes}
                    />
                  }
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
              </Route>
              <Route path='*' element={<Redirect path='/' />} />
            </Routes>
          </QuizDataContext.Provider>
        </AuthContext.Provider>
      </GlobalPlayerContext.Provider>
    </BrowserRouter>
  )
}
