import React from 'react';

const GalleryPage: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-screen pt-24 sm:pt-28 md:pt-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <header className="mb-12 md:mb-16 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-teal-400 via-cyan-500 to-sky-600 bg-clip-text text-transparent pb-2">
            Image Gallery Showcase
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mt-4 max-w-2xl mx-auto">
            Explore a collection of stunning AI-generated interior designs and user creations.
          </p>
        </header>

        {/* Placeholder for gallery content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {[...'ABCDEFGHIJKL'].map((ch, index) => (
            <div key={index} className="aspect-square bg-gray-800 rounded-lg shadow-xl hover:shadow-cyan-500/30 transition-shadow duration-300 flex items-center justify-center overflow-hidden group">
              <img 
                src={`/images/${ch}.jpg`}
                alt={`Gallery item ${ch}`}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300 ease-in-out"
                loading="lazy"
              />
            </div>
          ))}
        </div>
         <p className="text-center text-gray-400 mt-12 md:mt-16">
          More amazing designs coming soon...
        </p>
      </div>
    </div>
  );
};

export default GalleryPage; 