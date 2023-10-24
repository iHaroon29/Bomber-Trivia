import React, { useRef, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { postData } from '../../utils/axios_utils'
import './StartPage.css'

const StartPage = (props) => {
  const [generatedText, setGeneratedText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef(null)
  const navigate = useNavigate()

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      generateText()
    }
  }

  const generateText = async () => {
    if (inputRef.current && inputRef.current.value === '') {
      return
    }

    setIsLoading(true)

    try {
      const response = await postData('/completions', {
        prompt: `Please remember, I only want 1 and only 1 json object in your reply, only a json object, no other descriptive text. Make sure the json structure is category, then difficulty, with the first letters capitalized for the JSON keys, and the amount of text provided is minimal. Create a quiz with multiple choice answers for ${inputRef.current?.value}. Generate 2 quiz categories for ${inputRef.current?.value} with 3 levels of difficulty from easiest to hardest, and 3 questions per category, for a total of 6 questions. Return the quiz data in JSON format. The JSON object should have 1 object per category, with 3 questions per category where the difficulty is easy, medium, and hard. The categories should be named appropriate bubble title names. Each question should have a "Question" field, a "MultipleChoice" field with an array of 4 possible answers, and an "Answer" field with the correct answer. Make sure the categories are named properly. Make sure it's only a JSON object that you return, with no other text or fluff. Make sure you respond with 1 and only 1 json object. Please make sure that 100% of the time, you respond with 1 and only 1 json object, so that I can consume this JSON in my frontend app with no risks of errors. Please remember, I only want 1 and only 1 json object in your reply, only a json object, no other descriptive text.`,
        max_tokens: 2056,
        model: 'text-davinci-003',
      })
      if (response.data.choices && response.data.choices.length > 0) {
        setGeneratedText(response.data.choices[0].text)
        props.setQuizData(response.data.choices[0].text)
        props.setAuth(true)
        navigate('/jeopardy')
      } else {
        setGeneratedText('Error: Could not generate text')
      }
    } catch (error) {
      console.error(error)
      setGeneratedText('Error: Could not generate text')
    }

    setIsLoading(false)
  }

  return (
    <div className='flex flex-col h-screen justify-center items-center p-8'>
      <h1 className='text-4xl font-bold text-center mb-16 text-white'>Personalized Trivia</h1>
      <h2 className='text-lg text-center mb-8 text-white'>
        Get ready for Jeopardy AI, the personalized version of Jeopardy with a
        twist!
      </h2>
      <h2 className='text-lg text-center mb-8 text-white'>---</h2>
      <h2 className='text-lg text-center mb-8 text-white'>
        To start, enter a theme and press <strong>START</strong>
      </h2>
      <div className='w-full max-w-md'>
        <div className='flex items-center border-b border-b-2 border-teal-500 py-2'>
          <input
            className='appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none'
            type='text'
            placeholder='Enter Text'
            aria-label='Full name'
            ref={inputRef}
            onKeyDown={handleKeyDown}
          />
          <button
            className='flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded'
            type='button'
            onClick={() => {
              generateText()
            }}
            disabled={isLoading}
          >
            {isLoading ? <div className='spinner'></div> : 'START'}
          </button>
        </div>
      </div>

      {/* <div className="mt-8">
                {generatedText}
            </div> */}
    </div>
  )
}

export default StartPage
