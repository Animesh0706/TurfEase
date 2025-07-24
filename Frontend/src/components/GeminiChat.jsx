import React, { useState } from "react";

// Replace with your Gemini API key
const GEMINI_API_KEY = "AIzaSyBTwTOfP8RKriz9gGb7faKJzVIJKcAvNI0";

const GeminiChat = () => {
    const [messages, setMessages] = useState([
        { role: "model", content: "Hi! How can I help you?" }
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false); // ✅ New loading state

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { role: "user", content: input };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput("");
        setLoading(true); // ✅ Start loading

        const body = {
            contents: newMessages.map((msg) => ({
                role: msg.role === "user" ? "user" : "model",
                parts: [{ text: msg.content }],
            })),
        };


        try {
            const res = await fetch(
                "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + GEMINI_API_KEY,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body)
                }
            );

            const data = await res.json();
            const botReply =
                data?.candidates?.[0]?.content?.parts?.[0]?.text ||
                "Sorry, I didn't understand that.";

            const botMessage = { role: "model", content: botReply };
            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error("Error fetching response from Gemini:", error);
            setMessages((prev) => [
                ...prev,
                { role: "model", content: "Oops! Something went wrong." }
            ]);
        } finally {
            setLoading(false); // ✅ Stop loading
        }
    };

    return (
        <div style={styles.container}>
            <h2>Gemini Chatbot</h2>
            <div style={styles.chatBox}>
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        style={{
                            ...styles.message,
                            alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                            background: msg.role === "user" ? "#DCF8C6" : "#EEE"
                        }}
                    >
                        {msg.content}
                    </div>
                ))}

                {/* ✅ Show Typing indicator */}
                {loading && (
                    <div style={{ ...styles.message, background: "#EEE" }}>
                        Typing...
                    </div>
                )}
            </div>

            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    style={styles.input}
                    disabled={loading} // ✅ Disable input while loading
                />
                <button type="submit" style={styles.button} disabled={loading}>
                    {loading ? "..." : "Send"}
                </button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        width: "100%",
        maxWidth: 600,
        margin: "40px auto",
        fontFamily: "sans-serif"
    },
    chatBox: {
        border: "1px solid #ccc",
        borderRadius: 8,
        padding: 16,
        height: "400px",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        backgroundColor: "#f9f9f9"
    },
    message: {
        padding: "10px 15px",
        borderRadius: "16px",
        maxWidth: "80%",
        whiteSpace: "pre-wrap"
    },
    form: {
        display: "flex",
        marginTop: 16
    },
    input: {
        flex: 1,
        padding: "10px",
        fontSize: "16px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        marginRight: "10px"
    },
    button: {
        padding: "10px 20px",
        fontSize: "16px",
        borderRadius: "8px",
        border: "none",
        background: "#007bff",
        color: "#fff",
        cursor: "pointer"
    }
};

export default GeminiChat;
