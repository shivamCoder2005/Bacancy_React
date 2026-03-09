import { useState } from "react";

type FormDataType = {
  name: string;
  email: string;
  age: number;
};

function isValidKey(key: string, obj: FormDataType): key is keyof FormDataType {
  return key in obj;
}

const Form = () => {
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    email: "",
    age: 0,
  });
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    let { id, value } = e.target;
    if (isValidKey(id, formData)) {
      setFormData((prev): FormDataType => {
        return { ...prev, [id]: id == "age" ? Number(value) : value };
      });
    }
  }
  return (
    <>
      <label htmlFor="name">Enter Your Name :-</label>
      <input
        type="text"
        id="name"
        value={formData.name}
        onChange={(e) => handleChange(e)}
      />
      <br />
      <br />

      <label htmlFor="email">Enter Your Email :-</label>
      <input
        type="email"
        id="email"
        value={formData.email}
        onChange={(e) => handleChange(e)}
      />

      <br />
      <br />
      <label htmlFor="age">Enter Your age :-</label>
      <input
        type="number"
        id="age"
        value={formData.age}
        onChange={(e) => handleChange(e)}
      />
    </>
  );
};

export default Form;
