'use client';

import { useState } from 'react';
import { handleSubscribeEmail } from '@/server-actions/sub-to-email';
import topicOptions from '@/data/topic-options';

const EmailServiceProduct = () => {
  const [email, setEmail] = useState('');
  const [topics, setTopics] = useState<string[]>([]);

  return (
    <div className="w-full min-h-screen bg-white flex items-center justify-center">
      <div className="w-full max-w-[680px] px-6 py-20 text-center">
        <h1 className="text-[48px] font-bold text-gray-900 mb-6 font-plus-jakarta-sans leading-tight">
          Become informed.
        </h1>

        <p className="text-[16px] text-gray-600 mb-12 font-plus-jakarta-sans leading-relaxed">
          Changing the world comes from being educated!
        </p>

        {/* Form container */}
        <div className="flex flex-col items-center gap-4">
          <input
            className="w-full max-w-sm px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 text-gray-900 text-[14px] font-plus-jakarta-sans"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <select
            multiple
            className="w-full max-w-sm px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 text-gray-900 text-[14px] font-plus-jakarta-sans"
            value={topics}
            onChange={(e) =>
              setTopics(
                Array.from(e.target.selectedOptions, (opt) => opt.value)
              )
            }
          >
            {topicOptions.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>

          <button
            className="mt-4 inline-flex items-center justify-center px-8 py-3 text-[14px] text-gray-900 border border-gray-900 rounded-lg hover:bg-gray-50 transition-colors font-plus-jakarta-sans font-medium"
            onClick={async () => {
              const result = await handleSubscribeEmail(email, topics);
              if (result?.error) {
                alert(result.error);
              } else {
                alert('Subscribed successfully!');
              }
            }}
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailServiceProduct;
