import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='absolute top-0 left-0 right-0 z-50'>
      <div className='flex justify-between items-center w-full h-20 px-4 text-white'>
        <div className="pt-3 pl-3">
          <h1 className="text-6xl hidden md:inline-block font-signature hover:scale-125 duration-200 text-white">Twibeo</h1>
        </div>
        <ul className='hidden md:flex'>
          {[{name:"Home",to:'/'}, {name:"About",to:'/'}, {name:"Downloads",to:'/'}, {name:"Subscribe",to:'/'}].map((item) => (
            <Link to={item.to} key={item.name}> <li 
              
              className="px-4 mr-6 cursor-pointer capitalize font-medium text-white text-xl transition-transform transform hover:scale-125 duration-200"
            >
              {item.name}
            </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
