import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StudentTable.css';

const StudentTable = () => {
  const [data, setData] = useState([]);
  const [newStudent, setNewStudent] = useState({ name: '', dept: '' });
  const [editingStudent, setEditingStudent] = useState(null);
  
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('https://springbootapp-a6hfe7f2aeacadf5.canadacentral-01.azurewebsites.net/getData');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://springbootapp-a6hfe7f2aeacadf5.canadacentral-01.azurewebsites.net/addStudent', newStudent);
      setData([...data, response.data]); // Add new student to the data array
      setNewStudent({ name: '', dept: '' }); // Reset input fields
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setNewStudent({ name: student.name, dept: student.dept }); // Set form fields to current student data
  };

  const handleUpdateStudent = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://springbootapp-a6hfe7f2aeacadf5.canadacentral-01.azurewebsites.net/updateStudent/${editingStudent.id}`, newStudent);
      setData(data.map(item => (item.id === editingStudent.id ? response.data : item))); // Update the student in the data array
      setEditingStudent(null); // Clear editing state
      setNewStudent({ name: '', dept: '' }); // Reset input fields
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  const handleDeleteStudent = async (id) => {
    try {
      await axios.delete(`https://springbootapp-a6hfe7f2aeacadf5.canadacentral-01.azurewebsites.net/deleteStudent/${id}`);
      setData(data.filter(item => item.id !== id)); // Remove deleted student from the data array
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  return (
    <div className="table-container">
      <h1>Student Data</h1>
      
      <form onSubmit={editingStudent ? handleUpdateStudent : handleAddStudent}>
        <input 
          type="text" 
          placeholder="Name" 
          value={newStudent.name} 
          onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })} 
          required 
        />
        <input 
          type="text" 
          placeholder="Department" 
          value={newStudent.dept} 
          onChange={(e) => setNewStudent({ ...newStudent, dept: e.target.value })} 
          required 
        />
        <button type="submit">{editingStudent ? 'Update Student' : 'Add Student'}</button>
        {editingStudent && <button type="button" onClick={() => { setEditingStudent(null); setNewStudent({ name: '', dept: '' }); }}>Cancel</button>}
      </form>

      <table className="colored-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
            {data.map((item) => (
                <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.dept}</td>
                <td className="actions">
                    <button onClick={() => handleEditStudent(item)}>Edit</button>
                    <button onClick={() => handleDeleteStudent(item.id)}>Delete</button>
                </td>
                </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
