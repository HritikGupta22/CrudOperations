const db = require('../database');

// Controller functions for CRUD operations related to reviews
const getAllReviews = (req, res) => {
    db.query('SELECT * FROM review', (error, results) => {
        if (error) {
            console.error('Error fetching reviews:', error);
            res.status(500).json({ error: 'Error fetching reviews' });
        } else {
            res.status(200).json(results);
        }
    });
};

const getReviewById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM review WHERE id = ?', [id], (error, results) => {
        if (error) {
            console.error('Error fetching review by ID:', error);
            res.status(500).json({ error: 'Error fetching review by ID' });
        } else {
            if (results.length === 0) {
                res.status(404).json({ error: 'Review not found' });
            } else {
                res.status(200).json(results[0]);
            }
        }
    });
};

const createReview = (req, res) => {
    const { productid, customername, rating, productreview } = req.body;
    db.query(
        'INSERT INTO review (productid, customername, rating, productreview) VALUES (?, ?, ?, ?)',
        [productid, customername, rating, productreview],
        (error, results) => {
            if (error) {
                console.error('Error creating review:', error);
                res.status(500).json({ error: 'Error creating review' });
            } else {
                res.status(201).json({ message: 'Review created successfully', id: results.insertId });
            }
        }
    );
};

const updateReview = (req, res) => {
    const { id } = req.params;
    const { productid, customername, rating, productreview } = req.body;
    db.query(
        'UPDATE review SET productid = ?, customername = ?, rating = ?, productreview = ? WHERE id = ?',
        [productid, customername, rating, productreview, id],
        (error, results) => {
            if (error) {
                console.error('Error updating review:', error);
                res.status(500).json({ error: 'Error updating review' });
            } else {
                if (results.affectedRows === 0) {
                    res.status(404).json({ error: 'Review not found' });
                } else {
                    res.status(200).json({ message: 'Review updated successfully' });
                }
            }
        }
    );
};

const deleteReview = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM review WHERE id = ?', [id], (error, results) => {
        if (error) {
            console.error('Error deleting review:', error);
            res.status(500).json({ error: 'Error deleting review' });
        } else {
            if (results.affectedRows === 0) {
                res.status(404).json({ error: 'Review not found' });
            } else {
                res.status(200).json({ message: 'Review deleted successfully' });
            }
        }
    });
};

module.exports = {
    getAllReviews,
    getReviewById,
    createReview,
    updateReview,
    deleteReview
};
