import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Locations = () => {
  const [locations, setLocations] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    latitude: '',
    longitude: '',
    disc: ''
  });

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/locations');
      setLocations(response.data);
    } catch (error) {
      console.error('Error fetching locations data:', error);
    }
  };

  const handleInputChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddLocations = async () => {
    try {
      await axios.post('http://localhost:5000/api/locations', formData);
      fetchLocations();
    } catch (error) {
      console.error('Error adding locations:', error);
    }
  };

  const handleDeleteLocations = async id => {
    try {
      await axios.delete(`http://localhost:5000/api/locations/${id}`);
      fetchLocations();
    } catch (error) {
      console.error('Error deleting locations:', error);
    }
  };

  const handleUpdateLocations = async (id,updatedData) => {
    try {
      await axios.put(`http://localhost:5000/api/locations/${id}`, updatedData);
      fetchLocations(); 
    } catch (error) {
      console.error('Error updating locations:', error);
    }
  };

  return (
    <div>
      <h2>Locations</h2>
      <div>
        <input type="text" placeholder="Name" name="name" value={formData.name} onChange={handleInputChange} />
        <input type="number" placeholder="Latitude" name="latitude" value={formData.latitude} onChange={handleInputChange} />
        <input type="number" placeholder="Longitude" name="longitude" value={formData.longitude} onChange={handleInputChange} />
        <input type="text" placeholder="disc" name="disc" value={formData.disc} onChange={handleInputChange} />
        <button onClick={handleAddLocations}>Add</button>
      </div>
      <ul>
        {locations.map(locations => (
          <li key={locations.id}>
            {locations.name} - {locations.latitude} - {locations.longitude} - {locations.disc}
            <button onClick={() => handleDeleteLocations(locations.id)}>Delete</button>
            <button onClick={() => {
              const updatedData = prompt('Update details (name, latitude, longitude, disc):', 
                `${locations.name},${locations.latitude},${locations.longitude},${locations.disc}`);
              if (updatedData) {
                const [name, latitude, longitude, disc] = updatedData.split(',');
                handleUpdateLocations(locations.id, { name, latitude, longitude, disc });
              }
            }}>Update</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Locations;
