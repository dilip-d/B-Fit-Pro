import React, { useEffect, useState } from "react";
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBRadio,
    MDBRow,
} from "mdb-react-ui-kit";
import { getTrainerDetail, PayNow } from "../../../axios/services/HomeService";
import { useCallback } from 'react';
import useRazorpay from 'react-razorpay';

function Checkout(props) {

    console.log('in checkout');
    const id = props.data.id;
    const date = props.data.date;
    const time = props.data.time;
    const trainerData = { id, date, time };

    const [details, setDetails] = useState([]);
    const token = JSON.parse(localStorage.getItem('user')).token;
    const formData ={details}

    async function fetchData() {
        const user = JSON.parse(localStorage.getItem('user'));
        const data = await getTrainerDetail(id);
        console.log(data);
        if (!user) {
            navigate('/login')
        } else {
            setDetails(data[0]);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    async function onSubmit() {
        const data = await PayNow(token,trainerData,formData, id);
        console.log(data);
    }

    const Razorpay = useRazorpay();

    const orderPayment = useCallback(async () => {
      const token = localStorage.getItem('token');
  
      const value = {};
      value.trainerId = selectedTrainerdetails._id;
      value.planId = planDetails._id;
      value.amount = planDetails.offerRate;
      value.validfor = planDetails.validfor;
      value.userId = clientDetails.userId;
      const data = await placeOdder(token, value);
      console.log(data);
  
      const options = {
        key: 'rzp_test_V6c4v4ekLUGUMI',
        amount: data.order.amount,
        currency: 'INR',
        name: 'fitYou',
        description: 'Test Transaction',
        image: 'https://example.com/your_logo',
        order_id: data.order.id,
        handler: (res) => {
          verifiyPayment(res, data.order);
        },
        prefill: {
          name: 'Piyush Garg',
          email: 'youremail@example.com',
          contact: '9999999999',
        },
        notes: {
          address: 'Razorpay Corporate Office',
        },
        theme: {
          color: '#ED533B',
        },
      };
      const rzpay = new Razorpay(options);
      rzpay.open();
      async function verifiyPayment(res, order) {
        const token = localStorage.getItem('token');
        const verification = await orderVerifiyPayment(token, res, order);
        if (verification.status) {
          navigate('/plan');
        } else {
          alert('error Pls try agine...');
        }
      }
    }, [
      selectedTrainerdetails._id,
      planDetails._id,
      planDetails.offerRate,
      planDetails.validfor,
      clientDetails.userId,
      Razorpay,
      navigate,
    ]);

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
                            {/* <h4 className="text-success">$85.00</h4>
                            <h4>Diabetes Pump &amp; Supplies</h4>
                            <div className="d-flex pt-2">
                                <div>
                                    <p>
                                        <b>
                                            Insurance Responsibility{" "}
                                            <span className="text-success">$71.76</span>
                                        </b>
                                    </p>
                                </div>
                                <div className="ms-auto">
                                    <p className="text-primary">
                                        <MDBIcon
                                            fas
                                            icon="plus-circle"
                                            className="text-primary pe-1"
                                        />
                                        Add insurance card
                                    </p>
                                </div>
                            </div>
                            <p>
                                Insurance claims and all necessary dependencies will be
                                submitted to your insurer for the coverred portion of this order
                            </p>
                            <div
                                className="rounded d-flex"
                                style={{ backgroundColor: "#f8f9fa" }}
                            >
                                <div className="p-2">Aetna-Open Access</div>
                                <div className="ms-auto p-2">OAP</div>
                            </div>
                            <hr />
                            <div className="pt-2">
                                <div className="d-flex pb-2">
                                    <div>
                                        <p>
                                            <b>
                                                Patient Balance{" "}
                                                <span className="text-success">$13.24</span>
                                            </b>
                                        </p>
                                    </div>
                                    <div className="ms-auto">
                                        <p className="text-primary">
                                            <MDBIcon
                                                fas
                                                icon="plus-circle"
                                                className="text-primary pe-1"
                                            />
                                            Add payment card
                                        </p>
                                    </div>
                                </div>
                                <p>
                                    This is an estimate for the portion of your order (not covered
                                    by insurance) due today . once insurance finalizes their
                                    review refunds and/or balances will reconcile automatically.
                                </p>
                                <div className="d-flex flex-row pb-3">
                                    <div className="d-flex align-items-center pe-2">
                                        <MDBRadio name="radioNoLabel" id="radioNoLabel1" checked />
                                    </div>
                                    <div className="rounded border d-flex w-100 p-3 align-items-center">
                                        <p className="mb-0">
                                            <MDBIcon
                                                fab
                                                icon="cc-visa"
                                                size="lg"
                                                className="text-primary pe-2"
                                            />{" "}
                                            Visa Debit Card
                                        </p>
                                        <div className="ms-auto">************3456</div>
                                    </div>
                                </div>
                                <div className="d-flex flex-row pb-3">
                                    <div className="d-flex align-items-center pe-2">
                                        <MDBRadio name="radioNoLabel" id="radioNoLabel1" checked />
                                    </div>
                                    <div className="rounded border d-flex w-100 p-3 align-items-center">
                                        <p className="mb-0">
                                            <MDBIcon
                                                fab
                                                icon="cc-mastercard"
                                                size="lg"
                                                className="text-dark pe-2"
                                            />{" "}
                                            Mastercard Office
                                        </p>
                                        <div className="ms-auto">************1038</div>
                                    </div>
                                </div> */}
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
                                        <div className="ms-auto">{details.fname} {details.lname}</div>
                                    </div>
                                    <div className="p-2 d-flex">
                                        <MDBCol size="8">Date</MDBCol>
                                        <div className="ms-auto">{date}</div>
                                    </div>
                                    <div className="p-2 d-flex">
                                        <MDBCol size="8">Time</MDBCol>
                                        <div className="ms-auto">{time}</div>
                                    </div>
                                    <div className="p-2 d-flex">
                                        <MDBCol size="8">Subtotal</MDBCol>
                                        <div className="ms-auto">₹ {details.price}</div>
                                    </div>
                                    <div className="border-top px-2 mx-2"></div>
                                    {/* <div className="p-2 d-flex pt-3">
                                        <MDBCol size="8">
                                            Total Deductible, Coinsurance, and Copay
                                        </MDBCol>
                                        <div className="ms-auto">$40.00</div>
                                    </div>
                                    <div className="p-2 d-flex">
                                        <MDBCol size="8">
                                            Maximum out-of-pocket on Insurance Policy (not reached)
                                        </MDBCol>
                                        <div className="ms-auto">$6500.00</div>
                                    </div>
                                    <div className="border-top px-2 mx-2"></div>
                                    <div className="p-2 d-flex pt-3">
                                        <MDBCol size="8">Insurance Responsibility</MDBCol>
                                        <div className="ms-auto">
                                            <b>$71.76</b>
                                        </div>
                                    </div>
                                    <div className="p-2 d-flex">
                                        <MDBCol size="8">
                                            Patient Balance{" "}
                                            <span className="fa fa-question-circle text-dark"></span>
                                        </MDBCol>
                                        <div className="ms-auto">
                                            <b>$71.76</b>
                                        </div>
                                    </div>
                                    <div className="border-top px-2 mx-2"></div> */}
                                    <div className="p-2 d-flex pt-3">
                                        <MDBCol size="8">
                                            <b>Total</b>
                                        </MDBCol>
                                        <div className="ms-auto">
                                            <b className="text-success">₹ {details.price}</b>
                                        </div>
                                    </div>
                                </div>
                            </MDBCol>
                            <MDBBtn block size="lg" className="mt-3" onClick={() => onSubmit()}>
                                Proceed to payment
                            </MDBBtn>
                            {/* </div> */}
                        </MDBCol>

                    </MDBRow>
                </MDBCardBody>
            </MDBCard>
        </MDBContainer>
    );
}

export default Checkout;