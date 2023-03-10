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
            initialValues={{ firstName: user.fname, lastName: user.lname, gender: user.gender, dob: user.dob, height: user.height, weight: user.weight }}
            validate={values => {
                const errors = {};
                if (!values.firstName) {
                    errors.firstName = 'First name is required';
                } else if (!/^[A-Za-z]{2,}$/i.test(values.firstName)) {
                    errors.firstName = 'First name should contain only alphabets and must be at least 2 characters long';
                }
                if (!values.lastName) {
                    errors.lastName = 'Last name is required';
                } else if (!/^[A-Za-z]{1,}$/i.test(values.lastName)) {
                    errors.lastName = 'Last name should contain only alphabets and must be at least 1 characters long';
                }
                if (!values.gender) {
                    errors.gender = 'Gender is required';
                }
                if (!values.dob) {
                    errors.dob = 'DOB is required';
                }
                if (!values.height) {
                    errors.height = 'Height is required';
                } else if (!/^\d{1,3}(\.\d{1,2})?$/.test(values.height)) {
                    errors.height = 'Height should be a number with up to 3 digits';
                }
                if (!values.weight) {
                    errors.weight = 'Weight is required';
                } else if (!/^\d{1,3}(\.\d{1,2})?$/.test(values.weight)) {
                    errors.weight = 'Weight should be maximum of 3 digits';
                }
                return errors;
            }}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting, values }) => (
                <>
                    <button className='btn-sm btn-dark mt-4 mb-3 m-2 d-inline d-md-inline' onClick={handleBackButtonClick}><i class="fa fa-arrow-circle-left" aria-hidden="true"></i>  Go Back</button>
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
                                            <label htmlFor="gender" className="col-sm-4 col-form-label text-white">Gender:</label>
                                            <div className="col-sm-8">
                                                <Field as="select" className="form-control" id="gender" name="gender">
                                                    <option value="Male" selected={values.gender === "Male"}>Male</option>
                                                    <option value="Female" selected={values.gender === "Female"}>Female</option>
                                                    <option value="Other" selected={values.gender === "Other"}>Other</option>
                                                </Field>
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
                                            <label htmlFor="phone" className="col-sm-4 col-form-label text-white">Height (cm):</label>
                                            <div className="col-sm-8">
                                                <Field type="text" className="form-control" id="height" name="height" />
                                                <ErrorMessage name="height" component="div" className="" style={{ color: 'red' }} />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="phone" className="col-sm-4 col-form-label text-white">Weight (kg):</label>
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