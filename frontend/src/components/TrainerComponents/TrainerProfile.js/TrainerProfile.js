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
import Modal from 'react-modal';
import { deleteService, deleteTips, getProfile } from '../../../axios/services/TrainerService';

export default function TrainerProfile() {

    const [details, setDetails] = useState([]);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isTipModalOpen, setIsTipModalOpen] = useState(false);
    const [service, setService] = useState({});
    const [tip, setTip] = useState({});

    const navigate = useNavigate()

    const token = JSON.parse(localStorage.getItem('trainer'))?.token;
    const trainer = JSON.parse(localStorage.getItem('trainer'));
    const id = trainer.trainer._id;

    async function fetchData() {
        if (!trainer) {
            navigate('/trainerLogin');
        } else {
            const data = await getProfile(token, id);
            if (data.expired) {
                localStorage.removeItem("trainer");
                navigate('/trainerLogin')
            } else if (data.error) {
                setError(data.error);
            } else {
                setDetails(data[0]);
            }
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    async function deleteSvc(value) {
        setService({ item: value });
        setIsModalOpen(true);
    }

    async function handleConfirm() {
        const data = await deleteService(token, service, id);
        if (data.status) {
            setIsModalOpen(false);
            fetchData();
        }
    }

    async function deleteTip(value) {
        setTip({ item: value });
        setIsTipModalOpen(true);
    }

    async function handleConfirmDeleteTip() {
        const data = await deleteTips(token, tip, id);
        if (data.status) {
            setIsTipModalOpen(false);
            fetchData();
        }
    }

    return (
        <>
            {error ? <div className='text-danger d-flex justify-content-center text-align-center' style={{ minHeight: '400px' }}>
                <h2 className='text-center my-auto'>{error}</h2>
            </div> :
                <>
                    <MDBRow className='px-5 py-3 bg-black'>
                        <MDBCol lg="4">
                            <MDBCard className="mb-4" style={{ boxShadow: 'none' }} >
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
                            <MDBCard className="mb-4 mb-lg-0" style={{ boxShadow: 'none' }}>
                                <MDBCardBody className="p-0" >
                                    <MDBListGroup flush className="rounded-3">
                                        <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                            <MDBIcon fas icon="globe fa-lg text-warning" />
                                            <MDBCardText>{details.email}</MDBCardText>
                                        </MDBListGroupItem>
                                    </MDBListGroup>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                        <MDBCol lg="8">
                            <MDBCard className="mb-4" style={{ boxShadow: 'none' }}>
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
                                            {details.service?.map((item, index) => {
                                                return (
                                                    <div className='d-flex justify-content-between'>
                                                        <MDBCardText key={index} className="text-muted text-start pt-2">{index + 1}.  {item}</MDBCardText>
                                                        <button onClick={() => deleteSvc(item)} className="fas fa-trash-alt mx-2 pt-0" style={{ color: "red", background: 'white' }}></button>
                                                        <Modal
                                                            isOpen={isModalOpen}
                                                            onRequestClose={() => setIsModalOpen(false)}
                                                            style={{
                                                                overlay: {
                                                                    backgroundColor: 'white',
                                                                },
                                                                content: {
                                                                    top: '50%',
                                                                    left: '50%',
                                                                    right: 'auto',
                                                                    bottom: 'auto',
                                                                    marginRight: '-50%',
                                                                    transform: 'translate(-50%, -50%)',
                                                                    backgroundColor: 'black',
                                                                    borderRadius: '10px',
                                                                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
                                                                    padding: '20px',
                                                                    display: 'flex',
                                                                    flexDirection: 'column',
                                                                    alignItems: 'center',
                                                                },
                                                            }}
                                                        >
                                                            <h5 className='text-white'>Are you sure you want to delete ?</h5>
                                                            <div className="d-flex justify-content-center">
                                                                <button className="btn-danger m-2 d-inline d-md-inline" onClick={handleConfirm}>Confirm</button>
                                                                <button className="btn-success m-2 d-inline d-md-inline" onClick={() => setIsModalOpen(false)}>Cancel</button>
                                                            </div>
                                                        </Modal>
                                                    </div>
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
                                                    <div className='d-flex justify-content-between'>
                                                        <MDBCardText key={index} className="text-muted text-start pt-2">{index + 1}.  {item}</MDBCardText>
                                                        <button onClick={() => deleteTip(item)} className="fas fa-trash-alt mx-2 pt-0" style={{ color: "red", background: 'white' }}></button>
                                                        <Modal
                                                            isOpen={isTipModalOpen}
                                                            onRequestClose={() => setIsTipModalOpen(false)}
                                                            style={{
                                                                overlay: {
                                                                    backgroundColor: 'white',
                                                                },
                                                                content: {
                                                                    top: '50%',
                                                                    left: '50%',
                                                                    right: 'auto',
                                                                    bottom: 'auto',
                                                                    marginRight: '-50%',
                                                                    transform: 'translate(-50%, -50%)',
                                                                    backgroundColor: 'black',
                                                                    borderRadius: '10px',
                                                                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
                                                                    padding: '20px',
                                                                    display: 'flex',
                                                                    flexDirection: 'column',
                                                                    alignItems: 'center',
                                                                },
                                                            }}
                                                        >
                                                            <h5 className='text-white'>Are you sure you want to delete ?</h5>
                                                            <div className="d-flex justify-content-center">
                                                                <button className="btn-danger m-2 d-inline d-md-inline" onClick={handleConfirmDeleteTip}>Confirm</button>
                                                                <button className="btn-success m-2 d-inline d-md-inline" onClick={() => setIsTipModalOpen(false)}>Cancel</button>
                                                            </div>
                                                        </Modal>
                                                    </div>
                                                )
                                            })}
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCardBody>
                            </MDBCard>
                            <MDBRow>
                            </MDBRow>
                        </MDBCol>
                    </MDBRow>
                </>
            }
        </>
    );
}