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


function TrainerList() {

    const [details, setDetails] = useState([]);

    async function fetchData() {
        
        const data = await getTrainerList();
        console.log('in frontend');
        console.log(data);
        setDetails(data);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <MDBRow className='row-cols-1 row-cols-md-4 g-4 m-2'>
            {details.map((item, index) => {
                return (
                    <MDBCol>
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