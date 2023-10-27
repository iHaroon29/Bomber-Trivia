import React, { useState, useEffect, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { GlobalPlayerContext, QuizDataContext } from '../../utils/app_context'

const QuizPage = () => {
  const selectedQuestion = useLocation().state
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [message, setMessage] = useState(null)
  const navigate = useNavigate()
  const [disabled, setDisabled] = useState(false);
  const [selected, setSelected] = useState(false);
  const { playerScore, setPlayerScore } = useContext(GlobalPlayerContext);

  const quizDataString = useContext(QuizDataContext)
  const quizData = JSON.parse(quizDataString.trim())

  useEffect(() => {
    console.log(selectedQuestion)
  }, [selectedQuestion])

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    setDisabled(true);
    setSelected(true);
    if (answer === selectedQuestion.questionData.Answer) {
      const pointValue = getPointValue(selectedQuestion.difficulty);
      setPlayerScore((prevScore) => prevScore + pointValue);
      setMessage('Correct!')
    } else {
      setMessage('Incorrect!')
    }
  }

  const handleBackClick = () => {
    navigate('/jeopardy')
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
      <h1 className='text-center py-6 font-bold text-3xl text-white'>Personalized Trivia</h1>
      <div className='bg-black py-1'>
        <div className='flex flex-col justify-center text-white'>
          <h2 className='text-center'>{selectedQuestion.category}</h2>
          <h2 className='text-center'>Difficulty - {selectedQuestion.difficulty}</h2>
        </div>
      </div>
      <h2 className='text-center font-bold text-2xl px-4 py-6 text-white'>{selectedQuestion.questionData.Question}</h2>
      <div className="flex flex-col gap-4 px-4 flex-grow">
        {selectedQuestion.questionData.MultipleChoice.map((answer, index) => (
          <button key={index} className={`bg-gray-100 p-2 rounded-lg flex justify-center items-center h-16 ${selectedAnswer === answer && selected ? 'bg-blue-200' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={() => handleAnswerClick(answer)} disabled={disabled}>
            <div className="text-center">{answer}</div>
          </button>
        ))}
      </div>
      {message && (
        <div className="fixed bottom-0 w-full flex flex-col items-center px-4 py-8">
          <p className="text-xl pb-20 text-white">{message}</p>
          <button className={`bg-green-700 text-white p-2 rounded-lg flex justify-center items-center h-16 text-black font-bold w-full`} onClick={handleBackClick}>
            BACK TO TRIVIA BOARD
          </button>
        </div>
      )}
    </div>
  )
}

export default QuizPage