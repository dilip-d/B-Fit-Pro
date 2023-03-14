import { useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addDescription, addPrice, addService, addTips, getProfile } from '../../../axios/services/TrainerService';
import { trainerSchema } from '../../../validation/homeValidation';

function AddMoreDetails() {

  const [service, setService] = useState('');
  const [tips, setTips] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const formRef = useRef(null);

  const result = JSON.parse(localStorage.getItem('trainer'));
  const id = result.trainer._id
  const token = JSON.parse(localStorage.getItem('trainer')).token;

  const navigate = useNavigate()

  function handleBackButtonClick() {
    navigate(-1);
  }

  async function fetchData() {
    const data = await getProfile(token, id);
    if (data.expired) {
      localStorage.removeItem("trainer");
      navigate('/trainerLogin')
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();

    const trimmedService = service.trim();
    if (trimmedService !== '') {
      const values = { service: service };
      const data = await addService(token, values, id);
      if (data.message) {
        toast.success(data.message)
      } else {
        toast.error(data.error)
      }
      formRef.current.reset();
    }
  }

  const addTip = async (event) => {
    event.preventDefault();

    const trimmedTips = tips.trim();
    if (trimmedTips !== '') {
      const values = { tips: tips };
      const data = await addTips(token, values, id);
      if (data.message) {
        toast.success(data.message)
      } else {
        toast.error(data.error)
      }
      formRef.current.reset();
    }
  }

  const addDescriptn = async (event) => {
    event.preventDefault();

    const trimmedDescription = description.trim();
    if (trimmedDescription !== '') {
      const values = { description: description };
      const data = await addDescription(token, values, id);
      if (data.message) {
        toast.success(data.message)
      } else {
        toast.error(data.error)
      }
      formRef.current.reset();
    }
  }

  const addPricePerHour = async (event) => {
    event.preventDefault();

    const trimmedPrice = price.trim();
    if (trimmedPrice !== '') {
      const values = { price: price };
      const data = await addPrice(token, values, id);
      if (data.message) {
        toast.success(data.message)
      } else {
        toast.error(data.error)
      }
      formRef.current.reset();
    }
  }

  useEffect(() => {
    if (formRef.current) {
      formRef.current.reset();
    }
  }, [service])

  // const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        description: '',
        tips: '',
        service: '',
        price: ''
      },
      validationSchema: trainerSchema,
      onSubmit, addDescriptn, addTip, addPricePerHour
    });

  return (
    <>
      <button className='btn-sm btn-dark mt-4 mb-3 d-inline d-md-inline' onClick={handleBackButtonClick}><i class="fa fa-arrow-circle-left" aria-hidden="true"></i>  Go Back</button>
      <div className="row">
        <div className="col-sm-6 py-3 px-5">
          <div className="card" style={{ border: "3px solid #336699", borderRadius: "10px" }}>
            <div className="card-body bg-white">
              <h5 className="card-title">Add Services</h5>
              <form ref={formRef} onSubmit={onSubmit}>
                <input
                  type="text"
                  id="service"
                  value={service}
                  required
                  onChange={(e) => {
                    setService(e.target.value);
                  }}
                  className="form-control" placeholder="Enter service here" />
                <div>
                  <button className="btn btn-primary mx-auto my-2">Add</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-sm-6 py-3 px-5">
          <div className="card" style={{ border: "3px solid #336699", borderRadius: "10px" }}>
            <div className="card-body bg-white">
              <h5 className="card-title">Add Tips</h5>
              <form ref={formRef} onSubmit={addTip}>
                <input
                  type="text"
                  id="tips"
                  value={tips}
                  required
                  onChange={(e) => {
                    setTips(e.target.value);
                  }}
                  className="form-control" placeholder="Enter tips here" aria-label="default input example" />
                <button className="btn btn-primary mx-auto my-2">Add</button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-sm-6 py-3 px-5">
          <div className="card" style={{ border: "3px solid #336699", borderRadius: "10px" }}>
            <div className="card-body bg-white border-dashed border-blue">
              <h5 className="card-title">Add Description</h5>
              <div>
                <form ref={formRef} onSubmit={addDescriptn}>
                  <textarea
                    type="text"
                    id="description"
                    value={description}
                    required
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    className="form-control" rows="3"></textarea>
                  <button className="btn btn-primary mx-auto my-2">Add</button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 py-3 px-5">
          <div className="card" style={{ border: "3px solid #336699", borderRadius: "10px" }}>
            <div className="card-body bg-white border-dashed border-blue">
              <h5 className="card-title">Add Price/Month</h5>
              <div>
                <form ref={formRef} onSubmit={addPricePerHour}>
                  <input
                    type="text"
                    id="price"
                    value={price}
                    required
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                    className="form-control" placeholder="Enter amount here" aria-label="default input example" />
                  <button className="btn btn-primary mx-auto my-2">Add</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddMoreDetails