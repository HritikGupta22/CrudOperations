const db = require('../database');

const getAllLocations = (req, res) => {
    db.query('SELECT * FROM location', (err, results) => {
        if (err) {
            console.err('err fetching locations:', err);
            res.status(500).json({ err: 'err fetching locations' });
        } else {
            res.status(200).json(results);
        }
    });
};

const getLocationById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM location WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.err('err fetching location by ID:', err);
            res.status(500).json({ err: 'err fetching location by ID' });
        } else {
            if (results.length === 0) {
                res.status(404).json({ err: 'Location not found' });
            } else {
                res.status(200).json(results[0]);
            }
        }
    });
};

const createLocation = (req, res) => {
    const { name, latitude, longitude, disc } = req.body;
    db.query(
        'INSERT INTO location (name, latitude, longitude, disc) VALUES (?, ?, ?, ?)',
        [name, latitude, longitude, disc],
        (err, results) => {
            if (err) {
                console.err('err creating location:', err);
                res.status(500).json({ err: 'err creating location' });
            } else {
                res.status(201).json({ message: 'Location created successfully', id: results.insertId });
            }
        }
    );
};

const updateLocation = (req, res) => {
    const { id } = req.params;
    const { name, latitude, longitude, disc } = req.body;
    db.query(
        'UPDATE location SET name = ?, latitude = ?, longitude = ?, disc = ? WHERE id = ?',
        [name, latitude, longitude, disc, id],
        (err, results) => {
            if (err) {
                console.err('err updating location:', err);
                res.status(500).json({ err: 'err updating location' });
            } else {
                if (results.affectedRows === 0) {
                    res.status(404).json({ err: 'Location not found' });
                } else {
                    res.status(200).json({ message: 'Location updated successfully' });
                }
            }
        }
    );
};

const deleteLocation = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM location WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.err('err deleting location:', err);
            res.status(500).json({ err: 'err deleting location' });
        } else {
            if (results.affectedRows === 0) {
                res.status(404).json({ err: 'Location not found' });
            } else {
                res.status(200).json({ message: 'Location deleted successfully' });
            }
        }
    });
};

module.exports = {
    getAllLocations,
    getLocationById,
    createLocation,
    updateLocation,
    deleteLocation
};
