import React, { useState } from 'react'
import './Feedback.css'

function Feedback({feedbackHandler, handleSubmit}) {
    const [value, setValue] = useState('')
  return (
    <div className='feedback-container'>
        <div className='row-1'>
            <div className='row'>
                <img id="bulb" src='assets/bulb.png' alt='' />
                <p>Provide Additional Feedback</p>
            </div>
            <button id='feedback-close' onClick={feedbackHandler}>X</button>
        </div>
        <textarea onChange={(event)=>{
            setValue(event.target.value)
        }}/>
        <button id='feedback-submit' onClick={()=>handleSubmit(value)}>Submit</button>
    </div>
  )
}

export default Feedback