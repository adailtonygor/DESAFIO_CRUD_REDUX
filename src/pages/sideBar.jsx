import { useState } from 'react';
import { FaTh, FaBars, FaUserAlt } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const menuItem = [
    {
      path: '/',
      name: 'Inicio',
      icon: <FaTh />
    },
    {
      path: '/desafio-useReducer',
      name: 'UseReducer',
      icon: <FaUserAlt />
    },
    {
      path: '/desafio-redux',
      name: 'Redux',
      icon: <FaUserAlt />
    },
    {
      path: '/desafio-toolkit',
      name: 'Toolkit',
      icon: <FaUserAlt />
    },
    {
      path: '/desafio-trkQuery',
      name: 'TrkQuery',
      icon: <FaUserAlt />
    }
  ];

  return (
    <div className="container">
      <div
        style={{ width: isOpen ? '180px' : '50px' }}
        className="sidebar"
      >
        <div className="top_section">
          <h1
            style={{ display: isOpen ? 'block' : 'none' }}
            className="logo"
          >
            Desafio
          </h1>
          <div
            style={{ marginLeft: isOpen ? '50px' : '0px' }}
            className="bars"
          >
            <FaBars onClick={toggle} />
          </div>
        </div>
        <div className="menu_items">
          {menuItem.map((item, index) => (
           <NavLink
           to={item.path}
           key={index}
           className="link"
           activeclassname="active"
           onClick={() => {
             if (window.innerWidth <= 768) {
               toggle();
             }
           }}
         >
              <div className="icon">{item.icon}</div>
              <div
                style={{
                  display: isOpen ? 'block' : 'none'
                }}
                className="link_text"
              >
                {item.name}
              </div>
            </NavLink>
          ))}
        </div>
      </div>
      <main className='content'></main>
    </div>
  );
};

export default Sidebar;