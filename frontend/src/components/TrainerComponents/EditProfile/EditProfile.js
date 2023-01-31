import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { editTrainerSchema} from '../../../validation/homeValidation';
import { getTrainerDetail } from '../../../axios/services/HomeService';
import { editProfile } from '../../../axios/services/TrainerService';
import { toast, ToastContainer } from 'react-toastify';

function EditProfile(props) {

    const id = props.trainerId;

    const [details, setDetails] = useState({});

    async function fetchData() {
        const data = await getTrainerDetail(id);
        setDetails(data[0]);
    }
    useEffect(() => {
        fetchData();
    }, []);

    const navigate = useNavigate();

    const [filef, setFilef] = useState([]);
    const [fileb, setFileb] = useState([]);
    const [error, setError] = useState('');

    function handleBackButtonClick() {
        navigate(-1);
    }

    const onSubmit = async (values, actions) => {
        console.log('in frontend');
        // console.log(values);
        const result = await editProfile({ values, file1: filef, file2: fileb , id });
        if (result.status) {
            toast.success(result.message)
        } 
    };

    //handle and convert it in base 64
    const handleImage1 = (e) => {
        const file = e.target.files[0];
        setFileToBase(file);
        console.log(file);
    }

    const setFileToBase = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setFilef(reader.result);
        }
    }

    const handleImage2 = (e) => {
        const file = e.target.files[0];
        setFileToBase2(file);
        console.log(file);
    }

    const setFileToBase2 = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setFileb(reader.result);
        }
    }


    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues: {
                fname: '',
                lname: '',
                link: '',
            },
            validationSchema: editTrainerSchema,
            onSubmit,
        });

    return (
        <>
        <ToastContainer />
            <button className='btn-sm btn-dark mt-4' onClick={handleBackButtonClick}><i className="fa fa-arrow-circle-left" aria-hidden="true"></i>  Go Back</button>
            <div className="row TrainerSignup-Main justify-content-center align-items-center">
                {/* <img
          className="TrainerSignup-Main-image"
          src={Model}
          alt="modelimage"
        /> */}
                <section className="gradient-custom">
                    <div className="container h-100 justify-content-center align-items-center">
                        <div className="row justify-content-center align-items-center h-100">
                            <div className="col-12 col-lg-12 col-xl-12" style={{ maxWidth: '810px' }}>
                                <div
                                    className="card shadow-2-strong card-registration"
                                    style={{ borderRadius: '15px' }}>
                                    <div className="card-body p-4 p-md-5 mx-5">
                                        <h4 className="mb-3 text-start">
                                            Edit Profile
                                        </h4>
                                        {error ? <p className="red-error">{error}</p> : ''}
                                        <form onSubmit={handleSubmit}>
                                            <div className='form-group'>
                                                <div className="row">
                                                    {/* <div className="col-md-6">
                                                        <div className="form-outline">
                                                            <label className="form-label">First Name</label>
                                                            <input
                                                                style={{ background: "white" }}
                                                                type="text"
                                                                id="fname"
                                                                // defaultValue={details.fname}
                                                                value={values.fname}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                className={
                                                                    errors.fname && touched.fname
                                                                        ? 'form-control form-control-sm input-error'
                                                                        : 'form-control form-control-sm'
                                                                }
                                                            />
                                                            {errors.fname && touched.fname && (
                                                                <p className="red-error">{errors.fname}</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-outline">
                                                            <label className="form-label">Last Name</label>
                                                            <input
                                                                style={{ background: "white" }}
                                                                type="text"
                                                                id="lname"
                                                                value={values.lname}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                className={
                                                                    errors.lname && touched.lname
                                                                        ? 'form-control form-control-sm input-error'
                                                                        : 'form-control form-control-sm'
                                                                }
                                                            />

                                                            {errors.lname && touched.lname && (
                                                                <p className="red-error">{errors.lname}</p>
                                                            )}
                                                        </div>
                                                    </div> */}
                                                </div>

                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-outline">
                                                            <label className="form-label">
                                                                Profile Photo
                                                            </label>
                                                            <input
                                                                style={{ background: "white" }}
                                                                type="file"
                                                                id="filef"
                                                                name='filef'
                                                                accept="image/*"
                                                                // value={values.filef}
                                                                onChange={handleImage1}
                                                                // onChange={handleChange}
                                                                // onBlur={handleBlur}
                                                                className={
                                                                    errors.filef && touched.filef
                                                                        ? 'form-control form-control-sm input-error'
                                                                        : 'form-control form-control-sm'
                                                                }
                                                            />

                                                            {/* {values.filef ? <img className='trainerSignup-idproof' alt="Posts" src={values.filef ? URL.createObjectURL(values.filef) : ""}></img> : ""} */}
                                                            {errors.filef && touched.filef && <p className='red-error'>{errors.filef}</p>}

                                                        </div>
                                                    </div>
                                                    {/* <div className="col-md-6">
                                                        <div className="form-outline">
                                                            <label className="form-label">
                                                                Certificate
                                                            </label>
                                                            <input
                                                                style={{ background: "white" }}
                                                                type="file"
                                                                id="fileb"
                                                                name='fileb'
                                                                accept="image/*"
                                                                // value={values.fileb}
                                                                onChange={handleImage2}
                                                                className={
                                                                    errors.fileb && touched.fileb
                                                                        ? 'form-control form-control-sm input-error'
                                                                        : 'form-control form-control-sm'
                                                                }
                                                            />

                                                            {errors.fileb && touched.fileb && <p className='red-error'>{errors.fileb}</p>}
                                                        </div>
                                                    </div> */}
                                                </div>
                                                <div className="row">
                                                    <div className="form-outline pt-2">
                                                        <label className="form-label">

                                                            Upload Video Link <br></br>(Paste a link to your
                                                            YouTube video introducing yourself and training a
                                                            client.)
                                                        </label>
                                                        <input
                                                            style={{ background: "white" }}
                                                            type="text"
                                                            id="link"
                                                            value={values.link}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            className={
                                                                errors.link && touched.link
                                                                    ? 'form-control form-control-sm input-error'
                                                                    : 'form-control form-control-sm'
                                                            }
                                                        />
                                                        {errors.link && touched.link && (
                                                            <p className="red-error">{errors.link}</p>
                                                        )}
                                                    </div>
                                                </div>
                                                {/* 
                                        <div className="row">
                                            <div className="col-12">

                                                <select className="select form-control-lg">
                                                    <option value="1" disabled>Choose option</option>
                                                    <option value="2">Subject 1</option>
                                                    <option value="3">Subject 2</option>
                                                    <option value="4">Subject 3</option>
                                                </select>
                                                <label className="form-label select-label">Choose option</label>

                                            </div>
                                        </div> */}

                                                <div className="mt-4 pt-2">
                                                    <input
                                                        className="btn btn-primary btn-md"
                                                        type="submit"
                                                        value="Submit"
                                                    />
                                                </div>
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
    );
}

export default EditProfile