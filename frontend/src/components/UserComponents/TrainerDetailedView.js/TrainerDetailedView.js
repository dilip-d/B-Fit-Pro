import { MDBBtn, MDBCard, MDBCardBody, MDBCardText, MDBCol, MDBRow } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './TrainerDetailedView.css'
import { DatePicker } from "antd";
import { CheckAvailability, getTrainerDetail } from "../../../axios/services/HomeService";
import { toast} from 'react-toastify';
import { postConversation } from '../../../axios/services/ConversationServices';

function TrainerDetailedView(props) {

    const id = props.trainerId;

    const [details, setDetails] = useState({});
    const [selectedDate, setSelectedDate] = useState(null);
    const [isAvailable, setIsAvailable] = useState(null);
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user'));

    async function fetchData() {
        const data = await getTrainerDetail(id);
        // if (!user) {
        //     navigate('/login')
        // } else {
        setDetails(data[0]);
        // }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const token = JSON.parse(localStorage.getItem('user'))?.token;

    const onSubmit = async (event) => {
        event.preventDefault();

        const selectedTime = event.target.elements.time.value;

        const values = { date: selectedDate.format("DD-MM-YYYY"), time: selectedTime };
        const data = await CheckAvailability(token, values, id);
        if (data.error) {
            toast.error(data.error)
            setIsAvailable(null)
        } else {
            toast.success(data.message)
            setIsAvailable(data)
        }
    }

    useEffect(() => {
    }, [isAvailable])

    async function postConversatn() {
        const userId = user?.user?._id;
        const trainerId = details?._id
        await postConversation(userId, trainerId);
    }

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
                                <div className="card-body p-4 mt-3 text-black">
                                    {user ? (
                                        <>
                                            <Link to="/textChat" onClick={postConversatn}><button className='float-start btn-sm btn-dark' style={{ marginLeft: "1rem", marginTop: "4rem" }}>Message Me</button></Link>
                                            <div className="d-flex flex-row-end justify-content-end ">
                                                <form onSubmit={onSubmit} className="w-50 mb-5 mb-md-0">
                                                    <h4 className='text-center'>Please check the availability first !</h4>
                                                    <DatePicker
                                                        className="text-center mb-2"
                                                        style={{ width: '100%' }}
                                                        required
                                                        format="DD-MM-YYYY"
                                                        onChange={(value) =>
                                                            setSelectedDate(value)
                                                        }
                                                    />
                                                    <select className="select w-100 mb-2 " required name="time">
                                                        <option value="" disabled selected>Select an time</option>
                                                        {details.timing?.map((item, index) => {
                                                            return (
                                                                <option key={index} value={item}>{item}</option>
                                                            )
                                                        })}
                                                    </select>
                                                    <button type="submit" className="btn btn-primary mt-2 text-center w-100" >
                                                        Check Availability
                                                    </button>
                                                </form>
                                            </div>
                                            {isAvailable ?
                                                <div className="d-flex justify-content-end">
                                                    <div className="row">
                                                        <h4 className='mr-auto mt-2' style={{ color: 'lightgreen' }}>Available ! Proceed with book now</h4>
                                                        <Link to={`/payment/${encodeURIComponent(JSON.stringify(isAvailable))}`}>
                                                            <button className="btn btn-dark text-center" >
                                                                Book Now
                                                            </button>
                                                        </Link>
                                                    </div>
                                                </div>
                                                : null}
                                        </>
                                    ) : (
                                        <div className='text-end mt-3'>
                                            <Link to={`/bookTrainer/${details._id}`}><MDBBtn>Book Now</MDBBtn></Link>
                                        </div>
                                    )}
                                    <div className="mb-5 mt-5">
                                        <p className="lead fw-normal mb-1 fw-bold">Description</p>
                                        <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                                            <p className="font-italic mb-1">{details.description}</p>
                                        </div>
                                    </div>
                                    <MDBCol lg="12">
                                        <MDBCard className="mb-4">
                                            <MDBCardBody style={{ backgroundColor: "white" }}>
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