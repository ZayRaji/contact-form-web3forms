import React from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function ContactForm() {
  const onSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
   
    const formData = new FormData (form);
    const accessKey = process.env.REACT_APP_ACCESS_KEY;
    formData.append("access_key", accessKey);
    


    const toastId = toast.loading("Sending message...");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Form submitted successfully!", { id: toastId });
        event.target.reset();
      } else {
        console.error("Submission error:", data);
        toast.error(data.message || "Submission failed.", { id: toastId });
      }
    } catch (error) {
      console.error("Network error:", error);
      toast.error("Something went wrong. Please try again.", { id: toastId });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Toaster position="top-right" reverseOrder={false} />

      <div className="w-full max-w-lg bg-white border border-gray-300 rounded-xl shadow-md p-8">
        <h1 className="text-3xl text-gray-700 font-bold text-center mb-8">Hit Me Up for Projects!</h1>
        <form onSubmit={onSubmit} className="flex flex-col items-start gap-4">
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-600">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="What's your name?"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
            />
          </div>

          <div className="w-full flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="What's your email?"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
            />
          </div>

          <div className="w-full flex flex-col gap-2">
            <label htmlFor="message" className="text-sm font-medium text-gray-600">How can I help?</label>
            <textarea
              id="message"
              name="message"
              placeholder="Type your message..."
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full text-white bg-gray-700 font-semibold py-3 rounded-lg cursor-pointer hover:bg-gray-600 transition"
          >
            Send me a message
          </button>
        </form>
      </div>
    </div>
  );
}
