import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const AddEditContact = () => {

  const { 
    register, 
    handleSubmit,
    reset, 
    formState
  } = useForm();

  const [isNew, setIsNew] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const id = params.id?.toString() || undefined;
      if (!id) return;
      setIsNew(false);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/${id}`
      );
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const contact = await response.json();
      if(!contact) {
        console.warn(`Contact with id ${id} not found`);
        navigate("/");
        return;
      }
      reset(contact);
    };
    fetchData();
    return;
  }, [params.id, navigate, reset]);

  const onSubmit = async (data) => {
    const contact = { ...data };
    try {
      let response;
      if(isNew) {
        response = await fetch(`${import.meta.env.VITE_API_URL}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contact),
        });
      } else {
        response = await fetch(`${import.meta.env.VITE_API_URL}/${params.id}`, {
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
      navigate("/");
    }
  }

  return (
    <>
      <h3>{isNew ? 'Add' : 'Edit'} Contact</h3>
      <p>* Required</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="firstName">First Name:* </label>
          <input 
            id="firstName"
            name="firstName"
            type="text"
            {...register("firstName", { required: true })}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:* </label>
          <input 
            id="lastName"
            name="lastName"
            type="text"
            {...register("lastName", { required: true })} 
          />
        </div>
        <div>
          <label htmlFor="email">Email:* </label>
          <input 
            id="email"
            name="email"
            type="email" 
            {...register("email", { required: true })}
          />
        </div>
        <div>
          <label htmlFor="phone">Phone: </label>
          <input 
            id="phone"
            name="phone"
            type="text"
            {...register("phone")}
          />
        </div>
        <div>
          <label htmlFor="birthday">Birthday: </label>
          <input 
            id="birthday"
            name="birthday"
            type="text"
            {...register("birthday")}
          />
        </div>
        <div>
          <label htmlFor="address">Address: </label>
          <input 
            id="address"
            name="address"
            type="text"
            {...register("address")}
          />
        </div>
        <div>
          <label htmlFor="city">City: </label>
          <input 
            id="city"
            name="city"
            type="text" 
            {...register("city")}
          />
        </div>
        <div>
          <label htmlFor="state">State: </label>
          <input 
            id="state"
            name="state"
            type="text"
            {...register("state")}
          />
        </div>
        <div>
          <label htmlFor="zip">Zip: </label>
          <input 
            id="zip"
            name="zip"
            type="text"
            {...register("zip")}
          />
        </div>
        <input 
          type="submit" 
          value="Submit" 
          disabled={!formState.isValid}
        />
      </form>
    </>
  )
};

export default AddEditContact;