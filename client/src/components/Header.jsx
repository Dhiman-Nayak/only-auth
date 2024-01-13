import React from 'react'
import { Link } from 'react-router-dom';

const Header = () => {
    const navbarStyle = {
      backgroundColor: "#616161", // Use your preferred color
      color: '#fff',
      padding: '1rem',
      display: 'flex',
      justifyContent: 'space-between',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Add a subtle box shadow
      position: 'sticky',
      top: 0,
      zIndex: 1000,
    };
  
    const logoStyle = {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      margin: 0,
    };
  
    const navLinksStyle = {
      listStyle: 'none',
      display: 'flex',
      gap: '1rem',
    };
  
    const navLinkStyle = {
      textDecoration: 'none',
      color: '#fff',
      fontWeight: '500',
      padding: '0.5rem 1rem',
      borderRadius: '4px',
      transition: 'background-color 0.3s ease',
    };
  
    // Add a hover effect
    const hoverEffect = {
      ':hover': {
        backgroundColor: '#27ae60', // Change the color on hover
      },
    };
  
    return (
      <nav style={navbarStyle}>
        <Link to="/">
        <span style={logoStyle}>MyAuth</span>
        </Link>
        <ul style={navLinksStyle}>
            <Link to="/">
          <li>
            <a style={{ ...navLinkStyle, ...hoverEffect }}>
              Home
            </a>
          </li>
          </Link>
          <Link to="/sign-in">
          <li>
            <a  style={{ ...navLinkStyle, ...hoverEffect }}>
              Signin
            </a>
          </li>
          </Link>
          <Link to="/profile">
          <li>
            <a  style={{ ...navLinkStyle, ...hoverEffect }}>
              Profile
            </a>
          </li>
          </Link>
        </ul>
      </nav>
    );
  };

export default Header