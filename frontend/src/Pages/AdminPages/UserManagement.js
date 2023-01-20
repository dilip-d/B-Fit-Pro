import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';

import {
  blockunsrinfo,
  getUserInfo,
  unBlockuserinfo,
} from '../../axios/services/AdminService';

function UserManagement() {

  const [details, setDetails] = useState([]);
  const [search,setSearch] = useState('')
  const [filterDetails, setFilterDetails] = useState([])


  useEffect(() => {
    const token = localStorage.getItem('Admintoken');
    fetchData();

    async function fetchData() {
      const data = await getUserInfo(token);
      console.log(data);
      setDetails(data.clientDetails);
      setFilterDetails(data.clientDetails)
    }
  }, []);
  console.log(details);

  useEffect(()=>{
    const result = details.filter(detail =>{
      return detail.fname.toLowerCase().match(search.toLowerCase())
    })

    setFilterDetails(result)
  },[search])

  async function unBlock(id) {
    const token = localStorage.getItem('Admintoken');
    const data = await unBlockuserinfo(token, id);
    console.log('unblockingg');
    console.log(data);
    if (data.unBlock) {
      const newDetails = details.map(user => {
        if (user._id === id) {
          return { ...user, isBlocked: false }
        }
        return user;
      })
      setDetails(newDetails);
    }
  }

  async function Block(id) {
    const token = localStorage.getItem('Admintoken');
    const data = await blockunsrinfo(token, id);
    console.log('blockingggg');
    console.log(data);
    if (data.block) {
      const newDetails = details.map(user => {
        if (user._id === id) {
          return { ...user, isBlocked: true }
        }
        return user;
      })
      setDetails(newDetails);
    }
  }

  const columns = [
    {
      name: 'Name',
      selector: (row) => row.fname,
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
      name: 'gender',
      selector: (row) => row.gender,
    },
    {
      name: 'DOB',
      selector: (row) => row.dob,
    },
    {
      name: 'Block/Unblock',
      selector: (row) => {
        return (
          <div>
            {' '}
            {row.isBlocked ? (
              <button
                className="btn-dark px-3"
                onClick={() => unBlock(row._id)}
              >
                Unblock
              </button>
            ) : (
              <button className="btn-danger px-4" onClick={() => Block(row._id)}>
                Block
              </button>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div className='row justify-content-center'>
      <div className="container d-flex flex-column align-items-center">
        <div className="row mt-4">
          <h1 >User Informations</h1>
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
                onChange={(e)=> setSearch(e.target.value)}
              />
            }
            />
        </div>
      </div>
    </div>
  );
}

export default UserManagement;
