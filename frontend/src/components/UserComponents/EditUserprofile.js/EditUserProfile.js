import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { editUserProfile, getUserProfile } from '../../../axios/services/HomeService';

function EditUserProfile(props) {

    const id = props.userId;

    const [user, setUser] = useState(null);

    const token = JSON.parse(localStorage.getItem('user'))?.token;

    async function fetchData() {
        const data = await getUserProfile(token, id);
        setUser(data[0]);
    }
    useEffect(() => {
        fetchData();
    }, []);

    const navigate = useNavigate();

    function handleBackButtonClick() {
        navigate(-1);
    }

    const handleSubmit = async (values, { setSubmitting }) => {
        console.log('submitting');
        const data = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            phone: values.phone,
            gender: values.gender,
            dob: values.dob,
            height: values.height,
            weight: values.weight
        };
        const result = await editUserProfile(token, data, id);
        if (result.status) {
            setSubmitting(false);
            navigate('/userProfile')
        }
    };

    if (!user) {
        return <div>Loading user data...</div>;
    }

    return (
        <Formik
            initialValues={{ firstName: user.fname, lastName: user.lname, email: user.email, phone: user.phone, gender: user.gender, dob: user.dob, height: user.height, weight: user.weight }}
            validate={values => {
                const errors = {};
                if (!values.firstName) {
                    errors.firstName = 'First name is required';
                }
                if (!values.lastName) {
                    errors.lastName = 'Last name is required';
                }
                if (!values.email) {
                    errors.email = 'Email is required';
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                    errors.email = 'Invalid email address';
                }
                if (!values.phone) {
                    errors.phone = 'Phone number is required';
                }
                if (!values.gender) {
                    errors.gender = 'Gender is required';
                }
                if (!values.dob) {
                    errors.dob = 'DOB is required';
                }
                if (!values.height) {
                    errors.height = 'Height is required';
                }
                if (!values.weight) {
                    errors.weight = 'Weight is required';
                }
                return errors;
            }}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <>
                    <button className='btn-sm btn-dark mt-4 mb-3' onClick={handleBackButtonClick}><i class="fa fa-arrow-circle-left" aria-hidden="true"></i>  Go Back</button>
                    <div className="mt-3" style={{ minHeight: '500px' }}>
                        <div className="row justify-content-center">
                            <div className="col-lg-6">
                                <div className="card p-4">
                                    <Form>
                                        <div className="form-group row">
                                            <label htmlFor="firstName" className="col-sm-4 col-form-label text-white">First Name:</label>
                                            <div className="col-sm-8">
                                                <Field type="text" className="form-control" id="firstName" name="firstName" />
                                                <ErrorMessage name="firstName" component="div" className="" style={{ color: 'red' }} />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="lastName" className="col-sm-4 col-form-label text-white">Last Name:</label>
                                            <div className="col-sm-8">
                                                <Field type="text" className="form-control" id="lastName" name="lastName" />
                                                <ErrorMessage name="lastName" component="div" className="" style={{ color: 'red' }} />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="email" className="col-sm-4 col-form-label text-white">Email:</label>
                                            <div className="col-sm-8">
                                                <Field type="email" className="form-control" id="email" name="email" />
                                                <ErrorMessage name="email" component="div" className="" style={{ color: 'red' }} />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="phone" className="col-sm-4 col-form-label text-white">Phone:</label>
                                            <div className="col-sm-8">
                                                <Field type="tel" className="form-control" id="phone" name="phone" />
                                                <ErrorMessage name="phone" component="div" className="" style={{ color: 'red' }} />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="phone" className="col-sm-4 col-form-label text-white">Gender:</label>
                                            <div className="col-sm-8">
                                                <Field type="text" className="form-control" id="gender" name="gender" />
                                                <ErrorMessage name="gender" component="div" className="" style={{ color: 'red' }} />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="phone" className="col-sm-4 col-form-label text-white">Date Of Birth:</label>
                                            <div className="col-sm-8">
                                                <Field type="date" className="form-control" id="dob" name="dob" />
                                                <ErrorMessage name="dob" component="div" className="" style={{ color: 'red' }} />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="phone" className="col-sm-4 col-form-label text-white">Height:</label>
                                            <div className="col-sm-8">
                                                <Field type="text" className="form-control" id="height" name="height" />
                                                <ErrorMessage name="height" component="div" className="" style={{ color: 'red' }} />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="phone" className="col-sm-4 col-form-label text-white">Weight:</label>
                                            <div className="col-sm-8">
                                                <Field type="text" className="form-control" id="weight" name="weight" />
                                                <ErrorMessage name="weight" component="div" className="" style={{ color: 'red' }} />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-sm-8 offset-sm-4">
                                                <button type="submit" className="btn btn-primary mt-2" disabled={isSubmitting}>
                                                    Save
                                                </button>
                                            </div>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </Formik>
    );
}

export default EditUserProfile