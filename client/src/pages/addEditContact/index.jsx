import { useState, useEffect } from "react";

const AddEditContact = () => {

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
  });

  useEffect(() => {
    setForm({
      firstName: '',
      lastName: '',
    })
  },[]);

  return (
    <>
      <h3>Add Contact</h3>
      <form>
        <div>
          <label>First Name</label>
          <input type="text" value={form.firstName}/>
        </div>
        <div>
          <label>Last Name</label>
          <input type="text" value={form.lastName}/>
        </div>
        <button>Submit</button>
      </form>
    </>
  )
};

export default AddEditContact;