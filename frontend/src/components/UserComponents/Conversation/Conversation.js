import React, { useEffect, useState } from 'react'
import { trainerDetails } from '../../../axios/services/ConversationServices'
import './Conversation.css'

function Conversation({conversation, currentUser}) {

  const [user, setUser] = useState(null)
  
  const trainerId = conversation.members.find((m) => m !== currentUser)
  console.log('in convooo',trainerId);
  useEffect(() => {
    const getTrainer = async () => {
      try {
        const response = await trainerDetails(trainerId)
        console.log(response);
        setUser(response)

      } catch (err) {
        console.log(err);
      }
    }
    getTrainer()
  },[currentUser, conversation])

  return (
    <div className='conversation'>
        <img className='conversationImg'  
        src={user?.profileImage}
        alt="avatar" />
        <span className='conversationName'>{user?.fname}</span>
    </div>
  )
}

export default Conversation