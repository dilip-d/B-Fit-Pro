import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { trainerRegister } from '../../../axios/services/HomeService';
import { trainerSchema } from '../../../validation/homeValidation';
import './TrainerSignup.css';
import { toast } from 'react-toastify';

function TrainerSignup() {

  const navigate = useNavigate();

  const [filef, setFilef] = useState([]);
  const [fileb, setFileb] = useState([]);

  const [error, setError] = useState('');

  const onSubmit = async (values) => {
    const response = await trainerRegister({ values, file1: filef, file2: fileb });
    console.log(response);
    if (response.error) {
      setError('Trainer already existed');
      toast.error(response.error)
    } else if (response.status) {
      navigate('/trainerLogin');
    }
  };

  //handle and convert it in base 64
  const handleImage1 = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
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
  }

  const setFileToBase2 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFileb(reader.result);
    }
  }

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('trainer'))?.token;
    if (token) {
      navigate('/trainerHome')
    }
  })

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        fname: '',
        lname: '',
        dob: '',
        gender: '',
        email: '',
        phone: '',
        password: '',
        cpassword: '',
        charge:'',
        link: '',
        // filef:'',
        // fileb:'',
      },
      validationSchema: trainerSchema,
      onSubmit,
    });

  return (
    <div className="row TrainerSignup-Main pt-5 mt-1 justify-content-center align-items-center">
      <section className="gradient-custom">
        <div className="container h-100 justify-content-center align-items-center">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col-12 col-lg-12 col-xl-12" style={{ maxWidth: '810px' }}>
              <div
                className="card shadow-2-strong card-registration"
                style={{ borderRadius: '15px' }}>
                <div className="card-body p-4 p-md-5 mx-5">
                  <h4 className="mb-3 text-start">
                    Trainer Register
                  </h4>
                  {error ? <p className="red-error">{error}</p> : ''}
                  <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-outline">
                            <label className="form-label text-black">First Name</label>
                            <input
                              style={{ background: "white" }}
                              type="text"
                              id="fname"
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
                            <label className="form-label text-black">Last Name</label>
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
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6 d-flex align-items-center">
                          <div className="form-outline datepicker w-100">
                            <label className="form-label text-black">Birth Date</label>
                            <input
                              style={{ background: "white" }}
                              type="date"
                              id="dob"
                              value={values.dob}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={
                                errors.dob && touched.dob
                                  ? 'form-control form-control-sm input-error'
                                  : 'form-control form-control-sm'
                              }
                            />

                            {errors.dob && touched.dob && (
                              <p className="red-error">{errors.dob}</p>
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <p className="mb-2 pt-2 text-black text-sm">Gender: </p>
                          <div className="form-check form-check-inline" id="clr">
                            <input
                              style={{ background: "white" }}
                              className="form-check-input inputColor"
                              type="radio"
                              name="gender"
                              value="Female"
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <label className="form-check-label">Female</label>
                          </div>

                          <div className="form-check form-check-inline">
                            <input
                              style={{ background: "white" }}
                              className="form-check-input inputColor"
                              type="radio"
                              name="gender"
                              value="Male"
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <label className="form-check-label">Male</label>
                          </div>

                          <div className="form-check form-check-inline">
                            <input
                              style={{ background: "white" }}
                              className="form-check-input inputColor"
                              type="radio"
                              name="gender"
                              value="Other"
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <label className="form-check-label">Other</label>
                          </div>

                          {errors.gender && touched.gender && (
                            <p className="red-error">{errors.gender}</p>
                          )}
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-outline">
                            <label className="form-label text-black">Email</label>
                            <input
                              style={{ background: "white" }}
                              type="email"
                              id="email"
                              value={values.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={
                                errors.email && touched.email
                                  ? 'form-control form-control-sm input-error'
                                  : 'form-control form-control-sm'
                              }
                            />

                            {errors.email && touched.email && (
                              <p className="red-error">{errors.email}</p>
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-outline">
                            <label className="form-label text-black">Phone Number</label>
                            <input
                              style={{ background: "white" }}
                              type="tel"
                              id="phone"
                              value={values.phone}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={
                                errors.phone && touched.phone
                                  ? 'form-control form-control-sm input-error'
                                  : 'form-control form-control-sm'
                              }
                            />
                            {errors.phone && touched.phone && (
                              <p className="red-error">{errors.phone}</p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-outline">
                            <label className="form-label text-black">Password</label>
                            <input
                              style={{ background: "white" }}
                              type="Password"
                              id="password"
                              value={values.password}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={
                                errors.password && touched.password
                                  ? 'form-control form-control-sm input-error'
                                  : 'form-control form-control-sm'
                              }
                            />

                            {errors.password && touched.password && (
                              <p className="red-error">{errors.password}</p>
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-outline">
                            <label className="form-label text-black">Confirm Password</label>
                            <input
                              style={{ background: "white" }}
                              type="password"
                              id="cpassword"
                              value={values.cpassword}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={
                                errors.cpassword && touched.cpassword
                                  ? 'form-control form-control-sm input-error'
                                  : 'form-control form-control-sm'
                              }
                            />

                            {errors.cpassword && touched.cpassword && (
                              <p className="red-error">{errors.cpassword}</p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-outline">
                            <label className="form-label text-black">
                              Profile Photo
                            </label>
                            <input
                              style={{ background: "white" }}
                              type="file"
                              id="filef"
                              required
                              accept="image/*"
                              // value={values.filef}
                              onChange={handleImage1}
                              className={
                                errors.filef && touched.filef
                                  ? 'form-control form-control-sm input-error'
                                  : 'form-control form-control-sm'
                              } />
                            {errors.filef && touched.filef && <p className='red-error'>{errors.filef}</p>}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-outline">
                            <label className="form-label text-black">
                              Certificate
                            </label>
                            <input
                              style={{ background: "white" }}
                              type="file"
                              id="fileb"
                              required
                              accept=".pdf"
                              // value={values.fileb}
                              onChange={handleImage2}
                              className={
                                errors.fileb && touched.fileb
                                  ? 'form-control form-control-sm input-error'
                                  : 'form-control form-control-sm'
                              } />
                            {errors.fileb && touched.fileb && <p className='red-error'>{errors.fileb}</p>}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-outline">
                            <label className="form-label text-black">Charge/Month in Rupees</label>
                            <input
                              style={{ background: "white" }}
                              type="text"
                              id="charge"
                              value={values.charge}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={
                                errors.charge && touched.charge
                                  ? 'form-control form-control-sm input-error'
                                  : 'form-control form-control-sm'
                              }
                            />
                            {errors.charge && touched.charge && (<p className="red-error">{errors.charge}</p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="form-outline pt-2">
                          <label className="form-label text-black">
                            Upload Video Link <br></br>(Paste a link to your
                            youtube video introducing yourself and training a
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
                            } />
                          {errors.link && touched.link && (
                            <p className="red-error">{errors.link}</p>
                          )}
                        </div>
                      </div>
                      <div className="mt-4 pt-2">
                        <input className="btn btn-primary btn-md" type="submit" value="Submit" />
                      </div>
                    </div>
                  </form>
                  <h6 className='pt-3'>Already have an account ?<Link to='/trainerLogin' className='btnhover'> Sign In</Link></h6>
                </div>
              </div>
            </div>
          </div>
        </div >
      </section >
    </div >
  );
}

export default TrainerSignup;
