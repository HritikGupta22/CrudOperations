import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Persons = () => {
  const [persons, setPersons] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dob: '',
    mobile: ''
  });

  useEffect(() => {
    fetchPersons();
  }, []);

  const fetchPersons = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/persons');
      setPersons(response.data);
    } catch (error) {
      console.error('Error fetching persons data:', error);
    }
  };

  const handleInputChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddPerson = async () => {
    try {
      await axios.post('http://localhost:5000/api/persons', formData);
      fetchPersons(); // Fetch updated data after adding a person
      setFormData({ name: '', email: '', dob: '', mobile: '' }); // Clear form
    } catch (error) {
      console.error('Error adding person:', error);
    }
  };

  const handleDeletePerson = async id => {
    try {
      await axios.delete(`http://localhost:5000/api/persons/${id}`);
      fetchPersons(); // Fetch updated data after deleting a person
    } catch (error) {
      console.error('Error deleting person:', error);
    }
  };

  const handleUpdatePerson = async (id, updatedData) => {
    try {
      await axios.put(`http://localhost:5000/api/persons/${id}`, updatedData);
      fetchPersons(); // Fetch updated data after updating a person
    } catch (error) {
      console.error('Error updating person:', error);
    }
  };

  return (
    <div>
      <h2>Persons</h2>
      <div>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="DDMMYYYY"
          name="dob"
          value={formData.dob}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Mobile Number"
          name="mobile"
          value={formData.mobile}
          onChange={handleInputChange}
        />
        <button onClick={handleAddPerson}>Add</button>
      </div>
      <ul>
        {persons.map(person => (
          <li key={person.id}>
            {person.name} - {person.email} - {person.dob} - {person.mobile}
            <button onClick={() => handleDeletePerson(person.id)}>Delete</button>
            <button onClick={() => {
              const updatedData = prompt('Update details (name, email, dob, mobile):', 
                `${person.name},${person.email},${person.dob},${person.mobile}`);
              if (updatedData) {
                const [name, email, dob, mobile] = updatedData.split(',');
                handleUpdatePerson(person.id, { name, email, dob, mobile });
              }
            }}>Update</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Persons;
