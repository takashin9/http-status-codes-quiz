import { useState } from 'react'
import './App.css'
import data from './assets/data.json'

const QuizQuestion = () => {
  const [quizNumber, setQuizNumber] = useState(0);
  const question = data[quizNumber].Value;
  const correctAnswer = data[quizNumber].Description;
  const [userAnswer, setUserAnswer] = useState('');

  const handleInputChange = (e) => {
    setUserAnswer(e.target.value);
  }

  const handleKeyPress = (e) => {
    if (e.nativeEvent.isComposing || e.key !== 'Enter') return;
    if (e.target.value === '' && Object.keys(data).length - 1 !== quizNumber) setQuizNumber((quizNumber) => quizNumber + 1);
    checkAnswer();
  }

  const checkAnswer = () => {
    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
      if (Object.keys(data).length - 1 !== quizNumber) {
        setQuizNumber((quizNumber) => quizNumber + 1);
      }
      setUserAnswer('');
    }
  }

  return (
    <div>
      <h1>{question}</h1>
      <input type="text" value={userAnswer} onChange={handleInputChange} onKeyDown={handleKeyPress}/>
    </div>
  )
}

function App() {
  return (
    <>
      <QuizQuestion />
    </>
  )
}

export default App
