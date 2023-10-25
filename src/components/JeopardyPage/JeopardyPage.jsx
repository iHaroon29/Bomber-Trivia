import React, { useContext, useState, useEffect } from 'react'
import { GlobalPlayerContext, QuizDataContext } from '../../utils/app_context'
import { useNavigate } from 'react-router-dom'

const JeopardyPage = (props) => {
  const [selectedQuestion, setSelectedQuestion] = useState({})
  const navigate = useNavigate()
  const quizDataString = useContext(QuizDataContext)
  const quizData = JSON.parse(quizDataString.trim())

  useEffect(() => {}, [quizData])

  const handleQuestionClick = (category, difficulty, questionData) => {
    setSelectedQuestion({ category, difficulty, questionData })
    navigate('/quiz', { state: { category, difficulty, questionData } })
  }

  const getPointValue = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return '+50'
      case 'Medium':
        return '+100'
      case 'Hard':
        return '+200'
      default:
        return ''
    }
  }

  return (
    <div>
      <h1 className='text-center py-6 font-bold text-3xl text-white'>Personalized Trivia</h1>
      <div className='bg-black py-1'>
        <div className='flex flex-col justify-center text-white'>
          <h2 className='text-center'>xx</h2>
          <h2 className='text-center'>xx</h2>
        </div>
      </div>
      <div className='grid grid-cols-2 gap-4 px-4'>
        {Object.entries(quizData).map(([category, questions]) => (
          <div key={category}>
            <h2 className='text-lg font-bold mb-2 text-center text-white pt-4'>{category}</h2>
            <div>
              {Object.keys(questions).map((difficulty) => (
                <div key={difficulty} className='mb-4'>
                  <button
                    className='cursor-pointer hover:bg-gray-200 p-2 rounded-lg flex justify-center items-center h-40 w-full bg-gray-100 p-4 rounded-lg'
                    onClick={() =>
                      handleQuestionClick(
                        category,
                        difficulty,
                        questions[difficulty]
                      )
                    }
                  >
                    {getPointValue(difficulty)}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default JeopardyPage
