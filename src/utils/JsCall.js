import { toast } from 'react-toastify';
import Config from '@/config/config';

/**
 * JsCall - Validation-focused utility functions for the application
 * Specialized in form validation, error handling, and field styling
 */
class JsCall {

    // ==================== FORM VALIDATION FUNCTIONS ====================

    /**
     * Validate form data against validation rules
     * @param {object} formData - Form data to validate
     * @param {array} rightSidebarFormData - Validation rules configuration array
     * @param {string} formName - Form name prefix (default: 'form')
     * @returns {object} - Validation result with hasErrors and errors
     */
    static ValidateForm(formData, rightSidebarFormData, formName = 'form') {
        const errors = {};
        let hasErrors = false;

        // If rightSidebarFormData is not provided or empty, return no errors
        if (!rightSidebarFormData || !Array.isArray(rightSidebarFormData)) {
            return { hasErrors: false, errors: {} };
        }


        // Iterate through each tab in rightSidebarFormData
        rightSidebarFormData.forEach(tab => {
            if (tab.fields && Array.isArray(tab.fields)) {
                // Iterate through each field in the tab
                tab.fields.forEach(field => {
                    const fieldName = field.field;
                    const fieldValue = formData[fieldName];

                    // Check if field has validation rules
                    if (field && typeof field === 'object') {
                        
                        const fieldError = this.validateField(fieldValue, field);
                        if (fieldError) {
                            errors[fieldName] = fieldError;
                            hasErrors = true;
                            // Automatically call hasError to apply red border styling
                            this.hasError(fieldName, errors, formName);
                        } else {
                            // Clear error styling if no error - pass null to indicate no error
                            this.hasError(fieldName, null, formName);
                        }
                    }
                });
            }
        });

        return { hasErrors, errors };
    }

