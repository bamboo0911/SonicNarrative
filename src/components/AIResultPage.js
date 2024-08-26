import React, { useEffect, useState } from 'react';

const AIResultPage = () => {
    const [generatedText, setGeneratedText] = useState('');
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        const fetchGeneratedText = async () => {
            try {
                const response = await fetch('/api/latest-result'); // 使用正確的 GET 路徑
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setGeneratedText(data.generatedText);
            } catch (error) {
                console.error('Error fetching the generated text:', error);
            }
        };

        fetchGeneratedText();
    }, []);

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            setDisplayedText((prev) => prev + generatedText[index]);
            index++;
            if (index >= generatedText.length) clearInterval(interval);
        }, 50); // 每個字的顯示間隔

        return () => clearInterval(interval);
    }, [generatedText]);

    return (
        <div className="container">
            <h1>AI Generated Content</h1>
            <p>{displayedText}</p>
        </div>
    );
};

export default AIResultPage;
