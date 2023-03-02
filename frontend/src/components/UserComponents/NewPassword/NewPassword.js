import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { setNewPassword, getUserValid } from '../../../axios/services/HomeService';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import '../../UserComponents/ClientLogin/ClientLogin.css'
import { toast } from 'react-toastify';

function NewPassword(props) {
    console.log(props);

    const id = props.id.id;
    const token = props.id.token;

    const [passShow, setPassShow] = useState(false)
    const navigate = useNavigate();

    const userValid = async () => {
        const res = await getUserValid(token, id)
        if (res.status) {
            console.log('User valid');
        } else {
            toast.error('Token expired generate a new link !')
        }
    }

    useEffect(() => {
        userValid()
    }, [])

    const handleSubmit = async (values, { setSubmitting }) => {
        const data = { password: values.password };
        const result = await setNewPassword(token, id, data);
        if (result.status) {
            setSubmitting(false);
            navigate('/login')
        }else{
            toast.error(result.error)
        }
    }

    return (
        <Formik
            initialValues={{ password: '', cpassword: '' }}
            validate={values => {
                const errors = {};
                if (!values.password) {
                    errors.password = 'Password is required';
                } else if (values.password.length < 5) {
                    errors.password = 'Password must be at least 5 characters long';
                } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/i.test(values.password)) {
                    errors.password = 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character';
                }
                if (!values.cpassword) {
                    errors.cpassword = 'Confirm password is required';
                } else if (values.cpassword !== values.password) {
                    errors.cpassword = 'Passwords must match';
                }
                return errors;
            }}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting, values }) => (
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
                                                <h5 className="mb-3 text-center">Enter New Password</h5>
                                                <Form>
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="form-outline">
                                                                <label className="form-label">New Password</label>
                                                                <div className='two'>
                                                                    <Field
                                                                        id="password"
                                                                        name="password"
                                                                        style={{ background: "white" }}
                                                                        type={!passShow ? "Password" : "text"}
                                                                        className="form-control form-control-sm"
                                                                    />
                                                                    <div className='showpass' onClick={() => setPassShow(!passShow)}>Show</div>
                                                                </div>
                                                                <div><ErrorMessage name="password" component="div" className="" style={{ color: 'red' }} /></div>
                                                                <label className="form-label">Confirm Password</label>
                                                                <div className='two'>
                                                                    <Field
                                                                        id="cpassword"
                                                                        name="cpassword"
                                                                        style={{ background: "white" }}
                                                                        type={!passShow ? "Password" : "text"}
                                                                        className="form-control form-control-sm"
                                                                    />
                                                                    <div className='showpass' onClick={() => setPassShow(!passShow)}>Show</div>
                                                                </div>
                                                                <div> <ErrorMessage name="cpassword" component="div" className="" style={{ color: 'red' }} /></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="">
                                                        <button
                                                            className="btn btn-md mt-3"
                                                            type="submit"

                                                            disabled={isSubmitting}
                                                        >Save</button>
                                                    </div>
                                                </Form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </>
            )}
        </Formik>
    )
}

export default NewPassword;