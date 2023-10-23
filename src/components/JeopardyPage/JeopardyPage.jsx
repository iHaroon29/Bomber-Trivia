import React, { useContext, useState, useEffect } from 'react';
import { QuizDataContext } from '../../App';
import { useNavigate } from 'react-router-dom';

const JeopardyPage = () => {
    const [selectedQuestion, setSelectedQuestion] = useState({});
    const navigate = useNavigate();
    const quizDataString = useContext(QuizDataContext);
    const quizData = JSON.parse(quizDataString.trim());
    
    useEffect(() => {
    }, [quizData]);

    const handleQuestionClick = (category, difficulty, questionData) => {
        setSelectedQuestion({ category, difficulty, questionData });
        navigate('/quiz', { state: { category, difficulty, questionData } });
    };

    const getPointValue = (difficulty) => {
        switch (difficulty) {
            case 'Easy':
                return '+50';
            case 'Medium':
                return '+100';
            case 'Hard':
                return '+200';
            default:
                return '';
        }
    };

    return (
        <div className="grid grid-cols-2 gap-4">
            {Object.entries(quizData).map(([category, questions]) => (
                <div key={category}>
                    <h2 className="text-lg font-bold mb-2 text-center">{category}</h2>
                    <div className="bg-gray-100 p-4 rounded-lg">
                        {Object.keys(questions).map((difficulty) => (
                            <div key={difficulty} className="mb-4">
                                <div
                                    className="cursor-pointer hover:bg-gray-200 p-2 rounded-lg flex justify-center items-center h-16"
                                    onClick={() => handleQuestionClick(category, difficulty, questions[difficulty])}
                                >
                                    {getPointValue(difficulty)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default JeopardyPage;