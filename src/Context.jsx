import axios from 'axios'
import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import clickAudio from '../src/assets/audio/click.mp3'
import errorAudio from '../src/assets/audio/error.mp3'
import correctAudio from '../src/assets/audio/correct.mp3'

const QuizContext = createContext()

const QuizContextProvider = ({ children }) => {


    const [quiz, setQuiz] = useState({
        quantity: 10,
        difficulty: 'easy',
        category: 'sports'
    })


    const clickSound = useRef(new Audio(clickAudio))
    const errorSound = useRef(new Audio(errorAudio))
    const correctSound = useRef(new Audio(correctAudio))


    const [waiting, setWaiting] = useState(true)
    const [loading, setLoading] = useState(false)

    const [questions, setQuestions] = useState([])
    const [correct, setCorrect] = useState(0)
    const [index, setIndex] = useState(0)
    const [error, setError] = useState(false)




    useEffect(() => {
        console.log(quiz);

    }, [quiz])

    const HandleChange = (e) => {
        let name = e.target.name
        let value = e.target.value
        // console.log(name, value);
        setQuiz(
            { ...quiz, [name]: value }
        )


    }

    const table = {
        sports: 21,
        history: 23,
        politics: 24,
    }

    const API_ENDPOINT = 'https://opentdb.com/api.php?'

    const HandleSubmit = (e) => {
        e.preventDefault()
        const { quantity, difficulty, category } = quiz
        console.log(quantity, difficulty, category);

        const url = `${API_ENDPOINT}amount=${quantity}&difficulty=${difficulty}&category=${table[category]}&type=multiple`
        FetchQuestions(url)
        console.log(url);



    }

    const FetchQuestions = async (url) => {
        setWaiting(false)
        setLoading(true)
        const resp = await axios(url).catch((err) => console.log(err))
        if (resp) {
            const data = resp.data.results
            console.log('data: ', data);

            if (data.length > 0) {
                setQuestions(data)
                setLoading(false)
                setWaiting(false)
            }
            else {
                setError(true)
                setWaiting(true)
            }

        }
        else {
            setWaiting(true)
        }
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
        location.reload()
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        location.reload()
    };



    const CheckAnswer = (value) => {
        // console.log(value);
        if (value) {
            setCorrect((old) => {
                return old + 1
            })
            correctSound.current.currentTime = 0
            correctSound.current.play()
            NextQuestion()
        }
        else {
            errorSound.current.currentTime = 0
            errorSound.current.play()
            NextQuestion()
        }
    }


    const NextQuestion = () => {
        setIndex((oldIdx) => {
            let newIdx = oldIdx + 1
            if (newIdx > questions.length - 1) {
                showModal()
                return 0
            }
            else {
                return newIdx
            }
        })
    }




    return (
        <QuizContext.Provider value={{
            waiting,
            loading,
            quiz,
            HandleChange,
            HandleSubmit,
            questions,
            index,
            correct,
            CheckAnswer,
            NextQuestion,
            clickSound,
            isModalOpen,
            handleCancel,
            handleOk,
            showModal,
        }}>
            {children}

        </QuizContext.Provider >
    )
}

export const UseGlobal = () => {
    return useContext(QuizContext)
}

export default QuizContextProvider

