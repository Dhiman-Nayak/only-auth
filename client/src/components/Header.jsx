// import React from 'react'
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Signin from "../pages/Signin";
import "./Header.css"
const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  // console.log("cc", currentUser);
  const navbarStyle = {
    backgroundColor: "#616161", // Use your preferred color
    color: "#fff",
    padding: "1rem",
    display: "flex",
    justifyContent: "space-between",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Add a subtle box shadow
    position: "sticky",
    top: 0,
    zIndex: 1000,
  };

  const logoStyle = {
    fontSize: "1.5rem",
    fontWeight: "bold",
    margin: 0,
  };

  const navLinksStyle = {
    listStyle: "none",
    display: "flex",
    gap: "1rem",
  };

  const navLinkStyle = {
    textDecoration: "none",
    color: "#fff",
    fontWeight: "500",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    transition: "background-color 0.3s ease",
    
  };

  // Add a hover effect
  const hoverEffect = {
    ":hover": {
      backgroundColor: "#27ae60", // Change the color on hover
    },
  };

  // return (
  //   <nav style={navbarStyle}>
  //     <Link to="/">
  //       <span style={logoStyle}>MyAuth</span>
  //     </Link>
  //     <ul style={navLinksStyle}>
  //       <li>
  //         <Link to="/" style={{ ...navLinkStyle, ...hoverEffect }}>
  //           Home
  //         </Link>
  //       </li>
  //       <li>
  //         <Link to="/profile" style={{ ...navLinkStyle, ...hoverEffect }}>
  //           Profile
  //         </Link>
  //       </li>
  //       <Link to="/sign-in" style={{ ...navLinkStyle, ...hoverEffect }}>
  //         {currentUser ? (
  //           <img
  //             src={currentUser.avatar}
  //             className="rounded-full w-9 object-cover"
  //           />
  //         ) : (
  //           <div className="">Signin</div>
  //         )}
  //       </Link>
  //     </ul>
  //   </nav>
  // );
  
  return (
    <nav >
      <Link to="/">
        <span >MyAuth</span>
      </Link>
      <ul >
        <li>
          <Link to="/" >
            Home
          </Link>
        </li>
        <li>
          <Link to="/profile" >
            Profile
          </Link>
        </li>
        <Link to="/sign-in" >
          {currentUser ? (
            <img
              src={currentUser.avatar}
              className="rounded-full w-9 object-cover"
            />
          ) : (
            <div className="bg-pink-400 p-2 pl-4 pr-4 w-max rounded-full hover:bg-pink-500">Signin</div>
          )}
        </Link>
      </ul>
    </nav>
  );
};

export default Header;
