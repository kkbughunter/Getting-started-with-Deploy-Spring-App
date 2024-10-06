// src/ColoredTable.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ColoredTable.css'; // Import CSS for styling

const StudentTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the provided URL
    axios.get('https://springbootapp-a6hfe7f2aeacadf5.canadacentral-01.azurewebsites.net/getData')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="table-container">
      <h1>Student Data</h1>
      <table className="colored-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.dept}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
