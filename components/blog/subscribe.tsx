"use client";

import React, { useRef, useState } from "react";

const apiKey = process.env.NEXT_PUBLIC_BREVO_API_KEY as string;

export default function SubscribeForm() {
  const inputEl = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState("");
  const [sending, isSending] = useState(false);

  const subscribe = async (e) => {
    e.preventDefault();
    isSending(true);

    const options: RequestInit = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({ email: inputEl.current?.value }),
    };
    fetch("https://api.brevo.com/v3/contacts", options)
      .then((response) => response.json())
      .then((response) => {
        setMessage(
          response.message ||
            "Success! 🎉 You are now subscribed to Surya Wiguna's blog."
        );
        isSending(false);
      })
      .catch((err) => {
        setMessage(err);
        isSending(false);
      });
  };

  return (
    <form onSubmit={subscribe} className="max-w-sm">
      <div className="relative text-gray-700">
        <input
          id="email-input"
          name="email"
          placeholder="Enter your email here"
          ref={inputEl}
          required
          type="email"
          className="bg-gray-100 rounded-lg px-4 py-3 w-full pl-3 pr-8 text-base focus:outline-amber-600 outline-offset-2"
        />
        <button className="bg-amber-600 flex items-center justify-center px-4 py-3 text-white rounded-tr-lg rounded-br-lg absolute inset-y-0 right-0">
          {sending ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Subscribing...
            </>
          ) : (
            "Subscribe"
          )}
        </button>
      </div>
      <small className="text-xs m-1 text-zinc-500 italic">{message}</small>
    </form>
  );
}
