import React, { useRef, useState } from 'react'
import { toast } from 'react-toastify';
import { sendResetLink } from '../../../axios/services/HomeService';
import '../../UserComponents/ClientLogin/ClientLogin.css'

function ForgotPasswordSend() {

    const [email, setEmail] = useState('');

    const formRef = useRef(null);

    const onSubmit = async (event) => {
        event.preventDefault();

        const values = { email: email };
        const data = await sendResetLink(values);
        if (data.error) {
            toast.error(data.error)
        } else if (data.status) {
            toast.success(data.message)
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
                                        <h5 className="mb-3 text-start">Enter your email</h5>
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
                                                    value="Send"
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

export default ForgotPasswordSend;