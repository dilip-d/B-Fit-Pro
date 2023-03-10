import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import {
    getActiveTrainerInfo,
    unBlockTrainer,
    blockTrainer,
} from '../../axios/services/AdminService';

function TrainerManagement() {

    const [details, setDetails] = useState([]);
    const [search, setSearch] = useState('')
    const [filterDetails, setFilterDetails] = useState([])
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate()

    const token = JSON.parse(localStorage.getItem('admin')).token;

    async function fetchData() {
        const data = await getActiveTrainerInfo(token);
        if (data.expired) {
            localStorage.removeItem("admin");
            setIsLoggedIn(false);
        } else {
            setIsLoggedIn(true);
            setDetails(data.activetrainerDetails);
            setFilterDetails(data.activetrainerDetails)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const result = details.filter(detail => {
            return detail.fname.toLowerCase().match(search.toLowerCase())
        })
        setFilterDetails(result)
    }, [search, details])

    async function unBlock(id) {
        const data = await unBlockTrainer(token, id);;
        if (data.unBlock) {
            fetchData()
        }
    }

    async function Block(id) {
        const data = await blockTrainer(token, id);
        if (data.block) {
            fetchData()
        }
    }

    const columns = [
        {
            name: 'Index',
            selector: (_, index) => index + 1,
        },
        {
            name: 'Name',
            selector: (row) => row.fname + ' ' + row.lname,
        },
        {
            name: 'Email',
            selector: (row) => row.email,
        },
        {
            name: 'Phone',
            selector: (row) => row.phone,
        },
        {
            name: 'Gender',
            selector: (row) => row.gender,
        },
        {
            name: 'Block/Unblock',
            selector: (row) => {
                return (
                    <div>
                        {row.isBlocked ? (
                            <button
                                key={row._id}
                                className="btn-dark px-3"
                                onClick={() => unBlock(row._id)}
                            >
                                Unblock
                            </button>
                        ) : (
                            <button
                                key={row._id} className="btn-danger px-4"
                                onClick={() => Block(row._id)}>
                                Block
                            </button>
                        )}
                    </div>
                );
            },
        }
    ];

    if (!isLoggedIn) {
        navigate('/adminLogin');
        return null;
    }

    return (
        <div className='row justify-content-center'>
            <div className="d-flex flex-column align-items-center">
                <div className="row mt-4 pt-4">
                    <h2> TRAINER MANAGEMENT</h2>
                </div>
                <div className='table'>
                    <DataTable
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

export default TrainerManagement;
