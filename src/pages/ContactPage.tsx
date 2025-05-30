import React from 'react';

const ContactPage: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-screen pt-24 sm:pt-28 md:pt-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <header className="mb-12 md:mb-16 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-emerald-500 via-green-500 to-lime-600 bg-clip-text text-transparent pb-2">
            Get In Touch
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mt-4 max-w-2xl mx-auto">
            We'd love to hear from you! Whether you have a question about features, trials, pricing, or anything else, our team is ready to answer all your questions.
          </p>
        </header>

        <section className="max-w-2xl mx-auto bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-6 text-center">Contact Us</h2>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
              <input type="text" name="name" id="name" autoComplete="name" className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 outline-none transition-shadow shadow-md focus:shadow-green-500/50" placeholder="Your Name" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
              <input type="email" name="email" id="email" autoComplete="email" className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 outline-none transition-shadow shadow-md focus:shadow-green-500/50" placeholder="you@example.com" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
              <textarea id="message" name="message" rows={4} className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 outline-none transition-shadow shadow-md focus:shadow-green-500/50" placeholder="Your message..."></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 px-8 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-75"
              >
                Send Message
              </button>
            </div>
          </form>
          <p className="text-center text-gray-400 mt-8 text-sm">
            Alternatively, you can email us directly at: <a href="mailto:ytsgabcde53@2925.com" className="text-green-400 hover:text-green-300">ytsgabcde53@2925.com</a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default ContactPage; 