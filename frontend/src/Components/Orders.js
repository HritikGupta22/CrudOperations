import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [formData, setFormData] = useState({
    orderNo: '',
    customername: '',
    orderdate: '',
    amount: '',
    status: ''
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders data:', error);
    }
  };

  const handleInputChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddOrders = async () => {
    try {
      await axios.post('http://localhost:5000/api/orders', formData);
      fetchOrders();
    } catch (error) {
      console.error('Error adding orders:', error);
    }
  };

  const handleDeleteOrders = async id => {
    try {
      await axios.delete(`http://localhost:5000/api/orders/${id}`);
      fetchOrders(); 
    } catch (error) {
      console.error('Error deleting orders:', error);
    }
  };

  const handleUpdateOrders = async (id,updatedData) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${id}`, updatedData);
      fetchOrders();
    } catch (error) {
      console.error('Error updating orders:', error);
    }
  };

  return (
    <div>
      <h2>Orders</h2>
      <div>
        <input type="text" placeholder="Orders Number" name="orderNo" value={formData.orderNo} onChange={handleInputChange} />
        <input type="text" placeholder="Customer Name" name="customername" value={formData.customername} onChange={handleInputChange} />
        <input type="number" placeholder="DDMMYYYY" name="orderdate" value={formData.orderdate} onChange={handleInputChange} />
        <input type="number" placeholder="Total Amount" name="amount" value={formData.amount} onChange={handleInputChange} />
        <input type="text" placeholder="Status" name="status" value={formData.status} onChange={handleInputChange} />
        <button onClick={handleAddOrders}>Add</button>
      </div>
      <ul>
        {orders.map(orders => (
          <li key={orders.id}>
            {orders.orderNo} - {orders.customername} - {orders.orderdate} - {orders.amount} - {orders.status}
            <button onClick={() => handleDeleteOrders(orders.id)}>Delete</button>
            <button onClick={() => {
              const updatedData = prompt('Update details (orderNo,customername, orderdate, amount, status):', 
                `${orders.orderNo},${orders.customername},${orders.orderdate},${orders.amount},${orders.status}`);
              if (updatedData) {
                const [orderNo,customername, orderdate, amount, status] = updatedData.split(',');
                handleUpdateOrders(orders.id, {orderNo, customername, orderdate, amount, status });
              }
            }}>Update</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
