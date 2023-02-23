import React, { useEffect, useRef, useState } from "react";
import { getAllDetails } from "../../../axios/services/AdminService";
import BarChart from "../../AdminComponents/BarChart/BarChart";
import Card from "../Card/Card";
import DataTable from 'react-data-table-component';
import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
import 'jspdf-autotable';
import "./MainDash.css";
import { groupBy } from 'lodash';

const MainDash = () => {
  const tableRef = useRef(null);

  const [details, setDetails] = useState([]);

  const token = JSON.parse(localStorage.getItem('admin'))?.token;

  async function fetchData() {
    const data = await getAllDetails(token);
    setDetails(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  const trainerDetails = Object.entries(groupBy(details?.bookingDetails, 'trainerInfo')).reduce((result, [trainer, bookings]) => {
    const number = bookings.length;
    const amount = bookings.reduce((total, { amount }) => total + amount, 0);
    result.push({ trainer, number, amount });
    return result;
  }, []);

  const columns = [
    {
      name: "No",
      selector: (row, i) => i + 1,
    },
    {
      name: "Trainer Name",
      selector: (row) => row?.trainer
    },
    {
      name: "No. of bookings",
      selector: (row) => row?.number
    },
    {
      name: "Amount",
      selector: (row) => row?.amount
    },
  ]

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Booking Details", 80, 10);

    const tableColumn = columns.map((column) => column.name);
    const tableRows = trainerDetails.map((row, index) => {
      const rowData = [
        index + 1,
        row?.trainer,
        row?.number,
        row?.amount,
      ];
      return rowData;
    });

    // Add the table to the PDF document
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      foot: [
        [
          "",
          "Grand Total",
          "",
          trainerDetails.reduce(
            (total, row) => total + row.amount,
            0
          ),
        ],
      ],
    });

    doc.save("table.pdf");
  };

  const grandTotal = trainerDetails.reduce((total, { amount }) => total + amount, 0);
  console.log(grandTotal);

  const DataTableFooter = () => (
    <DataTable.Footer>
      <DataTable.Row>
        <DataTable.Cell >
          Grand Total:
        </DataTable.Cell>
        <DataTable.Cell >{grandTotal}</DataTable.Cell>
      </DataTable.Row>
    </DataTable.Footer>
  );

  return (
    <div style={{ whiteSpace: 'nowrap' }}>
      <div className="text-center m-5">
        <h2 style={{ color: "black" }}>ADMIN DASHBOARD</h2>
      </div>
      <div className="d-flex flex-row justify-content-between" style={{ marginRight: "50px", gap: "20px" }}>
        <Card data={`Total Users : ${details?.numUsers}`} />
        <Card data={`Total Trainers : ${details?.numTrainers}`} />
        <Card data={`Total Bookings : ${details?.numBookings}`} />
        <Card data={`Total Revenue : Rs. ${details?.bookingTotal}`} />
      </div>
      <div className="mt-5 text-center mx-5" style={{ width: "1000px" }}>
        <h3 className="text-center m-5">Bookings Chart </h3>
        <BarChart chartData={data} />
      </div>
      <div>
        <h3 className="text-center my-5">Bookings Details</h3>
        <DataTable
          columns={columns}
          data={trainerDetails}
          pagination
          highlightOnHover
          ref={tableRef}
          actions={<button className="btn" onClick={generatePDF}>Export</button>}
          subHeader
          persistTableHead
          subHeaderComponent={<div className='text-danger'>Total Amount: ₹ {grandTotal}</div>}
        />
      </div>
    </div>
  );
};

export default MainDash;