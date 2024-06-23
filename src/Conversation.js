import React from 'react'
import ConvItem from './ConvItem'
import { Rating } from '@mui/material'

function Conversation({conv, feedbacks, ratings}) {
    let fmap = new Map()
    for(var x of feedbacks) {
        fmap.set(x['x'], x['y'])
    }
    let rmap = new Map()
    for(var x of ratings) {
        rmap.set(x['x'], x['y'])
    }
  return (
    <div className='conversation'>
        {
            conv.length>0 && conv.map((item)=>(
                <div>
                    <p><strong>{item.title}:</strong> {item.content}</p>
                    {
                        rmap.has(item.id) && (<p>Rating: <Rating value={rmap.get(item.id)} /></p>)
                    }
                    {
                        fmap.has(item.id) && (<p>Feedback: {fmap.get(item.id)}</p>)
                    }
                    
                </div>
            ))
        }
    </div>
  )
}

export default Conversation