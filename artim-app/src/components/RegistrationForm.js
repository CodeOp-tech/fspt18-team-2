// components/RegistrationForm.js
import React from 'react';
import { useForm, Controller } from 'react-hook-form';

const RegistrationForm = () => {
  const { handleSubmit, control, errors } = useForm();

  const onSubmit = (data) => {
    console.log(data); // Replace with your registration logic
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Email</label>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{ required: 'Email is required' }}
          render={({ field }) => <input {...field} type="email" />}
        />
        <p>{errors.email && errors.email.message}</p>
      </div>

      {/* Similar code for the password and confirmPassword fields */}
      
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
