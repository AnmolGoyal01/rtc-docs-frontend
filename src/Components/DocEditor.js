import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io("http://localhost:4000"); // backend socket server

const DocEditor = ({ docId = "123" }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [collaborators, setCollaborators] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        socket.emit('joinDoc', { docId, user });

        socket.on('receiveContent', ({ title, content }) => {
            setTitle(title);
            setContent(content);
        });

        socket.on('updateCollaborators', ({ collaborators }) => {
            setCollaborators(collaborators);
        });

        return () => {
            socket.emit('leaveDoc', { docId, user });
            socket.disconnect();
        };
    }, []);

    const handleChange = (setter, key) => (e) => {
        setter(e.target.value);
        socket.emit('typing', {
            docId,
            key,
            value: e.target.value
        });
    };

    const handleSave = async () => {
        if (!title || !content) {
            setError(true);
            return;
        }

        const userId = JSON.parse(localStorage.getItem('user'))._id;

        const result = await fetch('http://localhost:5000/save-doc', {
            method: 'POST',
            body: JSON.stringify({ title, content, userId, docId }),
            headers: {
                'Content-Type': 'application/json',
                'authorization': `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });

        const data = await result.json();
        console.log("Saved:", data);
    };

    return (
        <div className='addProduct-ul'>
            <h1>Edit Document</h1>

            <input className='inputBox'
                type='text'
                placeholder='Enter Document Title'
                value={title}
                onChange={handleChange(setTitle, "title")}
            />
            {error && !title && <span className='invalid-input'>Enter valid title</span>}

            <textarea className='inputBox'
                rows="10"
                placeholder='Write your content here...'
                value={content}
                onChange={handleChange(setContent, "content")}
            />
            {error && !content && <span className='invalid-input'>Enter valid content</span>}

            <button onClick={handleSave} className='button-ul'>Save Document</button>

            <div className='collaborators'>
                <h4>Collaborators Editing:</h4>
                <div style={{ display: 'flex', gap: '8px' }}>
                    {collaborators.map((user, idx) => (
                        <div key={idx} title={user.name}
                            className='w-8 h-8 rounded-full bg-gray-300 text-center leading-8'>
                            {user.name[0].toUpperCase()}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DocEditor;
