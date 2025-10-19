"use client";
import { useState, useEffect } from "react";
import { FiAlertTriangle } from "react-icons/fi";
import Modal from "@/components/modal";
import IISMethods from '@/utils/IISMethods';
import Config from '@/config/config';
import { useAppSelector } from "@/store/hooks";
import { getCurrentState } from "@/utils/reduxUtils";

const DeleteModal = (props) => {
    const modalData = useAppSelector(s => s.modal);
    const [stage, setStage] = useState(1);
    const [confirmText, setConfirmText] = useState("");
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const confirmPhrase = "DELETE";

    useEffect(() => {
        if (stage === 2) {
            setIsButtonEnabled(confirmText.toUpperCase() === confirmPhrase);
        }
    }, [confirmText, stage]);

    const handleDeleteClose = () => {
        IISMethods.handleGrid(false, 'deletemodal', 0);
        setStage(1);
        setConfirmText("");
        setIsButtonEnabled(false);

        // Show info toast when deletion is cancelled
        if (stage === 2) {
            IISMethods.errormsg(Config.cancelling, 4);
        }
    };

    const handleNextStage = () => {
        setStage(2);
    };

    const handleDelete = async () => {
        if (!isButtonEnabled) return;

        setIsDeleting(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Show success toast
            IISMethods.errormsg(Config.datadeleted, 2);

            setShowSuccess(true);
            handleDeleteClose();
            setShowSuccess(false);
        } catch (error) {
            // Show error toast
            IISMethods.errormsg(Config.datadeleted, 1);
        } finally {
            setIsDeleting(false);
        }
    };

    const handleInputChange = (e) => {
        setConfirmText(e.target.value.toUpperCase());
    };

    try {
        return (
            <>
                <Modal
                    open={getCurrentState().modal.deletemodal}
                    onClose={handleDeleteClose}
                    width="w-500p"
                    header={
                        <div className="d-flex align-items-center">
                            <FiAlertTriangle className="me-2 text-danger" size={22} />
                            <h3 className="fs-5 fw-semibold text-dark mb-0">
                                {stage === 1 ? "Confirm Deletion" : "Final Confirmation Required"}
                            </h3>
                        </div>
                    }
                    body={
                        <>
                            {stage === 1 ? (
                                <p className="text-secondary mb-0">
                                    Are you sure you want to delete this item? This action cannot be undone.
                                </p>
                            ) : (
                                <div className="mb-3">
                                    <p className="text-secondary">
                                        To confirm, type <strong>{confirmPhrase}</strong> below:
                                    </p>
                                    <input
                                        type="text"
                                        value={confirmText}
                                        onChange={handleInputChange}
                                        className="form-control text-uppercase"
                                        placeholder="Type confirmation phrase"
                                        autoFocus
                                    />
                                </div>
                            )}
                        </>
                    }
                    footer={
                        <div className="d-flex justify-content-end gap-2">
                            <button
                                onClick={handleDeleteClose}
                                className="btn btn-light text-dark"
                            >
                                {Config.cancelbtn}
                            </button>
                            {stage === 1 ? (
                                <button
                                    onClick={handleNextStage}
                                    className="btn btn-danger text-white"
                                >
                                    {Config.continuebtn}
                                </button>
                            ) : (
                                <button
                                    onClick={() => props.handleDeleteData(props.deleteDetails._id)}
                                    disabled={!isButtonEnabled || isDeleting}
                                    className={`btn ${isButtonEnabled ? 'btn-danger text-white' : 'btn-secondary text-light disabled'}`}
                                >
                                    {isDeleting ? "Deleting..." : Config.deletebtn}
                                </button>
                            )}
                        </div>
                    }
                />

            </>
        );
    }
    catch (e) {
        console.log(e);
        return <></>;
    }
};

export default DeleteModal;
