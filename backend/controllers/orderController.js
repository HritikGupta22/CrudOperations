const db = require('../database');

// Controller functions for CRUD operations related to orders
const getAllOrders = (req, res) => {
    db.query('SELECT * FROM `order`', (error, results) => {
        if (error) {
            console.error('Error fetching orders:', error);
            res.status(500).json({ error: 'Error fetching orders' });
        } else {
            res.status(200).json(results);
        }
    });
};

const getOrderById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM `order` WHERE id = ?', [id], (error, results) => {
        if (error) {
            console.error('Error fetching order by ID:', error);
            res.status(500).json({ error: 'Error fetching order by ID' });
        } else {
            if (results.length === 0) {
                res.status(404).json({ error: 'Order not found' });
            } else {
                res.status(200).json(results[0]);
            }
        }
    });
};

const createOrder = (req, res) => {
    const { orderNo, customername, orderdate, amount, status } = req.body;
    db.query(
        'INSERT INTO `order` (orderNo, customername, orderdate, amount, status) VALUES (?, ?, ?, ?, ?)',
        [orderNo, customername, orderdate, amount, status],
        (error, results) => {
            if (error) {
                console.error('Error creating order:', error);
                res.status(500).json({ error: 'Error creating order' });
            } else {
                res.status(201).json({ message: 'Order created successfully', id: results.insertId });
            }
        }
    );
};

const updateOrder = (req, res) => {
    const { id } = req.params;
    const { orderNo, customername, orderdate, amount, status } = req.body;
    db.query(
        'UPDATE `order` SET orderNo = ?, customername = ?, orderdate = ?, amount = ?, status = ? WHERE id = ?',
        [orderNo, customername, orderdate, amount, status, id],
        (error, results) => {
            if (error) {
                console.error('Error updating order:', error);
                res.status(500).json({ error: 'Error updating order' });
            } else {
                if (results.affectedRows === 0) {
                    res.status(404).json({ error: 'Order not found' });
                } else {
                    res.status(200).json({ message: 'Order updated successfully' });
                }
            }
        }
    );
};

const deleteOrder = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM `order` WHERE id = ?', [id], (error, results) => {
        if (error) {
            console.error('Error deleting order:', error);
            res.status(500).json({ error: 'Error deleting order' });
        } else {
            if (results.affectedRows === 0) {
                res.status(404).json({ error: 'Order not found' });
            } else {
                res.status(200).json({ message: 'Order deleted successfully' });
            }
        }
    });
};

module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
};
