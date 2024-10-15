import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const ContactsList = () => {

  const [contactList, setContactList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    
    const getContacts = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}`);
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

    const answer = confirm("Are you sure you want to remove selected contact?");
    if(answer){
      await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
        method: "DELETE",
      });
      const newContacts = contactList.filter((el) => el._id !== id);
      setContactList(newContacts);
    }

  };

  const getFullAddress = (contact) => {
    return `${contact.address}, ${contact.city}, ${contact.state}, ${contact.zip}`
  }

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
            <th>Email</th>
            <th>Phone</th>
            <th>Birthday</th>
            <th>Full Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          { 
            contactList.map((contact) => (
              <tr key={contact._id}>
                <td>{contact.firstName}</td>
                <td>{contact.lastName}</td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
                <td>{contact.birthday}</td>
                <td>{getFullAddress(contact)}</td>
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