const db = require('../database');

// Controller functions for CRUD operations related to persons
const getAllPersons = (req, res) => {
    db.query('SELECT * FROM person', (error, results) => {
        if (error) {
            console.error('Error fetching persons:', error);
            res.status(500).json({ error: 'Error fetching persons' });
        } else {
            res.status(200).json(results);
        }
    });
};

const getPersonById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM person WHERE id = ?', [id], (error, results) => {
        if (error) {
            console.error('Error fetching person by ID:', error);
            res.status(500).json({ error: 'Error fetching person by ID' });
        } else {
            if (results.length === 0) {
                res.status(404).json({ error: 'Person not found' });
            } else {
                res.status(200).json(results[0]);
            }
        }
    });
};

const createPerson = (req, res) => {
    const { name, email, dob, mobile} = req.body;
    db.query(
        'INSERT INTO person (name, email, dob, mobile) VALUES (?, ?, ?, ?)',
        [name, email, dob, mobile],
        (error, results) => {
            if (error) {
                console.error('Error creating person:', error);
                res.status(500).json({ error: 'Error creating person' });
            } else {
                res.status(201).json({ message: 'Person created successfully', id: results.insertId });
            }
        }
    );
};

const updatePerson = (req, res) => {
    const { id } = req.params;
    const { name, email, dob, mobile } = req.body;
    db.query(
        'UPDATE person SET name = ?, email = ?, dob = ?, mobile = ? WHERE id = ?',
        [name, email, mobile, dob, id],
        (error, results) => {
            if (error) {
                console.error('Error updating person:', error);
                res.status(500).json({ error: 'Error updating person' });
            } else {
                if (results.affectedRows === 0) {
                    res.status(404).json({ error: 'Person not found' });
                } else {
                    res.status(200).json({ message: 'Person updated successfully' });
                }
            }
        }
    );
};

const deletePerson = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM person WHERE id = ?', [id], (error, results) => {
        if (error) {
            console.error('Error deleting person:', error);
            res.status(500).json({ error: 'Error deleting person' });
        } else {
            if (results.affectedRows === 0) {
                res.status(404).json({ error: 'Person not found' });
            } else {
                res.status(200).json({ message: 'Person deleted successfully' });
            }
        }
    });
};

module.exports = {
    getAllPersons,
    getPersonById,
    createPerson,
    updatePerson,
    deletePerson
};
