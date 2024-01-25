import React, { useState, useEffect, useRef } from "react";
import { useSupabase } from "../../SupabaseContext";
import "./Chat.css";

const Chat = () => {
  const supabase = useSupabase();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [showChat, setShowChat] = useState(false);
  const chatboxRef = useRef(null);

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
        newMessageWithEmployeeName,
        ...prevMessages,
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
  }, [supabase]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const authData = JSON.parse(
      localStorage.getItem("sb-ktngdikunrifjvpwaljj-auth-token")
    );
    const user = authData.user;
    if (user) {
      const { error } = await supabase
        .from("messages")
        .insert([{ sender_id: user.id, text: newMessage }]);
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

  useEffect(() => {
    // Call scrollToBottom whenever messages change
    scrollToBottom();
  }, [messages]); // Dependency array includes messages

  return (
    <>
      {localStorage.getItem("sb-ktngdikunrifjvpwaljj-auth-token") && (
        <>
          <button onClick={toggleChat} className="chat-toggle-button"></button>
          {showChat && (
            <div className="Chatbox" ref={chatboxRef}>
              {" "}
              {/* Attach the ref here */}
              <ul>
                {messages.map((message) => (
                  <li className="chatlist" key={message.id}>
                    <strong>{message.employee.name}:</strong> {message.text}
                  </li>
                ))}
              </ul>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                />
                <button type="submit">Send</button>
                <button onClick={() => setShowChat(false)}>Close</button>
              </form>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Chat;
