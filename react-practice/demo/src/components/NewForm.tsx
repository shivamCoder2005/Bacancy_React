import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z
    .string()
    .min(3, "Minimum length should be 3")
    .max(100, "Maximum length is 100"),
  email: z.email(),
  age: z.number().min(18, "Minimum age should be 18"),
  password:z.
});

type FormValues = z.infer<typeof formSchema>;

function NewForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  function submitForm(data: FormValues) {
    console.log(data);
  }
  return (
    <>
      <form onSubmit={handleSubmit(submitForm)}>
        <label htmlFor="name">Enter Your Name :</label>
        <input type="text" {...register("name")} />
        {errors.name && <span>{errors.name.message}</span>}
        <hr />
        <label htmlFor="email">Enter Your email :</label>
        <input type="email" {...register("email")} />
        {errors.email && <span>{errors.email.message}</span>}
        <hr />
        <label htmlFor="age">Enter Your age :</label>
        <input type="number" {...register("age")} />
        {errors.age && <span>{errors.age.message}</span>}
        <hr />
        <label htmlFor="password">Enter Your password :</label>
        <input type="password" {...register("password")} />
        {errors.password && <span>{errors.password.message}</span>}
        <hr />
        <label htmlFor="confirm">Enter Your confirm :</label>
        <input type="password" {...register("confirm")} />
        {errors.confirm && <span>{errors.confirm.message}</span>}
        <hr />
        <button>Submit Form</button>
      </form>
    </>
  );
}

export default NewForm;
