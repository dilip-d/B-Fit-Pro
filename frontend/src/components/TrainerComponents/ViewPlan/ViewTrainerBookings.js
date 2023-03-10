import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import { cancelPlan } from '../../../axios/services/HomeService';
import { getTrainerBookings } from '../../../axios/services/TrainerService';

function ViewTrainerBookings(props) {

    const id = props.trainerId

    const [details, setDetails] = useState([]);
    const [search, setSearch] = useState('')
    const [filterDetails, setFilterDetails] = useState([])

    const navigate = useNavigate();

    const token = JSON.parse(localStorage.getItem('trainer'))?.token;

    async function fetchData() {
        const data = await getTrainerBookings(token, id);
        if (data.expired) {
            localStorage.removeItem("trainer");
            navigate('/trainerLogin')
        } else if (data.error) {
            navigate('*')
        } else {
            setDetails(data);
            setFilterDetails(data)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const result = details.filter(detail => {
            return detail.clientInfo.toLowerCase().match(search.toLowerCase())
        })
        setFilterDetails(result)
    }, [search, details])

    async function cancel(clientId) {
        const data = await cancelPlan(token, clientId);
        if (data.status) {
            fetchData()
        }
    }

    const columns = [
        {
            name: 'Index',
            selector: (_, index) => index + 1,
        },
        {
            name: 'Client',
            selector: (row) => row.clientInfo,
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
        // {
        //     name: 'Action',
        //     selector: (row) => {
        //         return (
        //             <div>
        //                 {row.serviceStatus === 'Active' ? (
        //                     <button
        //                         key={row._id}
        //                         className="btn-danger px-3"
        //                         onClick={() => cancel(row.clientId)}
        //                     >
        //                         Cancel
        //                     </button>
        //                 ) : (
        //                     <p className='text-danger'>Cancelled</p>
        //                 )}
        //             </div>
        //         );
        //     },
        // }
    ];

    const grandTotal = details.reduce((total, row) => total + row.amount, 0);

    return (
        <div className='row justify-content-center m-5'>
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
                        persistTableHead
                        // subHeaderComponent={<div className='text-danger'>Total Amount: ??? {grandTotal}</div>}
                        // subHeaderComponent={
                        //     <input
                        //         type='text'
                        //         placeholder='Search here'
                        //         className='w-25 form-control'
                        //         value={search}
                        //         onChange={(e) => setSearch(e.target.value)}
                        //     />
                        // }
                        subHeaderComponent={
                            <div className="d-flex ">
                                {/* <input
                                    type='text'
                                    placeholder='Search here'
                                    className='w-50 form-control'
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                /> */}
                                <div className='text-danger'>Total Amount: ??? {grandTotal}</div>
                            </div>
                        }
                    />
                </div>
            </div>
        </div>
    );
}

export default ViewTrainerBookings;
