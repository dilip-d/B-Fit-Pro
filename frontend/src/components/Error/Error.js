import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './Error.css'

function Error() {

  const navigate = useNavigate()

  function handleBackButtonClick() {
    navigate(-1);
  }
  return (
    <div>
      <img className='imgg' src="https://i.ibb.co/W6tgcKQ/softcodeon.gif" alt='imago' />
      <h1 className="error-text">Whoops, We can't seem to find the resource you're looking for.</h1>
      <p className="text">Please check that the Web site address is spelled correctly.Or,</p>
      <div className='d-flex justify-content-center flex-wrap'>
        <button className="error button my-2 mx-3" onClick={handleBackButtonClick}>
          Click here to go back
        </button>
        <Link to='/'><button className="back button my-2 mx-3">Back to home</button></Link>
      </div>
    </div>
  )
}

export default Error
