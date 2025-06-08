// CurrencyConverter.js
import React, { useState, useEffect } from 'react';

const CurrencyConverter = () => {
    const [amount, setAmount] = useState(1);
    const [fromCurrency, setFromCurrency] = useState('EUR');
    const [toCurrency, setToCurrency] = useState('USD');
    const [convertedAmount, setConvertedAmount] = useState(0);
    const [history, setHistory] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [credentials, setCredentials] = useState({ username: '', password: '' });

    const fetchHistory = async () => {
        try {
            const response = await fetch('/history/');
            const data = await response.json();
            setHistory(data.history);
        } catch (error) {
            console.error('Error fetching history:', error);
        }
    };

    const handleConvert = async () => {
        try {
            const response = await fetch('/convert/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount,
                    from_currency: fromCurrency,
                    to_currency: toCurrency
                })
            });
            
            const data = await response.json();
            if (data.error) throw new Error(data.error);
            
            setConvertedAmount(data.converted_amount);
            if (isLoggedIn) fetchHistory();
        } catch (error) {
            console.error('Conversion error:', error);
        }
    };

    const handleLogin = async () => {
        try {
            const response = await fetch('/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials)
            });
            
            const data = await response.json();
            if (data.status === 'success') {
                setIsLoggedIn(true);
                fetchHistory();
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <div>
            {!isLoggedIn ? (
                <div>
                    <input
                        type="text"
                        placeholder="Username"
                        value={credentials.username}
                        onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={credentials.password}
                        onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                    />
                    <button onClick={handleLogin}>Login</button>
                </div>
            ) : (
                <div>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                    <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
                        <option value="EUR">EUR</option>
                        <option value="USD">USD</option>
                    </select>
                    →
                    <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                    </select>
                    <button onClick={handleConvert}>Convert</button>
                    
                    <h3>Result: {convertedAmount} {toCurrency}</h3>
                    
                    <h4>History:</h4>
                    <ul>
                        {history.map((item, index) => (
                            <li key={index}>
                                {item.amount} {item.from_currency} → {item.result} {item.to_currency}
                                (Rate: {item.rate}) - {item.date}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default CurrencyConverter;