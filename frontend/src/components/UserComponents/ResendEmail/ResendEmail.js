import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { resendOTP } from '../../../axios/services/HomeService';
import '../../UserComponents/ClientLogin/ClientLogin.css'

function ResendEmail() {

    const [email, setEmail] = useState('');

    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault();

        const values = { email: email };
        const data = await resendOTP(values);
        if (data.message) {
            toast.error(data.message)
        } else if (data.status === 'pending') {
            const id = data.userId
            toast.success(data.send)
            navigate(`/emailVerification/${id}`);
        }
        formRef.current.reset();
    }

    return (
        <>
            <div className="row Clogin-Main justify-content-center align-items-center mt-5 pt-1">
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