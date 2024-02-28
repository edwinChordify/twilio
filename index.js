const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const cors = require('cors');

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(cors()); 

const accountSid = 'AC9e32bb343d0e6430dc1a32d1467927d1';
const authToken = '2d0030249558fd1faaaa97514041738a';
const twilioClient = twilio(accountSid, authToken);

app.post('/send-sms', (req, res) => {
  const { to, body } = req.body;

  twilioClient.messages
    .create({
      body: body,
      from: '+19102124013', // Your Twilio phone number
      to: to
    })
    .then(message => {
      console.log(`SMS sent with SID: ${message.sid}`);
      res.status(200).json({ message: 'SMS sent successfully' });
    })
    .catch(error => {
      console.error('Error sending SMS:', error);
      res.status(500).json({ error: 'Failed to send SMS' });
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
