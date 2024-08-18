
# World Currency Exchange

## Description

**World Currency Exchange** is a web application designed to provide instant and accurate currency conversions globally. This project leverages the CurrencyLayer API for real-time exchange rates and the Open Exchange Rates API for fetching available currency codes. The application is built using a Node.js backend with Express and a React.js frontend.

## Features

- **Real-Time Currency Conversion**: Convert between various currencies using up-to-date exchange rates.
- **User-Friendly Interface**: Simple and intuitive UI for selecting currencies and entering amounts.
- **Rate Limiting**: Implemented rate limiting to prevent abuse and ensure fair usage.
- **CORS Support**: Configured CORS to allow requests from the frontend.
- **Error Handling**: Comprehensive error handling to manage API errors and network issues.

## Technologies Used

- **Backend**: Node.js, Express, Axios, dotenv, express-rate-limit, CORS
- **Frontend**: React.js, Axios
- **APIs**: CurrencyLayer API, Open Exchange Rates API

## Setup Instructions

### Backend Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/world-currency-exchange.git
   cd world-currency-exchange
   ```

2. **Navigate to the `backend` directory**:
   ```bash
   cd backend
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Create a `.env` file** and add your CurrencyLayer API key:
   ```plaintext
   CURRENCY_LAYER_API_KEY=your_currency_layer_api_key
   PORT=5000
   ```

5. **Start the backend server**:
   ```bash
   npm start
   ```

### Frontend Setup

1. **Navigate to the `frontend` directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Update the API key in `App.js` for Open Exchange Rates**:
   ```javascript
   const response = await axios.get(
     "https://openexchangerates.org/api/currencies.json",
     {
       params: {
         app_id: "YOUR_API_KEY", // Replace with your Open Exchange Rates API key
       },
     }
   );
   ```

4. **Start the frontend application**:
   ```bash
   npm start
   ```

## Usage

1. Open your browser and navigate to `http://localhost:5173`.
2. Select the currencies you want to convert from and to.
3. Enter the amount you wish to convert.
4. Click the "Convert" button to get the conversion rate and the converted amount.

## Contributing

Feel free to fork this repository and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License.

