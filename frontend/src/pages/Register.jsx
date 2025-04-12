import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  Box,
  IconButton,
  InputAdornment,
} from "@mui/material";
import API from "../utils/api";
import { io } from "socket.io-client";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const socket = io("http://localhost:5000");
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
    farmLocation: "",
    farmCity: "",
    farmState: "",
    farmCountry: "",
    farmZip: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
        if (!formData.farmCity) errors.farmCity = "City is required";
        if (!formData.farmState) errors.farmState = "State is required";
        if (!formData.farmCountry) errors.farmCountry = "Country is required";
        if (!formData.farmZip) errors.farmZip = "Zip code is required";
      }
    } else if (step === 2) {
      if (!formData.password) errors.password = "Password is required";
      if (formData.password.length < 8) {
        errors.password = "Password must be at least 8 characters";
      }
      if (formData.password !== formData.confirmPassword)
        errors.confirmPassword = "Passwords do not match";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(activeStep)) return;
    setIsSubmitting(true);
    setRegisterError("");
    try {
      const { confirmPassword, ...registerData } = formData;
      await API.post("/auth/register", registerData);
      navigate(formData.role === "farmer" ? "/farm-setup" : "/");
    } catch (err) {
      setRegisterError(err.message || "Registration failed. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 500,
        width: "100%",
        mx: "auto",
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: 3,
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: "#f0fdf4",
      }}
    >
      <Typography variant="h5" sx={{ textAlign: "center", fontWeight: "bold", color: "#3a7d44" }}>
        Sign Up
      </Typography>
      <Stepper activeStep={activeStep} sx={{ mb: 2 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {activeStep === 0 && (
          <RadioGroup name="role" value={formData.role} onChange={handleChange}>
            <FormControlLabel
              value="consumer"
              control={<Radio sx={{ color: "#3a7d44" }} />}
              label="Consumer - I want to buy produce"
              sx={{ color: "#4b5320" }}
            />
            <FormControlLabel
              value="farmer"
              control={<Radio sx={{ color: "#4b5320" }} />}
              label="Farmer - I want to sell produce"
              sx={{ color: "#4b5320" }}
            />
          </RadioGroup>
        )}
        {activeStep === 1 && (
          <>
            <TextField fullWidth label="Full Name" name="name" value={formData.name} onChange={handleChange} error={!!formErrors.name} helperText={formErrors.name} />
            <TextField fullWidth label="Email" name="email" value={formData.email} onChange={handleChange} error={!!formErrors.email} helperText={formErrors.email} />
            <TextField fullWidth label="Phone" name="phone" value={formData.phone} onChange={handleChange} error={!!formErrors.phone} helperText={formErrors.phone} />
            {formData.role === "farmer" && (
              <>
                <TextField fullWidth label="Farm Name" name="farmName" value={formData.farmName} onChange={handleChange} error={!!formErrors.farmName} helperText={formErrors.farmName} />
                <TextField fullWidth label="Farm Location" name="farmLocation" value={formData.farmLocation} onChange={handleChange} error={!!formErrors.farmLocation} helperText={formErrors.farmLocation} />
                <TextField fullWidth label="City" name="farmCity" value={formData.farmCity} onChange={handleChange} error={!!formErrors.farmCity} helperText={formErrors.farmCity} />
                <TextField fullWidth label="State" name="farmState" value={formData.farmState} onChange={handleChange} error={!!formErrors.farmState} helperText={formErrors.farmState} />
                <TextField fullWidth label="Country" name="farmCountry" value={formData.farmCountry} onChange={handleChange} error={!!formErrors.farmCountry} helperText={formErrors.farmCountry} />
                <TextField fullWidth label="Zip Code" name="farmZip" value={formData.farmZip} onChange={handleChange} error={!!formErrors.farmZip} helperText={formErrors.farmZip} />
              </>
            )}
          </>
        )}
        {activeStep === 2 && (
          <>
            <TextField
              fullWidth
              type={showPassword ? "text" : "password"}
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={!!formErrors.password}
              helperText={formErrors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              type={showConfirmPassword ? "text" : "password"}
              label="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!formErrors.confirmPassword}
              helperText={formErrors.confirmPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowConfirmPassword((prev) => !prev)} edge="end">
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </>
        )}
        {registerError && <Typography color="error">{registerError}</Typography>}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          {activeStep > 0 && (
            <Button onClick={handleBack} variant="outlined" sx={{ backgroundColor: "#3a7d44", color: "#fff" }}>
              Back
            </Button>
          )}
          {activeStep < steps.length - 1 ? (
            <Button onClick={handleNext} variant="contained" sx={{ backgroundColor: "#3a7d44", color: "#fff" }}>
              Next
            </Button>
          ) : (
            <Button type="submit" disabled={isSubmitting} variant="contained" sx={{ backgroundColor: "#6a994e", color: "#fff" }}>
              {isSubmitting ? <CircularProgress size={20} color="inherit" /> : "Register"}
            </Button>
          )}
        </Box>
      </form>
    </Box>
  );
};

export default Register;
