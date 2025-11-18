'use client';
import { useState } from 'react';

export default function FeedbackForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  return (
    <form
      onSubmit={e => onSubmit(e, { name, email, message })}
      className="bg-gray-800 p-6 rounded-xl border border-gray-700 space-y-4"
    >
      <input
        type="text"
        placeholder="Your Name (optional)"
        onChange={e => setName(e.target.value)}
        className="w-full p-3 bg-gray-700 rounded text-white"
      />

      <input
        type="email"
        placeholder="Your Email (optional)"
        onChange={e => setEmail(e.target.value)}
        className="w-full p-3 bg-gray-700 rounded text-white"
      />

      <textarea
        rows="5"
        required
        placeholder="Write your message…"
        onChange={e => setMessage(e.target.value)}
        className="w-full p-3 bg-gray-700 rounded text-white"
      />

      <button className="w-full py-3 bg-pink-500 rounded-lg font-semibold">
        Submit Feedback
      </button>
    </form>
  );
}
