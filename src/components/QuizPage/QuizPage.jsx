import React, { useState, useEffect, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { GlobalPlayerContext, QuizDataContext } from '../../utils/app_context'
import { Player } from '@lottiefiles/react-lottie-player';

const QuizPage = () => {
  const selectedQuestion = useLocation().state
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [message, setMessage] = useState(null)
  const navigate = useNavigate()
  const [disabled, setDisabled] = useState(false)
  const [selected, setSelected] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [gameWin, setGameWin] = useState(false)
  const { playerScore, setPlayerScore } = useContext(GlobalPlayerContext)
  const [isLastQuestion, setIsLastQuestion] = useState(selectedQuestion.isLastQuestion)

  const quizDataString = useContext(QuizDataContext)
  const quizData = JSON.parse(quizDataString.trim())

  useEffect(() => {
    console.log('isLastQuestion:', isLastQuestion)
  }, [isLastQuestion])

  useEffect(() => {
    console.log(selectedQuestion)
    console.log('isBomb:', selectedQuestion.isBomb)
  }, [selectedQuestion])

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer)
    setDisabled(true)
    setSelected(true)
    if (answer === selectedQuestion.questionData.Answer) {
      const pointValue = getPointValue(selectedQuestion.difficulty)
      setPlayerScore((prevScore) => prevScore + pointValue)
      if (isLastQuestion) {
        const finalScore = playerScore + pointValue
        setMessage(`Correct! You've completed the quiz! Your final score is ${finalScore} points.`)
        setGameWin(true)
      } else {
        setMessage('Correct!')
      }
    } else {
      if (selectedQuestion.isBomb) {
        setMessage('Game over! You answered a bomb question incorrectly.')
        setGameOver(true)
      } else if (isLastQuestion) {
        setMessage(`Incorrect! You've completed the quiz! Your final score is ${playerScore} points.`)
        setGameWin(true)
      } else {
        setMessage('Incorrect!')
      }
    }
  }

  const handleBackClick = () => {
    navigate('/jeopardy')
  }

  const handleEndGameClick = () => {
    setPlayerScore(0)
    navigate('/')
  }

  const getPointValue = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 50
      case 'Medium':
        return 100
      case 'Hard':
        return 200
      default:
        return ''
    }
  }

  useEffect(() => {
    console.log('Player score:', playerScore)
  }, [playerScore])

  return (
    <div>
      <h1 className='text-center py-6 font-bold text-3xl text-white'>
        Bomber Trivia
      </h1>
      <div className='bg-black py-1'>
        <div className='flex flex-col justify-center text-white'>
          <h2 className='text-center'>{selectedQuestion.category}</h2>
          <h2 className='text-center'>
            Difficulty - {selectedQuestion.difficulty}
          </h2>
        </div>
      </div>
      <div className='flex justify-center quiz-page'>
        <div style={{ width: 632 }}>
          <h2 className='text-center font-bold text-2xl px-4 py-6 text-white quiz-container'>
            {selectedQuestion.isBomb ? (
              <span className='text-red-500'>BOMB QUESTION: </span>
            ) : null}
            {selectedQuestion.questionData.Question}
          </h2>{' '}
          <div className='flex flex-col gap-4 px-4 flex-grow'>
            {selectedQuestion.questionData.MultipleChoice.map(
              (answer, index) => (
                <button
                  key={index}
                  className={`test-class bg-gray-100 p-2 rounded-lg flex justify-center items-center h-16 ${selectedAnswer === answer && selected ? 'bg-blue-200' : ''
                    } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => handleAnswerClick(answer)}
                  disabled={disabled}
                >
                  <div className='text-center'>{answer}</div>
                </button>
              )
            )}
          </div>
        </div>
        {message && (
          <div className='fixed bottom-0 w-full flex flex-col items-center px-4 py-8'>
            {selectedQuestion.isBomb && gameOver ? (
              <Player
                autoplay
                loop
                src="https://lottie.host/2f5f32ff-0c6c-47b8-b14f-bea883642bb5/EuCBeqTKvT.json"
                style={{ height: '400px', width: '400px' }}
                background='transparent'
                speed='1'
                direction='1' mode='normal'
              >
              </Player>
            ) : null}
            {isLastQuestion && gameWin ? (
              <Player
                autoplay
                loop
                src="https://lottie.host/b13af99c-e15d-4586-a4b9-f362b22f17b6/SwJ3TvgeYl.json"
                style={{ height: '400px', width: '400px' }}
                background='transparent'
                speed='1'
                direction='1' mode='normal'
              >
              </Player>
            ) : null}
            <p className='text-xl pb-20 text-white text-center'>{message}</p>
            {isLastQuestion || gameOver ? (
              <button
                className={`bg-red-700 text-white p-2 rounded-lg flex justify-center items-center h-16 text-black font-bold w-full`}
                style={{ maxWidth: 600 }}
                onClick={handleEndGameClick}
              >
                BACK TO START
              </button>
            ) : (
              <button
                className={`bg-green-700 text-white p-2 rounded-lg flex justify-center items-center h-16 text-black font-bold w-full`}
                style={{ maxWidth: 600 }}
                onClick={handleBackClick}
              >
                BACK TO TRIVIA BOARD
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default QuizPage
