const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection with better error handling
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/contactmanager';

// Simplified connection for Atlas
mongoose.connect(MONGODB_URI)
.then(() => {
  console.log('✅ Connected to MongoDB successfully');
})
.catch((error) => {
  console.log('❌ MongoDB connection error:', error.message);
});

// Disable mongoose buffering to fail fast
mongoose.set('bufferCommands', false);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Contact Schema
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Contact = mongoose.model('Contact', contactSchema);

// Routes
// Get all contacts
app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 }).maxTimeMS(20000);
    res.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ 
      message: 'Database connection issue. Please try again later.',
      error: error.message 
    });
  }
});

// Get single contact
app.get('/api/contacts/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create contact
app.post('/api/contacts', async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;
    
    // Check if contact with email already exists
    const existingContact = await Contact.findOne({ email });
    if (existingContact) {
      return res.status(400).json({ message: 'Contact with this email already exists' });
    }

    const contact = new Contact({
      name,
      email,
      phone,
      address
    });

    const savedContact = await contact.save();
    res.status(201).json(savedContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update contact
app.put('/api/contacts/:id', async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;
    
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, address },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.json(contact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete contact
app.delete('/api/contacts/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Test database connection
app.get('/api/test', async (req, res) => {
  try {
    const dbState = mongoose.connection.readyState;
    const states = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    };
    
    res.json({
      database: states[dbState],
      message: dbState === 1 ? 'Database connected successfully!' : 'Database connection issue'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Basic route for testing
app.get('/api', (req, res) => {
  res.json({ 
    message: 'Contact Management API is running!',
    endpoints: {
      'GET /api/contacts': 'Get all contacts',
      'POST /api/contacts': 'Create contact',
      'PUT /api/contacts/:id': 'Update contact',
      'DELETE /api/contacts/:id': 'Delete contact'
    }
  });
});

// Serve static files from React build
app.use(express.static(path.join(__dirname, 'client/build')));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});