import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'

const QuizPage = () => {
    const selectedQuestion = useLocation().state;
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [message, setMessage] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {
        console.log(selectedQuestion);
    }, [selectedQuestion]);

    const handleAnswerClick = (answer) => {
        setSelectedAnswer(answer);
        if (answer === selectedQuestion.questionData.Answer) {
            setMessage('Correct!');
        } else {
            setMessage('Incorrect!');
        }
    };

    const handleBackClick = () => {
        navigate('/jeopardy');
    };

    return (
        <div>
            <h2>Category: {selectedQuestion.category}</h2>
            <h2>Difficulty: {selectedQuestion.difficulty}</h2>
            <h2>Question: {selectedQuestion.questionData.Question}</h2>
            <h2>Multiple Choice Answers:</h2>
            <div className="flex flex-col gap-4">
                {selectedQuestion.questionData.MultipleChoice.map((answer, index) => (
                    <button key={index} className={`bg-white hover:bg-gray-200 p-2 rounded-lg flex justify-center items-center h-16 border ${selectedAnswer === answer ? 'border-gray-200' : 'border-gray-400'}`} onClick={() => handleAnswerClick(answer)}>
                        <div className="text-center">{answer}</div>
                    </button>
                ))}
            </div>
            {message && (
                <div className="mt-4 flex flex-col items-center">
                    <p className="text-2xl font-bold">{message}</p>
                    <button className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded" onClick={handleBackClick}>Back to Jeopardy Board</button>
                </div>
            )}
        </div>
    );
};

export default QuizPage;