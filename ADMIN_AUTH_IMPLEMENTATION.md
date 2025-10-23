# Admin Authentication Implementation

This document describes the implementation of admin authentication endpoints for the Lancet Admin system.

## Overview

The system now supports admin authentication using the following API endpoints:
- **Register Admin**: `POST /api/article/admin/register`
- **Admin Login**: `POST /api/article/admin/login`

## API Configuration

### Base URL
The system is configured to use: `https://brockersbackend.finnovationz.com`

### Environment Variables
The following environment variables are configured in `src/config/config.js`:
```javascript
apiBaseUrl: 'https://brockersbackend.finnovationz.com'
adminRegisterEndpoint: '/api/article/admin/register'
adminLoginEndpoint: '/api/article/admin/login'
```

## API Endpoints

### 1. Register Admin
**Endpoint**: `POST /api/article/admin/register`

**Request Body**:
```json
{
  "username": "admin123",
  "email": "admin@example.com",
  "password": "securePassword123",
  "role": "Editor"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Admin created successfully",
  "data": {
    "_id": "admin_id",
    "username": "admin123",
    "email": "admin@example.com",
    "role": "Editor",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 2. Admin Login
**Endpoint**: `POST /api/article/admin/login`

**Request Body**:
```json
{
  "username": "admin123",
  "password": "securePassword123"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "admin": {
      "_id": "admin_id",
      "username": "admin123",
      "email": "admin@example.com",
      "role": "Editor",
      "lastLogin": "2024-01-01T00:00:00.000Z"
    },
    "token": "jwt_token_here"
  }
}
```

## Implementation Details

### Files Modified

1. **`src/config/config.js`**
   - Added admin authentication endpoints
   - Updated base URL configuration

2. **`src/utils/ApiService.js`**
   - Added `registerAdmin()` method
   - Added `loginAdmin()` method
   - Integrated with session storage

3. **`src/components/SignupModal.js`**
   - Updated to use admin registration API
   - Modified form fields to match API requirements
   - Added admin role selection (Super Admin, Editor, Reviewer)

4. **`src/app/login/loginpage.js`**
   - Updated to use admin login API
   - Modified to accept username or email
   - Updated UI text for admin authentication

### New Features

1. **Admin Registration Modal**
   - Username field (required, min 3 characters)
   - Email field (required, validated)
   - Role selection (Super Admin, Editor, Reviewer)
   - Password field (required, min 8 characters)
   - Password confirmation
   - Terms agreement checkbox

2. **Admin Login**
   - Username/Email field (accepts both)
   - Password field
   - Remember me functionality
   - Session management with JWT token

3. **Session Management**
   - Automatic token storage on successful login
   - Admin data persistence in session storage
   - Secure logout functionality

## Usage

### Registration
1. Click "Register Admin" button on login page
2. Fill in the registration form with:
   - Username (unique identifier)
   - Email address
   - Admin role (Super Admin, Editor, or Reviewer)
   - Password (minimum 8 characters)
   - Confirm password
   - Agree to terms
3. Submit the form to create admin account

### Login
1. Enter username or email address
2. Enter password
3. Optionally check "Remember me"
4. Click "Sign in" to authenticate

## Testing

A test file has been created at `src/utils/testAdminAuth.js` that can be used to test the authentication endpoints:

```javascript
import { runAllTests } from '@/utils/testAdminAuth';

// Run all tests
runAllTests();
```

Or test individual functions:
```javascript
import { testAdminRegistration, testAdminLogin } from '@/utils/testAdminAuth';

// Test registration
testAdminRegistration();

// Test login
testAdminLogin();
```

## Error Handling

The implementation includes comprehensive error handling:
- Network errors
- API response errors
- Validation errors
- Session management errors

All errors are displayed using the existing toast notification system.

## Security Features

1. **Password Validation**: Minimum 8 characters with complexity requirements
2. **Email Validation**: Proper email format validation
3. **JWT Token Management**: Secure token storage and handling
4. **Session Management**: Automatic session cleanup on logout
5. **Input Sanitization**: All inputs are validated before API calls

## Role-Based Access

The system supports three admin roles:
- **Super Admin**: Full system access
- **Editor**: Content editing permissions
- **Reviewer**: Content review permissions

## Future Enhancements

1. Password reset functionality
2. Two-factor authentication
3. Role-based UI customization
4. Admin profile management
5. Audit logging for admin actions

## Troubleshooting

### Common Issues

1. **API Connection Failed**
   - Check if the base URL is correct
   - Verify network connectivity
   - Check CORS settings on the backend

2. **Registration Failed**
   - Ensure username is unique
   - Check email format
   - Verify password meets requirements

3. **Login Failed**
   - Verify credentials are correct
   - Check if account exists
   - Ensure account is active

### Debug Mode

To enable debug logging, check the browser console for detailed error messages and API responses.
