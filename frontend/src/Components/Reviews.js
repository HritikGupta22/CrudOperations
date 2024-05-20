import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    productid: '',
    customername: '',
    rating: '',
    productreview: ''
  });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/reviews');
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews data:', error);
    }
  };

  const handleInputChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddReview = async () => {
    try {
      await axios.post('http://localhost:5000/api/reviews', formData);
      fetchReviews(); // Fetch updated data after adding a review
      setFormData({ productid: '', customername: '', rating: '', productreview: '' }); // Clear form
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  const handleDeleteReview = async id => {
    try {
      await axios.delete(`http://localhost:5000/api/reviews/${id}`);
      fetchReviews(); // Fetch updated data after deleting a review
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  const handleUpdateReview = async (id, updatedData) => {
    try {
      await axios.put(`http://localhost:5000/api/reviews/${id}`, updatedData);
      fetchReviews(); // Fetch updated data after updating a review
    } catch (error) {
      console.error('Error updating review:', error);
    }
  };

  return (
    <div>
      <h2>Reviews</h2>
      <div>
        <input
          type="number"
          placeholder="Product ID"
          name="productid"
          value={formData.productid}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Customer Name"
          name="customername"
          value={formData.customername}
          onChange={handleInputChange}
        />
        <input
          type="number"
          placeholder="Rating"
          name="rating"
          value={formData.rating}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Review Text"
          name="productreview"
          value={formData.productreview}
          onChange={handleInputChange}
        />
        <button onClick={handleAddReview}>Add</button>
      </div>
      <ul>
        {reviews.map(review => (
          <li key={review.id}>
            {review.productid} - {review.customername} - {review.rating} - {review.productreview}
            <button onClick={() => handleDeleteReview(review.id)}>Delete</button>
            <button onClick={() => {
              const updatedData = prompt('Update details (productid, customername, rating, productreview):', 
                `${review.productid},${review.customername},${review.rating},${review.productreview}`);
              if (updatedData) {
                const [productid, customername, rating, productreview] = updatedData.split(',');
                handleUpdateReview(review.id, { productid, customername, rating, productreview });
              }
            }}>Update</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reviews;
