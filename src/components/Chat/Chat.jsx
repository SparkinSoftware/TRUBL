import React, { useState, useEffect } from 'react';
import { useSupabase } from '../../SupabaseContext';
import { Link } from "react-router-dom";
import './Chat.css';

const Chat = () => {
    const supabase = useSupabase();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const handleNewMessage = async (payload) => {
        try {
            const { data: employeeData, error: employeeError } = await supabase
                .from('employee')
                .select('name')
                .eq('id', payload.new.sender_id)
                .single();
    
            if (employeeError) throw employeeError;
    
            const newMessageWithEmployeeName = {
                ...payload.new,
                employee: { name: employeeData.name }
            };
    
            setMessages(prevMessages => [newMessageWithEmployeeName, ...prevMessages]);
        } catch (error) {
            console.error('Error fetching employee name:', error);
        }
    };
    

    useEffect(() => {

        const fetchMessages = async () => {
            let { data: messages, error } = await supabase
                .from('messages')
                .select('*, employee:sender_id (name)')
                .order('created_at', { ascending: false });

            if (error) console.error('error', error);
            else setMessages(messages);
        };
        fetchMessages();


        const subscription = supabase
            .channel('public-messages')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, handleNewMessage)
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
        };
    }, [supabase]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const authData = JSON.parse(localStorage.getItem('sb-ktngdikunrifjvpwaljj-auth-token'));
        const user = authData.user;
        if (user) {
            const { error } = await supabase.from('messages').insert([
                { sender_id: user.id, text: newMessage },
            ]);
            if (error) console.error('error', error);
            setNewMessage('');
        }
    };

    return (
        <>
        <div className='Chatbox'>
            <form onSubmit={handleSubmit}>
                <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type a message..." />
                <button type="submit">Send</button>
            </form>
            <ul>
                {messages.map((message) => (
                    <li key={message.id}>
                        <strong>{message.employee.name}:</strong> {message.text}
                    </li>
                ))}
            </ul>
        </div>
        <Link to='/'>Back Home</Link>
        </>
    );
};

export default Chat;
