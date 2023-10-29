import React, { useContext, useState, useEffect, useRef } from 'react'
import { GlobalPlayerContext, QuizDataContext } from '../../utils/app_context'
import { useNavigate } from 'react-router-dom'

const JeopardyPage = (props) => {
  const [selectedQuestion, setSelectedQuestion] = useState({})
  const navigate = useNavigate()
  const quizDataString = useContext(QuizDataContext)
  const quizData = JSON.parse(quizDataString) // .trim()might be needed.
  const { playerScore, setPlayerScore, bombIndexes, setBombIndexes, mysteryBoxesIndexes, setMysteryBoxesIndexes } =
    useContext(GlobalPlayerContext)
  const { clickedButtons, setClickedButtons } = useContext(GlobalPlayerContext)
  const [isLastQuestion, setIsLastQuestion] = useState(false)
  const [divHeight, setDivHeight] = useState(0)
  const divRef = useRef(null)

  useEffect(() => {
    // console.log(quizDataString)
  }, [quizDataString])

  useEffect(() => {
    if (!bombIndexes.length) {
      const randomBombIndex = Math.floor(Math.random() * 6)
      let randomMysteryBoxIndex;

      do {randomMysteryBoxIndex = Math.floor(Math.random() * 6)}
      while (randomMysteryBoxIndex === randomBombIndex)

      setBombIndexes([randomBombIndex])
      setMysteryBoxesIndexes([randomMysteryBoxIndex])
    }
    // console.log(bombIndexes)
  }, [bombIndexes, setBombIndexes])

  useEffect(() => {
    // console.log('clickedButtons:', clickedButtons)
    if (clickedButtons.length === 5) {
      setIsLastQuestion(true)
    }
  }, [clickedButtons])

  useEffect(() => {
    if (divRef.current) {
      const h2Tags = divRef.current.querySelectorAll('h2')
      let maxHeight = 0
      h2Tags.forEach((h2) => {
        maxHeight = Math.max(maxHeight, h2.offsetHeight)
      })
      setDivHeight(maxHeight + 20)
    }
  }, [divRef])

  const handleQuestionClick = (
    category,
    difficulty,
    questionData,
    index,
    questionIndex
  ) => {
    setSelectedQuestion({ category, difficulty, questionData })
    const isBomb = bombIndexes.includes(index * 3 + questionIndex)
    const isMysteryBox = mysteryBoxesIndexes.includes(index * 3 + questionIndex)
    navigate('/quiz', { state: { category, difficulty, questionData, isBomb, isMysteryBox, isLastQuestion } })
    setClickedButtons((prevClickedButtons) => [
      ...prevClickedButtons,
      `${category}-${difficulty}-${questionIndex}`,
    ])
    // console.log('clickedButtons:', clickedButtons)
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
        Bomber Trivia
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
                <div className='flex flex-col' style={{height: 110}} ref={divRef}>
                <div className='flex-grow'></div>
                <h2 className='text-lg font-bold mb-2 text-center text-white pt-4' style={{ alignItems: 'center' }}>
                  {category}
                </h2>
                <div className='flex-grow'></div>
                </div>
                <div className='mb-8'>
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