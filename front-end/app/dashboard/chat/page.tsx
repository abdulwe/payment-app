"use client";

import api from "@/lib/api";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

type ChatType = { role: string; content: string };

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState<ChatType[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingChats, setLoadingChats] = useState(true);

  useEffect(() => {
    fetchHistory();
    setLoadingChats(false);
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await api.get("/ai/chat/chat-history");

      setChats(res.data.chats);
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = { role: "user", content: message };

    setChats((prev) => [...prev, userMessage]);
    setMessage("");
    setLoading(true);
    try {
      const res = await api.post("/ai/chat", { message });

      const aiMessage = {
        role: "assistant",
        content: res.data.reply,
      };

      setChats((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  if (loadingChats) return <p className="text-white">Loading....</p>;

  return (
    <div className="flex flex-col h-screen">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin">
        {Array.isArray(chats) &&
          chats.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg max-w-md ${
                msg.role === "user"
                  ? "bg-blue-500 text-white ml-auto"
                  : "bg-white text-black"
              }`}
            >
              <div className="flex items-start gap-2">
                {msg.role === "assistant" && (
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white">
                    AI
                  </div>
                )}

                <div
                  id={`${chats.length === index + 1 ? "last-chat" : ""}`}
                  className={`p-3 rounded-lg max-w-md ${
                    msg.role === "user"
                      ? "bg-blue-500 text-white ml-auto"
                      : "bg-white shadow"
                  }`}
                >
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </div>
            </div>
          ))}
      </div>
      {loading && <p className="text-white italic ml-4">AI is typing...</p>}

      {/* Input */}
      <div className="p-4 flex gap-2">
        <input
          className="flex-1 border rounded-lg p-2"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask AI about your finances..."
        />

        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}