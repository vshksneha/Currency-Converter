require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const PORT = process.env.PORT || 5000;
const app = express();

const API_URL = "http://api.currencylayer.com/convert";
const API_KEY = process.env.CURRENCY_LAYER_API_KEY; // Add your CurrencyLayer API key here
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
});

// CORS options
const corsOptions = {
  origin: ["http://localhost:5173"],
};

// Middlewares
app.use(express.json());
app.use(apiLimiter);
app.use(cors(corsOptions));

// Conversion Endpoint
app.post("/api/convert", async (req, res) => {
  try {
    const { from, to, amount } = req.body;
    console.log({ from, to, amount });

    const url = `${API_URL}?access_key=${API_KEY}&from=${from}&to=${to}&amount=${amount}`;
    const response = await axios.get(url);

    console.log(response.data); // Log the full response to debug

    if (response.data && response.data.success) {
      res.json({
        base: from,
        target: to,
        convertedAmount: response.data.result,
        conversionRate: response.data.info.rate,
      });
    } else {
      res.status(400).json({
        message: "Error converting currency",
        details: response.data,
      });
    }
  } catch (error) {
    console.error("Backend error:", error.message);
    res.status(500).json({ message: "Error converting currency", details: error.message });
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}...`));
