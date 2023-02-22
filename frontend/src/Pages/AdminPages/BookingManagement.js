import React, { useState, useEffect, useRef } from 'react';
import DataTable from 'react-data-table-component';
import { getBookingInfo } from '../../axios/services/AdminService';

function BookingManagement() {

    const [details, setDetails] = useState([]);
    const [search, setSearch] = useState('')
    const [filterDetails, setFilterDetails] = useState([])

    const token = JSON.parse(localStorage.getItem('admin'))?.token;

    async function fetchData() {
        const data = await getBookingInfo(token);
        setDetails(data.booking);
        setFilterDetails(data.booking)
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const result = details.filter(detail => {
            return detail.clientInfo.toLowerCase().match(search.toLowerCase())
        })
        setFilterDetails(result)
    }, [search])

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
            name: 'Status',
            style: {
                color: "green",
            },
            selector: (row) => row.serviceStatus,
        },
    ];

    return (
        <div className='row justify-content-center'>
            <div className="d-flex flex-column align-items-center">
                <div className="row mt-4">
                    <h1 >Bookings Management</h1>
                </div>
                <div className='table' >
                    <DataTable
                        id='data-table'
                        columns={columns}
                        data={filterDetails}
                        fixedHeader
                        fixedHeaderScrollHeight="500px"
                        // selectableRows
                        selectableRowsHighlight
                        highlightOnHover
                        pagination
                        subHeader
                        subHeaderComponent={
                            <input
                                type='text'
                                placeholder='Search here'
                                className='w-25 form-control'
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        }
                    />
                </div>
            </div>
        </div>
    );
}

export default BookingManagement;