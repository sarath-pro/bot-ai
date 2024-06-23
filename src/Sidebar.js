export default function Sidebar({ cls, handleHistory }) {
    return (
        <div className={cls}>
            <div className='row'>
                <img id='new-ai' src='assets/ai.png' alt='' />
                <p>New Chat</p>
                <img id='new' src='assets/new.png' alt='new conversation' onClick={() => handleHistory(false)} />
            </div>
            <button onClick={() => handleHistory(true)}>Past Conversations</button>
        </div>
    )
}