    /**
     * Validate individual field based on rules
     * @param {any} value - Field value
     * @param {object} field - Field configuration object
     * @param {string} fieldName - Name of the field
     * @returns {string|null} - Error message or null
     */
    static validateField(value, field) {
        // Required validation
        if (field.required && this.isEmpty(value)) {
            return field.errormessage || `${field.text} is required`;
        }

        // Skip other validations if field is empty and not required
        if (this.isEmpty(value)) {
            return null;
        }

        // Type-specific validations
        switch (field.type) {
            case 'text':
                // For text type, only check length and regex if provided
                if (field.minLength && value.length < field.minLength) {
                    return field.errormessage || `Minimum length is ${field.minLength} characters`;
                }
                if (field.maxLength && value.length > field.maxLength) {
                    return field.errormessage || `Maximum length is ${field.maxLength} characters`;
                }
                if (field.regex) {
                    try {
                        const regex = new RegExp(field.regex);
                        if (!regex.test(value)) {
                            return field.errormessage || field.regexMessage || Config.invalidformaterror;
                        }
                    } catch (error) {
                        console.error('Invalid regex pattern:', field.regex);
                        return field.errormessage || 'Invalid validation pattern';
                    }
                }
                break;

            case 'number':
                // Number validation using regex
                const numberRegex = /^-?\d+(\.\d+)?$/;
                if (!numberRegex.test(value)) {
                    return field.errormessage || 'Must be a valid number';
                }
                // Check additional regex if provided
                if (field.regex) {
                    try {
                        const regex = new RegExp(field.regex);
                        if (!regex.test(value)) {
                            return field.errormessage || field.regexMessage || Config.invalidformaterror;
                        }
                    } catch (error) {
                        console.error('Invalid regex pattern:', field.regex);
                        return field.errormessage || 'Invalid validation pattern';
                    }
                }
                // Check numeric range
                const numValue = parseFloat(value);
                if (field.min !== undefined && numValue < field.min) {
                    return field.errormessage || `Minimum value is ${field.min}`;
                }
                if (field.max !== undefined && numValue > field.max) {
                    return field.errormessage || `Maximum value is ${field.max}`;
                }
                break;

            case 'email':
                // Email validation using regex
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    return field.errormessage || Config.invalidEmailerror;
                }
                // Check additional regex if provided
                if (field.regex) {
                    try {
                        const regex = new RegExp(field.regex);
                        if (!regex.test(value)) {
                            return field.errormessage || field.regexMessage || Config.invalidformaterror;
                        }
                    } catch (error) {
                        console.error('Invalid regex pattern:', field.regex);
                        return field.errormessage || 'Invalid validation pattern';
                    }
                }
                break;

            case 'phone':
                // Phone validation using regex (10 digits)
                const phoneRegex = /^\d{10}$/;
                if (!phoneRegex.test(value)) {
                    return field.errormessage || Config.invalidPhoneerror;
                }
                // Check additional regex if provided
                if (field.regex) {
                    try {
                        const regex = new RegExp(field.regex);
                        if (!regex.test(value)) {
                            return field.errormessage || field.regexMessage || Config.invalidformaterror;
                        }
                    } catch (error) {
                        console.error('Invalid regex pattern:', field.regex);
                        return field.errormessage || 'Invalid validation pattern';
                    }
                }
                break;

            case 'datepicker':
                // Date validation
                if (value && value !== '') {
                    try {
                        // Handle both Date objects and ISO strings
                        let date;
                        if (value instanceof Date) {
                            date = value;
                        } else if (typeof value === 'string') {
                            date = new Date(value);
                        } else {
                            return field.errormessage || 'Invalid date format';
                        }
                        
                        if (isNaN(date.getTime())) {
                            return field.errormessage || 'Invalid date format';
                        }
                        
                        // Check if date is in the future (only if field has preventFutureDates property)
                        if (field.preventFutureDates) {
                            const now = new Date();
                            if (date > now) {
                                return field.errormessage || 'Date cannot be in the future';
                            }
                        }
                    } catch (error) {
                        console.error('Error validating date:', error);
                        return field.errormessage || 'Invalid date format';
                    }
                }
                break;

            case 'password':
                // Password validation using regex
                if (value.length < 8) {
                    return field.errormessage || Config.invalidPassworderror;
                }
                if (!/(?=.*[a-z])/.test(value)) {
                    return field.errormessage || Config.invalidPassworderror;
                }
                if (!/(?=.*[A-Z])/.test(value)) {
                    return field.errormessage || Config.invalidPassworderror;
                }
                if (!/(?=.*\d)/.test(value)) {
                    return field.errormessage || Config.invalidPassworderror;
                }
                if (!/(?=.*[@$!%*?&])/.test(value)) {
                    return field.errormessage || Config.invalidPassworderror;
                }
                // Check additional regex if provided
                if (field.regex) {
                    try {
                        const regex = new RegExp(field.regex);
                        if (!regex.test(value)) {
                            return field.errormessage || field.regexMessage || Config.invalidformaterror;
                        }
                    } catch (error) {
                        console.error('Invalid regex pattern:', field.regex);
                        return field.errormessage || 'Invalid validation pattern';
                    }
                }
                break;

            case 'date':
                // Date validation using regex
                const dateRegex = /^\d{4}-\d{2}-\d{2}$|^\d{2}\/\d{2}\/\d{4}$|^\d{2}-\d{2}-\d{4}$/;
                if (!dateRegex.test(value)) {
                    return field.errormessage || Config.invalidDateerror;
                }
                // Check additional regex if provided
                if (field.regex) {
                    try {
                        const regex = new RegExp(field.regex);
                        if (!regex.test(value)) {
                            return field.errormessage || field.regexMessage || Config.invalidformaterror;
                        }
                    } catch (error) {
                        console.error('Invalid regex pattern:', field.regex);
                        return field.errormessage || 'Invalid validation pattern';
                    }
                }
                break;

            default:
                // For any other type, only check regex if provided
                if (field.regex) {
                    try {
                        const regex = new RegExp(field.regex);
                        if (!regex.test(value)) {
                            return field.errormessage || field.regexMessage || Config.invalidformaterror;
                        }
                    } catch (error) {
                        console.error('Invalid regex pattern:', field.regex);
                        return field.errormessage || 'Invalid validation pattern';
                    }
                }
                break;
        }

