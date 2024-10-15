import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AddEditContact = () => {

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthday: '',
    address: '',
    city: '',
    state: '',
    zip: ''
  });

  const [isNew, setIsNew] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const id = params.id?.toString() || undefined;
      if (!id) return;
      setIsNew(false);
      const response = await fetch(
        `http://localhost:5050/contact/${id}`
      );
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const contact = await response.json();
      if(!contact) {
        console.warn(`Record with id ${id} not found`);
        navigate("/");
        return;
      }
      setForm(contact);
    };
    fetchData();
    return;
  }, [params.id, navigate]);

  // update form values
  const updateForm = (value) => {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // submit form information
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    const contact = { ...form };
    try {
      let response;
      if(isNew) {
        response = await fetch("http://localhost:5050/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contact),
        });
      } else {
        response = await fetch(`http://localhost:5050/contact/${params.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contact),
        })
      }

      if(!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('A problem occured while adding or updating user: ', error);
    } finally {
      setForm({ firstName: '', lastName: '' });
      navigate("/");
    }
  }

  return (
    <>
      <h3>{isNew ? 'Add' : 'Edit'} Contact</h3>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="firstName">First Name: </label>
          <input 
            id="firstName"
            name="firstName"
            type="text"
            value={form.firstName}
            onChange={(e) => updateForm({ firstName: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name: </label>
          <input 
            id="lastName"
            name="lastName"
            type="text" 
            value={form.lastName}
            onChange={(e) => updateForm({ lastName: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input 
            id="email"
            name="email"
            type="email" 
            value={form.email}
            onChange={(e) => updateForm({ email: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="phone">Phone: </label>
          <input 
            id="phone"
            name="phone"
            type="text" 
            value={form.phone}
            onChange={(e) => updateForm({ phone: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="birthday">Birthday: </label>
          <input 
            id="birthday"
            name="birthday"
            type="text" 
            value={form.birthday}
            onChange={(e) => updateForm({ birthday: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="address">Address: </label>
          <input 
            id="address"
            name="address"
            type="text" 
            value={form.address}
            onChange={(e) => updateForm({ address: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="city">City: </label>
          <input 
            id="city"
            name="city"
            type="text" 
            value={form.city}
            onChange={(e) => updateForm({ city: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="state">State: </label>
          <input 
            id="state"
            name="state"
            type="text" 
            value={form.state}
            onChange={(e) => updateForm({ state: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="zip">Zip: </label>
          <input 
            id="zip"
            name="zip"
            type="text" 
            value={form.zip}
            onChange={(e) => updateForm({ zip: e.target.value })}
          />
        </div>
        <input type="submit" value="Submit" disabled={
          !form.firstName || !form.lastName || !form.email
        }/>
      </form>
    </>
  )
};

export default AddEditContact;