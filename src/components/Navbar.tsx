import React from 'react';
import { Sling as Hamburger } from 'hamburger-react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

const navs = [
  { name: 'Home', path: '/' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
  { name: 'Pricing', path: '/pricing' },
];

const user = {
  name: 'Demo User',
  email: 'demo@example.com',
  avatar: '/images/avatar-demo.jpg',
  daysLeft: 12,
};

const Navbar: React.FC = () => {
  const [isOpen, setOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="bg-black bg-opacity-50 text-white p-4 fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src="/images/图标.jpg" alt="Logo" className="h-8 w-8 mr-2 animate-spin-slow" />
          <a href="/" className="text-2xl font-bold animate-pulse bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            Ai Interior Design
          </a>
        </div>
        <div className="hidden md:flex space-x-6 items-center">
          {navs.map(nav => (
            nav.name === 'Pricing' ? (
              <a
                key={nav.name}
                href="/#pricing-plans"
                className={`hover:text-pink-400 font-medium transition-colors duration-200 ${location.hash === '#pricing-plans' ? 'text-pink-400 underline underline-offset-4' : ''}`}
              >
                {nav.name}
              </a>
            ) : (
              <NavLink
                key={nav.name}
                to={nav.path}
                className={({ isActive }) =>
                  `hover:text-pink-400 font-medium transition-colors duration-200 ${
                    isActive || location.pathname === nav.path ? 'text-pink-400 underline underline-offset-4' : ''
                  }`
                }
                end={nav.path === '/'}
              >
                {nav.name}
              </NavLink>
            )
          ))}
          <a
            href="/design-room"
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
          >
            Start Designing &rarr;
          </a>
        </div>
        <div className="md:hidden">
          <Hamburger toggled={isOpen} toggle={setOpen} />
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-4 items-center">
          {navs.map(nav => (
            nav.name === 'Pricing' ? (
              <a
                key={nav.name}
                href="/#pricing-plans"
                className={`hover:text-pink-400 font-medium transition-colors duration-200 ${location.hash === '#pricing-plans' ? 'text-pink-400 underline underline-offset-4' : ''}`}
              >
                {nav.name}
              </a>
            ) : (
              <NavLink
                key={nav.name}
                to={nav.path}
                className={({ isActive }) =>
                  `hover:text-pink-400 font-medium transition-colors duration-200 ${
                    isActive || location.pathname === nav.path ? 'text-pink-400 underline underline-offset-4' : ''
                  }`
                }
                end={nav.path === '/'}
              >
                {nav.name}
              </NavLink>
            )
          ))}
          <a
            href="/design-room"
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 w-full text-center"
          >
            Start Designing &rarr;
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;