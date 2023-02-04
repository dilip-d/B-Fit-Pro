import { MDBBtn, MDBCard, MDBCardBody, MDBCardText, MDBCol, MDBRow } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { getTrainerDetail } from '../../../axios/services/HomeService';
import './TrainerDetailedView.css'

function TrainerDetailedView(props) {

    const id = props.trainerId;

    const [details, setDetails] = useState({});

    async function fetchData() {
        // const token =  JSON.parse(localStorage.getItem('user')).token;
        const data = await getTrainerDetail(id);
        setDetails(data[0]);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <section className="gradient-custom-2 h-100">
                <div className="container py-2 h-100" style={{ background: 'white' }}>
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-lg-12 col-xl-12">
                            <div className="card">
                                <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
                                    <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                                        <img src={details.profileImage}
                                            alt="Generic placeholder image" className="img-fluid img-thumbnail mt-4 mb-2"
                                            style={{ width: '150px', zIndex: 1 }} />
                                    </div>
                                    <div className="ms-3" style={{ marginTop: '130px' }}>
                                        <h5 className='fw-bold'>{details.fname} {details.lname}</h5>
                                        <p></p>
                                    </div>
                                </div>
                                {/* <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                                    <div className="d-flex justify-content-end text-center py-1">
                            
                                        <div>
                                            <p className="mb-1 h5">253</p>
                                            <p className="small text-muted mb-0">Photos</p>
                                        </div>
                                        <div className="px-3">
                                            <p className="mb-1 h5">1026</p>
                                            <p className="small text-muted mb-0">Followers</p>
                                        </div>
                                        <div>
                                            <p className="mb-1 h5">478</p>
                                            <p className="small text-muted mb-0">Following</p>
                                        </div>
                                    </div>
                                </div> */}
                                <div className="card-body p-4 mt-3 text-black">
                                    <div className='text-end'>
                                        <Link to={`/bookTrainer/${details._id}`}><MDBBtn>Book Now</MDBBtn></Link>
                                    </div>

                                    <div className="mb-5 mt-5">
                                        <p className="lead fw-normal mb-1 fw-bold">Description</p>
                                        <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                                            <p className="font-italic mb-1">{details.description}</p>
                                            {/* <p className="font-italic mb-1">Lives in New York</p>
                                            <p className="font-italic mb-0">Photographer</p> */}
                                        </div>
                                    </div>
                                    <MDBCol lg="12">
                                        <MDBCard className="mb-4">
                                            <MDBCardBody style={{ backgroundColor: "white" }}>

                                                <MDBRow>
                                                    <MDBCol sm="3">
                                                        <MDBCardText className='text-start fw-bold'>Gender</MDBCardText>
                                                    </MDBCol>
                                                    <MDBCol sm="9">
                                                        <MDBCardText className="text-black text-start">{details.gender}</MDBCardText>
                                                    </MDBCol>
                                                </MDBRow>
                                                <hr />

                                                <MDBRow>
                                                    <MDBCol sm="3">
                                                        <MDBCardText className='text-start fw-bold'>Email</MDBCardText>
                                                    </MDBCol>
                                                    <MDBCol sm="9">
                                                        <MDBCardText className="text-black text-start">{details.email}</MDBCardText>
                                                    </MDBCol>
                                                </MDBRow>
                                                <hr />
                                                <MDBRow>
                                                    <MDBCol sm="3">
                                                        <MDBCardText className='text-start fw-bold'>Phone</MDBCardText>
                                                    </MDBCol>
                                                    <MDBCol sm="9">
                                                        <MDBCardText className="text-black text-start">{details.phone}</MDBCardText>
                                                    </MDBCol>
                                                </MDBRow>
                                                <hr />

                                                <MDBRow>
                                                    <MDBCol sm="3">
                                                        <MDBCardText className='text-start fw-bold'>Services</MDBCardText>
                                                    </MDBCol>
                                                    <MDBCol sm="9">
                                                        {details.service?.map((item, index) => {
                                                            return (
                                                                <MDBCardText key={index} className="text-black text-start">{index + 1}. {item}</MDBCardText>
                                                            )
                                                        })}
                                                    </MDBCol>
                                                </MDBRow>
                                                <hr />
                                                <MDBRow>
                                                    <MDBCol sm="3">
                                                        <MDBCardText className='text-start fw-bold'>Tips</MDBCardText>
                                                    </MDBCol>
                                                    <MDBCol sm="9">
                                                        {details.tips?.map((item, index) => {
                                                            return (
                                                                <MDBCardText key={index} className="text-black text-start">{index + 1}. {item}</MDBCardText>
                                                            )
                                                        })}
                                                    </MDBCol>
                                                </MDBRow>
                                                <hr />
                                                <MDBRow>
                                                    <MDBCol sm="3">
                                                        <MDBCardText className='text-start fw-bold'>Charge</MDBCardText>
                                                    </MDBCol>
                                                    <MDBCol sm="9">
                                                        <MDBCardText className="text-black text-start">₹ {details.price} /Month</MDBCardText>
                                                    </MDBCol>
                                                </MDBRow>
                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>
                                    {/* <div className="d-flex justify-content-between align-items-center mb-4">
                                        <p className="lead fw-normal mb-0">Recent photos</p>
                                        <p className="mb-0"><a href="#!" className="text-muted">Show all</a></p>
                                    </div>
                                    <div className="row g-2">
                                        <div className="col mb-2">
                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"
                                                alt="image 1" className="w-100 rounded-3" />
                                        </div>
                                        <div className="col mb-2">
                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp"
                                                alt="image 1" className="w-100 rounded-3" />
                                        </div>
                                    </div>
                                    <div className="row g-2">
                                        <div className="col">
                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp"
                                                alt="image 1" className="w-100 rounded-3" />
                                        </div>
                                        <div className="col">
                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
                                                alt="image 1" className="w-100 rounded-3" />
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default TrainerDetailedView