import React, { useEffect, useState } from 'react';
// import ModelWoman from '../../images/welcomWoman.png';
import { Link, useNavigate } from 'react-router-dom';
import jwt from 'jwt-decode';
import { clientLogin } from '../../../axios/services/HomeService';
import '../../../components/UserComponents/Clogin/Clogin.css';

function Clogin() {
  const [phone, setPhone] = useState('');
  const [password, setpassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  async function dologin(event) {
    event.preventDefault();
    const values = { phone: phone, password: password };
    const data = await clientLogin(values);
    console.log('success in front');
    console.log(data);
    if (data.user) {
      localStorage.setItem('token', data.user);
      // const user = jwt(data.user);
      // localStorage.setItem('userDetails', user.name);

      navigate('/');
    } else {
      setError('Invalid Phone Number/Password..');
    }
  }
  useEffect(() => {
    const user = localStorage.getItem('token');
    if (!user) {
      navigate('/login');
    } else {
      navigate('/');
    }
  }, [navigate])


  return (
      <div className="row Clogin-Main justify-content-center align-items-center mt-5 pt-1">
        {/* <img src={ModelWoman} className="Clogin-img1" alt="modelimage" /> */}
        <section className="gradient-custom">
          <div className="container py-5 h-100 justify-content-center align-items-center">
            <div className="row justify-content-center align-items-center h-100">
              <div className="col-12 col-lg-12 col-xl-12">
                <div
                  className="card shadow-2-strong card-registration"
                  style={{ borderRadius: '15px' }}
                >
                  <div className="card-body p-4 p-md-5 mx-5">
                    <h3 className="mb-3 text-start">Client Login</h3>
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
                              required
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
                              required
                              onChange={(e) => {
                                setpassword(e.target.value);
                              }}
                              className="form-control form-control-sm"
                            />

                            <label className="d-flex pt-2 justify-content-end">
                              Forgot Password ?
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="">
                        <input
                          className="btn btn-md"
                          type="submit"
                          value="Submit"
                        />
                      </div>
                    </form>
                    <Link to="/login/ClientOTP">
                      <h6 className="btnhover d-flex pt-3 justify-content-center OTP-textcolour">
                        Login With OTP?
                      </h6>
                    </Link>
                    <h6 className='pt-2'>Create an account ?<Link to='/signup' className='btnhover'> Sign Up</Link></h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
  );
}

export default Clogin;
