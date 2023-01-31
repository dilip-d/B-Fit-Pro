import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { resendOTP } from '../../../axios/services/HomeService';
import '../../UserComponents/Clogin/Clogin.css'

function ResendEmail() {

    const [email, setEmail] = useState('');

    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault();

        const values = { email: email };
        const data = await resendOTP(values);
        if (data.message) {
            toast.error(data.message)
        } else if(data.status === 'pending') {
            const id = data.userId
            toast.success(data.send)
            navigate(`/emailVerification/${id}`);
        }
        formRef.current.reset();
    }

    return (
        <>
            <ToastContainer />
            <div className="row Clogin-Main justify-content-center align-items-center mt-5 pt-1">
                {/* <img src={ModelWoman} className="Clogin-img1" alt="modelimage" /> */}
                <section className="gradient-custom">
                    <div className="container py-5 h-100 justify-content-center align-items-center">
                        <div className="row justify-content-center align-items-center h-100">
                            <div className="col-12 col-lg-12 col-xl-12" style={{ maxWidth: '480px' }}>
                                <div
                                    className="card shadow-2-strong card-registration"
                                    style={{ borderRadius: '15px' }}
                                >
                                    <div className="card-body p-4 p-md-5 mx-4">
                                        <h3 className="mb-3 text-start">Enter your email</h3>

                                        <form onSubmit={onSubmit}>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="form-outline">
                                                        {/* <label className="form-label">Phone Number</label> */}
                                                        <input
                                                            style={{ background: "white" }}
                                                            type="text"
                                                            id="email"
                                                            value={email}
                                                            required
                                                            onChange={(e) => {
                                                                setEmail(e.target.value);
                                                            }}
                                                            className="form-control form-control-sm"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="">
                                                <input
                                                    className="btn btn-md mt-3"
                                                    type="submit"
                                                    value="Submit"
                                                />
                                            </div>
                                        </form>
                                        {/* <Link to="/login/ClientOTP">
                                            <h6 className="btnhover d-flex pt-3 justify-content-center OTP-textcolour">
                                                Resend OTP?
                                            </h6>
                                        </Link> */}
                                        {/* <h6 className='pt-2'>Create an account ?<Link to='/signup' className='btnhover'> Sign Up</Link></h6> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default ResendEmail;