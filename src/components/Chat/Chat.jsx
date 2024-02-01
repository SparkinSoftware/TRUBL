import React, { useState, useEffect, useRef } from "react";
import { useSupabase } from "../../SupabaseContext";
import "./Chat.css";
import '../Nightmode/NightModeToggle.css';
import { useNightMode } from '../Nightmode/NightModeContext.jsx';

const Chat = ({ticketId}) => {
  const supabase = useSupabase();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [showChat, setShowChat] = useState(false);
  const chatboxRef = useRef(null);
  const { isNightMode } = useNightMode();

  const handleNewMessage = async (payload) => {
    try {
      const { data: employeeData, error: employeeError } = await supabase
        .from("employee")
        .select("name")
        .eq("id", payload.new.sender_id)
        .single();

      if (employeeError) throw employeeError;

      const newMessageWithEmployeeName = {
        ...payload.new,
        employee: { name: employeeData.name },
      };

      setMessages((prevMessages) => [
        ...prevMessages,
        newMessageWithEmployeeName,
      ]);
    } catch (error) {
      console.error("Error fetching employee name:", error);
    }
  };

  useEffect(() => {
    const fetchMessages = async () => {
      let { data: messages, error } = await supabase
        .from("messages")
        .select("*, employee:sender_id (name)")
        .eq("ticket_id", ticketId)
        .order("created_at", { ascending: false });

      if (error) console.error("error", error);
      else setMessages(messages);
    };
    fetchMessages();

    const subscription = supabase
      .channel("public-messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        handleNewMessage
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [supabase, ticketId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const authData = JSON.parse(
      localStorage.getItem("sb-ktngdikunrifjvpwaljj-auth-token")
    );
    const user = authData.user;
    if (user) {
      const { error } = await supabase
        .from("messages")
        .insert([{ sender_id: user.id, text: newMessage, ticket_id: ticketId }]);
      if (error) console.error("error", error);
      setNewMessage("");
    }
  };

  const toggleChat = () => {
    setShowChat(true);
  };

  const scrollToBottom = () => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  };
  const closeChat = async () => {
    // try {
    //   for (let message of messages) {
    //     const { error } = await supabase
    //       .from("messages")
    //       .delete()
    //       .match({ id: message.id });
    //     if (error) throw error;
    //   }

    //   console.log("Selected messages deleted");
    // } catch (error) {
    //   console.error("Error deleting messages:", error);
    // }

    setShowChat(false);
  };

  useEffect(() => {
    if (showChat) scrollToBottom();
  }, [showChat]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      {localStorage.getItem("sb-ktngdikunrifjvpwaljj-auth-token") && (
        <>
          <button
            type="button"
            onClick={() => {
              toggleChat();
              scrollToBottom();
            }}
            className={"chat-toggle-button" + (isNightMode ? '-nm' : '')}
          ></button>
          {showChat && (
            <div className={"Chatbox" + (isNightMode ? '-nm' : '')} ref={chatboxRef}>
              <ul className={"message-list" + (isNightMode ? '-nm' : '')}>
                {messages.map((message) => (
                  <li className={"chatlist" + (isNightMode ? '-nm' : '')} key={message.id}>
                    <strong>{message.employee.name}:</strong> {message.text}
                  </li>
                ))}
              </ul>
              <form onSubmit={handleSubmit} className={"chat-form" + (isNightMode ? '-nm' : '')}>
                <input
                  className={"chat-input" + (isNightMode ? '-nm' : '')}
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                />
                <button type="submit">Send</button>
                <button type="button" onClick={closeChat}>
                  Close
                </button>
              </form>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Chat;
