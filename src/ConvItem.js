import React, { useState } from 'react'
import "./ConvItem.css"
import MyRating from './MyRating';

function ConvItem({ id, title, content, time, isBot, feedbackHandler, feedback, starHandler }) {
    if (!feedback)
        feedback = ''
    const imgSrc = isBot ? 'assets/ai.png' : 'assets/profile.png';
    const [hovered, setHovered] = useState(false)
    const [showRatings, setShowRatings] = useState(false)

    const likeHandler = () => {
        console.log('liked')
        setShowRatings(true)
    }

    const dislikeHandler = () => {
        console.log('disliked')
        feedbackHandler(id)
    }

    return (
        <div className='conv-card' onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
            <img src={imgSrc} alt='profile' />
            <div className='details-container'>
                <div>
                    <p className='card-title'>{title}</p>
                    <p className='card-content'>{content}</p>
                </div>
                <div className='row'>
                    <p className='card-time'>{time}</p>
                    {
                        isBot && hovered && (
                            <div>
                                <img src='assets/up.png' alt='like' onClick={likeHandler} />
                                <img src='assets/down.png' alt='dislike' onClick={dislikeHandler} />
                            </div>
                        )
                    }
                </div>
                {
                    showRatings && (
                        <div>
                            <MyRating starHandler={(value)=>starHandler(id, value)}/>
                        </div>

                    )
                }
                {
                    feedback.length > 0 && (
                        <div className='fdbk-txt'>
                            Feedback: {feedback}
                        </div>
                    )
                }

            </div>
        </div>
    )
}

export default ConvItem