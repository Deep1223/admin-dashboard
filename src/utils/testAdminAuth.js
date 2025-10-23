/**
 * Test file for Admin Authentication API endpoints
 * This file can be used to test the admin authentication functionality
 */

import apiService from './ApiService';

// Test data for admin registration
const testAdminData = {
    username: "testadmin123",
    email: "testadmin@example.com",
    password: "securePassword123",
    role: "Editor"
};

// Test data for admin login
const testLoginData = {
    username: "testadmin123", // Can be username or email
    password: "securePassword123"
};

/**
 * Test admin registration
 */
export const testAdminRegistration = async () => {
    console.log("Testing Admin Registration...");
    console.log("Registration Data:", testAdminData);
    
    try {
        const response = await apiService.registerAdmin(testAdminData);
        console.log("Registration Response:", response);
        
        if (response.success) {
            console.log("✅ Admin registration successful!");
            console.log("Admin ID:", response.data._id);
            console.log("Username:", response.data.username);
            console.log("Email:", response.data.email);
            console.log("Role:", response.data.role);
        } else {
            console.log("❌ Admin registration failed:", response.message);
        }
        
        return response;
    } catch (error) {
        console.error("❌ Registration error:", error);
        return { success: false, error: error.message };
    }
};

/**
 * Test admin login
 */
export const testAdminLogin = async () => {
    console.log("Testing Admin Login...");
    console.log("Login Data:", testLoginData);
    
    try {
        const response = await apiService.loginAdmin(testLoginData);
        console.log("Login Response:", response);
        
        if (response.success) {
            console.log("✅ Admin login successful!");
            console.log("Admin ID:", response.data.admin._id);
            console.log("Username:", response.data.admin.username);
            console.log("Email:", response.data.admin.email);
            console.log("Role:", response.data.admin.role);
            console.log("Token:", response.data.token ? "Present" : "Missing");
        } else {
            console.log("❌ Admin login failed:", response.message);
        }
        
        return response;
    } catch (error) {
        console.error("❌ Login error:", error);
        return { success: false, error: error.message };
    }
};

/**
 * Run all tests
 */
export const runAllTests = async () => {
    console.log("🚀 Starting Admin Authentication Tests...");
    console.log("Base URL:", apiService.baseUrl);
    console.log("Register Endpoint:", apiService.baseUrl + "/api/article/admin/register");
    console.log("Login Endpoint:", apiService.baseUrl + "/api/article/admin/login");
    console.log("=" * 50);
    
    // Test registration first
    const registrationResult = await testAdminRegistration();
    
    if (registrationResult.success) {
        console.log("=" * 50);
        // Test login after successful registration
        await testAdminLogin();
    }
    
    console.log("=" * 50);
    console.log("🏁 Tests completed!");
};

// Export for use in browser console or testing
if (typeof window !== 'undefined') {
    window.testAdminAuth = {
        testAdminRegistration,
        testAdminLogin,
        runAllTests,
        testAdminData,
        testLoginData
    };
}
