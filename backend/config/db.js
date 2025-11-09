const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Read SSL certificate
const sslCA = fs.readFileSync(path.join(__dirname, '..', process.env.DB_SSL_CA));

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
        ca: sslCA,
        rejectUnauthorized: true
    }
});

db.connect((err) => {
    if (err) {
        console.error('Aiven MySQL connection failed:', err);
        throw err;
    }
    console.log('Connected to Aiven MySQL Database');
});

module.exports = db;
