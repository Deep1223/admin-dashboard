"use client";
import { useState } from 'react';
import { 
    showSuccessToast, 
    showErrorToast, 
    showWarningToast, 
    showInfoToast,
    showPromiseToast,
    showLoadingToast,
    updateToast,
    TOAST_MESSAGES
} from '@/utils/toastUtils';

const ToastDemo = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleSuccessToast = () => {
        showSuccessToast(TOAST_MESSAGES.SUCCESS.SAVE);
    };

    const handleErrorToast = () => {
        showErrorToast(TOAST_MESSAGES.ERROR.NETWORK);
    };

    const handleWarningToast = () => {
        showWarningToast(TOAST_MESSAGES.WARNING.UNSAVED_CHANGES);
    };

    const handleInfoToast = () => {
        showInfoToast(TOAST_MESSAGES.INFO.PROCESSING);
    };

    const handlePromiseToast = async () => {
        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                Math.random() > 0.5 ? resolve() : reject();
            }, 2000);
        });

        showPromiseToast(promise, {
            pending: 'Processing your request...',
            success: 'Request completed successfully!',
            error: 'Request failed. Please try again.'
        });
    };

    const handleLoadingToast = () => {
        setIsLoading(true);
        const toastId = showLoadingToast('Loading data...');
        
        setTimeout(() => {
            updateToast(toastId, 'Data loaded successfully!', 'success');
            setIsLoading(false);
        }, 3000);
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-12">
                    <h2 className="mb-4">Toast Message Demo</h2>
                    <p className="text-muted mb-4">
                        Click the buttons below to see different types of toast messages in action.
                    </p>
                </div>
            </div>
            
            <div className="row g-3">
                <div className="col-md-3 col-sm-6">
                    <button 
                        className="btn btn-success w-100"
                        onClick={handleSuccessToast}
                    >
                        Success Toast
                    </button>
                </div>
                
                <div className="col-md-3 col-sm-6">
                    <button 
                        className="btn btn-danger w-100"
                        onClick={handleErrorToast}
                    >
                        Error Toast
                    </button>
                </div>
                
                <div className="col-md-3 col-sm-6">
                    <button 
                        className="btn btn-warning w-100"
                        onClick={handleWarningToast}
                    >
                        Warning Toast
                    </button>
                </div>
                
                <div className="col-md-3 col-sm-6">
                    <button 
                        className="btn btn-info w-100"
                        onClick={handleInfoToast}
                    >
                        Info Toast
                    </button>
                </div>
                
                <div className="col-md-6 col-sm-12">
                    <button 
                        className="btn btn-primary w-100"
                        onClick={handlePromiseToast}
                    >
                        Promise Toast
                    </button>
                </div>
                
                <div className="col-md-6 col-sm-12">
                    <button 
                        className="btn btn-secondary w-100"
                        onClick={handleLoadingToast}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Loading...' : 'Loading Toast'}
                    </button>
                </div>
            </div>
            
            <div className="row mt-5">
                <div className="col-12">
                    <h4>Usage Examples</h4>
                    <div className="card">
                        <div className="card-body">
                            <h6>Basic Usage:</h6>
                            <pre className="bg-light p-3 rounded">
{`import { showSuccessToast, showErrorToast } from '@/utils/toastUtils';

// Success message
showSuccessToast('Data saved successfully!');

// Error message
showErrorToast('Failed to save data. Please try again.');`}
                            </pre>
                            
                            <h6 className="mt-3">With Custom Options:</h6>
                            <pre className="bg-light p-3 rounded">
{`showSuccessToast('Custom message', {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: true
});`}
                            </pre>
                            
                            <h6 className="mt-3">Promise-based Toast:</h6>
                            <pre className="bg-light p-3 rounded">
{`const promise = fetch('/api/data');
showPromiseToast(promise, {
    pending: 'Loading...',
    success: 'Data loaded!',
    error: 'Failed to load data'
});`}
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ToastDemo;
