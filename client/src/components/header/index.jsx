import { NavLink } from "react-router-dom";

const Header = () => {

  return (
    <nav>
      <div>
        <NavLink to="/">
          <h1>Contacts List</h1>
        </NavLink>
      </div>
    </nav>
  );

};

export default Header;