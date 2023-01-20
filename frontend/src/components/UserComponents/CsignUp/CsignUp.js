import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { userSchema } from '../../../validation/homeValidation';
import { clientRegister } from '../../../axios/services/HomeService';
import '../../UserComponents/CsignUp/CsignUp.css'
import Model from '../../../assets/13.jpg';
//css
import './CsignUp.css';

function CsignUp() {
  const navigate = useNavigate();

  const [error, setError] = useState('');
  const onSubmit = async (values, actions) => {
    const status = await clientRegister(values);
    if (status.status === 'error') {
      setError('Client already existed');
    } else if (status.status === 'success') {
      navigate('/login');
    }
  };

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
        weight: '',
        height: '',
      },
      validationSchema: userSchema,
      onSubmit,
    });
  console.log(errors);

  return (
    <div className="row Csignup-Main py-3 justify-content-center align-items-center" >
      {/* <img src="" alt="modelimage" /> */}
      <section className="gradient-custom py-5">
        <div className="container py-5 h-100 justify-content-center align-items-center">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col-12 col-lg-12 col-xl-12">
              <div className="card shadow-2-strong card-registration" style={{ borderRadius: '15px' }}>
                <div className="card-body p-4 p-md-5">
                  <h3 className="mb-3 text-start">
                    Registration Form
                  </h3>
                  <form onSubmit={handleSubmit}>
                    {error ? <p className="red-error">{error}</p> : ''}
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <label className="form-label">First Name</label>
                          <input
                            style={{ background: "white" }}
                            type="text"
                            id="fname"
                            value={values.fname}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                              errors.fname && touched.fname
                                ? 'form-control form-control-lg input-error'
                                : 'form-control form-control-lg'
                            }
                          />

                          {errors.fname && touched.fname && (
                            <p className="red-error">{errors.fname}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
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
                                ? 'form-control form-control-lg input-error'
                                : 'form-control form-control-lg'
                            }
                          />
                          {errors.lname && touched.lname && (
                            <p className="red-error">{errors.lname}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-4 d-flex align-items-center">
                        <div className="form-outline datepicker w-100">
                          <label className="form-label">Birth Date</label>

                          <input style={{ background: "white" }}
                            type="date"
                            className={
                              errors.dob && touched.dob
                                ? 'form-control form-control-lg input-error'
                                : 'form-control form-control-lg'
                            }
                            value={values.dob}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            id="dob"
                          />
                          {errors.dob && touched.dob && (
                            <p className="red-error">{errors.dob}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <h6 className="mb-2 pb-1">Gender: </h6>

                        <div className="form-check form-check-inline" id="clr">
                          <label className="form-check-label">Female</label>

                          <input
                            className="form-check-input inputColor"
                            type="radio"
                            name="gender"
                            value="Female"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </div>

                        <div className="form-check form-check-inline">
                          <label className="form-check-label">Male</label>

                          <input
                            className="form-check-input inputColor"
                            type="radio"
                            name="gender"
                            value="Male"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </div>

                        <div className="form-check form-check-inline">
                          <label className="form-check-label">Other</label>

                          <input
                            className="form-check-input inputColor"
                            type="radio"
                            name="gender"
                            value="Other"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </div>

                        {errors.gender && touched.gender && (
                          <p className="red-error">{errors.gender}</p>
                        )}
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-4 pb-2">
                        <div className="form-outline">
                          <label className="form-label">Email</label>

                          <input
                            style={{ background: "white" }}
                            type="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            id="email"
                            className={
                              errors.email && touched.email
                                ? 'form-control form-control-lg input-error'
                                : 'form-control form-control-lg'
                            }
                          />
                          {errors.email && touched.email && (
                            <p className="red-error">{errors.email}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6 mb-4 pb-2">
                        <div className="form-outline">
                          <label className="form-label">Phone Number</label>
                          <input
                            style={{ background: "white" }}
                            type="tel"
                            id="phone"
                            value={values.phone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                              errors.phone && touched.phone
                                ? 'form-control form-control-lg input-error'
                                : 'form-control form-control-lg'
                            }
                          />
                          {errors.phone && touched.phone && (
                            <p className="red-error">{errors.phone}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-4 pb-2">
                        <div className="form-outline">
                          <label className="form-label">Password</label>

                          <input
                            style={{ background: "white" }}
                            type="Password"
                            id="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                              errors.password && touched.password
                                ? 'form-control form-control-lg input-error'
                                : 'form-control form-control-lg'
                            }
                          />
                          {errors.password && touched.password && (
                            <p className="red-error">{errors.password}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6 mb-4 pb-2">
                        <div className="form-outline">
                          <label className="form-label">Confirm Password</label>
                          <input
                            style={{ background: "white" }}
                            type="Password"
                            id="cpassword"
                            value={values.cpassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                              errors.cpassword && touched.cpassword
                                ? 'form-control form-control-lg input-error'
                                : 'form-control form-control-lg'
                            }
                          />

                          {errors.cpassword && touched.cpassword && (
                            <p className="red-error">{errors.cpassword}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-4 pb-2">
                        <div className="form-outline">
                          <label className="form-label">Weight(Kg)</label>
                          <input
                            style={{ background: "white" }}
                            type="number"
                            id="weight"
                            value={values.weight}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                              errors.weight && touched.weight
                                ? 'form-control form-control-lg input-error'
                                : 'form-control form-control-lg'
                            }
                          />

                          {errors.weight && touched.weight && (
                            <p className="red-error">{errors.weight}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6 mb-4 pb-2">
                        <div className="form-outline">
                          <label className="form-label">Height(Cm)</label>
                          <input
                            style={{ background: "white" }}
                            type="number"
                            id="height"
                            value={values.height}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                              errors.height && touched.height
                                ? 'form-control form-control-lg input-error'
                                : 'form-control form-control-lg'
                            }
                          />

                          {errors.height && touched.height && (
                            <p className="red-error">{errors.height}</p>
                          )}
                        </div>
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
                        className="btn btn-lg"
                        type="submit"
                        value="Submit"
                      />
                    </div>
                  </form>
                  <h5 className='pt-5'>Already have an account ?<Link to='/login' className='btnhover'> Sign In</Link></h5>
                                        <h5>Or</h5>
                  <h5 className=''>Join as a Trainer ?<Link to='/trainerLogin' className='btnhover'> Register</Link></h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CsignUp;
