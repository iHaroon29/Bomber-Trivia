import React from 'react';
import { useLocation } from 'react-router-dom';

const QuizPage = () => {
    const location = useLocation();
    const { category, difficulty, questionData } = location.state;

    return (
        <div>
            <h1>Quiz Page</h1>
            <h2>Category: {category}</h2>
            <h2>Difficulty: {difficulty}</h2>
            <h2>Question: {questionData.Question}</h2>
            <h2>Multiple Choice Answers:</h2>
            <ul>
                {questionData.MultipleChoice.map((answer, index) => (
                    <li key={index}>{answer}</li>
                ))}
            </ul>
        </div>
    );
};

export default QuizPage;