import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AddEditContact = () => {

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
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
      <h3>Add Contact</h3>
      <form onSubmit={onSubmit}>
        <div>
          <label 
            htmlFor="firstName"
          >
            First Name
          </label>
          <input 
            id="firstName"
            name="firstName"
            type="text"
            value={form.firstName}
            onChange={(e) => updateForm({ firstName: e.target.value })}
          />
        </div>
        <div>
          <label 
            htmlFor="lastName"
          >
            Last Name
          </label>
          <input 
            id="lastName"
            name="lastName"
            type="text" 
            value={form.lastName}
            onChange={(e) => updateForm({ lastName: e.target.value })}
          />
        </div>
        <input type="submit" value="Submit"/>
      </form>
    </>
  )
};

export default AddEditContact;