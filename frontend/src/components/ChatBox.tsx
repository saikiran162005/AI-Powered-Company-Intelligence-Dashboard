import React, { useState } from 'react';
import { Send, Loader } from 'lucide-react';
import apiClient from '@/api/client';
import { useChatStore } from '@/store/chatStore';

interface ChatBoxProps {
  companyId: string;
}

export const ChatBox: React.FC<ChatBoxProps> = ({ companyId }) => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { messages, addMessage, setError } = useChatStore();

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsLoading(true);
    try {
      const result = await apiClient.sendMessage(companyId, message);
      if (result.data) {
        addMessage(result.data);
      }
    } catch (error) {
      setError('Failed to send message. Please try again.');
      console.error('Chat error:', error);
    } finally {
      setIsLoading(false);
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-card rounded-lg border border-border">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">No messages yet. Start a conversation!</div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id}>
              <div className="bg-primary text-primary-foreground rounded-lg p-3 mb-2 ml-auto max-w-xs">
                <p className="text-sm">{msg.user_message}</p>
              </div>
              <div className="bg-muted text-muted-foreground rounded-lg p-3 max-w-xs">
                <p className="text-sm">{msg.ai_response}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input Area */}
      <form onSubmit={handleSendMessage} className="border-t border-border p-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Ask something about the company..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={isLoading}
            className="flex-1 px-3 py-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
          />
          <button
            type="submit"
            disabled={isLoading || !message.trim()}
            className="bg-primary text-primary-foreground px-4 py-2 rounded hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isLoading ? <Loader className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
        </div>
      </form>
    </div>
  );
};
