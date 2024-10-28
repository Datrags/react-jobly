import { NavLink } from "react-router-dom";
import "./Navbar.css"

function Navbar({logout, token, currentUser}) {

    return (
        <nav className="navbar">
      <div>
        <NavLink to="/">Jobly</NavLink>
      </div>
      <ul className="navbar-links">
        <li>
          <NavLink to="/companies" className={({isActive}) => isActive ? 'active-link': ''}>Companies</NavLink>
        </li>
        <li>
          <NavLink to="/jobs" className={({isActive}) => isActive ? 'active-link': ''}>Jobs</NavLink>
        </li>
        { token && token !== 'null' ? (
        <>
          <li><NavLink to="/profile" className={({isActive}) => isActive ? 'active-link': ''}>{currentUser}</NavLink></li>
          <li><NavLink to="/" onClick={logout}>Logout</NavLink></li>
        </>) :(
          <>
          <li><NavLink to="/login" className={({isActive}) => isActive ? 'active-link': ''}>Login</NavLink></li>
          <li><NavLink to="/signup" className={({isActive}) => isActive ? 'active-link': ''}>Signup</NavLink></li>
          </>
        )

        }
        
        
      </ul>
    </nav>
      );
}

export default Navbar;