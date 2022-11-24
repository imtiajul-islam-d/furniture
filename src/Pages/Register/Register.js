import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Register = () => {
  const [registerError, setRegisterError] = useState("");
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const handleRegister = (data) => {
    setRegisterError("");
    const name = data.name;
    const email = data.email;
    const password = data.password;
    const accountRole = data.accountRole;
    const profilePicture = data.pp
    console.log(email, password, name, accountRole, profilePicture);
  };
  return (
    <div>
      <section className="min-h-screen flex items-center justify-center">
        <div className="shadow-md p-5 lg:min-w-sm">
          <h2 className="text-center text-3xl mb-3">Register</h2>
          <form onSubmit={handleSubmit(handleRegister)}>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                className="input input-bordered w-full"
                type="text"
                {...register("name", {
                  required: "Please enter your name",
                })}
              />
              {errors.name && (
                <p className="text-red-700" role="alert">
                  {errors.name?.message}
                </p>
              )}
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                className="input input-bordered w-full"
                type="email"
                {...register("email", {
                  required: "Please input a valid email address",
                })}
              />
              {errors.email && (
                <p className="text-red-700" role="alert">
                  {errors.email?.message}
                </p>
              )}
              <label className="label">
                <span className="label-text">Account type</span>
              </label>
              <select 
                className="select select-bordered w-full"
                {...register("accountRole", {
                    required: "Please select one"
                })}
                >
                <option defaultChecked>
                  Buyer
                </option>
                <option>Seller</option>
              </select>
              {errors.accountRole && (
                <p className="text-red-700" role="alert">
                  {errors.accountRole?.message}
                </p>
              )}
              <label className="label">
                <span className="label-text">Choose a profile picture</span>
              </label>
              <input 
              type="file" 
              className="file-input file-input-bordered w-full"
              {...register("pp", {
                  required: "Please choose a profile picture",
                })}
               />
              {errors.pp && (
                <p className="text-red-700" role="alert">
                  {errors.pp?.message}
                </p>
              )}
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                className="input input-bordered w-full"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password should be minimum six characters",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-700" role="alert">
                  {errors.password?.message}
                </p>
              )}
            </div>
            {registerError && <p className="text-red-700">{registerError}</p>}
            <input
              className="btn btn-primary w-full my-3 text-white"
              type="submit"
            />
          </form>
          <p className="text-center my-3">
            Already have an account?{" "}
            <Link to="/login" className="text-primary">
              Please login
            </Link>
          </p>
          <div className="divider">OR</div>
          <Link className="btn border w-full bg-secondary text-black my-2 hover:bg-primary hover:text-white text-2xl">
            <FaGoogle></FaGoogle>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Register;
