import React, { useRef, useState } from 'react'
import "./Main.css"
import ConvItem from './ConvItem'
import showData from './data'
import Bot from './data'
import { now } from "./utils"
import Feedback from './Feedback'
import History from './History'
import Sidebar from './Sidebar'

function Main() {
    const [question, setQuestion] = useState('')
    const [conversations, addConversation] = useState([])
    const [showFeedback, setShowFeedback] = useState(false)
    const [feedbacks, setFeedbacks] = useState([])
    const [showHistory, setShowHistory] = useState(false)
    const [hamburger, setHamburger] = useState(false)
    let idRef = useRef('')
    let mapRef = useRef(new Map())
    let starsRef = useRef(new Map())
    const bot = new Bot()
    const date = new Date()

    const feedbackHandler = (id) => {
        console.log('id in feedbackHanlder:: ', id)
        setShowFeedback(!showFeedback)
        idRef.current = id
    }

    const handleSubmit = (txt) => {
        let id = idRef.current
        console.log('id in handleSubmit:: ', id)
        console.log(txt)
        setFeedbacks((prev) => ([...prev, { id, txt }]))
        console.log('feedbacks:: ', feedbacks)
        setShowFeedback(false)
        mapRef.current.set(id, txt)
    }

    const starHandler = (id, value) => {
        console.log('id in starHanlder:: ', id)
        console.log(value)
        starsRef.current.set(id, value)
    }

    const askHandler = () => {
        console.log(new Date().getTime())
        let time = now()
        let item1 = {
            id: new Date().getTime(),
            title: 'You',
            content: question,
            time: time,
            isBot: false,
        }
        addConversation((prev) => ([...prev, item1]))
        console.log(question)
        let response = bot.findQuestion(question)
        console.log(response)
        setTimeout(() => {
            time = now()
            let item2 = {
                id: new Date().getTime(),
                title: 'Soul AI',
                content: response,
                time: time,
                isBot: true,
            }
            addConversation((prev) => ([...prev, item2]))
        }, 1000)
        setQuestion('')
    }

    const saveHandler = () => {
        console.log('saving conversation...')
        console.log('conversations:: ', conversations)
        console.log('feedbacks:: ')
        let temp1 = []
        for (var x of mapRef.current.keys()) {
            let y = mapRef.current.get(x)
            console.log(x, ' -- ', y)
            temp1.push({ x, y })

        }
        console.log('ratings:: ')
        let temp2 = []
        for (var x of starsRef.current.keys()) {
            let y = starsRef.current.get(x)
            console.log(x, ' -- ', y)
            temp2.push({ x, y })
        }
        let temp3 = {
            conversations,
            feedbacks: temp1,
            ratings: temp2
        }
        console.log('temp3:: ', temp3)
        let storedConvs = localStorage.getItem('conversations')
        console.log('storedConvs:: ', storedConvs)
        if (!storedConvs) {
            console.log('storedConvs is null')
            let temp4 = []
            temp4.push(temp3)
            localStorage.setItem('conversations', JSON.stringify(temp4))
        } else {
            let temp4 = JSON.parse(storedConvs)
            temp4.push(temp3)
            localStorage.setItem('conversations', JSON.stringify(temp4))
        }
        addConversation([])
    }

    const handleHistory = (boo) => {
        setShowHistory(boo)
        addConversation([])
    }

    const handleHam = () => {
        setHamburger(!hamburger)
    }

    return (
        <div className='main'>
            <Sidebar cls={'sidebar'} handleHistory={handleHistory}/>
            {
                showHistory ? (<History handleHistory={handleHistory}/>) : (
                    <div className='content'>
                        <div className='row'>
                            <img src='assets/hamburger.png' alt='menu' id='hamburger' onClick={handleHam} />
                            <p id='bot-ai'>Bot AI</p>

                        </div>
                        {
                            hamburger && <Sidebar cls={'sidebar-2'} handleHistory={handleHistory} />
                        }

                        {
                            conversations.length === 0 && (
                                <>
                                    <p id='heading'>How Can I Help You Today?</p>
                                    <img className='ai-img' src='assets/ai.png' alt='ai' />
                                    <div className='card-container'>
                                        <div className='card'>
                                            <p className='card-que'>Hi, what is the weather</p>
                                            <p className='card-ans'>Get immediate AI generated response</p>
                                        </div>
                                        <div className='card'>
                                            <p className='card-que'>Hi, what is my location</p>
                                            <p className='card-ans'>Get immediate AI generated response</p>
                                        </div>
                                        <div className='card'>
                                            <p className='card-que'>Hi, what is the temperature</p>
                                            <p className='card-ans'>Get immediate AI generated response</p>
                                        </div>
                                        <div className='card'>
                                            <p className='card-que'>Hi, how are you</p>
                                            <p className='card-ans'>Get immediate AI generated response</p>
                                        </div>
                                    </div>
                                </>
                            )
                        }
                        {
                            conversations.length > 0 && (
                                conversations.map((item) => (<ConvItem id={item.id} key={item.id} title={item.title} content={item.content} time={item.time} isBot={item.isBot} feedbackHandler={feedbackHandler} feedback={mapRef.current.get(item.id)} starHandler={starHandler} />))
                            )
                        }
                        <div className='input-container'>
                            <input onChange={(event) => {
                                setQuestion(event.target.value)
                            }} value={question} />
                            <button onClick={askHandler}>Ask</button>
                            <button onClick={saveHandler}>Save</button>
                        </div>
                    </div>
                )
            }
            {/*  */}
            {
                showFeedback && (
                    <div className='feedback'>
                        <Feedback feedbackHandler={feedbackHandler} handleSubmit={handleSubmit} />
                    </div>
                )
            }
        </div>
    )
}

export default Main