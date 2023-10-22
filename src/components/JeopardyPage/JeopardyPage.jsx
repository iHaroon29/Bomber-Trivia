import React, { useContext } from 'react';
import { QuizDataContext } from '../../App';

const JeopardyPage = () => {
  const quizData = useContext(QuizDataContext);

  return (
    <div>
      <h1>Jeopardy Page</h1>
      <p>{quizData}</p>
    </div>
  );
};

export default JeopardyPage;