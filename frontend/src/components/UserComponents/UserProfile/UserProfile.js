import React, { useEffect, useState } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import profileLogo from '../../../assets/profileLogo.png'
import { getUserProfile } from '../../../axios/services/HomeService';
import { Link } from 'react-router-dom';

export default function UserProfile() {

    const [details, setDetails] = useState([]);

    async function fetchData() {
        const token = JSON.parse(localStorage.getItem('user')).token;
        const result = JSON.parse(localStorage.getItem('user'))
        const id = result.user._id
        const data = await getUserProfile(token, id);
        console.log('in user profile');
        console.log(data);
        setDetails(data[0]);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <MDBContainer className="py-5 h-100">
                <MDBRow className="justify-content-center align-items-center h-100">
                    <MDBCol lg="12" className="mb-4 mb-lg-0">
                        <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }} >
                            <MDBRow className="g-0" style={{ background: 'white' }}>
                                <MDBCol md="4" className="gradient-custom text-center text-white"
                                    style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem', background: 'black' }}>
                                    <MDBCardImage src={profileLogo}
                                        alt="Avatar" className="my-5" style={{ width: '100px' }} fluid />
                                    <MDBTypography tag="h5" className='text-white'>{details.fname} {details.lname}</MDBTypography>
                                    {/* <MDBCardText className='text-black'>Web Designer</MDBCardText> */}
                                    <MDBIcon far className='text-white' icon="edit mb-5" />
                                </MDBCol>
                                <MDBCol md="8">
                                    <MDBCardBody className="p-4">
                                        <MDBRow className="pt-1">
                                            <MDBCol size="6" className="mb-3 text-start">
                                                <Link to={`/viewPlan/${details._id}`}><button className='btn-dark btn-sm' href="#!">View Plan</button></Link>
                                            </MDBCol>
                                            {/* <MDBCol size="6" className="mb-3">
                                                <MDBTypography tag="h6">Height</MDBTypography>
                                                <MDBCardText className="text-muted">{details.height}</MDBCardText>
                                            </MDBCol> */}
                                        </MDBRow>
                                        <MDBTypography tag="h6">Information</MDBTypography>
                                        <hr className="mt-0 mb-4" />
                                        <MDBRow className="pt-1">
                                            <MDBCol size="6" className="mb-3">
                                                <MDBTypography tag="h6">Email</MDBTypography>
                                                <MDBCardText className="text-muted">{details.email}</MDBCardText>
                                            </MDBCol>
                                            <MDBCol size="6" className="mb-3">
                                                <MDBTypography tag="h6">Phone</MDBTypography>
                                                <MDBCardText className="text-muted">{details.phone}</MDBCardText>
                                            </MDBCol>
                                        </MDBRow>
                                        <MDBRow className="pt-1">
                                            <MDBCol size="6" className="mb-3">
                                                <MDBTypography tag="h6">DOB</MDBTypography>
                                                <MDBCardText className="text-muted">{details.dob}</MDBCardText>
                                            </MDBCol>
                                            <MDBCol size="6" className="mb-3">
                                                <MDBTypography tag="h6">Gender</MDBTypography>
                                                <MDBCardText className="text-muted">{details.gender}</MDBCardText>
                                            </MDBCol>
                                        </MDBRow>
                                        <MDBRow className="pt-1">
                                            <MDBCol size="6" className="mb-3">
                                                <MDBTypography tag="h6">Weight</MDBTypography>
                                                <MDBCardText className="text-muted">{details.weight}</MDBCardText>
                                            </MDBCol>
                                            <MDBCol size="6" className="mb-3">
                                                <MDBTypography tag="h6">Height</MDBTypography>
                                                <MDBCardText className="text-muted">{details.height}</MDBCardText>
                                            </MDBCol>
                                        </MDBRow>
                                        {/* <div className="d-flex ">
                                            <button className='btn-primary btn-sm' href="#!">View Plan</button>
                                            <a href="#!"><MDBIcon fab icon="twitter me-3" size="lg" /></a>
                                            <a href="#!"><MDBIcon fab icon="instagram me-3" size="lg" /></a>
                                        </div> */}
                                    </MDBCardBody>
                                </MDBCol>
                            </MDBRow>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </>
    );
}