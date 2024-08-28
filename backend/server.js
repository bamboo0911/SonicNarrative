const express = require('express');
const OpenAI = require('openai');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

// Initialize Express app
const app = express();
const port = process.env.PORT || 5000;

// Configure OpenAI API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Use CORS middleware
app.use(cors());

// Use body-parser middleware to parse JSON request bodies
app.use(bodyParser.json());

// Variable to store the latest generated text
let latestGeneratedText = '';

// Define a simple API route to handle requests from the frontend
app.post('/api/submit', async (req, res) => {
  const { text } = req.body;
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: text }],  // 将请求的文本作为用户的消息
      max_tokens: 150,
    });
    latestGeneratedText = response.choices[0].message.content.trim();
    res.json({ generatedText: latestGeneratedText });
  } catch (error) {
    console.error("Error:", error.message);
    console.error("Details:", error.response ? error.response.data : "No response data");
    res.status(500).json({ error: 'Something went wrong' });
  }
});



// Endpoint to retrieve the latest generated text
app.get('/api/latest-result', (req, res) => {
  if (latestGeneratedText) {
    res.json({ generatedText: latestGeneratedText });
  } else {
    res.status(404).json({ error: 'No generated text found' });
  }
});

// Set up a server endpoint to ensure the server is running properly
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
