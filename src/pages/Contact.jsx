import React from "react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16 px-4">
      <div className="max-w-3xl mx-auto bg-slate-800/80 border border-slate-700/60 rounded-2xl shadow-2xl backdrop-blur-md p-8 md:p-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-8 bg-gradient-to-r from-pink-400 via-fuchsia-400 to-blue-400 bg-clip-text text-transparent drop-shadow-glow">
          📬 Contact Us
        </h1>

        <p className="text-slate-300 text-center mb-6">
          Have feedback, questions, or suggestions? We’d love to hear from you.
        </p>

        <form className="space-y-6">
          <div>
            <label className="block mb-2 text-slate-300 font-medium">Name</label>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-2 rounded-xl bg-slate-700/70 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-slate-300 font-medium">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-xl bg-slate-700/70 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-slate-300 font-medium">Message</label>
            <textarea
              placeholder="Type your message..."
              rows="5"
              className="w-full px-4 py-2 rounded-xl bg-slate-700/70 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-pink-500 via-fuchsia-500 to-blue-500 text-white hover:from-pink-600 hover:to-blue-600 shadow-lg transition-all"
          >
            Send Message
          </button>
        </form>

        <div className="mt-10 text-center text-slate-400 text-sm">
          📧 Email us at <a href="mailto:help@moviedownloader.com" className="text-pink-400 underline">help@moviedownloader.com</a>
        </div>
      </div>
    </div>
  );
}
