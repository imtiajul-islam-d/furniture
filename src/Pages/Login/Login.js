import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../context/AuthProvider";
import toast from "react-hot-toast";

const Login = () => {
  const { emailLogin, googleLogin, logOut, setLoadingState } =
    useContext(AuthContext);
  const [loginError, setLoginError] = useState("");
  // navigation start
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
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
    emailLogin(email, password)
      .then((result) => {
        // jwt token
        fetch(`https://server-side-livid.vercel.app/jwt?email=${email}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.accessToken) {
              localStorage.setItem("furniture", data.accessToken);
              reset();
              toast.success("Login Successful");
              navigate(from, { replace: true });
            } else {
              logOut();
              toast.error('Your account has been deleted by the admin. Please contact with us!!')
            }
          });
        // jwt token
      })
      .catch((error) =>{
        setLoadingState(false)
      setLoginError(error.message)
    });
  };
  // handle google login
  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        const user = result.user;
        const email = user.email;
        fetch(`https://server-side-livid.vercel.app/user/specification?email=${email}`)
          .then((res) => res.json())
          .then((data) => {
            if (data[0]?._id) {
              // jwt token
              fetch(`https://server-side-livid.vercel.app/jwt?email=${email}`)
                .then((res) => res.json())
                .then((data) => {
                  if (data.accessToken) {
                    localStorage.setItem("furniture", data.accessToken);
                    toast.success("Login successful");
                    navigate(from, { replace: true });
                  } else {
                    logOut();
                    toast.error('Your account has been deleted by the admin. Please contact with us!!')
                  }
                });
              // jwt token
            } else {
              logOut()
                .then(() => {})
                .catch(() => {});
              toast.error("You are not registered!! Please signup...");
              navigate("/register");
            }
          });
      })
      .catch((error) => {
        setLoginError(error.message);
        setLoadingState(false);
      });
  };
  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="shadow-md p-5 lg:min-w-sm">
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
                required: "Please input a valid email address",
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
                  message: "Password should be minimum six characters",
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
          <input
            className="btn btn-primary w-full my-3 text-white"
            type="submit"
            value='Login'
          />
        </form>
        <p className="text-center my-3">
          New to this site?{" "}
          <Link to="/register" className="text-primary">
            Create new account
          </Link>
        </p>
        <div className="divider">OR</div>
        <Link
          onClick={handleGoogleLogin}
          className="btn border w-full bg-secondary text-black my-2 hover:bg-primary hover:text-white text-2xl"
        >
          <FaGoogle></FaGoogle>
        </Link>
      </div>
    </section>
  );
};

export default Login;
