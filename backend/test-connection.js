require('dotenv').config();
const db = require('./config/db');

db.query('SELECT 1 + 1 AS solution', (err, results) => {
  if (err) {
    console.error('Connection test failed:', err);
    process.exit(1);
  }
  console.log('✅ Aiven MySQL connection successful!');
  console.log('Test result:', results[0].solution);
  process.exit(0);
});
