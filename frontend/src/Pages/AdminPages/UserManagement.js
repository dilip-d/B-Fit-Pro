import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import {
  blockUser,
  getUserInfo,
  unBlockUser,
} from '../../axios/services/AdminService';

function UserManagement() {

  const [details, setDetails] = useState([]);
  const [search, setSearch] = useState('')
  const [filterDetails, setFilterDetails] = useState([])
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUnblockModalOpen, setIsUnblockModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState({});

  const token = JSON.parse(localStorage.getItem('admin'))?.token;

  async function fetchData() {
    const data = await getUserInfo(token);
    if (data.expired) {
      localStorage.removeItem("admin");
      navigate('/adminLogin')
    } else {
      setDetails(data.clientDetails);
      setFilterDetails(data.clientDetails);
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
  }, [search])

  async function unBlock(id) {
    setSelectedUserId(id);
    setIsUnblockModalOpen(true);
  }

  async function handleConfirm() {
    const data = await unBlockUser(token, selectedUserId);
    if (data.unBlock) {
      setIsUnblockModalOpen(false);
      fetchData();
    }
  }

  async function Block(id) {
    setSelectedUserId(id);
    setIsModalOpen(true);
  }

  async function handleConfirmBlock() {
    const data = await blockUser(token, selectedUserId);
    if (data.block) {
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
            {row.isBlocked ? (
              <>
                <button
                  key={row._id}
                  className="btn-dark px-3"
                  onClick={() => unBlock(row._id)}
                >
                  Unblock
                </button>
                <Modal
                  isOpen={isUnblockModalOpen}
                  onRequestClose={() => setIsUnblockModalOpen(false)}
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
                  <h5 className='text-white'>Are you sure you unblock the user ?</h5>
                  <div className="d-flex justify-content-center">
                    <button className="btn-danger m-2 d-inline d-md-inline" onClick={handleConfirm}>Confirm</button>
                    <button className="btn-success m-2 d-inline d-md-inline" onClick={() => setIsUnblockModalOpen(false)}>Cancel</button>
                  </div>
                </Modal>
              </>
            ) : (
              <>
                <button
                  key={row._id}
                  className="btn-danger px-4"
                  onClick={() => Block(row._id)}>
                  Block
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
                  <h5 className='text-white'>Are you sure you want to block the user ?</h5>
                  <div className="d-flex justify-content-center">
                    <button className="btn-danger m-2 d-inline d-md-inline" onClick={handleConfirmBlock}>Confirm</button>
                    <button className="btn-success m-2 d-inline d-md-inline" onClick={() => setIsModalOpen(false)}>Cancel</button>
                  </div>
                </Modal>
              </>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div className='row justify-content-center'>
      <div className="d-flex flex-column align-items-center">
        <div className="row mt-4 pt-4">
          <h2>USER MANAGEMENT</h2>
        </div>
        <div className='table'>
          <DataTable
            columns={columns}
            data={filterDetails}
            // fixedHeader
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

export default UserManagement;