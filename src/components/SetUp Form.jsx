import React, { useState } from 'react'
import { UseGlobal } from '../Context'
import quizGif from '../assets/online-quiz.gif'
import Start_Btn from './Start Btn'


function SetUp_Form() {


    let {
        quiz,
        HandleChange,
        HandleSubmit,
        clickSound

    } = UseGlobal()

    return (
        <div className='absolute w-[90%] sm:w-[60%] lg:w-[40%] backdrop-blur-lg h-3/4 py-10 rounded-2xl  shadow-xl shadow-[gray] px-7 top-1/2 left-1/2 transform translate-x-[-50%] translate-y-[-50%]'>
            {/* <img className='absolute w-[130px]  object-contain top-[100px]' src={quizGif} alt="" /> */}

            <form className='flex flex-col gap-8' action="" onSubmit={HandleSubmit}>

                <h1 className='font-bold text-white text-3xl'>
                    QUIZ SETUP
                </h1>


                {/* No. Of Questions */}
                <div className="relative">
                    <input className='transition text-white duration-200 inp w-full h-[55px] border-2 border-[gray] focus:border-[blue] outline-0 pl-6 rounded-full'
                        type="number"
                        name="quantity"
                        value={quiz.quantity}
                        onChange={HandleChange}
                        min={10}
                        max={50}
                        required />

                    <label htmlFor="quantity" className=' transition duration-200 label pointer-events-none absolute left-6 top-[-10px] px-2 rounded-full bg-[gray] text-sm '>No. Of Questions</label>
                </div>


                {/* Category */}
                <div className="relative">
                    <select className='inp text-white  w-full h-[55px] border-2 border-[gray] transition duration-200 focus:border-[blue] outline-0 pl-2 rounded-full '
                        name="category"
                        onChange={HandleChange}>
                        <option className='bg-black' value="sports">
                            sports
                        </option>
                        <option className='bg-black' value="history">
                            history
                        </option>
                        <option className='bg-black' value="politics">
                            politics
                        </option>
                    </select>
                    <label htmlFor="quantity" className=' label transition duration-200 label pointer-events-none absolute left-6 top-[-10px] px-2 rounded-full bg-[gray] text-sm '>
                        Category
                    </label>
                </div>


                {/* Difficulty */}
                <div className="relative">
                    <select className='inp text-white w-full h-[55px] border-2 border-[gray] transition duration-200 focus:border-[blue] outline-0 pl-2 rounded-full '
                        name="difficulty"
                        onChange={HandleChange}>
                        <option className='bg-black' value="easy">
                            easy
                        </option>
                        <option className='bg-black' value="medium">
                            medium
                        </option>
                        <option className='bg-black' value="hard">
                            hard
                        </option>
                    </select>
                    <label htmlFor="quantity" className=' label transition duration-200 label pointer-events-none absolute left-6 top-[-10px] px-2 rounded-full bg-[gray] text-sm '>
                        Difficulty
                    </label>
                </div>

                <div className='block m-auto ' onClick={() => { clickSound.current.play() }} type='submit'>
                    <Start_Btn />
                </div>
            </form>


        </div>
    )
}

export default SetUp_Form