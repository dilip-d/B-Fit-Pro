import React, { useEffect, useRef, useState } from 'react'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useNavigate, useParams } from 'react-router-dom';
import { getVideoConversation } from '../../axios/services/ConversationServices';

const VideoChat = () => {

  const { id } = useParams();
  const receiverId = id;
  const [conversation, setConversation] = useState({});
  const myRef = useRef(null);
  const conversationIdRef = useRef(null);
  const zegoRef = useRef(null);

  const result = JSON.parse(localStorage.getItem('user')) || JSON.parse(localStorage.getItem('trainer'))
  const userId = result?.user?._id || result?.trainer?._id
  const userName = result?.user?.fname || result?.trainer?.fname

  useEffect(() => {
    const getData = async () => {
      const response = await getVideoConversation(userId, receiverId)
      setConversation(response)
      conversationIdRef.current = response[0]._id;
      console.log('response');
      console.log(conversationIdRef.current);
    }
    getData();
  }, [])

  useEffect(() => {
    const myMeeting = async () => {

      if (!conversationIdRef.current) return;

      const appID = 1733436235;
      const serverSecret = '221ecf913f159dd82c82e18d5484278f';
      const roomId = conversationIdRef.current;

      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomId,
        userId,
        userName
      );
      const zc = ZegoUIKitPrebuilt.create(kitToken);

      zc.joinRoom({
        container: myRef.current,
        // sharedLinks: [
        //   {
        //     name: 'Copy Link',
        //     url: `http://localhost:3000/videoChat/${roomId}`
        //   }
        // ],
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
        showScreenSharingButton: false,
      })
      zegoRef.current = zc
    }
    myMeeting();

  }, [conversation, userId, userName])

  const navigate = useNavigate();

  function handleBackButtonClick() {
    zegoRef.current.destroy();
    navigate(-1);
  }

  return (
    <>
      <div className='bg-dark vh-100 align-items-center justify-content-center'>
        <button className='btn-sm btn-white mt-1' onClick={handleBackButtonClick}><i class="fa fa-arrow-circle-left" aria-hidden="true"></i>  Go Back</button>
        <div className='bg-dark vh-100 m-0' ref={myRef}>
        </div>
      </div>
    </>
  )
}

export default VideoChat;