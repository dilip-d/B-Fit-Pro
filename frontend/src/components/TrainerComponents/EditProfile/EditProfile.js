import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { editProfile, getProfile } from '../../../axios/services/TrainerService';
import { Formik, Form, Field, ErrorMessage } from 'formik';

function EditProfile(props) {

    const id = props.trainerId;

    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const token = JSON.parse(localStorage.getItem('trainer'))?.token;

    async function fetchData() {
        const data = await getProfile(token, id);
        if (data.expired) {
            localStorage.removeItem("trainer");
            navigate('/trainerLogin')
        } else if (data.error) {
            navigate('*')
        } else {
            setUser(data[0]);
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

    function handleBackButtonClick() {
        navigate(-1);
    }

    const handleSubmit = async (values, { setSubmitting }) => {
        const data = {
            firstName: values.firstName,
            lastName: values.lastName,
            gender: values.gender,
            dob: values.dob,
            image: values.image
        };
        const result = await editProfile(token, data, id);
        if (result.status) {
            setSubmitting(false);
            navigate('/trainerHome')
        }
    };

    if (!user) {
        return <div>Loading user data...</div>;
    }

    return (
        <Formik
            initialValues={{ firstName: user.fname, lastName: user.lname, gender: user.gender, dob: user.dob, image: user.profileImage }}
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
                if (!values.image) {
                    errors.image = 'Image is required';
                }
                return errors;
            }}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting, setFieldValue, values }) => (
                <>
                    <button className='btn-sm btn-dark mt-4 mb-3 d-inline d-md-inline' onClick={handleBackButtonClick}><i class="fa fa-arrow-circle-left" aria-hidden="true"></i>  Go Back</button>
                    <div className="mt-3" style={{ minHeight: "600px" }}>
                        <div className="row justify-content-center" >
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
                                            <label htmlFor="dob" className="col-sm-4 col-form-label text-white">Date Of Birth:</label>
                                            <div className="col-sm-8">
                                                <Field type="date" className="form-control" id="dob" name="dob" />
                                                <ErrorMessage name="dob" component="div" className="" style={{ color: 'red' }} />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="image" className="col-sm-4 col-form-label text-white">Image:</label>
                                            <div className="col-sm-8">
                                                {user.profileImage && <img src={values.image || user.profileImage} alt="Profile Image" className='float-start mb-2' style={{ width: '100px', height: '110px' }} />}
                                                <input type="file" className="form-control" id="image" name="image" onChange={(event) => {
                                                    const file = event.currentTarget.files[0];
                                                    const reader = new FileReader();
                                                    reader.readAsDataURL(file);
                                                    reader.onloadend = () => {
                                                        setFieldValue("image", reader.result);
                                                        const img = document.getElementById('image-preview');
                                                        if (img) {
                                                            img.src = reader.result;
                                                        }
                                                    }
                                                }} />
                                                <ErrorMessage name="image" component="div" className="" style={{ color: 'red' }} />
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

export default EditProfile