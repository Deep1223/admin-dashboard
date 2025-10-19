"use client";

import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { SelectPicker, DatePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";

export default function SignupPage() {
    const router = useRouter();
    const { register, handleSubmit, watch, control, formState: { errors } } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [agreeToTerms, setAgreeToTerms] = useState(false);

    const password = watch("userPassword");

    const onSubmit = async (data) => {
        console.log("Form submitted with data:", data);
        console.log("Agree to terms:", agreeToTerms);
        
        if (!agreeToTerms) {
            alert("Please agree to the Terms of Service and Privacy Policy to continue.");
            return;
        }
        
        setIsSubmitting(true);
        try {
            // Import localStorage utilities
            const { userStorage, initializeStorage } = await import('@/utils/localStorage');
            
            // Initialize storage if needed
            initializeStorage();
            
            // Check if user already exists
            if (userStorage.userExists(data.userEmail)) {
                alert("User with this email already exists. Please use a different email.");
                return;
            }
            
            // Create new user
            const newUser = userStorage.addUser({
                userName: data.userName,
                userEmail: data.userEmail,
                userPassword: data.userPassword,
                userPhoneNumber: data.userPhoneNumber,
                userRole: data.userRole || "User"
            });
            
            console.log("User created:", newUser);
            alert("Account created successfully! Please login with your credentials.");
            router.push("/login");
        } catch (error) {
            console.error("Signup error:", error);
            alert("Signup failed. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const onError = (errors) => {
        console.log("Form validation errors:", errors);
        alert("Please fix the form errors before submitting.");
    };

    return (
        <div className="signup-container">
            {/* Left Side - Image Section */}
            <div className="signup-image-section">
                <Image
                    src="/thelancet_dashboard.png"
                    alt="Signup Background"
                    fill
                    className="signup-background-image"
                    priority
                />
                <div className="image-overlay">
                    <div className="image-content">
                        <h1 className="image-title">Join Our Platform</h1>
                        <p className="image-subtitle">
                            Create your account and start managing your business with our powerful CRM solution.
                        </p>
                        <div className="image-features">
                            <div className="feature-item">
                                <div className="feature-icon">🚀</div>
                                <span>Fast & Reliable</span>
                            </div>
                            <div className="feature-item">
                                <div className="feature-icon">🔒</div>
                                <span>Secure & Private</span>
                            </div>
                            <div className="feature-item">
                                <div className="feature-icon">📊</div>
                                <span>Advanced Analytics</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Signup Form Section */}
            <div className="signup-form-section">
                <div className="signup-form-container">
                    <div className="signup-header">
                        <h2 className="signup-title">Create your account</h2>
                        <p className="signup-subtitle">
                            Get started with your free account today and experience the power of our platform.
                        </p>
                    </div>

                    <form className="signup-form" onSubmit={handleSubmit(onSubmit, onError)}>
                        <div className="form-group">
                            <input 
                                id="firstName" 
                                type="text" 
                                {...register("firstName", { required: "First name is required" })} 
                                className="form-input" 
                                placeholder="Enter your first name" 
                            />
                            {errors.firstName && <p className="error-message">{errors.firstName.message}</p>}
                        </div>

                        <div className="form-group">
                            <input 
                                id="lastName" 
                                type="text" 
                                {...register("lastName", { required: "Last name is required" })} 
                                className="form-input" 
                                placeholder="Enter your last name" 
                            />
                            {errors.lastName && <p className="error-message">{errors.lastName.message}</p>}
                        </div>

                        <div className="form-group">
                            <input 
                                id="email" 
                                type="email" 
                                {...register("userEmail", { 
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address"
                                    }
                                })} 
                                className="form-input" 
                                placeholder="Enter your email address" 
                            />
                            {errors.userEmail && <p className="error-message">{errors.userEmail.message}</p>}
                        </div>

                        <div className="form-group">
                            <input 
                                id="phone" 
                                type="tel" 
                                {...register("phoneNumber", { 
                                    required: "Phone number is required",
                                    pattern: {
                                        value: /^[\+]?[1-9][\d]{0,15}$/,
                                        message: "Invalid phone number"
                                    }
                                })} 
                                className="form-input" 
                                placeholder="Enter your phone number" 
                            />
                            {errors.phoneNumber && <p className="error-message">{errors.phoneNumber.message}</p>}
                        </div>

                        <div className="form-group">
                            <input 
                                id="password" 
                                type="password" 
                                {...register("userPassword", { 
                                    required: "Password is required", 
                                    minLength: { value: 8, message: "Password must be at least 8 characters" },
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                                        message: "Password must contain at least one uppercase letter, one lowercase letter, and one number"
                                    }
                                })} 
                                className="form-input" 
                                placeholder="Create a strong password" 
                            />
                            {errors.userPassword && <p className="error-message">{errors.userPassword.message}</p>}
                        </div>

                        <div className="form-group">
                            <input 
                                id="confirmPassword" 
                                type="password" 
                                {...register("confirmPassword", { 
                                    required: "Please confirm your password",
                                    validate: value => value === password || "Passwords do not match"
                                })} 
                                className="form-input" 
                                placeholder="Confirm your password" 
                            />
                            {errors.confirmPassword && <p className="error-message">{errors.confirmPassword.message}</p>}
                        </div>

                        <div className="form-group">
                            <Controller
                                name="userRole"
                                control={control}
                                rules={{ required: "Please select a role" }}
                                render={({ field }) => (
                                    <SelectPicker
                                        {...field}
                                        placeholder="Select your role"
                                        style={{ width: "100%" }}
                                        size="md"
                                        data={[
                                            { label: "Sales User", value: "sales user" },
                                            { label: "Administrator", value: "Administrator" }
                                        ]}
                                    />
                                )}
                            />
                            {errors.userRole && <p className="error-message">{errors.userRole.message}</p>}
                        </div>

                        <div className="form-options">
                            <div className="terms-agreement">
                                <input 
                                    id="terms-agreement" 
                                    name="terms-agreement" 
                                    type="checkbox" 
                                    checked={agreeToTerms} 
                                    onChange={(e) => setAgreeToTerms(e.target.checked)} 
                                    className="checkbox-input" 
                                />
                                <label htmlFor="terms-agreement" className="checkbox-label">
                                    I agree to the <a href="#" className="terms-link">Terms of Service</a> and <a href="#" className="terms-link">Privacy Policy</a>
                                </label>
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={isSubmitting || !agreeToTerms} 
                            className={`signup-button ${isSubmitting ? "loading" : ""} ${!agreeToTerms ? "disabled" : ""}`}
                            title={!agreeToTerms ? "Please agree to the Terms of Service to continue" : ""}
                        >
                            {isSubmitting ? (
                                <span className="button-content">
                                    <svg className="spinner" viewBox="0 0 24 24">
                                        <circle className="spinner-circle" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                                        <path className="spinner-path" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" fill="currentColor"/>
                                    </svg>
                                    Creating account...
                                </span>
                            ) : !agreeToTerms ? (
                                "Agree to Terms to Continue"
                            ) : (
                                "Create account"
                            )}
                        </button>

                        <div className="divider">
                            <span>OR</span>
                        </div>

                        <button type="button" className="google-button">
                            <svg className="google-icon" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                            Sign up with Google
                        </button>

                        <div className="login-link">
                            <span>Already have an account?</span>
                            <a href="/login" className="login-button-link">Sign in</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
