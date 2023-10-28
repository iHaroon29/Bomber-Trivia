import React, { useContext, useState, useEffect } from 'react'
import { GlobalPlayerContext, QuizDataContext } from '../../utils/app_context'
import { useNavigate } from 'react-router-dom'

const JeopardyPage = (props) => {
  const [selectedQuestion, setSelectedQuestion] = useState({})
  const navigate = useNavigate()
  const quizDataString = useContext(QuizDataContext)
  const quizData = JSON.parse(quizDataString) // .trim()might be needed.
  const { playerScore, setPlayerScore, bombIndexes, setBombIndexes } =
    useContext(GlobalPlayerContext)
  const { clickedButtons, setClickedButtons } = useContext(GlobalPlayerContext)

  useEffect(() => {
    console.log(quizDataString)
  }, [quizDataString])

  useEffect(() => {
    if (!bombIndexes.length) {
      const randomIndex = Math.floor(Math.random() * 6)
      setBombIndexes([randomIndex])
    }
    console.log(bombIndexes)
  }, [bombIndexes, setBombIndexes])

  useEffect(() => {
    console.log('clickedButtons:', clickedButtons)
  }, [clickedButtons])

  const handleQuestionClick = (
    category,
    difficulty,
    questionData,
    index,
    questionIndex
  ) => {
    setSelectedQuestion({ category, difficulty, questionData })
    const isBomb = bombIndexes.includes(index * 3 + questionIndex)
    navigate('/quiz', { state: { category, difficulty, questionData, isBomb } })
    setClickedButtons((prevClickedButtons) => [
      ...prevClickedButtons,
      `${category}-${difficulty}-${questionIndex}`,
    ])
    console.log('clickedButtons:', clickedButtons)
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
      <h1 className='text-center py-6 font-bold text-3xl text-white'>
        Personalized Trivia
      </h1>
      <div className='bg-black py-1'>
        <div className='flex flex-col justify-center text-white'>
          <h2 className='text-center py-3'>Points: {playerScore} </h2>
          {/* <h2 className='text-center'>xx</h2> */}
        </div>
      </div>
      <div className='flex justify-center'>
        <div style={{ width: 368 }}>
          <div className='grid grid-cols-2 gap-4 px-4'>
            {Object.entries(quizData).map(([category, questions], index) => (
              <div key={category}>
                <h2 className='text-lg font-bold mb-2 text-center text-white pt-4'>
                  {category}
                </h2>
                <div>
                  {Object.keys(questions).map((difficulty, questionIndex) => (
                    <div key={difficulty} className='mb-4'>
                      <button
                        className={`cursor-pointer hover:bg-gray-200 p-2 rounded-lg flex justify-center items-center h-40 w-full bg-gray-100 p-4 rounded-lg ${
                          clickedButtons.includes(
                            `${category}-${difficulty}-${questionIndex}`
                          )
                            ? 'opacity-50 cursor-not-allowed'
                            : ''
                        }`}
                        onClick={() =>
                          handleQuestionClick(
                            category,
                            difficulty,
                            questions[difficulty],
                            index,
                            questionIndex
                          )
                        }
                        disabled={clickedButtons.includes(
                          `${category}-${difficulty}-${questionIndex}`
                        )}
                      >
                        {getPointValue(difficulty)}
                      </button>
                      {/* {bombIndexes.includes(index * 3 + questionIndex) && (
                        <div className="text-center text-red-500 font-bold">BOMB!</div>
                      )} */}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default JeopardyPage
