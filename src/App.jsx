import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import SetUp_Form from './components/SetUp Form'
import { UseGlobal } from './Context'
import Loader from './components/Loader'
import quizBg from '../src/assets/Quiz-bg.jpg'
import Next_Btn from './components/Next Btn'
import Modal from './components/Modal'
import ModalComp from './components/Modal'


function App() {

  const {
    waiting,
    loading,
    questions,
    index,
    correct,
    CheckAnswer,
    NextQuestion
  } = UseGlobal()


  if (waiting) {
    return (
      <div className='w-full bg-[url(src/assets/bg-1.jpg)] bg-cover bg-center relative h-[100vh]'>
        <SetUp_Form />
      </div>
    )
  }
  if (loading) {
    return <Loader />
  }


  const { question, incorrect_answers, correct_answer } = questions[index];

  // Copy incorrect answers
  let answers = [...incorrect_answers];

  // Generate random index from 0 to 3
  const tempIndex = Math.floor(Math.random() * 4);
  console.log(tempIndex);


  // Insert correct_answer at the random index
  answers.splice(tempIndex, 0, correct_answer);

  console.log(answers, 'shuffled answers');






  return (
    <>
      <main className='quiz-bg  w-full bg-[url(src/assets/Quiz-bg.jpg)] bg-contain 
       bg-no-repeat bg-center relative h-[100vh]'>
        <img className='absolute top-0 left-0  w-full h-full object-cover md:object-contain'  src={quizBg} alt="" />



        <div key={index} className='absolute text-white gap-6 bg-[#0000005b] flex flex-col items-center justify-center top-0 left-0 w-full h-full'>


          <ModalComp />
          <h1 className='anim w-[60%] text-center text-lg md:text-[25px]'>
            Q: {index + 1} {question}
          </h1>

          <p className='absolute top-[50px] right-[50px]  px-3 rounded  text-[17px]'>
            Corrrect Answers: {correct} / {questions.length}
          </p>


          <div className='anim grid grid-cols-1 md:grid-cols-2 gap-9 w-[60%]'>
            {
              answers.map((ans, idx) => {

                let sequence = '(a)'
                if (idx == 1) {
                  sequence = '(b)'
                }
                if (idx == 2) {
                  sequence = '(c)'
                }
                if (idx == 3) {
                  sequence = '(d)'
                }

                return (
                  <button key={idx} onClick={() => { CheckAnswer(ans == correct_answer) }} className='bg-black shadow-lg ans-btn cursor-pointer text-sm rounded-full px-3 py-3'>
                    {sequence + ' ' + ans}
                  </button>
                )
              })
            }
          </div>

          <div onClick={() => {
            NextQuestion()
          }} className='absolute bg-[black] rounded bottom-[50px] right-[50px]'>
            <Next_Btn />
          </div>
        </div>







      </main>
    </>
  )
}

export default App
