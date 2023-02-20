import React, { useEffect, useState } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import profileLogo from '../../../assets/profileLogo.png'
import { getUserProfile } from '../../../axios/services/HomeService';

export default function Wallet(props) {

    const id = props.userId;

    const [details, setDetails] = useState([]);
    const [error, setError] = useState(null);

    const token = JSON.parse(localStorage.getItem('user'))?.token;
    const user = JSON.parse(localStorage.getItem('user'))
    const navigate = useNavigate();

    async function fetchData() {
        if (!user) {
            navigate('/login');
        } else {
            const data = await getUserProfile(token, id);
            if (data.expired) {
                setError(data.expired)
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

    function handleBackButtonClick() {
        navigate(-1);
    }

    return (
        <div className="vh-100" style={{ backgroundColor: 'light' }}>
            <>
                <MDBRow className="justify-content-center">
                    <MDBCol md="9" lg="7" xl="5" className="mt-5">
                        <MDBCard style={{ borderRadius: '15px', backgroundColor: '#C1DEC7' }}>
                            <MDBCardBody className=" text-black">
                                <div>
                                    <h6>Your Personal Wallet</h6>
                                    <div className="d-flex align-items-center justify-content-between mb-3">
                                        <p className="small mb-0"><MDBIcon far icon="clock me-2" />Lifetime valid</p>
                                        <p className="fw-bold mb-0">Use it to book your service.</p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center mb-4">
                                    <div className="flex-shrink-0">
                                        <MDBCardImage
                                            style={{ width: '70px' }}
                                            className="img-fluid rounded-circle border border-dark border-3"
                                            src={profileLogo}
                                            alt='Generic placeholder image'
                                            fluid />
                                    </div>
                                    <div className="flex-grow-1">
                                        <div className="d-flex flex-row align-items-center mb-2">
                                            <p className="mb-0 mx-2">Amount :</p>
                                            <p className="mb-0 me-2">Rs. {details.wallet}</p>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <MDBBtn color="success" rounded block size="lg" onClick={handleBackButtonClick}>
                                    Go Back
                                </MDBBtn>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </>
        </div>
    );
}