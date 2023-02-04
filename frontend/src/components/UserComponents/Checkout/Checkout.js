import React, { useState, useEffect } from "react";
import { DatePicker, message, TimePicker } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { CheckAvailability, getTrainerDetail } from "../../../axios/services/HomeService";
// import { showLoading, hideLoading } from "../redux/features/alertSlice";

const BookingPage = (props) => {

  // const { user } = useSelector((state) => state.user);

  const id = props.trainerId;
  console.log(id);
  const [details, setDetails] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [isAvailable, setIsAvailable] = useState();
  const dispatch = useDispatch();

  async function fetchData() {
    const token = JSON.parse(localStorage.getItem('user')).token;
    const data = await getTrainerDetail(token, id);
    console.log(data);
    setDetails(data[0]);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();

    const values = { otp: password };
    const data = await CheckAvailability(token, values, id);
    console.log(data);
    if (data.message) {
      toast.error(data.message)
    } else {
      toast.success(data.success)
      setDetails(data)
    }
    formRef.current.reset();
  }

  // // =============== booking func
  // const handleBooking = async () => {
  //   try {
  //     dispatch(showLoading());
  //     const res = await axios.post(
  //       "/api/v1/user/book-appointment",
  //       {
  //         doctorId: params.doctorId,
  //         userId: user._id,
  //         doctorInfo: doctors,
  //         userInfo: user,
  //         date: date,
  //         time: time,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     );
  //     dispatch(hideLoading());
  //     if (res.data.success) {
  //       message.success(res.data.message);
  //     }
  //   } catch (error) {
  //     dispatch(hideLoading());
  //     console.log(error);
  //   }
  // };

  return (
    <>
      {/* <h3 className="text-black">Booking</h3> */}
      <div className="row align-items-center justify-content-center" style={{ background: "white" }}>
        <div className="container m-2" style={{ minHeight: "300px", background: "white" }}>

          <div className="align-items-center m-5" style={{ background: "white" }}>
            <h4>

            </h4>

            <h4>

            </h4>
            <form onSubmit={onSubmit}>
              <div className="d-flex flex-column w-50 m-5">
                <DatePicker
                  className="m-2"
                  format="DD-MM-YYYY"
                  onChange={(value) =>
                    setDate(moment(value).format("DD-MM-YYYY"))
                  }
                />
                {/* <TimePicker
                  format="HH:mm"
                  className="m-2"
                  onChange={(value) => {
                    setTime(moment(value).format("HH:mm"));
                  }}
                /> */}

                <select class="select">
                {details?.map((item,index)=>{
                  <option value={item.timing[0]}>{item.timing[0]}</option>
                })}
                  
                  {/* <option value="2">Two</option>
                  <option value="3">Three</option>
                  <option value="4">Four</option>
                  <option value="5">Five</option>
                  <option value="6">Six</option>
                  <option value="7">Seven</option>
                  <option value="8">Eight</option> */}
                </select>

                <button className="btn btn-primary mt-2">
                  Check Availability
                </button>
                <button className="btn btn-dark mt-2">
                  Book Now
                </button>
              </div>
            </form>
          </div>
          {/* )} */}
        </div>
      </div>
    </>
  );
};

export default BookingPage;