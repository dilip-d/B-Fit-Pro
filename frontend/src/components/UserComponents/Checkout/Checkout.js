import React, { useEffect, useState } from "react";
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBContainer,
    MDBRow,
} from "mdb-react-ui-kit";
import { getTrainerDetail, orderVerifyPayment, placeBooking } from "../../../axios/services/HomeService";
import { useCallback } from 'react';
import useRazorpay from 'react-razorpay';
import { useNavigate } from "react-router-dom";

function Checkout(props) {

    const id = props.data.id;
    const date = props.data.date;
    const time = props.data.time;
    const trainerData = { id, date, time };

    const [details, setDetails] = useState([]);
    const token = JSON.parse(localStorage.getItem('user'))?.token;
    const userId = JSON.parse(localStorage.getItem('user'))?.user._id;

    const navigate = useNavigate()

    async function fetchData() {
        const user = JSON.parse(localStorage.getItem('user'));
        const data = await getTrainerDetail(id);
        console.log(data);
        if (!user) {
            navigate('/login')
        } else if (data.expired) {
            localStorage.removeItem("user");
            navigate('/login')
        } else if (data.error) {
            navigate('*')
        } else {
            setDetails(data);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const Razorpay = useRazorpay();

    const payment = useCallback(async () => {

        const data = await placeBooking(token, trainerData, userId);

        const options = {
            key: 'rzp_test_fMYGGzYHXWUmyl',
            amount: data.order.amount,
            currency: 'INR',
            name: 'B-FitPro',
            description: 'Test Transaction',
            image: 'https://cdn.pixabay.com/photo/2022/07/17/19/15/gym-7328168_960_720.png',
            order_id: data.order.id,
            handler: (res) => {
                verifiyPayment(res, data.order);
            },
            prefill: {
                name: 'name',
                email: 'youremail@example.com',
                contact: '9999999999',
            },
            notes: {
                address: 'Razorpay Corporate Office',
            },
            theme: {
                color: '#000000',
            },
        };
        const rzpay = new Razorpay(options);
        rzpay.open();
        async function verifiyPayment(res, order) {
            const verification = await orderVerifyPayment(token, res, order);
            if (verification.message) {
                navigate('/paymentSuccess');
            } else {
                alert('error Pls try again...');
            }
        }
    }, []);

    return (
        <MDBContainer fluid className="p-5" style={{ backgroundColor: "white" }}>
            <MDBCard>
                <MDBCardBody style={{ backgroundColor: "lightgrey" }}>
                    <MDBRow className="d-flex justify-content-center pb-5">
                        <MDBCol md="7" xl="5" className="mb-4 mb-md-0">
                            <div className="py-4 d-flex flex-row">
                                <h5>
                                    <span className="far fa-check-square pe-2"></span>
                                    <b>ELIGIBLE</b> |
                                </h5>
                                <span className="ps-2">Pay</span>
                                <div className="d-flex">
                                    <h6 className="mx-5">
                                        <a href="#!">Cancel and return to website</a>
                                    </h6>
                                </div>
                            </div>
                            <MDBCol md="5" xl="12" offsetXl="1">
                                {" "}
                                <div
                                    className="rounded d-flex flex-column p-2"
                                    style={{ backgroundColor: "#f8f9fa" }}>
                                    <div className="p-2 me-3">
                                        <h4>Checkout</h4>
                                    </div>
                                    <div className="p-2 d-flex">
                                        <MDBCol size="8" >Trainer</MDBCol>
                                        <div className="ms-auto">{details?.trainer?.fname} {details?.trainer?.lname}</div>
                                    </div>
                                    <div className="p-2 d-flex">
                                        <MDBCol size="8">Date</MDBCol>
                                        <div className="ms-auto">{date}</div>
                                    </div>
                                    <div className="p-2 d-flex">
                                        <MDBCol size="8">Valid for</MDBCol>
                                        <div className="ms-auto">1 month</div>
                                    </div>
                                    <div className="p-2 d-flex">
                                        <MDBCol size="8">Time</MDBCol>
                                        <div className="ms-auto">{time}</div>
                                    </div>
                                    <div className="p-2 d-flex">
                                        <MDBCol size="8">Subtotal</MDBCol>
                                        <div className="ms-auto">₹ {details?.trainer?.price}</div>
                                    </div>
                                    <div className="border-top px-2 mx-2"></div>
                                    <div className="p-2 d-flex pt-3">
                                        <MDBCol size="8">
                                            <b>Total</b>
                                        </MDBCol>
                                        <div className="ms-auto">
                                            <b className="text-success">₹ {details?.trainer?.price}</b>
                                        </div>
                                    </div>
                                </div>
                            </MDBCol>
                            <MDBBtn block size="lg" className="mt-3" onClick={payment}>
                                Proceed to payment
                            </MDBBtn>
                        </MDBCol>
                    </MDBRow>
                </MDBCardBody>
            </MDBCard>
        </MDBContainer>
    );
}

export default Checkout;