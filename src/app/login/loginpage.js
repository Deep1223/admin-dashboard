"use client";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import SignupModal from "../../components/SignupModal";
import IISMethods from "@/utils/IISMethods";
import Config from "@/config/config";

export default function LoginPage() {
    const router = useRouter();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedEmail = localStorage.getItem("rememberedEmail");
            const storedPassword = localStorage.getItem("rememberedPassword");
            const storedRememberMe = localStorage.getItem("rememberMe") === "true";

            if (storedRememberMe) {
                setValue("userEmail", storedEmail || "");
                setValue("userPassword", storedPassword || "");
                setRememberMe(true);
            }
        }
    }, [setValue]);

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            // Import localStorage utilities
            const { userStorage, sessionStorage, initializeStorage } = await import('@/utils/localStorage');
            
            // Initialize storage if needed
            initializeStorage();
            
            // Authenticate user using localStorage
            const user = userStorage.authenticateUser(data.userEmail, data.userPassword);
            
            if (user) {
                // Set session data
                sessionStorage.setSession(user, "local_token_" + Date.now());

                if (rememberMe) {
                    localStorage.setItem("rememberedEmail", data.userEmail);
                    localStorage.setItem("rememberedPassword", data.userPassword);
                    localStorage.setItem("rememberMe", "true");
                } else {
                    localStorage.removeItem("rememberedEmail");
                    localStorage.removeItem("rememberedPassword");
                    localStorage.removeItem("rememberMe");
                }
    
                if (user.userRole === Config.administrator) {
                    router.push("/dashboard");
                } else {
                    IISMethods.errormsg(Config.unauthorizederror, 1);
                }
            } else {
                IISMethods.errormsg(Config.invalidCredentialserror, 1);
            }
        } catch (error) {
            console.error("Login error:", error);
            IISMethods.errormsg(Config.loginFailederror, 1);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="login-container">
            {/* Left Side - Image Section */}
            <div className="login-image-section">
                <Image
                    src="/thelancet_dashboard.png"
                    alt="Login Background"
                    fill
                    className="login-background-image"
                    priority
                />
            </div>

            {/* Right Side - Login Form Section */}
            <div className="login-form-section">
                <div className="login-form-container">
                    <div className="login-header">
                        <h2 className="login-title">Sign in to your account</h2>
                        <p className="login-subtitle">
                            Welcome back! Please enter your login details below to access your account.
                        </p>
                    </div>

                    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <input 
                                id="email" 
                                type="email" 
                                {...register("userEmail", { required: "Email is required" })} 
                                className="form-input" 
                                placeholder="Enter your email" 
                            />
                            {errors.userEmail && <p className="error-message">{errors.userEmail.message}</p>}
                        </div>

                        <div className="form-group">
                            <input 
                                id="password" 
                                type="password" 
                                {...register("userPassword", { 
                                    required: "Password is required", 
                                    minLength: { value: 8, message: "Password must be at least 8 characters" } 
                                })} 
                                className="form-input" 
                                placeholder="Enter your password" 
                            />
                            {errors.userPassword && <p className="error-message">{errors.userPassword.message}</p>}
                        </div>

                        <div className="form-options">
                            <div className="remember-me">
                                <input 
                                    id="remember-me" 
                                    name="remember-me" 
                                    type="checkbox" 
                                    checked={rememberMe} 
                                    onChange={(e) => setRememberMe(e.target.checked)} 
                                    className="checkbox-input" 
                                />
                                <label htmlFor="remember-me" className="checkbox-label">Remember me</label>
                            </div>
                            <a href="#" className="forgot-password">Forgot your password?</a>
                        </div>

                        <button 
                            type="submit" 
                            disabled={isSubmitting} 
                            className={`login-button ${isSubmitting ? "loading" : ""}`}
                        >
                            {isSubmitting ? (
                                <span className="button-content">
                                    <svg className="spinner" viewBox="0 0 24 24">
                                        <circle className="spinner-circle" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                                        <path className="spinner-path" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" fill="currentColor"/>
                                    </svg>
                                    Signing in...
                                </span>
                            ) : (
                                "Sign in"
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
                            Sign in with Google
                        </button>

                        <div className="signup-link">
                            <span>Don't have an account?</span>
                            <button 
                                type="button" 
                                className="signup-button" 
                                onClick={() => setIsSignupModalOpen(true)}
                            >
                                Sign up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            
            {/* Signup Modal */}
            <SignupModal 
                isOpen={isSignupModalOpen} 
                onClose={() => setIsSignupModalOpen(false)} 
            />
        </div>
    );
}
