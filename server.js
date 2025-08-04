const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const path = require('path');
const nodemailer = require("nodemailer");

// ✅ Middleware
app.use(cors());
app.use(express.json()); // or app.use(bodyParser.json());

// MySQL connection
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: '10x_company',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const HTTP_PORT = process.env.PORT || 3000;
app.listen(HTTP_PORT, () => console.log(`Server is running on port ${HTTP_PORT}`));

// ✅ Nodemailer config
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: { user: "yasirukodikara20@gmail.com", pass: "ynns dgvc atri dcag" },
});

// ✅ Register route
app.post('/api/register', async (req, res) => {
  try {
    console.log("Incoming body:", req.body); // ✅ Debugging

    const { Name, email, whatsapp } = req.body;
    if (!Name || !email || !whatsapp) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Insert into DB
    const sql = `INSERT INTO registration (Name, email, whatsapp) VALUES (?, ?, ?)`;
    const [result] = await pool.execute(sql, [Name, email, whatsapp]);

    res.status(201).json({ message: "Customer added successfully", id: result.insertId });

  } catch (err) {
    console.error("🔥 Error in /api/register:", err); // ✅ Debugging
    res.status(500).json({ error: "Internal server error" });
  }
});
