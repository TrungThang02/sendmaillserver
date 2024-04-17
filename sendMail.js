const nodemailer = require('nodemailer');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(bodyParser.json());

app.post('/send-email', (req, res) => {
    const { recipient, subject, text } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'trantrungthang01699516993@gmail.com', 
            pass: 'iauopfthcsrhnunj' 
        }
    });

    const mailOptions = {
        from: 'your_email@gmail.trantrungthang01699516993@gmail.com', // Địa chỉ email của bạn
        to: recipient,
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ error: 'Error sending email' });
        } else {
            console.log('Email sent:', info.response);
            res.status(200).json({ message: 'Email sent successfully' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


app.get('/send-email', (req, res) => {
    res.status(405).json({ error: 'Method Not Allowed' });
});