import { toast } from 'react-toastify';

// Toast configuration options
const defaultOptions = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
};

// Success toast
export const showSuccessToast = (message, options = {}) => {
    toast.success(message, { ...defaultOptions, ...options });
};

// Error toast
export const showErrorToast = (message, options = {}) => {
    toast.error(message, { ...defaultOptions, autoClose: 5000, ...options });
};

// Warning toast
export const showWarningToast = (message, options = {}) => {
    toast.warning(message, { ...defaultOptions, ...options });
};

// Info toast
export const showInfoToast = (message, options = {}) => {
    toast.info(message, { ...defaultOptions, ...options });
};

// Custom toast with custom styling
export const showCustomToast = (message, type = 'default', options = {}) => {
    toast(message, { 
        ...defaultOptions, 
        type,
        ...options 
    });
};

// Promise-based toast for async operations
export const showPromiseToast = (promise, messages) => {
    return toast.promise(promise, {
        pending: messages.pending || 'Loading...',
        success: messages.success || 'Success!',
        error: messages.error || 'Something went wrong!'
    });
};

// Loading toast
export const showLoadingToast = (message = 'Loading...') => {
    return toast.loading(message);
};

// Update existing toast
export const updateToast = (toastId, message, type = 'default', options = {}) => {
    toast.update(toastId, {
        render: message,
        type,
        ...defaultOptions,
        ...options,
        isLoading: false
    });
};

// Dismiss toast
export const dismissToast = (toastId) => {
    toast.dismiss(toastId);
};

// Dismiss all toasts
export const dismissAllToasts = () => {
    toast.dismiss();
};

// Common toast messages
export const TOAST_MESSAGES = {
    SUCCESS: {
        SAVE: 'Data saved successfully!',
        DELETE: 'Item deleted successfully!',
        UPDATE: 'Data updated successfully!',
        CREATE: 'Item created successfully!',
        LOGIN: 'Login successful!',
        LOGOUT: 'Logged out successfully!',
        UPLOAD: 'File uploaded successfully!',
        DOWNLOAD: 'Download completed!',
    },
    ERROR: {
        SAVE: 'Failed to save data. Please try again.',
        DELETE: 'Failed to delete item. Please try again.',
        UPDATE: 'Failed to update data. Please try again.',
        CREATE: 'Failed to create item. Please try again.',
        LOGIN: 'Login failed. Please check your credentials.',
        NETWORK: 'Network error. Please check your connection.',
        VALIDATION: 'Please fill in all required fields.',
        UPLOAD: 'File upload failed. Please try again.',
        DOWNLOAD: 'Download failed. Please try again.',
    },
    WARNING: {
        UNSAVED_CHANGES: 'You have unsaved changes.',
        SESSION_EXPIRING: 'Your session will expire soon.',
        LOW_STORAGE: 'Storage space is running low.',
        OUTDATED_DATA: 'Data may be outdated. Please refresh.',
    },
    INFO: {
        CANCELLED: 'Operation cancelled.',
        NO_CHANGES: 'No changes to save.',
        REFRESHING: 'Refreshing data...',
        PROCESSING: 'Processing your request...',
    }
};

// Example usage functions
export const showFormValidationError = (errors) => {
    const errorMessage = Object.values(errors).join(', ');
    showErrorToast(`Validation Error: ${errorMessage}`);
};

export const showApiError = (error) => {
    const message = error?.response?.data?.message || error?.message || 'An unexpected error occurred';
    showErrorToast(message);
};

export const showNetworkError = () => {
    showErrorToast('Network error. Please check your internet connection and try again.');
};

export const showSessionExpired = () => {
    showWarningToast('Your session has expired. Please log in again.', {
        autoClose: 5000
    });
};
