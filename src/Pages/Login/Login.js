import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../context/AuthProvider";
import toast from "react-hot-toast";

const Login = () => {
  const {emailLogin, googleLogin, logOut, setLoadingState} = useContext(AuthContext)
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
    emailLogin(email, password)
    .then(result => {
      reset()
      toast.success("Login Successful")
      navigate('/')
    })
    .catch(error => setLoginError(error.message))
  };
  // handle google login
  const handleGoogleLogin = () => {
    googleLogin()
    .then(result => {
      const user = result.user;
      const email = user.email;
      fetch(`http://localhost:5000/user/specification?email=${email}`)
      .then(res => res.json())
      .then(data => {
        if(data[0]?._id){
          toast.success("Login successful")
          navigate('/')
        }else{
          logOut().then(() => {}).catch(()=> {})
          toast.error("You are not registered!! Please signup...")
          navigate('/register')
        }
      })
    })
    .catch(error => {
      setLoginError(error.message)
      setLoadingState(false)
    })
  }
  // save google user to the database
  // const saveUser = (name, email, acc) => {
  //   const user = {
  //     name,
  //     email,
  //     acc, 
  //     verified: false
  //   };
  //   fetch('http://localhost:5000/users', {
  //     method: "POST",
  //     headers: {
  //       "content-type": "application/json"
  //     },
  //     body: JSON.stringify(user)
  //   })
  //   .then(res => res.json())
  //   .then(data => {
  //     if(data.acknowledged === true){
  //       // navigate('/home')
  //       toast.success("Login successful")
  //     }
  //   })
  // }
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
          <input className="btn btn-primary w-full my-3 text-white" type="submit" />
        </form>
        <p className="text-center my-3">
          New to this site?{" "}
          <Link to="/register" className="text-primary">
            Create new account
          </Link>
        </p>
        <div className="divider">OR</div>
        <Link onClick={handleGoogleLogin} className="btn border w-full bg-secondary text-black my-2 hover:bg-primary hover:text-white text-2xl">
          <FaGoogle></FaGoogle>
        </Link>
      </div>
    </section>
  );
};

export default Login;
