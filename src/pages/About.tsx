import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Zap, Eye, Target, Lightbulb, Rocket } from 'lucide-react';

const AboutPage: React.FC = () => {
  const teamMembers = [
    { name: "Alex Johnson", role: "Lead AI Architect", avatar: "https://picsum.photos/seed/alex/200/200" },
    { name: "Maria Garcia", role: "Head of Design Experience", avatar: "https://picsum.photos/seed/maria/200/200" },
    { name: "Sam Lee", role: "Lead Software Engineer", avatar: "https://picsum.photos/seed/sam/200/200" },
  ];

  const coreValues = [
    { icon: <Lightbulb size={36} className="text-pink-500" />, title: "Innovation", description: "We constantly explore new AI frontiers to bring you the most advanced and intuitive design tools." },
    { icon: <Users size={36} className="text-purple-500" />, title: "User-Centricity", description: "Your experience is our priority. We design for ease of use, creativity, and stunning results." },
    { icon: <Eye size={36} className="text-blue-500" />, title: "Visual Excellence", description: "We are passionate about aesthetics and strive for the highest quality in every AI-generated design." },
    { icon: <Zap size={36} className="text-green-500" />, title: "Speed & Efficiency", description: "Transforming spaces in seconds, our AI streamlines your design process like never before." },
  ];

  return (
    <div className="bg-black text-white min-h-screen pt-24 sm:pt-28 md:pt-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <header className="mb-12 md:mb-16 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent pb-2">
            About Ai Interior Design
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mt-4 max-w-2xl mx-auto">
            Discover the story, mission, and vision behind Ai Interior Design – your partner in reimagining spaces with the power of artificial intelligence.
          </p>
        </header>

        <section className="mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-8 text-center">Our Mission & Vision</h2>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="bg-gray-800 bg-opacity-50 p-8 rounded-xl shadow-xl hover:shadow-purple-500/30 transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <Target size={32} className="text-purple-400 mr-3" />
                <h3 className="text-2xl font-semibold text-white">Our Mission</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                At Ai Interior Design, our mission is to empower everyone, from homeowners to professional designers, with cutting-edge artificial intelligence that makes interior design accessible, intuitive, and inspiring.
                We believe that a well-designed space can significantly enhance quality of life, and our goal is to provide the tools that unlock creativity and transform visions into reality, effortlessly.
              </p>
            </div>
            <div className="bg-gray-800 bg-opacity-50 p-8 rounded-xl shadow-xl hover:shadow-sky-500/30 transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <Rocket size={32} className="text-sky-400 mr-3" />
                <h3 className="text-2xl font-semibold text-white">Our Vision</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                We envision a future where anyone can effortlessly design beautiful and functional spaces that reflect their unique personality and style. Ai Interior Design aims to be at the forefront of this revolution, making sophisticated design tools available to all, fostering creativity, and helping to build dream environments around the globe.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-12 text-center">Our Core Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value) => (
              <div key={value.title} className="bg-gray-800 p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition-transform duration-300 flex flex-col items-center">
                <div className="mb-4 p-3 bg-gray-700 rounded-full">{value.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{value.title}</h3>
                <p className="text-gray-400 text-sm flex-grow">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-12 text-center">Meet Our Team (Placeholder)</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-xl shadow-xl text-center transform hover:scale-105 transition-transform duration-300">
                <img src={member.avatar} alt={member.name} className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-purple-500 object-cover" />
                <h3 className="text-xl font-semibold text-white">{member.name}</h3>
                <p className="text-purple-400">{member.role}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-500 mt-8 text-sm">
            (This is a placeholder section. Real team information would go here.)
          </p>
        </section>

        <section className="text-center py-10 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-xl shadow-2xl">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Space?</h2>
          <p className="text-lg text-gray-100 mb-8 max-w-xl mx-auto">
            Join thousands of users already creating their dream interiors with Ai Interior Design. Get started today!
          </p>
          <Link
            to="/"
            className="bg-white text-purple-600 font-bold py-3 px-8 rounded-lg shadow-xl hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105 text-lg"
          >
            Explore Features & Start Designing
          </Link>
        </section>

      </div>
    </div>
  );
};

export default AboutPage; 