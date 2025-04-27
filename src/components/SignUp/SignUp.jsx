import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebaseInIt";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";

const SignUp = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const photo = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const terms = e.target.terms.checked;
    console.log(email, password, terms);

    setSuccess(false);
    setErrorMessage("");

    if (!terms) {
      setErrorMessage("Please accept our terms and conditions");
      return;
    }

    // password validate
    const passwordRegExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (passwordRegExp.test(password) === false) {
      setErrorMessage(
        "password must have one lowercase, one uppercase, one digit and 6 characters or longer."
      );
      return;
    }

    // create user
    createUserWithEmailAndPassword(auth, email, password)
      .then((newResult) => {
        console.log(newResult);

        // email verification
        sendEmailVerification(newResult.user).then(() => {
          setSuccess(true);
          alert("we send you a verification email . please check your email");
        });

        // update user profile
        const profile = {
          displayName: name,
          photoURL: photo,
        };
        updateProfile(auth.currentUser, profile)
          .then(() => {
            console.log("user profile updated");
          })
          .catch((error) => {
            console.log(error);
            setErrorMessage(error.message);
          });
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.message);
      });
  };

  return (
    <div className="card bg-base-100 w-full max-w-sm mx-auto mt-20 shrink-0 shadow-2xl">
      <div className="card-body">
        <h1 className="text-5xl font-bold">Sign Up now!</h1>
        <form onSubmit={handleSignUp} className="">
          <label className="label">Name</label>
          <input
            type="email"
            name="name"
            className="input"
            placeholder="Your name"
          />
          <label className="label">Photo URL</label>
          <input
            type="text"
            name="photo"
            className="input"
            placeholder="Photo URL"
          />
          <label className="label">Email</label>
          <input
            type="email"
            name="email"
            className="input"
            placeholder="Email"
          />
          <label className="label">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="input"
              placeholder="Password"
            />
            <button
              onClick={() => {
                setShowPassword(!showPassword);
              }}
              className="btn btn-xs absolute top-2 right-5"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <label className="label mt-4">
            <input type="checkbox" name="terms" className="checkbox" />
            Accept Terms and Conditions
          </label>
          <br />
          <button className="btn btn-neutral mt-4">Sign Up</button>
        </form>
        <p>
          Already have an account ? please{" "}
          <Link className="underline text-blue-500" to="/login">
            Login
          </Link>
        </p>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {success && (
          <p className="text-green-500">User has created successfully</p>
        )}
      </div>
    </div>
  );
};

export default SignUp;
