const express = require('express');
const basicAuth = require('express-basic-auth');
const path = require('path');

const app = express();

app.use(basicAuth({
  users: { 'Adminito': 'superpasswordito' },
  challenge: true
}));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
