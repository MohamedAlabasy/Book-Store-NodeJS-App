const express = require('express');
require('dotenv').config();
console.log(process.env.PORT);

const PORT = process.env.PORT || 5555;
const app = express();


app.listen(PORT, () => {
    console.log(`App Run at http://${process.env.HOST}:${PORT}`);
});


// middleware not Found
app.use((request, response, next) => {
    response.status(404).json({
        status: 0,
        message: 'Not Found'
    })
})

// middleware error
app.use((error, request, response, next) => {
    let status = error.status || 500;
    response.status(status).json({
        status: 0,
        error: error + ''
    })
})
