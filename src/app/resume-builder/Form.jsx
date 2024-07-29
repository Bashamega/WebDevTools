"use client";

import { useForm } from "react-hook-form";

const Form = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block">Name</label>
        <input
          className="border p-2 w-full"
          {...register("name", { required: true })}
        />
        {errors.name && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>
      <div>
        <label className="block">Email</label>
        <input
          className="border p-2 w-full"
          type="email"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>
      <div>
        <label className="block">Education</label>
        <textarea
          className="border p-2 w-full"
          {...register("education", { required: true })}
        ></textarea>
        {errors.education && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>
      <div>
        <label className="block">Experience</label>
        <textarea
          className="border p-2 w-full"
          {...register("experience", { required: true })}
        ></textarea>
        {errors.experience && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>
      <div>
        <label className="block">Skills</label>
        <textarea
          className="border p-2 w-full"
          {...register("skills", { required: true })}
        ></textarea>
        {errors.skills && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4">
        Generate Resume
      </button>
    </form>
  );
};

export default Form;
