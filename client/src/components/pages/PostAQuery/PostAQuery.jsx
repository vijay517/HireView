import React, { useState } from 'react';
import "./PostAQuery.css";
import NavBar from '../../sections/NavBar/NavBar';

const { Configuration, OpenAIApi } = require("openai");

export default function Chat() {
    const [messages, setMessages] = useState([
        { content: "Hi! I'm an AI assistant that specializes in self-repair tasks. I can guide you through the repair process and help you to fix the issue by yourself. How may I assist you today?", role: 'AI' },
    ]);
    const [newMessage, setNewMessage] = useState('');

    const handleInputChange = (event) => {
        setNewMessage(event.target.value);
    };

    const handleKeyUP = (event) => {
        if (event.keyCode === 13) {
            // trigger a click event on the button
            handleSendMessage()
        }
    }

    const handleSendMessage = async () => {
        if (newMessage !== '') {

            setMessages([
                ...messages,
                { content: newMessage, role: 'user' },
            ]);
            setNewMessage('');

            const response = await Query(newMessage);

            setMessages([
                ...messages,
                { content: newMessage, role: 'user' },
                { content: response, role: 'AI' }
            ]);

        }
    };

    async function Query(msg) {
        msg = `You are an AI assistant designed to assist with inquiries related to self-repair tasks. Generate responses for the following context accordingly: ${msg}`

        const configuration = new Configuration({
            apiKey: "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",
        });
        const openai = new OpenAIApi(configuration);

        console.log(messages)

        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: msg }],
            max_tokens: 1024,
        });


        return completion.data.choices[0].message.content;
    }

    return (
        <div className="post-a-query-page">
            <NavBar />
            <h2 className='title'>HIREFIX'S AI ASSISTANT (POWERED BY CHAT GPT)</h2>
            <div className='ai-container'>
                {messages.map((message, index) => (
                    <p key={index} className={message.role}> {message.content} </p>
                ))}

                <div>
                    <textarea placeholder='Enter your query' className='user-input' value={newMessage} onKeyUp={handleKeyUP} onChange={handleInputChange}></textarea>
                    <i onClick={handleSendMessage} className="send-button fa fa-paper-plane" aria-hidden="true"></i>
                </div>
            </div>

        </div>
    );
}
