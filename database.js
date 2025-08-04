const mysql = require('mysql2/promise');

// MySQL database configuration
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: '10x_company',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Create a connection pool
const pool = mysql.createPool(dbConfig);


// Function to initialize the database with tables
async function initializeDatabase() {
  let connection;
  try {
    connection = await pool.getConnection();
    
    // Create registration table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS registration (
        id INT AUTO_INCREMENT PRIMARY KEY,
        Name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        whatsapp VARCHAR(20)
      )
    `);

    // Insert sample customer if table was just created
    const [customerRows] = await connection.execute('SELECT COUNT(*) AS count FROM registration');
    if (customerRows[0].count === 0) {
      await connection.execute(
        `INSERT INTO registration (Name, email, whatsapp) 
         VALUES (?, ?, ?)`,
        ["customer1" ,"testmail@gmail.com", "0761111111"]
      );
    }

   

    

    console.log('Database tables initialized successfully');
  } catch (err) {
    console.error('Error initializing database:', err.message);
  } finally {
    if (connection) connection.release();
  }
}

// Initialize the database when this module is loaded
initializeDatabase();

// Export the connection pool
module.exports = pool;