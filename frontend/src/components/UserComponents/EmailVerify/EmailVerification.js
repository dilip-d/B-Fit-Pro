import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { verifyOTP } from '../../../axios/services/HomeService';
import '../../UserComponents/ClientLogin/ClientLogin.css'

function EmailVerification(props) {

    const id = props.userId;

    const [passShow, setPassShow] = useState(false)
    const [password, setpassword] = useState('');

    const formRef = useRef(null);

    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault();

        const values = { otp: password };
        const data = await verifyOTP(values, id);
        if (data.message) {
            toast.error(data.message)
        } else {
            toast.success(data.success)
            navigate('/verificationSuccess')
        }
        formRef.current.reset();
    }

    return (
        <>
            <div className="row Clogin-Main justify-content-center align-items-center mt-5 pt-1">
                <section className="gradient-custom">
                    <div className="container py-5 h-100 justify-content-center align-items-center">
                        <div className="row justify-content-center align-items-center h-100">
                            <div className="col-12 col-lg-12 col-xl-12" style={{ maxWidth: '580px' }}>
                                <div
                                    className="card shadow-2-strong card-registration"
                                    style={{ borderRadius: '15px' }}
                                >
                                    <div className="card-body p-4 p-md-5 mx-4">
                                        <h5 className="mb-3 text-center">Enter the OTP send to your email here</h5>
                                        <form onSubmit={onSubmit} ref={formRef}>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="form-outline">
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
                                        <Link to="/resendOtp">
                                            <h6 className="btnhover d-flex pt-3 justify-content-center OTP-textcolour">
                                                Resend OTP?
                                            </h6>
                                        </Link>
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

export default EmailVerification