        return null;
    }

    /**
     * Handle field error styling (apply or remove red border and label)
     * @param {string} fieldName - Name of the field
     * @param {object} errors - Form errors object
     * @param {string} formName - Form name prefix (default: 'form')
     * @returns {boolean} - Whether field has error
     */
    static hasError(fieldName, errors, formName = 'form') {
        const fieldId = `${formName}-${fieldName}`;
        const hasFieldError = errors && errors[fieldName];
    
        let element = document.getElementById(fieldId);
        
        
        // Special handling for Jodit Editor
        let isJoditEditor = false;
        let joditContainer = null;
        
        // Special handling for DatePicker
        let isDatePicker = false;
        let datePickerContainer = null;
        
        if (element) {
            // Check if this is a Jodit editor by looking for the wrapper
            const joditWrapper = element.closest('.jodit-editor-wrapper');
            if (joditWrapper) {
                isJoditEditor = true;
                joditContainer = joditWrapper.querySelector('.jodit-container');
            }
            
            // Check if this is a DatePicker by looking for RSuite DatePicker classes
            const datePickerWrapper = element.closest('.rs-picker');
            if (datePickerWrapper) {
                isDatePicker = true;
                datePickerContainer = datePickerWrapper;
            }
        }
    
        if (isJoditEditor && joditContainer) {
            // Handle Jodit Editor styling
            if (hasFieldError) {
                // Apply red border to Jodit container with proper border-radius
                joditContainer.style.borderColor = '#ef4444';
                joditContainer.style.borderWidth = '2px';
                joditContainer.style.borderStyle = 'solid';
                joditContainer.style.borderRadius = '4px';
                joditContainer.classList.add('error-field');
    
                // Apply red color to label
                this.applyLabelErrorStyle(fieldId);
            } else {
                // Remove red border from Jodit container
                joditContainer.style.borderColor = '';
                joditContainer.style.borderWidth = '';
                joditContainer.style.borderStyle = '';
                joditContainer.style.borderRadius = '';
                joditContainer.classList.remove('error-field');
    
                // Remove red color from label
                this.removeLabelErrorStyle(fieldId);
            }
        } else if (isDatePicker && datePickerContainer) {
            // Handle DatePicker styling
            if (hasFieldError) {
                // Apply red border to DatePicker container with proper border-radius
                datePickerContainer.style.borderColor = '#ef4444';
                datePickerContainer.style.borderWidth = '2px';
                datePickerContainer.style.borderStyle = 'solid';
                datePickerContainer.style.borderRadius = '4px';
                datePickerContainer.classList.add('error-field');
    
                // Apply red color to label
                this.applyLabelErrorStyle(fieldId);
            } else {
                // Remove red border from DatePicker container
                datePickerContainer.style.borderColor = '';
                datePickerContainer.style.borderWidth = '';
                datePickerContainer.style.borderStyle = '';
                datePickerContainer.style.borderRadius = '';
                datePickerContainer.classList.remove('error-field');
    
                // Remove red color from label
                this.removeLabelErrorStyle(fieldId);
            }
        } else if (element) {
            // Handle regular input fields
            if (hasFieldError) {
                // Apply red border to input field with proper border-radius
                element.style.borderColor = '#ef4444';
                element.style.borderWidth = '2px';
                element.style.borderStyle = 'solid';
                element.style.borderRadius = '4px';
                element.classList.add('error-field');
    
                // Apply red color to label
                this.applyLabelErrorStyle(fieldId);
            } else {
                // Remove red border from input field
                element.style.borderColor = '';
                element.style.borderWidth = '';
                element.style.borderStyle = '';
                element.style.borderRadius = '';
                element.classList.remove('error-field');
    
                // Remove red color from label
                this.removeLabelErrorStyle(fieldId);
            }
        }
    
        return hasFieldError;
    }
    

    /**
     * Apply red color to label for error field
     * @param {string} fieldId - ID of the field element
     */
    static applyLabelErrorStyle(fieldId) {
        const fieldElement = document.getElementById(fieldId);
        if (!fieldElement) return;
    
        let label;
        
        // Check if it's a Jodit editor
        const joditWrapper = fieldElement.closest('.jodit-editor-wrapper');
        if (joditWrapper) {
            // For Jodit, look for label in the parent form-group
            const formGroup = joditWrapper.closest('.form-group');
            if (formGroup) {
                label = formGroup.querySelector('label');
            }
        } else {
            // Check if it's a DatePicker
            const datePickerWrapper = fieldElement.closest('.rs-picker');
            if (datePickerWrapper) {
                // For DatePicker, look for label in the parent form-group
                const formGroup = datePickerWrapper.closest('.form-group');
                if (formGroup) {
                    label = formGroup.querySelector('label');
                }
            } else {
                // Try normal parent container
                const parentContainer = fieldElement.closest('.form-group, .mb-3, .col-12, .field-container');
                if (parentContainer) {
                    label = parentContainer.querySelector('label');
                }
            }
    
            // If not found, check previous sibling
            if (!label) {
                const previousSibling = fieldElement.previousElementSibling;
                if (previousSibling && previousSibling.tagName === 'LABEL') {
                    label = previousSibling;
                }
            }
    
            // If still not found, try RSuite picker wrapper
            if (!label) {
                const pickerWrapper = fieldElement.closest('.rs-picker-toggle-wrapper');
                if (pickerWrapper) {
                    const container = pickerWrapper.closest('.form-group');
                    if (container) {
                        label = container.querySelector('label');
                    }
                }
            }
        }
    
        // Apply error style
        if (label) {
            label.style.color = '#ef4444';
            label.classList.add('error-label');
        }
    }


    /**
     * Remove red color from label for error field
     * @param {string} fieldId - ID of the field element
     */
    static removeLabelErrorStyle(fieldId) {
        const fieldElement = document.getElementById(fieldId);
        if (!fieldElement) return;
    
        let label;
    
        // Check if it's a Jodit editor
        const joditWrapper = fieldElement.closest('.jodit-editor-wrapper');
        if (joditWrapper) {
            // For Jodit, look for label in the parent form-group
            const formGroup = joditWrapper.closest('.form-group');
            if (formGroup) {
                label = formGroup.querySelector('label');
            }
        } else {
            // Check if it's a DatePicker
            const datePickerWrapper = fieldElement.closest('.rs-picker');
            if (datePickerWrapper) {
                // For DatePicker, look for label in the parent form-group
                const formGroup = datePickerWrapper.closest('.form-group');
                if (formGroup) {
                    label = formGroup.querySelector('label');
                }
            } else {
                // 1️⃣ Look for label in parent container
                const parentContainer = fieldElement.closest('.form-group, .mb-3, .col-12, .field-container');
                if (parentContainer) {
                    label = parentContainer.querySelector('label');
                }
            }
    
            // 2️⃣ Look for label that comes before the field
            if (!label) {
                const previousSibling = fieldElement.previousElementSibling;
                if (previousSibling && previousSibling.tagName === 'LABEL') {
                    label = previousSibling;
                }
            }
    
            // 3️⃣ Look for RSuite picker wrapper
            if (!label) {
                const pickerWrapper = fieldElement.closest('.rs-picker-toggle-wrapper');
                if (pickerWrapper) {
                    const container = pickerWrapper.closest('.form-group');
                    if (container) {
                        label = container.querySelector('label');
                    }
                }
            }
        }
    
        // Remove label error style
        if (label) {
            label.style.color = '';
            label.classList.remove('error-label');
        }
    
        // Remove red border from input or RSuite picker
        if (fieldElement.classList.contains('error-field')) {
            fieldElement.classList.remove('error-field');
        }
    
        // Special handling for RSuite picker
        const pickerToggle = fieldElement.closest('.rs-picker-toggle-wrapper')?.querySelector('.rs-picker-toggle');
        if (pickerToggle && pickerToggle.classList.contains('error-field')) {
            pickerToggle.classList.remove('error-field');
        }
    
        // Also remove inline border style if applied
        if (fieldElement.style) {
            fieldElement.style.borderColor = '';
            fieldElement.style.borderWidth = '';
            fieldElement.style.borderStyle = '';
        }
        if (pickerToggle && pickerToggle.style) {
            pickerToggle.style.borderColor = '';
            pickerToggle.style.borderWidth = '';
            pickerToggle.style.borderStyle = '';
        }
    }


    // ==================== BASIC VALIDATION FUNCTIONS ====================

    /**
     * Check if value is empty
     * @param {any} value - Value to check
     * @returns {boolean} - Is empty
     */
    static isEmpty(value) {
        if (value === null || value === undefined) return true;
        if (typeof value === 'string') return value.trim() === '';
        if (Array.isArray(value)) return value.length === 0;
        if (typeof value === 'object') return Object.keys(value).length === 0;
        return false;
    }

}

export default JsCall;
