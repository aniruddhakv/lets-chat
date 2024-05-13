const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
// const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 3000;

// Create MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Change to your MySQL username
    password: '', // Change to your MySQL password
    database: 'myapp' // Change to your MySQL database name
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

app.use(express.static('public'));
app.use(bodyParser.json());

// Signup route
app.post('/signup', (req, res) => {
    const { username, email, password } = req.body;

    // Check if user already exists
    connection.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, email], (error, results) => {
        if (error) {
            console.error('Error querying MySQL database:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (results.length > 0) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }

        // Create new user
        connection.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password], (error) => {
            if (error) {
                console.error('Error inserting user into MySQL database:', error);
                return res.status(500).json({ message: 'Internal server error' });
            }

            res.sendStatus(200);
        });
    });
});
// Login route
app.post('/login', (req, res) => {
    const { usernameOrEmail, password } = req.body;

    // Authenticate user credentials against the database
    connection.query('SELECT * FROM users WHERE username = ? OR email = ?', [usernameOrEmail, usernameOrEmail], (error, results) => {
        if (error) {
            console.error('Error querying MySQL database:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (results.length === 0) {
            // No user found with the provided username or email
            return res.status(401).json({ message: 'Invalid username/email or password' });
        }

        const user = results[0];

        // Compare the provided password with the password from the database
        if (password === user.password) {
            // Passwords match, authentication successful
            res.sendStatus(200);
        } else {
            // Passwords do not match
            res.status(401).json({ message: 'Invalid username/email or password' });
        }
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
