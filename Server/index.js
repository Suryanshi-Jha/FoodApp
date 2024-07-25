const express = require('express');
const connectToMongo = require('./db');

const app = express();
const port = 5000;

// Middleware to handle CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/auth', require('./Routes/Auth'));

// Connect to MongoDB and start the server
const startServer = async () => {
  try {
    const { foodData, categoryData } = await connectToMongo();
    global.foodData = foodData;
    global.foodCategory = categoryData;
    
    app.listen(port, () => {
      console.log(`App listening on http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
  }
};

startServer();
