import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, RadioGroup, FormControlLabel, Radio, Stepper, Step, StepLabel, Typography, CircularProgress, Box } from "@mui/material";
import { register } from "../api/authApi"; // Replace with your actual API call
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // Adjust backend URL
const steps = ["Select Role", "Personal Details", "Set Password"];

const Register = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registerError, setRegisterError] = useState("");
  
  const [formData, setFormData] = useState({
    role: "consumer",
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    farmName: "",
    farmLocation: ""
  });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    socket.on("emailExists", (msg) => {
      setFormErrors((prevErrors) => ({ ...prevErrors, email: msg }));
    });
    return () => socket.off("emailExists");
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "email") {
      socket.emit("validateEmail", value);
    }
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: "" });
    }
  };

  const validateStep = (step) => {
    const errors = {};
    if (step === 0 && !formData.role) {
      errors.role = "Please select a role";
    } else if (step === 1) {
      if (!formData.name) errors.name = "Name is required";
      if (!formData.email) errors.email = "Email is required";
      if (!formData.phone) errors.phone = "Phone number is required";
      if (formData.role === "farmer") {
        if (!formData.farmName) errors.farmName = "Farm name is required";
        if (!formData.farmLocation) errors.farmLocation = "Farm location is required";
      }
    } else if (step === 2) {
      if (!formData.password) errors.password = "Password is required";
      if (formData.password !== formData.confirmPassword) errors.confirmPassword = "Passwords do not match";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(activeStep)) return;
    setIsSubmitting(true);
    setRegisterError("");
    try {
      const { confirmPassword, ...registerData } = formData;
      await register(registerData);
      navigate(formData.role === "farmer" ? "/farm-setup" : "/");
    } catch (err) {
      setRegisterError(err.message || "Registration failed. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <RadioGroup name="role" value={formData.role} onChange={handleChange}>
            <FormControlLabel value="consumer" control={<Radio />} label="Consumer - I want to buy produce" />
            <FormControlLabel value="farmer" control={<Radio />} label="Farmer - I want to sell produce" />
          </RadioGroup>
        );
      case 1:
        return (
          <>
            <TextField fullWidth label="Full Name" name="name" value={formData.name} onChange={handleChange} error={!!formErrors.name} helperText={formErrors.name} />
            <TextField fullWidth label="Email" name="email" value={formData.email} onChange={handleChange} error={!!formErrors.email} helperText={formErrors.email} />
            <TextField fullWidth label="Phone" name="phone" value={formData.phone} onChange={handleChange} error={!!formErrors.phone} helperText={formErrors.phone} />
            {formData.role === "farmer" && (
              <>
                <TextField fullWidth label="Farm Name" name="farmName" value={formData.farmName} onChange={handleChange} error={!!formErrors.farmName} helperText={formErrors.farmName} />
                <TextField fullWidth label="Farm Location" name="farmLocation" value={formData.farmLocation} onChange={handleChange} error={!!formErrors.farmLocation} helperText={formErrors.farmLocation} />
              </>
            )}
          </>
        );
      case 2:
        return (
          <>
            <TextField fullWidth type="password" label="Password" name="password" value={formData.password} onChange={handleChange} error={!!formErrors.password} helperText={formErrors.password} />
            <TextField fullWidth type="password" label="Confirm Password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} error={!!formErrors.confirmPassword} helperText={formErrors.confirmPassword} />
          </>
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", p: 3 }}>
      <Typography variant="h5">Sign Up</Typography>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <form onSubmit={handleSubmit}>
        {getStepContent(activeStep)}
        {registerError && <Typography color="error">{registerError}</Typography>}
        <Button onClick={handleNext} disabled={activeStep >= steps.length - 1}>Next</Button>
        {activeStep === steps.length - 1 && (
          <Button type="submit" disabled={isSubmitting}>{isSubmitting ? <CircularProgress size={20} /> : "Register"}</Button>
        )}
      </form>
    </Box>
  );
};

export default Register;
