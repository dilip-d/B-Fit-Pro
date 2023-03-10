import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { trainerLogin } from '../../../axios/services/TrainerService';
import { toast} from 'react-toastify';
import './TrainerLogin.css';
import { useDispatch, useSelector } from 'react-redux'

function TrainerLogin() {

  const [passShow, setPassShow] = useState(false)

  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { error } = useSelector(state => state.trainerLogin)
  console.log(error);

  useEffect(() => {
    error && toast.error(error)
  }, [error])

  const onSubmit = (event) => {
    event.preventDefault()

    const values = { email, password }
    dispatch(trainerLogin({ values, navigate, toast }))
  }

  useEffect(()=>{
    const token =  JSON.parse(localStorage.getItem('trainer'))?.token;
    if(token){
      navigate('/trainerHome')
    }
  })

  return (
    <div>
      <div className="row trainerlogin-Main justify-content-center align-items-center mt-5 pt-1">
        <section className=" gradient-custom">
          <div className="container py-5 h-100 justify-content-center align-items-center">
            <div className="row justify-content-center align-items-center h-100">
              <div className="col-12 col-lg-12 col-xl-12" style={{ maxWidth: '480px' }}>
                <div
                  className="card shadow-2-strong card-registration"
                  style={{ borderRadius: '15px' }}
                >
                  <div className="card-body p-4 p-md-5 mx-3" >
                    <h4 className="mb-3 text-start">
                      Trainer Login
                    </h4>
                    {error ? (
                      <p style={{ color: 'red' }} className="red-error">
                        {error}
                      </p>
                    ) : (
                      ' '
                    )}
                    <form onSubmit={onSubmit}>
                      <div className='form-group'>
                        <div className="row" >
                          <div className="col-md-12" >
                            <div className="form-outline" >
                              <label className="form-label text-black">Email</label>
                              <input
                                style={{ background: "white" }}
                                type="email"
                                id="email"
                                required
                                value={email}
                                onChange={(e) => {
                                  setEmail(e.target.value);
                                }}
                                className="form-control form-control-sm"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-outline">
                              <label className="form-label text-black">Password</label>
                              <div className='two'>
                                <input
                                  style={{ background: "white" }}
                                  type={!passShow ? "Password" : "text"}
                                  value={password}
                                  required
                                  onChange={(e) => {
                                    setpassword(e.target.value);
                                  }}
                                  className="form-control form-control-sm"
                                />
                                <div className='showpass' onClick={() => setPassShow(!passShow)}>Show</div>
                              </div>
                              {/* <label className="d-flex justify-content-end">
                                Forgot Password ?
                              </label> */}
                            </div>
                          </div>
                        </div>
                        <div className=" pt-2">
                          <input
                            className="btn btn-md"
                            type="submit"
                            value="Submit"
                          />
                        </div>
                      </div>
                    </form>
                    <h6 className="d-flex justify-content-center pt-2 CreatSingup-textcolour">
                      Create an account ?
                      <Link to="/trainerSignup" className='btnhover'> Sign Up</Link></h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default TrainerLogin;
