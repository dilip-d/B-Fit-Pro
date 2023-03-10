import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { userSchema } from '../../../validation/homeValidation';
import { clientRegister } from '../../../axios/services/HomeService';
import { toast } from 'react-toastify';
import './ClientSignUp.css';

function ClientSignUp() {

  const navigate = useNavigate();

  const [error, setError] = useState('');

  const onSubmit = async (values) => {
    const response = await clientRegister(values);
    if (response.error) {
      setError(response.error);
      toast.error(response.error)
    } else if (response.status) {
      const id = response.data.userId
      toast.success(response.send)
      navigate(`/emailVerification/${id}`);
    }
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('user'))?.token;
    if (token) {
      navigate('/')
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
        weight: '',
        height: '',
      },
      validationSchema: userSchema,
      onSubmit,
    });

  return (
    <>
      <div className="row Csignup-Main pt-5 mt-2 justify-content-center align-items-center" >
        <section className="gradient-custom">
          <div className="container py-4 h-100 justify-content-center align-items-center">
            <div className="row justify-content-center align-items-center h-100">
              <div className="col-12 col-lg-12 col-xl-12" style={{ maxWidth: '810px' }}>
                <div className="card shadow-2-strong card-registration" style={{ borderRadius: '15px' }}>
                  <div className="card-body p-4 p-md-5 mx-5">
                    <h4 className="mb-3 text-start">
                      Client Register
                    </h4>
                    <form onSubmit={handleSubmit}>
                      {error ? <p className="red-error">{error}</p> : ''}
                      <div className="row" >
                        <div className="col-md-6">
                          <div className="form-outline">
                            <label className="form-label text-black">First Name</label>
                            <input style={{ background: "white" }}
                              type="text"
                              id="fname"
                              value={values.fname}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={errors.fname && touched.fname
                                ? 'form-control form-control-sm input-error'
                                : 'form-control form-control-sm'
                              } />
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
                              } />
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
                            <input style={{ background: "white" }}
                              type="date"
                              className={
                                errors.dob && touched.dob
                                  ? 'form-control form-control-sm input-error'
                                  : 'form-control form-control-sm'
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
                        <div className="col-md-6">
                          <label className="mt-2 text-black">Gender</label>
                          <div className='d-flex justify-content-center mx-5'>
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
                              value={values.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              id="email"
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
                              type="Password"
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
                            <label className="form-label text-black">Weight(Kg)</label>
                            <input
                              style={{ background: "white" }}
                              type="number"
                              id="weight"
                              value={values.weight}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={
                                errors.weight && touched.weight
                                  ? 'form-control form-control-sm input-error'
                                  : 'form-control form-control-sm'
                              }
                            />
                            {errors.weight && touched.weight && (
                              <p className="red-error">{errors.weight}</p>
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-outline">
                            <label className="form-label text-black">Height(Cm)</label>
                            <input
                              style={{ background: "white" }}
                              type="number"
                              id="height"
                              value={values.height}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={
                                errors.height && touched.height
                                  ? 'form-control form-control-sm input-error'
                                  : 'form-control form-control-sm'
                              }
                            />
                            {errors.height && touched.height && (
                              <p className="red-error">{errors.height}</p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 pt-2">
                        <input
                          className="btn btn-md"
                          type="submit"
                          value="Submit"
                        />
                      </div>
                    </form>
                    <h6 className='pt-3'>Already have an account ?<Link to='/login' className='btnhover'> Sign In</Link></h6>
                    <h6>Or</h6>
                    <h6 className=''>Join as a Trainer ?<Link to='/trainerSignup' className='btnhover'> Register</Link></h6>
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

export default ClientSignUp;
