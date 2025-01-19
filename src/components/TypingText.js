import React, { useState, useEffect } from 'react';

function TypingText({ text, typingSpeed = 50, className }) {
    const [displayedText, setDisplayedText] = useState('');
    const [typingComplete, setTypingComplete] = useState(false);

    useEffect(() => {
        if (!typingComplete) {
            let index = 0;
            const interval = setInterval(() => {
                if (index < text.length) {
                    setDisplayedText((prev) => prev + text[index]);
                    index++;
                }
                else {
                    clearInterval(interval);
                    setTypingComplete(true);
                }
            }, typingSpeed);
            return () => clearInterval(interval);
        }
    }, [typingComplete, text, typingSpeed]);

    const handleSkipTyping = () => {
        setDisplayedText(text);
        setTypingComplete(true);
    };

    return (
        <div onClick={handleSkipTyping} className={className}>
            <pre>{displayedText}</pre>
        </div>
    );
}

export default TypingText;