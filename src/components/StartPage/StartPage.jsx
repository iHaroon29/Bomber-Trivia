import React, { useRef, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { postData } from '../../utils/axios_utils'
import './StartPage.css'
import { useErrorBoundary } from 'react-error-boundary'
import logo from '../../assets/logo-transparent.png';
import mockJson from '../../mocks/quiz-data.json';

const StartPage = (props) => {
  const { showBoundary } = useErrorBoundary()
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
      const response = await postData('https://api.openai.com/v1/chat/completions', {
        messages: [{
          role: 'system',
          content: `Generate a JSON object for me which will contain quiz data for the topic of ${inputRef.current?.value}.
        The JSON object MUST always has 2 categories based on the topic of ${inputRef.current?.value}, with 3 questions per category, for a total of 6 questions which is MANDATORY.
        The JSON object MUST follows this JSON structure but the content MUST be based on the topic of ${inputRef.current?.value}:
        ${JSON.stringify(mockJson)}`
        }],
        model: "gpt-4",
        temperature: 0.1,
      })
      if (response.data.choices && response.data.choices.length > 0) {
        setGeneratedText(response.data.choices[0].message.content)
        props.setQuizData(response.data.choices[0].message.content)
        props.setAuth(true)
        navigate('/jeopardy')
      } else {
        throw new Error('Error: Could not generate text')
      }
    } catch (error) {
      showBoundary(error.message)
    }

    setIsLoading(false)
  }

  return (
    <div className='flex flex-col h-screen justify-center items-center p-8 justify-start'>
      <h1 className='text-4xl font-bold text-center mb-4 text-white heading1'>
        Bomber Trivia
      </h1>
      <img src={logo} alt='Logo' style={{ width: '200px', height: '200px' }} className='mb-4' />
      <div className='bg-gray-100 rounded mb-8 p-4 container-width'>
        <h2 className='text-lg text-center'>
          Get ready for <strong>Bomber Trivia</strong>! The personalized
          Trivia game inspired by Jeopardy but with a twist 💣 🔧
        </h2>
        {/* </div> */}
        {/* <div className='bg-gray-100 rounded mb-8 p-2'> */}
        <h2 className='text-lg text-center pt-8'>
          <strong>Beware of the hidden bombs</strong>. If you stumble across one
          and answer incorrectly, you will lose the game.
        </h2>
        {/* <h2 className='text-lg text-center pt-8'>
        To play, enter a topic and press <strong>PLAY</strong>
      </h2> */}
      </div>
      {/* <h2 className='text-lg text-center mb-8 text-white'>---</h2> */}
      {/* <h2 className='text-lg text-center mb-8 text-white'>
        To start, enter a topic and press <strong>START</strong>
      </h2> */}
      <div className='w-full max-w-lg'>
        <div className='flex flex-col'>
          <input
            className='text-center py-4 appearance-none bg-gray-200 border-none rounded-t-md w-full text-gray-700 mr-3 py-1 px-4 leading-tight focus:outline-none'
            type='text'
            placeholder='Enter Topic'
            aria-label='Full name'
            ref={inputRef}
            onKeyDown={handleKeyDown}
          />
          <button
            className='py-4 flex-shrink-0 bg-green-700 hover:bg-green-900 border-green-700 hover:border-green-900 text-sm border-4 text-white py-1 px-2 rounded-b-md w-full'
            type='button'
            onClick={() => {
              generateText()
            }}
            disabled={isLoading}
          >
            <div className='flex justify-center'>
              {isLoading ? <div className='spinner'></div> : 'PLAY'}
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default StartPage
