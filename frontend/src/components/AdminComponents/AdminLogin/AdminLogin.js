import React, { useEffect, useState } from 'react';
import img1 from '../../../assets/14.jpg';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../../../axios/services/HomeService';
import '../../../components/AdminComponents/AdminLogin/AdminLogin.css';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdminLogin() {

    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { error } = useSelector(state => state.adminAuth)
    console.log(error);
  
    useEffect(() => {
      error && toast.error(error)
    }, [error])

    const onSubmit = (event) => {
        event.preventDefault()
    
        const values = { email, password }
        dispatch(adminLogin({ values, navigate, toast }))
      }

    return (
        <>
        <ToastContainer />
        <h1 className='heading'>WELCOME ADMIN</h1>
        <div className="container">
            <div className="body d-md-flex align-items-center justify-content-between">
                <div className="box-1 mt-md-0 ">
                    <img src={img1} alt="image" />
                </div>
                <div class=" box-2 d-flex flex-column h-100">
                    <div
                        className="card shadow-2-strong card-registration"
                        style={{ borderRadius: '15px' }}>
                        <div className="card-body">
                            <h3 className="mb-3 text-start text-white">Admin Login</h3>
                            {/* {error ? (
                                <p style={{ color: 'red' }} className="red-error">
                                    {error}
                                </p>
                            ) : (
                                ' '
                            )} */}
                            <form onSubmit={onSubmit}>
                                <div className="row">
                                    <div className="col-md-12 mb-1 pb-2">
                                        <div className="form-outline text-start">
                                            <label className="form-label text-white">Email</label>
                                            <input
                                                style={{ background: "white" }}
                                                type="text"
                                                id="phone"
                                                required
                                                value={email}
                                                onChange={(e) => {
                                                    setEmail(e.target.value);
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
                                                required
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
        </>
    );
}

export default AdminLogin;
