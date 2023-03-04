import React, { useEffect, useState } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import profileLogo from '../../../assets/profileLogo.png'
import { getUserProfile } from '../../../axios/services/HomeService';
import { Link, useNavigate } from 'react-router-dom';

export default function UserProfile() {

    const [details, setDetails] = useState([]);
    const [error, setError] = useState(null);

    const token = JSON.parse(localStorage.getItem('user'))?.token;
    const user = JSON.parse(localStorage.getItem('user'))
    const navigate = useNavigate();

    async function fetchData() {
        if (!user) {
            navigate('/login');
        } else {
            const id = user.user._id;
            const data = await getUserProfile(token, id);
            if (data.expired) {
                localStorage.removeItem("user");
                navigate('/login')
              } else if (data.error) {
                // setError(data.error);
                navigate('*')
              } else {
                setDetails(data[0]);
            }
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            {error ? <div className='text-danger d-flex justify-content-center text-align-center' style={{ minHeight: '400px' }}>
                <h2 className='text-center my-auto'>{error}</h2>
            </div> :
                <>
                    <MDBContainer className="py-3 h-100" style={{ background: "white", borderRadius: "10px" }}>
                        <MDBRow className="justify-content-center align-items-center h-100">
                            <MDBCol lg="12" className="mb-lg-0">
                                <MDBCard className="" style={{ borderRadius: '.5rem' }} >
                                    <MDBRow className="g-0" style={{ background: 'white' }}>
                                        <MDBCol md="4" className="gradient-custom text-center text-white"
                                            style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem', background: 'black' }}>
                                            <MDBCardImage src={profileLogo}
                                                alt="Avatar" className="my-5" style={{ width: '100px' }} fluid />
                                            <MDBTypography tag="h5" className='text-white'>{details.fname} {details.lname}</MDBTypography>
                                            <Link to={`/editUserProfile/${details._id}`}><MDBIcon far className='text-white' icon="edit mb-5" /></Link>
                                        </MDBCol>
                                        <MDBCol md="8">
                                            <MDBCardBody className="p-4">
                                                <MDBRow className="pt-1">
                                                    <MDBCol size="6" className=" d-flex mb-3 text-start">
                                                        <Link to={`/viewPlan/${details._id}`}><button className='btn-dark btn-sm'>View Plan</button></Link>
                                                        <Link to='/textChat'><button className='btn-primary mx-3 btn-sm'>Chat</button></Link>
                                                        <Link to={`/userWallet/${details._id}`}><button className='btn-success mx-2 btn-sm'>Wallet</button></Link>
                                                    </MDBCol>
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
                                            </MDBCardBody>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </>
            }
        </>
    );
}