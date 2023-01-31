import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { userLogin } from '../../../axios/services/HomeService';
import '../../../components/UserComponents/Clogin/Clogin.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Clogin() {

  const [passShow, setPassShow] = useState(false)

  const [phone, setPhone] = useState('');
  const [password, setpassword] = useState('');
 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { error } = useSelector(state => state.auth)
  console.log(error);

  useEffect(() => {
    error && toast.error(error)
  }, [error])

  const onSubmit = (event) => {
    event.preventDefault();

    const values = { phone: phone, password: password };
    dispatch(userLogin({ values, navigate, toast }));
    console.log('success in front');
  }

  return (
    <>
    <ToastContainer />
    <div className="row Clogin-Main justify-content-center align-items-center mt-5 pt-1">
      {/* <img src={ModelWoman} className="Clogin-img1" alt="modelimage" /> */}
      <section className="gradient-custom">
        <div className="container py-5 h-100 justify-content-center align-items-center">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col-12 col-lg-12 col-xl-12" style={{maxWidth:'480px'}}>
              <div
                className="card shadow-2-strong card-registration"
                style={{ borderRadius: '15px' }}
              >
                <div className="card-body p-4 p-md-5 mx-4">
                  <h3 className="mb-3 text-start">Client Login</h3>
                  {error ? (
                    <p style={{ color: 'red' }} className="red-error">
                      {error}
                    </p>
                  ) : (
                    ' '
                  )}
                  <form onSubmit={onSubmit}>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-outline">
                          <label className="form-label">Phone Number</label>
                          <input
                            style={{ background: "white" }}
                            type="text"
                            id="phone"
                            value={phone}
                            required
                            onChange={(e) => {
                              setPhone(e.target.value);
                            }}
                            className="form-control form-control-sm"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-outline">
                          <label className="form-label">Password</label>
                          <div className='two'>

                          <input
                            style={{ background: "white" }}
                            type={!passShow ? "Password" :"text"}
                            value={password}
                            required
                            onChange={(e) => {
                              setpassword(e.target.value);
                            }}
                            className="form-control form-control-sm"
                          />
                            <div className='showpass' onClick={()=>setPassShow(!passShow)}>Show</div>
                          </div>

                          <label className="d-flex pt-2 justify-content-end">
                            Forgot Password ?
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="">
                      <input
                        className="btn btn-md"
                        type="submit"
                        value="Submit"
                      />
                    </div>
                  </form>
                  <Link to="/resendOtp">
                    <h6 className="btnhover d-flex pt-3 justify-content-center OTP-textcolour">
                      Click here to verify your account !
                    </h6>
                  </Link>
                  <h6 className='pt-2'>Create an account ?<Link to='/signup' className='btnhover'> Sign Up</Link></h6>
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

export default Clogin;
