const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
// Connect using MONGO_URL, if not provided we can use a local one for testing
const mongoUrl = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/music-events';
mongoose.connect(mongoUrl)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Models
const EventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: String,
  location: String,
  imageUrl: String,
  ticketPrice: Number,
});
const Event = mongoose.model('Event', EventSchema);

const RegistrationSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  name: String,
  email: String,
  phone: String,
  ticketsCount: Number,
  registeredAt: { type: Date, default: Date.now },
});
const Registration = mongoose.model('Registration', RegistrationSchema);

// Dummy Data Initialization
const initializeData = async () => {
  const count = await Event.countDocuments();
  if (count === 0) {
    console.log('Inserting dummy events...');
    await Event.insertMany([
      {
        title: "Neon Nights Sync",
        description: "Experience the ultimate synthwave and neon light show with world-renowned DJs.",
        date: "2026-06-15T20:00:00.000Z",
        location: "The Matrix Arena, LA",
        imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1974&auto=format&fit=crop",
        ticketPrice: 120
      },
      {
        title: "Acoustic Sunset",
        description: "Relaxing evening of acoustic guitar and vocals under the setting sun.",
        date: "2026-07-22T18:00:00.000Z",
        location: "Beachside Amphitheater, Miami",
        imageUrl: "https://images.unsplash.com/photo-1470229722913-7c090be5bb10?q=80&w=2074&auto=format&fit=crop",
        ticketPrice: 45
      },
      {
        title: "Techno Utopia",
        description: "A deep dive into industrial techno, lasers, and endless beats.",
        date: "2026-08-05T22:00:00.000Z",
        location: "Warehouse 42, Berlin",
        imageUrl: "https://images.unsplash.com/photo-1540039155732-d688849b2512?q=80&w=2074&auto=format&fit=crop",
        ticketPrice: 85
      }
    ]);
  }
};
initializeData();

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // Defaults to gmail, but can be configured differently
  auth: {
    user: process.env.EMAIL_USER || 'test@gmail.com',
    pass: process.env.EMAIL_PASS || 'password123'
  }
});

// Routes
// 1. Get all events
app.get('/api/events', async (req, res) => {
  try {
    const events = await Event.find({});
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events' });
  }
});

// 2. Get single event
app.get('/api/events/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching event' });
  }
});

// 3. Register for event
app.post('/api/register', async (req, res) => {
  try {
    const { eventId, name, email, phone, ticketsCount } = req.body;
    
    // Save Registration
    const newRegistration = new Registration({ eventId, name, email, phone, ticketsCount });
    await newRegistration.save();

    // Fetch event for email details
    const event = await Event.findById(eventId);

    // Send Email Ticket
    const mailOptions = {
      from: `"No Reply - Music Events" <${process.env.EMAIL_USER || 'noreply@musicevents.com'}>`,
      to: email,
      subject: `Your Ticket Confirmation: ${event.title}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #6a0dad;">Ticket Confirmation</h2>
          <p>Hi ${name},</p>
          <p>Thank you for registering for <strong>${event.title}</strong>.</p>
          <div style="background-color: #f4f4f4; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Event:</strong> ${event.title}</p>
            <p><strong>Date:</strong> ${new Date(event.date).toLocaleString()}</p>
            <p><strong>Location:</strong> ${event.location}</p>
            <p><strong>Tickets:</strong> ${ticketsCount}</p>
            <p><strong>Total Price:</strong> $${ticketsCount * event.ticketPrice}</p>
          </div>
          <p>Please keep this email as your ticket.</p>
          <p>See you there!</p>
        </div>
      `
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        // We still return success for registration even if email fails (for dev purposes)
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    res.status(201).json({ message: 'Registration successful', registration: newRegistration });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error registering for event' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
