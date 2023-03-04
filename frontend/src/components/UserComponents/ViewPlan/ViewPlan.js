import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import { cancelPlan, getBookings } from '../../../axios/services/HomeService';
import Modal from 'react-modal';

function ViewPlan(props) {

    const id = props.userId

    const [details, setDetails] = useState([]);
    const [search, setSearch] = useState('')
    const [filterDetails, setFilterDetails] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTrainerId, setSelectedTrainerId] = useState({});

    const navigate = useNavigate()

    const token = JSON.parse(localStorage.getItem('user'))?.token;

    async function fetchData() {
        const data = await getBookings(token, id);
        if (data.expired) {
            localStorage.removeItem("user");
            navigate('/login')
        } else if (data.error) {
            // setError(data.error);
            navigate('*')
        } else {
            setDetails(data);
            // setFilterDetails(data)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    // useEffect(() => {
    //     const result = details.filter(detail => {
    //         return detail.fname.toLowerCase().match(search.toLowerCase())
    //     })
    //     setFilterDetails(result)
    // }, [search, details])

    function handleBackButtonClick() {
        navigate(-1);
    }

    async function cancel(trainerId, timing) {
        setSelectedTrainerId({ trainerId: trainerId, timing: timing });
        setIsModalOpen(true);
    }

    async function handleConfirm() {
        const data = await cancelPlan(token, selectedTrainerId);
        if (data.status) {
            setIsModalOpen(false);
            fetchData();
        }
    }

    const columns = [
        {
            name: 'Index',
            selector: (_, index) => index + 1,
        },
        {
            name: 'Trainer',
            selector: (row) => row.trainerInfo,
        },
        {
            name: 'Start Date',
            selector: (row) => row.startDate,
        },
        {
            name: 'End Date',
            selector: (row) => row.endDate,
        },
        {
            name: 'Timing',
            selector: (row) => row.timing,
        },
        {
            name: 'Plan Status',
            selector: (row) => row.serviceStatus,
        },
        {
            name: 'Amount',
            selector: (row) => row.amount,
        },
        {
            name: 'Payment Status',
            selector: (row) => row.paymentStatus,
        },
        {
            name: 'Action',
            selector: (row) => {
                return (
                    <div>
                        {row.serviceStatus === 'Active' ?
                            <>
                                <button
                                    key={row._id}
                                    className="btn-danger px-3 d-inline d-md-inline"
                                    onClick={() => cancel(row.trainerId, row.timing)}
                                >
                                    Cancel
                                </button>

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
                                    <h5 className='text-white'>Are you sure you want to cancel this plan?</h5>
                                    <div className="d-flex justify-content-center">
                                        <button className="btn-danger m-2 d-inline d-md-inline" onClick={handleConfirm}>Confirm</button>
                                        <button className="btn-success m-2 d-inline d-md-inline" onClick={() => setIsModalOpen(false)}>Cancel</button>
                                    </div>
                                </Modal>
                            </>
                            :
                            <p className='text-danger'>Cancelled</p>
                        }
                    </div>
                );
            },
        }
    ];
    return (
        <>
            <button className='btn-sm btn-dark mt-4 m-2 d-inline d-md-inline' onClick={handleBackButtonClick}><i class="fa fa-arrow-circle-left" aria-hidden="true"></i>  Go Back</button>
            <div className='row justify-content-center m-2'>
                <div className="d-flex flex-column align-items-center" style={{ minHeight: '600px' }}>
                    <div className='table bg-dark'>
                        <DataTable
                            columns={columns}
                            data={details}
                            // fixedHeader
                            fixedHeaderScrollHeight="500px"
                            // selectableRows
                            selectableRowsHighlight
                            highlightOnHover
                            pagination
                            subHeader
                        // subHeaderComponent={
                        //     <input
                        //         type='text'
                        //         placeholder='Search here'
                        //         className='w-25 form-control'
                        //         value={search}
                        //         onChange={(e) => setSearch(e.target.value)}
                        //     />
                        // }
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default ViewPlan;
