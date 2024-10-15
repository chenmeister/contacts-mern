import { NavLink } from "react-router-dom";

const Header = () => {

  return (
    <nav>
      <div>
          <h1>
            <NavLink to="/">
              Contacts List
            </NavLink>
          </h1>
      </div>
    </nav>
  );

};

export default Header;