import React, { useEffect, useState } from 'react'
import Conversation from './Conversation'
import "./History.css"
import Sidebar from './Sidebar'

function History({handleHistory}) {
    const [conversations, setConversations] = useState([])
    const [rating, setRating] = useState('')
    const [hamburger, setHamburger] = useState(false)

    const handleHam = () => {
        setHamburger(!hamburger)
    }

    useEffect(() => {
        let temp = localStorage.getItem('conversations')
        setConversations(JSON.parse(temp))
    }, [])
    let filteredConvs = conversations
    if (rating != '') {
        filteredConvs = conversations.filter((conv) => {
            for (var rat of conv.ratings) {
                if (rat['y'] == rating) {
                    return true
                }
            }
            return false;
        })
    }

    return (
        <div className='history'>
            <div className='row'>
                <img src='assets/hamburger.png' alt='menu' id='hamburger' onClick={handleHam} />
                <p id='bot-ai'>Bot AI</p>

            </div>
            {
                hamburger && <Sidebar cls={'sidebar-2'} handleHistory={handleHistory} />
            }
            <p>Conversation History</p>
            <select onChange={(event) => {
                setRating(event.target.value)
            }}>
                <option value={''}>All ratings</option>
                <option value={1}>1 star</option>
                <option value={2}>2 star</option>
                <option value={3}>3 star</option>
                <option value={4}>4 star</option>
                <option value={5}>5 star</option>
            </select>
            {
                filteredConvs.length > 0 ? (
                    filteredConvs.map((item) => (
                        <div>
                            <Conversation conv={item.conversations} feedbacks={item.feedbacks} ratings={item.ratings} />
                        </div>
                    ))
                ) : (
                    <div>No conversations</div>
                )

            }
        </div>
    )
}

export default History