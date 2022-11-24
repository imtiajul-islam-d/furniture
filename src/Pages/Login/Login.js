import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
  const [loginError, setLoginError] = useState("");
  // navigation start
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.form?.pathname || "/";
  // navigation end
  // hook form start
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const handleLogin = (data) => {
    setLoginError("");
    const email = data.email;
    const password = data.password;
    console.log(email, password);
  };
  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="shadow-md p-5 max-w-xl">
        <h2 className="text-center text-3xl mb-3">Login</h2>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              className="input input-bordered w-full"
              type="email"
              {...register("email", {
                required: "Email Address is required",
              })}
            />
            {errors.email && (
              <p className="text-red-700" role="alert">
                {errors.email?.message}
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
                  message: "Minimum six characters needed",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-700" role="alert">
                {errors.password?.message}
              </p>
            )}
            <Link className="mb-2">Forgot Password?</Link>
          </div>
          {loginError && <p className="text-red-700">{loginError}</p>}
          {/* <p>{data}</p> */}
          <input className="btn btn-primary w-full my-3 text-white" type="submit" />
        </form>
        <p className="text-center my-3">
          New to this site?{" "}
          <Link to="/signup" className="text-primary">
            Create new account
          </Link>
        </p>
        <div className="divider">OR</div>
        <Link className="btn border w-full bg-secondary text-black my-2 hover:bg-primary hover:text-white text-2xl">
          <FaGoogle></FaGoogle>
        </Link>
      </div>
    </section>
  );
};

export default Login;
