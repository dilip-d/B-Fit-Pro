import React, { useState, useEffect } from "react";
import { DatePicker } from "antd";
import { CheckAvailability, getTrainerToCheckAvailable } from "../../../axios/services/HomeService";
import { Link, useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';

const CheckAvailable = (props) => {

  const id = props.trainerId;

  const [details, setDetails] = useState([]);
  const [timing, setTiming] = useState();
  const [selectedDate, setSelectedDate] = useState(null);
  const [isAvailable, setIsAvailable] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function fetchData() {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = JSON.parse(localStorage.getItem('user')).token;
    if (!user) {
      navigate('/login');
    } else {
      const data = await getTrainerToCheckAvailable(token,id);
      if (data.expired) {
        setError(data.expired)
      } else if (data.error) {
        setError(data.error);
      } else {
        setDetails(data.trainer);
        setTiming(data.availableTimings);
      }
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const token = JSON.parse(localStorage.getItem('user'))?.token;

  const onSubmit = async (event) => {
    event.preventDefault();

    const selectedTime = event.target.elements.time.value;

    const values = { date: selectedDate.format("DD-MM-YYYY"), time: selectedTime };
    const data = await CheckAvailability(token, values, id);
    if (data.error) {
      toast.error(data.error)
      setIsAvailable(null)
    } else {
      toast.success(data.message)
      setIsAvailable(data)
    }
  }

  useEffect(() => {
  }, [isAvailable])

  return (
    <>
      {error ? <div className='text-danger d-flex justify-content-center text-align-center' style={{ minHeight: '400px' }}>
        <h2 className='text-center my-auto'>{error}</h2>
      </div> :
        <>
          <div className="row align-items-center justify-content-center" style={{ background: "white" }}>
            <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: "300px" }}>
              <div className="d-flex flex-column">
                <form onSubmit={onSubmit}>
                  <h4 className='text-center d-block'>Please check the availability first !</h4>
                  <DatePicker
                    className="d-block text-center mx-5 mb-2"
                    style={{ width: '30rem' }}
                    required
                    format="DD-MM-YYYY"
                    onChange={(value) =>
                      setSelectedDate(value)
                    }
                  />
                  <select className="select d-block mx-5" required style={{ width: '30rem' }} name="time">
                    <option value="" disabled selected>Select an time</option>
                    {timing?.map((item, index) => {
                      return (
                        <option key={index} value={item}>{item}</option>
                      )
                    })}
                  </select>
                  <button type="submit" className="btn btn-primary mt-2 d-block text-center mx-5" style={{ width: '30rem' }}>
                    Check Availability
                  </button>
                </form>
                {isAvailable ? <><h4 style={{ width: '30rem' }} className='mx-5 mt-5 text-center d-block text-center mx-5'>Is available ! Proceed with book now</h4>
                  <Link to={`/payment/${encodeURIComponent(JSON.stringify(isAvailable))}`}> <button className="btn btn-dark mt-2 mx-5 d-block text-center mx-5" style={{ width: '30rem' }}>
                    Book Now
                  </button></Link>
                </> : null}
              </div>
            </div>
          </div>
        </>
      }
    </>
  );
};

export default CheckAvailable;