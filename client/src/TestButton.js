import React, { useState } from 'react';
import axios from 'axios';
import baseUrl from "./baseUrl";

const TestButton = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async () => {
        setIsLoading(true);
        try {
            await axios.post(`${baseUrl}/testdb`, { text: 'successful insertion' });
            alert('Data inserted successfully!');
        } catch (error) {
            console.error('Error inserting data:', error);
            alert('Failed to insert data. Please try again.');
        }
        setIsLoading(false);
    };    

    return (
        <div>
            <button onClick={handleClick} disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Insert Data'}
            </button>
        </div>
    );
};

export default TestButton;