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
import { getTrainerDetail, getTrainerList } from '../../../axios/services/HomeService';
import './TrainerList.css'
import { Link, useNavigate } from 'react-router-dom';


function TrainerList() {

    const [details, setDetails] = useState([]);
    const [tdata, setData] = useState([])
    const navigate = useNavigate();

    async function fetchData() {
        const token = localStorage.getItem('admin');
        const data = await getTrainerList();
        console.log('in frontend');
        console.log(data);
        setDetails(data);
    }

    useEffect(() => {
        fetchData();
    }, []);

    async function getDetail(id) {  
        const response = await getTrainerDetail(id);
        const res = JSON.parse(response)
        console.log(response);
        setData(response)
        console.log(tdata);
        navigate({pathname:'/trainerDetailedView',state:{tdata}})
    }

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
                                    ₹ {item.price} /hr
                                </MDBCardText>
                                <div className="d-flex justify-content-between">
                                    {/* <Link to='/trainerDetailedView' ></Link> */}
                                    <MDBBtn className='mx-2' onClick={() => getDetail(item._id)}>Details</MDBBtn>
                                    
                                    <Link><MDBBtn className='mx-2'>Book</MDBBtn></Link>
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