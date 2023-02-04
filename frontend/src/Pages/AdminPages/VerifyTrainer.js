import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {
    getTrainerdetails,
    trainerApproval,
    trainerReject
} from '../../axios/services/AdminService';

function VerifyTrainer() {

    const [details, setDetails] = useState([]);

    const token =  JSON.parse(localStorage.getItem('admin')).token;

    async function fetchData() {  
        const data = await getTrainerdetails(token);
        console.log('in front');
        console.log(data);
        setDetails(data.trainerDetails);
    }

    useEffect(() => {
        fetchData();
    }, []);

    async function reject(id) {
        const rejected = await trainerReject(token, id);
        if (rejected.trainerDetails) {
            fetchData();
        }
    }

    async function approve(id) {
        const Approved = await trainerApproval(token, id);
        if (Approved.trainerDetails) {
            fetchData();
        }
    }

    const Link = styled.a`
    color : orange;
    &:hover {
     color: red;
     text-decoration: underline;
   }
   `;

    return (
        <>
            <div>
                <h2 className='p-2'>Verify Trainers</h2>
                {details.map((item, index) => {
                    return (
                        <div className='row px-4 py-1 d-flex align-items-start'
                            key={index}>
                            <div className="card" style={{ color: "white" }}>
                                <div className="row">
                                    <div className="col-md-2" style={{ height: "11rem" }}>
                                        <img src={item.profileImage} className="img float-left" style={{ objectFit: "contain" }} alt="..." />
                                    </div>
                                    <div className="col-md-6 py-3">
                                        <div className="card-body text-start m-0 p-0">
                                            <h6 className="card-title">Name : {item.fname} {item.lname}</h6>
                                            <p className="card-text">Cerificate : <Link href={item.certificateImage} target="_blank">View Cerificate</Link></p>
                                            <p className="card-text">Youtube Link : <Link href={item.link} target="_blank">{item.link}</Link></p>
                                            <div class="ratio ratio-16x9 ">
                                                <iframe
                                                    src={item.link}
                                                    title="YouTube video"
                                                    allowFullScreen
                                                ></iframe>
                                            </div>
                                            <div className='d-flex'>
                                                <button className='btn btn-sm mt-2'
                                                    onClick={() => approve(item._id)}>Approve</button>
                                                {/* <button className='btn mx-3 btn-sm'
                                                    onClick={() => reject(item._id)}
                                                    style={{ background: "darkred" }}>Reject</button> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-md-4 py-3'>
                                        <div className="card-body text-start m-0 p-0">
                                            <h6 className="card-title">DOB : {item.dob}</h6>
                                            <p className="card-text">Email : {item.email}</p>
                                            <p className="card-text">Phone : {item.phone}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    )
}

export default VerifyTrainer;