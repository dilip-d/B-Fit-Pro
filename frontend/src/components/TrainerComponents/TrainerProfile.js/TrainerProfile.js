import React, { useEffect, useState } from 'react';
import {
    MDBCol,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBBtn,
    MDBIcon,
    MDBListGroup,
    MDBListGroupItem,
} from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import { getProfile } from '../../../axios/services/TrainerService';

export default function TrainerProfile() {

    const [details, setDetails] = useState([]);

    const navigate = useNavigate()

    async function fetchData() {
        const token = JSON.parse(localStorage.getItem('trainer')).token;
        const result = JSON.parse(localStorage.getItem('trainer'))
        const id = result.trainer._id
        const data = await getProfile(token, id);
        setDetails(data[0]);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <MDBRow className='px-5 py-3 bg-dark'>
                <MDBCol lg="4">
                    <MDBCard className="mb-4" >
                        <MDBCardBody className="text-center" style={{ backgroundColor: "white" }}>
                            <MDBCardImage
                                src={details.profileImage}
                                alt="avatar"
                                className="rounded-pill"
                                style={{ width: '150px' }}
                                fluid />
                            <p className="text-muted mb-1 fw-bold">{details.fname} {details.lname}</p>
                            <p className="text-muted mb-4"></p>
                            <div className="d-flex justify-content-center mb-2">
                                <Link to={`/editDetails/${details._id}`}><MDBBtn>Edit</MDBBtn></Link>
                                <Link to='/addDetails'><MDBBtn outline className="ms-1">Add</MDBBtn></Link>
                            </div>
                        </MDBCardBody>
                    </MDBCard>
                    <MDBCard className="mb-4 mb-lg-0">
                        <MDBCardBody className="p-0" >
                            <MDBListGroup flush className="rounded-3">
                                <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                    <MDBIcon fas icon="globe fa-lg text-warning" />
                                    <MDBCardText>{details.email}</MDBCardText>
                                </MDBListGroupItem>
                                <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                    <MDBIcon fab icon="twitter fa-lg" style={{ color: '#55acee' }} />
                                    <MDBCardText>twitter</MDBCardText>
                                </MDBListGroupItem>
                                <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                    <MDBIcon fab icon="instagram fa-lg" style={{ color: '#ac2bac' }} />
                                    <MDBCardText>instagram</MDBCardText>
                                </MDBListGroupItem>
                                <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                    <MDBIcon fab icon="facebook fa-lg" style={{ color: '#3b5998' }} />
                                    <MDBCardText>facebook</MDBCardText>
                                </MDBListGroupItem>
                            </MDBListGroup>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                <MDBCol lg="8">
                    <MDBCard className="mb-4">
                        <MDBCardBody style={{ backgroundColor: "white" }}>
                            <MDBRow>
                                <MDBCol sm="3">
                                    <MDBCardText className='text-start fw-bold'>Full Name</MDBCardText>
                                </MDBCol>
                                <MDBCol sm="9">
                                    <MDBCardText className="text-muted text-start">{details.fname} {details.lname}</MDBCardText>
                                </MDBCol>
                            </MDBRow>
                            <hr />
                            <MDBRow>
                                <MDBCol sm="3">
                                    <MDBCardText className='text-start fw-bold'>Gender</MDBCardText>
                                </MDBCol>
                                <MDBCol sm="9">
                                    <MDBCardText className="text-muted text-start">{details.gender}</MDBCardText>
                                </MDBCol>
                            </MDBRow>
                            <hr />
                            <MDBRow>
                                <MDBCol sm="3">
                                    <MDBCardText className='text-start fw-bold'>DOB</MDBCardText>
                                </MDBCol>
                                <MDBCol sm="9">
                                    <MDBCardText className="text-muted text-start">{details.dob}</MDBCardText>
                                </MDBCol>
                            </MDBRow>
                            <hr />
                            <MDBRow>
                                <MDBCol sm="3">
                                    <MDBCardText className='text-start fw-bold'>Email</MDBCardText>
                                </MDBCol>
                                <MDBCol sm="9">
                                    <MDBCardText className="text-muted text-start">{details.email}</MDBCardText>
                                </MDBCol>
                            </MDBRow>
                            <hr />
                            <MDBRow>
                                <MDBCol sm="3">
                                    <MDBCardText className='text-start fw-bold'>Phone</MDBCardText>
                                </MDBCol>
                                <MDBCol sm="9">
                                    <MDBCardText className="text-muted text-start">{details.phone}</MDBCardText>
                                </MDBCol>
                            </MDBRow>
                            <hr />
                            <MDBRow>
                                <MDBCol sm="3">
                                    <MDBCardText className='text-start fw-bold'>Price</MDBCardText>
                                </MDBCol>
                                <MDBCol sm="9">
                                    <MDBCardText className="text-muted text-start">₹ {details.price} /Month</MDBCardText>
                                </MDBCol>
                            </MDBRow>
                            <hr />
                            <MDBRow>
                                <MDBCol sm="3">
                                    <MDBCardText className='text-start fw-bold'>Description</MDBCardText>
                                </MDBCol>
                                <MDBCol sm="9">
                                    <MDBCardText className="text-muted text-start">{details.description}</MDBCardText>
                                </MDBCol>
                            </MDBRow>
                            <hr />
                            <MDBRow>
                                <MDBCol sm="3">
                                    <MDBCardText className='text-start fw-bold'>Services</MDBCardText>
                                </MDBCol>
                                <MDBCol sm="9">
                                    {details.service?.map((item, index) => <MDBCardText key={index} className="text-muted text-start">{index + 1}.  {item}</MDBCardText>)}
                                </MDBCol>
                            </MDBRow>
                            <hr />
                            <MDBRow>
                                <MDBCol sm="3">
                                    <MDBCardText className='text-start fw-bold'>Tips</MDBCardText>
                                </MDBCol>
                                <MDBCol sm="9">
                                    {details.tips?.map((item, index) => <MDBCardText key={index} className="text-muted text-start">{index + 1}.  {item}</MDBCardText>)}
                                </MDBCol>
                            </MDBRow>
                        </MDBCardBody>
                    </MDBCard>
                    <MDBRow>
                    </MDBRow>
                </MDBCol>
            </MDBRow>
        </>
    );
}