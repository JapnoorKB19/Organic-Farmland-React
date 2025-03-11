import { useState } from "react";
import "../styles/Signup.css";

const Signup = () => {
  const [role, setRole] = useState("farmer");

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1>Create an Account</h1>

        <div className="role-buttons">
          <button
            className={role === "farmer" ? "active" : ""}
            onClick={() => setRole("farmer")}
          >
            Sign Up as Organic Farmer
          </button>
          <button
            className={role === "customer" ? "active" : ""}
            onClick={() => setRole("customer")}
          >
            Sign Up as Customer
          </button>
        </div>

        <form>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" placeholder="Enter your name" required />
          </div>

          <div className="form-group">
            <label>Contact Number</label>
            <input
              type="tel"
              placeholder="Enter 10-digit mobile number"
              pattern="\d{10}"
              required
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input type="email" placeholder="Enter your email" required />
          </div>

          <div className="form-group">
            <label>Permanent Address</label>
            <textarea placeholder="Enter your permanent address" required />
          </div>

          {role === "farmer" && (
            <>
              <div className="form-group">
                <label>Pincode</label>
                <input type="text" placeholder="Enter pincode" required />
              </div>

              <div className="form-group">
                <label>City</label>
                <input type="text" placeholder="City" readOnly />
              </div>

              <div className="form-group">
                <label>State</label>
                <input type="text" placeholder="State" readOnly />
              </div>
            </>
          )}

          <button type="submit" className="submit-button">
            Sign Up
          </button>
        </form>

        <p className="login-link">
          Already have an account? <a href="/login">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;