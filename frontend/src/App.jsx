import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CurrencyConverter.css";

function App() {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    amount: "",
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [currencyCodes, setCurrencyCodes] = useState([]);

  useEffect(() => {
    const fetchCurrencyCodes = async () => {
      try {
        const response = await axios.get(
          "https://openexchangerates.org/api/currencies.json",
          {
            params: {
              app_id: "YOUR_API_KEY", // Replace with your Open Exchange Rates API key
            },
          }
        );
        setCurrencyCodes(Object.keys(response.data));
      } catch (error) {
        setError("Failed to load currency codes.");
      }
    };

    fetchCurrencyCodes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/convert", formData);
      console.log("API Response:", response.data); // Log the entire response to check its structure
      setResult(response.data);
      setError("");
    } catch (error) {
      setError(error?.response ? error.response.data : error.message);
    }
  };

  return (
    <div>
      <section className="hero">
        <h1>World Currency Exchange</h1>
        <p>Your trusted source for instant and accurate currency conversions globally.</p>
      </section>
      <section className="converter">
        <form onSubmit={handleSubmit}>
          <select
            name="from"
            value={formData.from}
            onChange={handleChange}
            className="input"
          >
            <option value="">Select From Currency</option>
            {currencyCodes.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
          <select
            name="to"
            value={formData.to}
            onChange={handleChange}
            className="input"
          >
            <option value="">Select To Currency</option>
            {currencyCodes.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
          <input
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Amount"
            type="number"
            className="input"
          />
          <button type="submit" className="submit-btn">
            Convert
          </button>
        </form>
        {result && (
          <div className="result">
            <p>
              Converted Amount: {result.convertedAmount} {result.target}
            </p>
            <p>Conversion Rate: {result.conversionRate}</p>
          </div>
        )}
        {error && <p className="error">Error: {error}</p>}
      </section>
      <section className="additional-info">
        <h2>Why Opt for Global Currency Converter?</h2>
        <p>Comprehensive insights into benefits and usage guidelines.</p>
      </section>
    </div>
  );
}

export default App;
