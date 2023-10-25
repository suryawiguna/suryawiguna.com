"use client";

import React, { useRef, useState } from "react";

export default function SubscribeForm() {
  // 1. Create a reference to the input so we can fetch/clear it's value.
  const inputEl = useRef(null);
  // 2. Hold a message in state to handle the response from our API.
  const [message, setMessage] = useState("");
  const [sending, isSending] = useState(false);

  const subscribe = async (e) => {
    e.preventDefault();
    isSending(true);

    // 3. Send a request to our API with the user's email address.
    const res = await fetch("/api/subscribe", {
      body: JSON.stringify({
        email: inputEl.current.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    console.log(res);

    const { error } = await res.json();

    if (error) {
      // 4. If there was an error, update the message in state.
      setMessage(error);
      isSending(false);

      return;
    }

    // 5. Clear the input value and show a success message.
    inputEl.current.value = "";
    setMessage("Success! 🎉 You are now subscribed to the newsletter.");
    isSending(false);
  };

  return (
    <form onSubmit={subscribe} className="max-w-sm">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex flex-col">
          <input
            id="email-input"
            name="email"
            placeholder="Enter your email here"
            ref={inputEl}
            required
            type="email"
            className="bg-gray-100 dark:bg-zinc-300 dark:text-black rounded-lg px-4 py-3"
            disabled={sending}
          />
        </div>
        <button
          type="submit"
          className="bg-amber-600 dark:bg-amber-700 flex items-center justify-center px-4 py-3 uppercase font-bold text-white text-xs rounded-lg"
        >
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
                  stroke-width="4"
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
    </form>
  );
}
