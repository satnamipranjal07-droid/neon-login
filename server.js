const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Static files serve (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// Body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Demo users (replace with DB in real app)
const users = [
  { username: 'demoUser', password: 'test123' },
  { username: 'admin', password: 'admin123' }
];

// Login API
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if(!username || !password){
    return res.status(400).json({ success: false, message: 'Username aur password dono chahiye.' });
  }

  const user = users.find(u => u.username === username && u.password === password);
  if(user){
    return res.json({ success: true, message: 'Login successful!' });
  } else {
    return res.status(401).json({ success: false, message: 'Invalid username or password.' });
  }
});

// Test route
app.get('/', (req,res)=>{
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, ()=>{
  console.log(`Server running on http://localhost:${PORT}`);
});