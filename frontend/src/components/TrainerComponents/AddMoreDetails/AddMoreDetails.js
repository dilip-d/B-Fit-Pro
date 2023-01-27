import React, { useEffect, useRef, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addDescription, addPrice, addService, addTips } from '../../../axios/services/TrainerService';

function AddMoreDetails() {

  const [service, setService] = useState('');
  const [tips, setTips] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const formRef = useRef(null);

  const result = JSON.parse(localStorage.getItem('trainer'));
  const id = result.trainer._id

  const onSubmit = async (event) => {
    event.preventDefault();

    const values = { service: service };
    const data = await addService(values, id);
    if (data.message) {
      toast.success(data.message)
    } else {
      toast.error(data.error)
    }
    formRef.current.reset();
  }

  const addTip = async (event) => {
    event.preventDefault();

    const values = { tips: tips };
    const data = await addTips(values, id);
    if (data.message) {
      toast.success(data.message)
    } else {
      toast.error(data.error)
    }
    formRef.current.reset();
  }

  const addDescriptn = async (event) => {
    event.preventDefault();

    const values = { description: description };
    const data = await addDescription(values, id);
    if (data.message) {
      toast.success(data.message)
    } else {
      toast.error(data.error)
    }
    formRef.current.reset();
  }

  const addPricePerHour = async (event) => {
    event.preventDefault();

    const values = { price: price };
    const data = await addPrice(values, id);
    if (data.message) {
      toast.success(data.message)
    } else {
      toast.error(data.error)
    }
    formRef.current.reset();
  }

  useEffect(() => {
    if (formRef.current) {
      formRef.current.reset();
    }
  }, [service])

  return (
    <>
      <div className="row">
        <ToastContainer />
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
              <h5 className="card-title">Add Price/hour</h5>
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
                    className="form-control" placeholder="Enter tips here" aria-label="default input example" />
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