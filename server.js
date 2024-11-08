const express = require('express');
const basicAuth = require('express-basic-auth');
const path = require('path');

const app = express();

app.use(basicAuth({
  users: { 'admin': 'supersecret' },
  challenge: true,
  unauthorizedResponse: getUnauthorizedResponse
}));

function getUnauthorizedResponse(req) {
  return req.auth
    ? ('Credentials ' + req.auth.user + ':' + req.auth.password + ' rejected')
    : 'Unauthorized'
}

app.use(express.static(path.join(__dirname, 'main')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'main', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
