import { NavLink } from "react-router-dom";

const ContactsList = () => {

  return (
    <div className="contacts_list">
      <div className="right">
        <NavLink to="/addContact">
          <button>Add Contact</button>
        </NavLink>
      </div>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Test</td>
            <td>User</td>
            <td>
              <button>Edit</button>
              <button>Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ContactsList;