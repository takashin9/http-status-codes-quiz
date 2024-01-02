import { useState } from 'react'
import './App.css'
import data from './assets/data.json'



function App() {
  const [quizNumber, setQuizNumber] = useState(0);
  const question = data[quizNumber].Value;
  const correctAnswer = data[quizNumber].Description;
  const [userAnswer, setUserAnswer] = useState('');

  const [numberOfCorrectAnswer, setNumberOfCorrectAnswer] = useState(0);
  const [numberOfIncorrectAnswer, setNumberOfIncorrectAnswer] = useState(0);

  const [showResultPage, setShowResultPage] = useState(false);


  const handleInputChange = (e) => {
    setUserAnswer(e.target.value);
  }

  const handleKeyPress = (e) => {
    if (e.nativeEvent.isComposing || e.key !== 'Enter') return;

    if (e.target.value === '') {
      if (!showResultPage) setNumberOfIncorrectAnswer((numberOfIncorrectAnswer) => numberOfIncorrectAnswer + 1);

      if (Object.keys(data).length - 1 !== quizNumber) {
        setQuizNumber((quizNumber) => quizNumber + 1);
      }
      else {
        setShowResultPage(true);
      }
    }
    checkAnswer();
  }

  const checkAnswer = () => {
    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
      if (Object.keys(data).length - 1 !== quizNumber) {
        setQuizNumber((quizNumber) => quizNumber + 1);
      }
      else {
        setShowResultPage(true);
      }
      setUserAnswer('');
      setNumberOfCorrectAnswer((numberOfCorrectAnswer) => numberOfCorrectAnswer + 1);
    }
  }
  
  

  return (
    <div>
      {
        !showResultPage ? (
          <div>
            <div className="question">{question}</div>
            <div id="input">
              <input type="text" value={userAnswer} onChange={handleInputChange} onKeyDown={handleKeyPress} autoFocus/>
            </div>
            <div className="discription">Press Enter to Skip or Submit</div>
          </div>
        ) : (
          <div>
            <div className="result">Result</div>
            <div className="discription">Correct : {numberOfCorrectAnswer}</div>
            <div className="discription">Incorrect : {numberOfIncorrectAnswer}</div>
          </div>
        )
      }
    </div>
  )
}

export default App
