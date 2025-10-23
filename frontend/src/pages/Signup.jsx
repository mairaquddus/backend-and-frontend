import React, { useRef, useState } from "react";
import axios from "axios";
import "../App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UserSignup() {
  const [users, setUsers] = useState();
 

  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();


  async function handleAddUser(e) {
    e.preventDefault();
    const newUser = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value
    };

    try {
      const res = await axios.post("http://localhost:3000/api/users/register", newUser);
      console.log("Signup Successfully:", res.data);
      toast.success(res.data.message || "User added successfully!");
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error("Failed to add user.");
    }
  }

  return (
    <div className="container">
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />

      <div className="form-card">
        <h2 className="form-title">Sign up</h2>
        <form onSubmit={handleAddUser}>
          <input type="text" placeholder="Enter your name" ref={usernameRef} />
          <input
            type="text"
            placeholder="Enter your valid email"
            ref={emailRef}
          />
          <input type="number" placeholder="Enter your password" ref={passwordRef} />

         

          <button type="submit">Sign up</button>
        </form>
      </div>
    </div>
  );
}
