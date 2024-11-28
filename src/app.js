const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const todoRoutes = require('./routes/todoRoutes');

dotenv.config();

const app = express();
app.use(express.json()); // Middleware för att kunna läsa JSON-data
app.use('/api/todos', todoRoutes); // Ruta för alla TODO-relaterade funktioner

// Koppla till databasen
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Error connecting to MongoDB", err));

// Starta servern
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
