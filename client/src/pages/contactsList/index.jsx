import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const ContactsList = () => {

  const [contactList, setContactList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    
    const getContacts = async () => {
      const response = await fetch(`http://localhost:5050/contact/`);
      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        console.error(message);
        return;
      }
      const contacts = await response.json();
      setContactList(contacts);
    };
    getContacts();
    return;

  }, []);

  const deleteContact = async (id) => {
    await fetch(`http://localhost:5050/contact/${id}`, {
      method: "DELETE",
    });
    const newContacts = contactList.filter((el) => el._id !== id);
    setContactList(newContacts);
  };

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
          { 
            contactList.map((contact) => (
              <tr key={contact._id}>
                <td>{contact.firstName}</td>
                <td>{contact.lastName}</td>
                <td>
                  <button
                    onClick={() => navigate(`/editContact/${contact._id}`)}
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => deleteContact(contact._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default ContactsList;