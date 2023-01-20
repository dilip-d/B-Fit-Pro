import React, { useState, useEffect } from 'react'
import {
    MDBBtn, MDBCard, MDBCardBody, MDBCardFooter,
    MDBIcon, MDBInput, MDBSpinner, MDBValidation, MDBValidationItem
} from "mdb-react-ui-kit"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { register } from '../redux/authSlice'


const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: ""
};

function Signup() {

    const [formValue, setFormValue] = useState(initialState);
    const { loading, error } = useSelector((state) => ({ ...state.auth }));
    const { email, firstName, lastName, password, confirmPassword, phone } = formValue;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        error && toast.error(error)
    }, [error])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            return toast.error("Password should match")
        }
        if (email && password && firstName && lastName && confirmPassword && phone) {
            dispatch(register({ formValue, navigate, toast }))
        }
    };

    const onInputChange = (e) => {
        let { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
    }

    return (
        <>
            <div
                style={{
                    margin: "auto", padding: "15px", maxWidth: "450px",
                    alignContent: "center", marginTop: "120px", color: "#551a8b"
                }}>
                <MDBCard alignment='center'>
                    <MDBIcon fas icon='user-circle' className='fa-3x' style={{color:"black"}} />
                    <h5 style={{color:"black"}}>Sign Up </h5>
                    <MDBCardBody>
                        <MDBValidation onSubmit={handleSubmit} noValidate className='row g-3'>

                        <MDBValidationItem feedback='Please provide first name' invalid  className="col-md-6">
                                <MDBInput
                                    label="First Name"
                                    type="text"
                                    value={firstName}
                                    name="firstName"
                                    onChange={onInputChange}
                                    required
                                />
                            </MDBValidationItem>

                            <MDBValidationItem feedback='Please provide last name' invalid  className="col-md-6">
                                <MDBInput
                                    label="Last Name"
                                    type="text"
                                    value={lastName}
                                    name="lastName"
                                    onChange={onInputChange}
                                    required
                                />
                            </MDBValidationItem>

                            <MDBValidationItem feedback='Please provide your email' invalid  className="col-md-12">
                                <MDBInput
                                    label="Email"
                                    type="email"
                                    value={email}
                                    name="email"
                                    onChange={onInputChange}
                                    required
                                />
                            </MDBValidationItem>

                            <MDBValidationItem feedback='Please provide your password' invalid className="col-md-12">
                                <MDBInput
                                    label="Password"
                                    type="password"
                                    value={password}
                                    name="password"
                                    onChange={onInputChange}
                                    required
                                />
                            </MDBValidationItem>

                            <MDBValidationItem feedback='Please provide your confirm password' invalid className="col-md-12">
                                <MDBInput
                                    label="Password Confirm"
                                    type="password"
                                    value={confirmPassword}
                                    name="confirmPassword"
                                    onChange={onInputChange}
                                    required
                                />
                            </MDBValidationItem>

                            <MDBValidationItem feedback='Please provide your Phone Number' invalid className="col-md-12">
                                <MDBInput
                                    label="Phone"
                                    type="text"
                                    value={phone}
                                    name="phone"
                                    onChange={onInputChange}
                                    required
                                />
                            </MDBValidationItem>

                            <div className="col-12">
                                <MDBBtn style={{ width: "100%" , justifyContent:"center" }} className="mt-2">
                                    {loading && (
                                        <MDBSpinner
                                            size='sm'
                                            role="status"
                                            tag="span"
                                            className='me-2'
                                        />
                                    )}
                                    Register
                                </MDBBtn>
                            </div>
                        </MDBValidation>
                    </MDBCardBody>
                    <MDBCardFooter>
                        <Link to='/login'>
                            <p style={{ color: "black" }}>Already have an account ? <span style={{ color: "red" }}>Sign In </span> </p>
                        </Link>
                        <h6 className='text-danger'>OR</h6>
                        <Link to='/trainerLogin'>
                            <p style={{ color: "black" }}>Login as a trainer !<span style={{ color: "red" }}>Sign In</span> </p>
                        </Link>
                    </MDBCardFooter>
                </MDBCard>
            </div>
        </>
    )
}

export default Signup