"use client";

import { useState } from 'react';

type Message = { id: string; role: 'user' | 'assistant'; content: string };

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [localInput, setLocalInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const content = localInput.trim();
    if (!content) return;

    const userMsg: Message = { id: crypto.randomUUID(), role: 'user', content };
    setMessages((m) => [...m, userMsg]);
    setLocalInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/calorie-chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ messages: [{ role: 'user', content }] }),
});


      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Unknown server error' }));
        const errMsg = err?.error ?? JSON.stringify(err);
        setMessages((m) => [...m, { id: crypto.randomUUID(), role: 'assistant', content: `Error: ${errMsg}` }]);
        setLoading(false);
        return;
      }

      if (!res.body) {
        setMessages((m) => [...m, { id: crypto.randomUUID(), role: 'assistant', content: 'Error: no response body from server.' }]);
        setLoading(false);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistantId = crypto.randomUUID();
      setMessages((m) => [...m, { id: assistantId, role: 'assistant', content: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setMessages((m) => m.map(msg => msg.id === assistantId ? { ...msg, content: msg.content + chunk } : msg));
      }

    } catch (err) {
      setMessages((m) => [...m, { id: crypto.randomUUID(), role: 'assistant', content: 'Error: failed to fetch response.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-md pt-24 pb-32 mx-auto stretch px-4 min-h-screen">
      <h1 className="text-xl font-bold text-center mb-8 text-green-700">Nutrition AI Chat</h1>

      {messages.map(message => (
        <div key={message.id} className="whitespace-pre-wrap mb-4">
          <strong>{message.role === 'user' ? 'User: ' : 'AI: '}</strong>
          <span>{message.content}</span>
        </div>
      ))}

      <form
        className="fixed bottom-0 left-0 w-full p-4 bg-white border-t border-gray-200"
        onSubmit={handleSubmit}
      >
        <div className="max-w-md mx-auto flex gap-2">
           <input
             className="w-full p-2 border border-gray-300 rounded shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
             value={localInput}
             placeholder="e.g. How many calories in a banana?"
             onChange={(e) => setLocalInput((e.target as HTMLInputElement).value)}
           />
           <button type="submit" disabled={loading} className="bg-green-600 text-white px-4 py-2 rounded font-bold hover:bg-green-700 disabled:opacity-50">
             {loading ? '...' : 'Send'}
           </button>
        </div>
      </form>
    </div>
  );
}
