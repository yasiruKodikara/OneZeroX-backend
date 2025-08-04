const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql2/promise'); // Changed to mysql2
const bodyParser = require('body-parser');
const path = require('path');

const HTTP_PORT = process.env.PORT || 3000;
//---------------------------------------------------------------------------------------------
app.listen(HTTP_PORT,()=>{
    console.log(`Server is running on port ${HTTP_PORT}`);
});


