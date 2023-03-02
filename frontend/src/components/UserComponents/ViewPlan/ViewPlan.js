import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import { cancelPlan, getBookings } from '../../../axios/services/HomeService';

function ViewPlan(props) {

    const id = props.userId

    const [details, setDetails] = useState([]);
    const [search, setSearch] = useState('')
    const [filterDetails, setFilterDetails] = useState([])

    const navigate = useNavigate()

    const token = JSON.parse(localStorage.getItem('user'))?.token;

    async function fetchData() {
        const data = await getBookings(token, id);
        if (data.error) {
            // setError(data.error)
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

    async function cancel(clientId) {
        const data = await cancelPlan(token, clientId);
        if (data.status) {
            fetchData()
        }
    }

    function handleBackButtonClick() {
        navigate(-1);
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
                        {row.serviceStatus === 'Active' ? (
                            <button
                                key={row._id}
                                className="btn-danger px-3"
                                onClick={() => cancel(row.clientId)}
                            >
                                Cancel
                            </button>
                        ) : (
                            <p className='text-danger'>Cancelled</p>
                        )}
                    </div>
                );
            },
        }
    ];
    return (
        <>
            <button className='btn-sm btn-dark mt-4' onClick={handleBackButtonClick}><i class="fa fa-arrow-circle-left" aria-hidden="true"></i>  Go Back</button>
            <div className='row justify-content-center m-2'>
                <div className="d-flex flex-column align-items-center" style={{ minHeight: '600px' }}>
                    <div className='table bg-dark'>
                        <DataTable
                            columns={columns}
                            data={details}
                            fixedHeader
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
