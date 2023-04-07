import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import { useModal } from "../../context/Modal";
import LoginFormModal from "../LoginFormModal";
import "./SignupForm.css";

const SignUpForm = () => {
  const { setModalContent } = useModal();

  const openLoginModal = () => {
    setModalContent(<LoginFormModal />);
  };

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
	firstName: "",
	lastName: "",
    image: null,
  });
  const [errors, setErrors] = useState([]);
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = new FormData();
    userData.append("username", formData.username);
    userData.append("email", formData.email);
    userData.append("password", formData.password);
	userData.append("first_name", formData.firstName);
	userData.append("last_name", formData.lastName);

    if (formData.image) {
      userData.append("profile_picture_url", formData.image);
    }

    if (formData.password === formData.confirmPassword && formData.password) {
      await dispatch(signUp(userData));
    }
  };

  const updateFormData = (e) => {
    const value = e.target.type === "file" ? e.target.files[0] : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="signup-form-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <header className="signup-form-header">Create an account</header>
        <div className="signup-form-input-container">
          <label className="signup-form-input-label">Profile Picture</label>
          <input
            id="file"
            type="file"
            className="signup-form-photo-input"
            onChange={updateFormData}
            accept="image/*"
            name="image"
          />
          {formData.image ? (
            <img
              className="signup-form-photo"
              src={URL.createObjectURL(formData.image)}
              alt="Profile Picture Preview"
            />
          ) : (
            <label htmlFor="file" className="signup-form-input-label">
              <i className="fa-solid fa-camera signup-camera"></i>
            </label>
          )}
        </div>
        <div className="signup-form-input-container">
          <label className="signup-form-input-label">Email</label>
          <input
            className="signup-form-input"
            type="text"
            name="email"
            onChange={updateFormData}
            value={formData.email}
          />
        </div>
        <div className="signup-form-input-container">
          <label className="signup-form-input-label">Username</label>
          <input
            className="signup-form-input"
            type="text"
            name="username"
            onChange={updateFormData}
            value={formData.username}
          />
        </div>
        <div className="signup-form-input-container">
          <label className="signup-form-input-label">Password</label>
          <input
            className="signup-form-input"
            type="password"
            name="password"
            onChange={updateFormData}
            value={formData.password}
          />
        </div>
        <div className="signup-form-input-container">
          <label className="signup-form-input-label">Confirm Password</label>
          <input
            className="signup-form-input"
            type="password"
            name="confirmPassword"
            onChange={updateFormData}
            value={formData.confirmPassword}
          />
        </div>
		<div className="signup-form-input-container">
          <label className="signup-form-input-label">First Name</label>
          <input
            className="signup-form-input"
            type="text"
            name="firstName"
            onChange={updateFormData}
            value={formData.firstName}
          />
        </div>
		<div className="signup-form-input-container">
          <label className="signup-form-input-label">Last Name</label>
          <input
            className="signup-form-input"
            type="text"
            name="lastName"
            onChange={updateFormData}
            value={formData.lastName}
          />
        </div>
        <button className="signup-form-submit" type="submit">
          Sign Up
        </button>
        <div className="signup-text">
			Already have an account?
          <button
            className="signup-form-login-link"
            type="button"
            onClick={openLoginModal}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;