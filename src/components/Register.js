import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const navigate = useNavigate();
  const { name, email, phone, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, password }),
      });

      if (response.ok) {
        alert("Registration Successful");
        navigate("/login");
      } else {
        alert("Registration Failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={name} placeholder="Name" onChange={handleChange} required />
        <input type="email" name="email" value={email} placeholder="Email" onChange={handleChange} required />
        <input type="text" name="phone" value={phone} placeholder="Phone Number" onChange={handleChange} required />
        <input type="password" name="password" value={password} placeholder="Password" onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
      <p>Already registered? <Link to="/login">Login here</Link></p>
    </div>
  );
};

export default Register;
