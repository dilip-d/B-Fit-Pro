// import Cards from "../Cards/Cards";
// import Table from "../Table/Table";
//   return (
//     <div className="MainDash row">
//       <h2 className="mt-5">Dashboard</h2>
//       {/* <Cards /> */}
//       {/* <Table /> */}
//     </div>
//   );
// };

import React, { useEffect, useRef, useState } from "react";
import { getAllDetails } from "../../../axios/services/AdminService";
import BarChart from "../../AdminComponents/BarChart/BarChart";
import Card from "../Card/Card";
import DataTable from 'react-data-table-component';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import 'jspdf-autotable';
import "./MainDash.css";

const MainDash = () => {
  const tableRef = useRef(null);

  // const Userdata = [
  //   {
  //     id: 1,
  //     year: 2016,
  //     userGain: 1000
  //   },
  //   {
  //     id: 2,
  //     year: 2017,
  //     userGain: 2000
  //   },
  //   {
  //     id: 3,
  //     year: 2018,
  //     userGain: 4000
  //   },
  // ]

  const [details, setDetails] = useState([]);

  const token = JSON.parse(localStorage.getItem('admin'))?.token
  async function fetchData() {
    const data = await getAllDetails(token);
    setDetails(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // const [userData, setUserData] = useState({
  //   labels: details?.map((data) => data.createdAtDates),
  //   datasets: [{
  //     label: "Users Gained",
  //     data: details?.map((data) => data.totalAmounts)
  //   }]
  // })

  const createdAtDates = details?.createdAtDates
  const totalAmounts = details?.totalAmounts

  const data = {
    labels: createdAtDates?.map(date => new Date(date).toISOString().substr(0, 10)),
    datasets: [
      {
        label: 'Total Amount',
        data: totalAmounts,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };
  // console.log(details);

  const columns = [
    {
      name: "No",
      selector: (row, i) => i + 1,
    },
    {
      name: "Trainer Name",
      selector: (row) => row?.fname
    },
  ]

  // const generatePDF = () => {
  //   const input = tableRef.current;
  //   html2canvas(input)
  //     .then(canvas => {
  //       const pdf = new jsPDF();
  //       // const columns = [
  //       //   { header: 'No', dataKey: 'no' },
  //       //   { header: 'Guide Name', dataKey: 'guideName' },
  //       // ];

  //       const data = details?.bookingDetails.map((row, index) => ({
  //         no: index + 1,
  //         guideName: row.username,
  //       }));
  //       pdf.autoTable({ head: [columns], body: data });
  //       pdf.save('my-data-table.pdf');
  //     });
  // };

  // useEffect(() => {
  //   if (tableRef.current) {
  //     generatePDF();
  //   }
  // }, [tableRef]);

  const generatePDF = () => {

  }

  return (
    <div style={{ whiteSpace: 'nowrap' }}>
      <div className="text-center m-5">
        <h1 style={{ color: "black" }}>Admin Dashboard</h1>
      </div>
      <div className="d-flex flex-row justify-content-between" style={{ marginRight: "50px", gap: "20px" }}>
        <Card data={`Total Users : ${details?.numUsers}`} />
        <Card data={`Total Guides : ${details?.numTrainers}`} />
        <Card data={`Total Bookings : ${details?.numBookings}`} />
        <Card data={`Total Revenue : Rs. ${details?.bookingTotal}`} />
      </div>
      <div className="mt-5 text-center mx-5" style={{ width: "1000px" }}>
        <h3 className="text-center m-5"> Bookings Bar  Chart </h3>
        <BarChart chartData={data} />
      </div>
      <div>
        <h2 className="text-center my-5">Bookings Details</h2>
        {/* <button onClick={generatePDF}>Export as PDF</button> */}
        <DataTable
          columns={columns}
          data={details?.bookingDetails}
          pagination
          highlightOnHover
          ref={tableRef}
          actions={<button className="btn" onClick={generatePDF}>Export</button>}
        />
      </div>
    </div>
  );
};

export default MainDash;