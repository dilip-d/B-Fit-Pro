import React, { useEffect, useState } from 'react';
import {
    MDBCard,
    MDBCardImage,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBRow,
    MDBCol,
    MDBBtn
} from 'mdb-react-ui-kit';
import { getTrainerList } from '../../../axios/services/HomeService';
import './TrainerList.css'
import { Link } from 'react-router-dom';
import {toast} from 'react-toastify';

function TrainerList() {

    const [details, setDetails] = useState([]);

    async function fetchData() {
        // const token =  JSON.parse(localStorage.getItem('user')).token;
        const data = await getTrainerList();
        setDetails(data);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <MDBRow className='row-cols-1 row-cols-md-4 m-5'>
            {details.map((item, index) => {
                return (
                    <MDBCol className='m-2' style={{width:'18rem'}}>
                        <MDBCard className='card'>
                            <MDBCardImage
                                className="small-image"
                                src={item.profileImage}
                                alt='...'
                                position='top'
                            />
                            <MDBCardBody className='bg-light'>
                                <MDBCardTitle className='text-dark'>{item.fname} {item.lname}</MDBCardTitle>
                                <MDBCardText className='text-start' style={{ color: 'red' }}>
                                    ₹ {item.price} /Month
                                </MDBCardText>
                                <div className="d-flex justify-content-between">
                                    <Link to={`/trainerDetailedView/${item._id}`}><MDBBtn className='mx-2'>Details</MDBBtn></Link>
                                    <Link to={`/bookTrainer/${item._id}`}><MDBBtn className='mx-2'>Book</MDBBtn></Link>
                                </div>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                )
            })}
        </MDBRow>
    );
}

export default TrainerList