import React, { useEffect, useState } from 'react';
import img1 from '../../../assets/14.jpg';
import { Link, useNavigate } from 'react-router-dom';
import jwt from 'jwt-decode';
import { adminLogin } from '../../../axios/services/HomeService';
import '../../../components/AdminComponents/AdminLogin/NewAdminLogin.css';

function NewAdminLogin() {
    const [email, setPhone] = useState('');
    const [password, setpassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    async function dologin(event) {
        event.preventDefault();
        console.log('started verifing');

        const values = { email: email, password: password };
        const data = await adminLogin(values);
        console.log(data);
        if (data.user) {
            console.log(data.user);
            localStorage.setItem('Admintoken', data.user);
            const user = jwt(data.user);
            localStorage.setItem('adminDetails', user.name);
            navigate('/admin');
        } else {
            setError('Invalid Phone Number/Password..');
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('Admintoken');
        if (!token) {
            navigate('/adminLogin');
        } else {
            navigate('/admin');
        }
    }, [navigate])

    return (
        <div class="container">
            <div class="body d-md-flex align-items-center justify-content-between">
                <div class="box-1 mt-md-0 mt-5">
                    <img src={img1}
                        class="" alt="" />
                </div>
                <div class=" box-2 d-flex flex-column h-100">
                    <div
                        className="card shadow-2-strong card-registration"
                        style={{ borderRadius: '15px' }}>
                        <div className="card-body">
                            <h3 className="mb-3 text-start text-white">Admin Login</h3>
                            {error ? (
                                <p style={{ color: 'red' }} className="red-error">
                                    {error}
                                </p>
                            ) : (
                                ' '
                            )}
                            <form onSubmit={dologin}>
                                <div className="row">
                                    <div className="col-md-12 mb-1 pb-2">
                                        <div className="form-outline text-start">
                                            <label className="form-label text-white">Email</label>
                                            <input
                                                style={{ background: "white" }}
                                                type="text"
                                                id="phone"
                                                value={email}
                                                onChange={(e) => {
                                                    setPhone(e.target.value);
                                                }}
                                                className="form-control form-control-lg"
                                            />

                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12 mb-4 pb-2">
                                        <div className="form-outline text-start">
                                            <label className="form-label text-white">Password</label>
                                            <input
                                                style={{ background: "white" }}
                                                type="Password"
                                                value={password}
                                                onChange={(e) => {
                                                    setpassword(e.target.value);
                                                }}
                                                className="form-control form-control-lg"
                                            />

                                            <label className="d-flex justify-content-end text-white">
                                                Forgot Password ?
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <label className="d-flex justify-content-center text-white">
                                    Login With OTP?
                                </label>
                                {/* <Link to="/signup">
                      {' '}
                      <label className="d-flex justify-content-center CreatSingup-textcolour">
                        Create an account Sign Up
                      </label>
                    </Link> */}
                                <div className="btnhover">
                                    <input
                                        className="btn btn-primary btn-lg"
                                        type="submit"
                                        value="Submit"
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewAdminLogin;