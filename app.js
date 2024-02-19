const nodemailer = require('nodemailer');
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

// Create a new express application
const app = express();
// Use the body-parser middleware
app.use(bodyParser.json());

// Create a new nodemailer transporter
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        user: process.env.MAIL_USERNAME,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
        //accessToken: process.env.OAUTH_ACCESS_TOKEN,
    }
});

console.log(transporter.options.auth);
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

// POST / endpoint to send an email
// This endpoint expects a JSON object in the request body with the following properties: to, subject, text
app.post('/', async (req, res) => {
    // Check if the request body contains the required properties
    if (!req.body.to || !req.body.subject || !req.body.text) {
        return res.status(400).send({ error: 'To, subject and text are required' });
    }
    // Send the email
    transporter.sendMail(req.body, function (err, data) {
        if (err) {
            // If an error occurred, send a 500 response with the error message
            return res.status(500).send({ error: 'Error occured while sending email', message: err });
        } else {
            // If the email was sent successfully, send a 200 response with the email data
            return res.json(data);
        }
    });
});

// GET /ping endpoint to check if the server is running
app.get('/ping', (req, res) => {
    res.send('Pong!');
});

