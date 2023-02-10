import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { getBookings } from '../../../axios/services/HomeService';

function ViewPlan(props) {

    const id = props.userId

    const [details, setDetails] = useState([]);
    const [search, setSearch] = useState('')
    const [filterDetails, setFilterDetails] = useState([])

    const token = JSON.parse(localStorage.getItem('user')).token;

    async function fetchData() {
        const data = await getBookings(token, id);
        console.log('in viewPlan');
        console.log(data);
        setDetails(data);
        // setFilterDetails(data)
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

    // async function unBlock(id) {
    //     const data = await unBlockTrainer(token, id);
    //     console.log('unblockingg');
    //     console.log(data);
    //     if (data.unBlock) {
    //         fetchData()
    //     }
    // }

    // async function Block(id) {
    //     const data = await blockTrainer(token, id);
    //     console.log('blockingg');
    //     console.log(data);
    //     if (data.block) {
    //         fetchData()
    //     }
    // }

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
        // {
        //     name: 'Block/Unblock',
        //     selector: (row) => {
        //         return (
        //             <div>
        //                 {row.isBlocked ? (
        //                     <button
        //                         key={row._id}
        //                         className="btn-dark px-3"
        //                         onClick={() => unBlock(row._id)}
        //                     >
        //                         Unblock
        //                     </button>
        //                 ) : (
        //                     <button
        //                         key={row._id} className="btn-danger px-4"
        //                         onClick={() => Block(row._id)}>
        //                         Block
        //                     </button>
        //                 )}
        //             </div>
        //         );
        //     },
        // }
    ];
    return (
        <div className='row justify-content-center m-5'>
            <div className="d-flex flex-column align-items-center" style={{minHeight:'600px'}}>
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
    );
}

export default ViewPlan;
