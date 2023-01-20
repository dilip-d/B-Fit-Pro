import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import jwt from 'jwt-decode';
import { trainerLogin } from '../../../axios/services/HomeService';
//images
// import Modelman from '../../images/LoginTrainer.png';
import './TrainerLogin.css';

function TrainerLogin() {
  const [phone, setPhone] = useState('');
  const [password, setpassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  async function dologin(event) {
    event.preventDefault();
    const values = { Phone: phone, password: password };
    const data = await trainerLogin(values);
    console.log(data);
    if (data.token) {
      localStorage.setItem('trainertoken', data.token);
      const trainer = jwt(data.token);
      localStorage.setItem('trainerDetails', trainer.name);
      navigate('/trainer');
    } else {
      setError('Invalid Phone Number/Password..');
    }
  }

  return (
    <div>
        <div className="row trainerlogin-Main justify-content-center align-items-center mt-5 pt-1">
          {/* <img src={Modelman} className="trainerlogin-img1" alt="modelimage" /> */}

          <section className=" gradient-custom">
            <div className="container py-5 h-100 justify-content-center align-items-center">
              <div className="row justify-content-center align-items-center h-100">
                <div className="col-12 col-lg-12 col-xl-12">
                  <div
                    className="card shadow-2-strong card-registration"
                    style={{ borderRadius: '15px' }}
                  >
                    <div className="card-body p-4 p-md-5">
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
                      <form onSubmit={dologin}>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-outline">
                              <label className="form-label">Phone Number</label>
                              <input
                                style={{ background: "white" }}
                                type="text"
                                id="phone"
                                value={phone}
                                onChange={(e) => {
                                  setPhone(e.target.value);
                                }}
                                className="form-control form-control-sm"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-outline">
                              <label className="form-label">Password</label>
                              <input
                                style={{ background: "white" }}
                                type="Password"
                                value={password}
                                onChange={(e) => {
                                  setpassword(e.target.value);
                                }}
                                className="form-control form-control-sm"
                              />

                              <label className="d-flex justify-content-end">
                                Forgot Password ?
                              </label>
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
                      </form>
                      <Link to="/login/trainerOTP">
                        <h6 className="btnhover d-flex justify-content-center pt-4  OTP-textcolour">
                          Login With OTP ?
                        </h6>
                      </Link>
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
